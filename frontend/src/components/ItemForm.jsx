// src/components/ItemForm.jsx

import { useState } from "react";
import useItems from "../hooks/useItems";

export default function ItemForm() {
  const { createItem } = useItems();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    createItem(name, quantity);
    setName("");
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border p-2 rounded"
        placeholder="Enter item"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        min="1"
        className="border p-2 rounded w-20"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <button className="bg-blue-600 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}