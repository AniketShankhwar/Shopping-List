// models/itemModel.js
const { query } = require("../config/db");

async function getItemsByUser(userId) {
  return query(
    "SELECT id, name, quantity, is_purchased, user_id FROM items WHERE user_id = ?",
    [userId]
  );
}

async function addItem(name, quantity, user_id) {
  return query(
    "INSERT INTO items (name, quantity, is_purchased, user_id) VALUES (?, ?, ?, ?)",
    [name, quantity, 0, user_id]
  );
}

async function updateItem(id, name, quantity, is_purchased) {
  return query(
    "UPDATE items SET name = ?, quantity = ?, is_purchased = ? WHERE id = ?",
    [name, quantity, is_purchased, id]
  );
}

async function deleteItem(id) {
  return query("DELETE FROM items WHERE id = ?", [id]);
}

async function getItemOwner(id) {
  const results = await query("SELECT user_id FROM items WHERE id = ?", [id]);
  if (!results.length) return { exists: false };
  return { exists: true, ownerId: results[0].user_id };
}

module.exports = {
  getItemsByUser,
  addItem,
  updateItem,
  deleteItem,
  getItemOwner,
};
