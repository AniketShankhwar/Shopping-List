const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000; // Backend will run on port 5000

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Use your MySQL username
    password: 'root', // Use your MySQL password
    database: 'shopping_list_db'
});
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// 1. GET all items
app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. POST a new item
app.post('/api/items', (req, res) => {
    const { name, quantity } = req.body;
    db.query(
        'INSERT INTO items (name, quantity) VALUES (?, ?)',
        [name, quantity],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name, quantity });
        }
    );
});

// 3. PUT (Update) an item
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, quantity, is_purchased } = req.body;
    db.query(
        'UPDATE items SET name = ?, quantity = ?, is_purchased = ? WHERE id = ?',
        [name, quantity, is_purchased, id],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Item updated successfully.' });
        }
    );
});

// 4. DELETE an item
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Item deleted successfully.' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});