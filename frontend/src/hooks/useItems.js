// frontend/src/hooks/useItems.js
import { useState, useEffect } from 'react';
import { fetchItems, addItem, updateItem, deleteItem } from '../services/api';

export const useItems = (userId) => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    if (!userId) {
      setItems([]);
      return;
    }
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const loadItems = async () => {
    try {
      const data = await fetchItems(userId);
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const savedItem = await addItem(newItem, userId);
      // <-- FIXED: use spread operator correctly
      setItems(prev => [...prev, savedItem]);
    } catch (error) {
      console.error('Error adding item:', error);
      // For debugging: you can also alert(error.message)
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      await updateItem(updatedItem.id, updatedItem, userId);
      setItems(prev => prev.map(item => item.id === updatedItem.id ? { ...item, ...updatedItem } : item));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteItem(id, userId);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleTogglePurchase = async (id) => {
    const itemToToggle = items.find(item => item.id === id);
    if (!itemToToggle) return;

    const updatedItem = { ...itemToToggle, is_purchased: itemToToggle.is_purchased === 1 ? 0 : 1 };

    try {
      await updateItem(id, updatedItem, userId);
      setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
    } catch (error) {
      console.error('Error toggling item:', error);
    }
  };

  return {
    items,
    editingItem,
    setEditingItem,
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleTogglePurchase
  };
};
