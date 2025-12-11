// frontend/src/services/api.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getItems(userId) {
  const res = await fetch(`${BASE_URL}/api/items?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export async function addItem(data) {
  const res = await fetch(`${BASE_URL}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add item");
  return res.json();
}

export async function updateItem(id, data) {
  const res = await fetch(`${BASE_URL}/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update item");
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${BASE_URL}/api/items/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.status === 204 ? {} : res.json();
}