import { useState, useEffect } from "react";
import { fetchItems, addItem, updateItem, deleteItem } from "../services/api";

export const useItems = (userId) => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    if (!userId) {
      setItems([]);
      return;
    }
    loadItems();
  }, [userId]);

  const loadItems = async () => {
    try {
      const data = await fetchItems(userId);
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const savedItem = await addItem(newItem, userId);
      setItems((prev) => [...prev, savedItem]); // FIXED
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      await updateItem(updatedItem.id, updatedItem, userId);
      setItems((prev) =>
        prev.map((item) =>
          item.id === updatedItem.id ? { ...item, ...updatedItem } : item
        )
      );
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteItem(id, userId);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleTogglePurchase = async (id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const updated = {
      ...item,
      is_purchased: item.is_purchased === 1 ? 0 : 1,
    };

    try {
      await updateItem(id, updated, userId);
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } catch (error) {
      console.error("Error toggling:", error);
    }
  };

  return {
    items,
    editingItem,
    setEditingItem,
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleTogglePurchase,
  };
};
