import React from 'react';

function ItemList({ items, onEdit, onDelete, onTogglePurchase }) {
    // Show a friendly message when the list is empty
    if (items.length === 0) {
        return (
            <p className="text-center text-gray-500 p-4 border border-dashed border-gray-300 rounded-lg">
                Your shopping list is empty. Add an item to get started!
            </p>
        );
    }

    return (
        // Modern list with space between items
        <ul className="space-y-3">
            {items.map(item => (
                // Use is_purchased status (0 or 1 from DB) to apply conditional styling
                <li
                    key={item.id}
                    className={`
                        flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm 
                        transition duration-150 ease-in-out cursor-default
                        hover:shadow-lg hover:border-indigo-300
                    `}
                >
                    {/* Item Name and Quantity - Clickable to toggle purchase status */}
                    <span 
                        onClick={() => onTogglePurchase(item.id)} 
                        className={`
                            text-lg font-medium cursor-pointer flex-grow select-none 
                            ${item.is_purchased ? 'text-gray-400 line-through italic' : 'text-gray-800'}
                        `}
                    >
                        {item.name} 
                        <span className="text-sm text-indigo-500 font-bold ml-2">
                            (x{item.quantity})
                        </span>
                    </span>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button 
                            onClick={() => onEdit(item)}
                            // Stylish Edit button
                            className="text-sm font-medium py-1 px-3 rounded-md bg-yellow-400 text-gray-800 hover:bg-yellow-500 transition duration-150 shadow-sm"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => onDelete(item.id)}
                            // Stylish Delete button
                            className="text-sm font-medium py-1 px-3 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-150 shadow-sm"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default ItemList;