// src/components/ItemList.jsx

import useItems from "../hooks/useItems";

export default function ItemList() {
  const { items, loading, togglePurchased, removeItem } = useItems();

  if (loading) return <p>Loading...</p>;

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="border p-3 rounded flex justify-between items-center"
        >
          <span
            className={
              item.is_purchased ? "line-through text-gray-400" : ""
            }
          >
            {item.name} (x{item.quantity})
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => togglePurchased(item)}
              className="px-2 bg-green-600 text-white rounded"
            >
              ✓
            </button>

            <button
              onClick={() => removeItem(item.id)}
              className="px-2 bg-red-600 text-white rounded"
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}