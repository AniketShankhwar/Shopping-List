// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection - update creds if needed
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'shopping_list_db'
});
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

// Helper: check ownership
function checkOwnership(itemId) {
  return new Promise((resolve, reject) => {
    db.query('SELECT user_id FROM items WHERE id = ?', [itemId], (err, results) => {
      if (err) return reject(err);
      if (!results.length) return resolve({ exists: false });
      resolve({ exists: true, ownerId: results[0].user_id });
    });
  });
}

// GET items for a specific user
app.get('/api/items', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'Missing userId query parameter.' });

  db.query(
    'SELECT id, name, quantity, is_purchased, user_id FROM items WHERE user_id = ?',
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// POST add an item (requires user_id in body)
app.post('/api/items', (req, res) => {
  const { name, quantity, user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: 'Missing user_id in request body.' });

  const is_purchased = 0;
  db.query(
    'INSERT INTO items (name, quantity, is_purchased, user_id) VALUES (?, ?, ?, ?)',
    [name, quantity || 1, is_purchased, user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      const inserted = {
        id: results.insertId,
        name,
        quantity: quantity || 1,
        is_purchased,
        user_id
      };
      res.status(201).json(inserted);
    }
  );
});

// PUT update (owner-only)
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity, is_purchased, user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: 'Missing user_id in request body.' });

  try {
    const ownership = await checkOwnership(id);
    if (!ownership.exists) return res.status(404).json({ error: 'Item not found.' });
    if (ownership.ownerId !== user_id) return res.status(403).json({ error: 'Not authorized.' });

    db.query(
      'UPDATE items SET name = ?, quantity = ?, is_purchased = ? WHERE id = ?',
      [name, quantity, is_purchased, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Item updated.' });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (owner-only)
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.query.userId || req.body.user_id;
  if (!userId) return res.status(400).json({ error: 'Missing userId (query or body).' });

  try {
    const ownership = await checkOwnership(id);
    if (!ownership.exists) return res.status(404).json({ error: 'Item not found.' });
    if (ownership.ownerId !== userId) return res.status(403).json({ error: 'Not authorized.' });

    db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Item deleted.' });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
