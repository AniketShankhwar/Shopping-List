const BASE = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/api/items`
  : "http://localhost:5000/api/items";

export const fetchItems = async (userId) => {
  const res = await fetch(`${BASE}?userId=${userId}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const addItem = async (item, userId) => {
  const body = { ...item, user_id: userId };

  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const updateItem = async (id, item, userId) => {
  const body = { ...item, user_id: userId };

  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deleteItem = async (id, userId) => {
  const res = await fetch(`${BASE}/${id}?userId=${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error(await res.text());
  return res;
};
