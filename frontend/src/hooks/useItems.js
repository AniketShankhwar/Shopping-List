import { useState, useEffect } from "react";
// FIX: Changed 'fetchItems' to 'getItems' in the import statement
import { getItems, addItem, updateItem, deleteItem } from "../services/api"; 

export const useItems = (userId) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Initial load
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadItems = async () => {
      setLoading(true);
      setError(null);
      try {
        // FIX: Changed 'fetchItems' to 'getItems' in the function call
        const data = await getItems(userId); 
        setItems(data);
      } catch (e) {
        setError("Failed to load items.");
        console.error("Fetch items error:", e);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [userId]);

  const handleAddItem = async (name, quantity) => {
    try {
      const newItem = { name, quantity, user_id: userId };
      const addedItem = await addItem(newItem);
      setItems((prev) => [...prev, addedItem]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleUpdateItem = async (id, name, quantity) => {
    try {
      const updatedData = { name, quantity, user_id: userId };
      await updateItem(id, updatedData); 
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, ...updatedData } : i))
      );
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleTogglePurchase = async (id, is_purchased) => {
    const updated = {
      is_purchased: is_purchased ? 0 : 1,
    };

    try {
      await updateItem(id, updated); 
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, is_purchased: updated.is_purchased } : i)));
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
    loading,
    error,
  };
};