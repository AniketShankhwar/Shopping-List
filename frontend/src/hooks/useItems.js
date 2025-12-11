// src/hooks/useItems.js

import { useEffect, useState } from "react";
import { getItems, addItem, updateItem, deleteItem } from "../services/api";
import { useUser } from "@clerk/clerk-react";

export default function useItems() {
  const { user } = useUser();
  const userId = user?.id; // IMPORTANT FIX

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchItems() {
      try {
        const data = await getItems(userId);
        setItems(data);
      } catch (err) {
        console.error("Error loading items:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [userId]);

  async function createItem(name, quantity = 1) {
    if (!userId) return;

    const newItem = await addItem(name, quantity, userId);
    setItems((prev) => [...prev, newItem]);
  }

  async function togglePurchased(item) {
    await updateItem(
      item.id,
      item.name,
      item.quantity,
      item.is_purchased ? 0 : 1,
      userId // IMPORTANT FIX
    );

    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? { ...i, is_purchased: item.is_purchased ? 0 : 1 }
          : i
      )
    );
  }

  async function removeItem(id) {
    await deleteItem(id, userId); // IMPORTANT FIX
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return {
    items,
    loading,
    createItem,
    togglePurchased,
    removeItem,
  };
}
