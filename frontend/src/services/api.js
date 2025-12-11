// frontend/src/services/api.js
const BASE = 'http://localhost:5000/api/items';

// Fetch items for a particular user (userId is Clerk user.id)
export const fetchItems = async (userId) => {
  if (!userId) throw new Error('fetchItems requires a userId');
  const response = await fetch(`${BASE}?userId=${encodeURIComponent(userId)}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

// Add a new item. Must include user_id
export const addItem = async (item, userId) => {
  if (!userId) throw new Error('addItem requires a userId');
  const body = { ...item, user_id: userId };
  const response = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const txt = await response.text().catch(() => '');
    throw new Error(`HTTP error! status: ${response.status} ${txt}`);
  }
  return await response.json();
};

// Update an item. Send user_id for authorization
export const updateItem = async (id, item, userId) => {
  if (!userId) throw new Error('updateItem requires a userId');
  const body = { ...item, user_id: userId };
  const response = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

// Delete an item. Send userId as query param for authorization
export const deleteItem = async (id, userId) => {
  if (!userId) throw new Error('deleteItem requires a userId');
  const response = await fetch(`${BASE}/${id}?userId=${encodeURIComponent(userId)}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response;
};
