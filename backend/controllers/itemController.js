// controllers/itemController.js
const {
  getItemsByUser,
  addItem,
  updateItem,
  deleteItem,
  getItemOwner
} = require("../models/itemModel");

// GET /api/items
exports.getItems = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const items = await getItemsByUser(userId);
    res.json(items);
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ error: err.message });
  }
};

// POST /api/items
exports.createItem = async (req, res) => {
  const { name, quantity = 1, user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: "Missing user_id" });

  try {
    const result = await addItem(name, quantity, user_id);
    const inserted = {
      id: result.insertId,
      name,
      quantity,
      is_purchased: 0,
      user_id,
    };
    res.status(201).json(inserted);
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/items/:id
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, is_purchased, user_id } = req.body;

  if (!user_id) return res.status(400).json({ error: "Missing user_id" });

  try {
    const check = await getItemOwner(id);
    if (!check.exists) return res.status(404).json({ error: "Item not found" });
    if (check.ownerId !== user_id)
      return res.status(403).json({ error: "Not authorized" });

    await updateItem(id, name, quantity, is_purchased);
    res.json({ message: "Item updated" });
  } catch (err) {
    console.error("UPDATE error:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/items/:id
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.query.userId || req.body.user_id;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const check = await getItemOwner(id);
    if (!check.exists) return res.status(404).json({ error: "Item not found" });
    if (check.ownerId !== userId)
      return res.status(403).json({ error: "Not authorized" });

    await deleteItem(id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ error: err.message });
  }
};
