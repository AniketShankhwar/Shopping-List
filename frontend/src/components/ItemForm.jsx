// frontend/src/components/ItemForm.jsx
import React, { useState, useEffect } from 'react';

function ItemForm({ onSubmit, initialData }) {
    const [item, setItem] = useState(initialData || { name: '', quantity: 1, is_purchased: 0 });

    useEffect(() => {
        setItem(initialData || { name: '', quantity: 1, is_purchased: 0 });
    }, [initialData]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'quantity' ? parseInt(value) : value;
        setItem(prev => ({ ...prev, [name]: updatedValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!item.name.trim()) return;
        onSubmit(item);
        if (!initialData) {
            setItem({ name: '', quantity: 1, is_purchased: 0 });
        }
    };

    const isEditing = !!initialData;
    const buttonText = isEditing ? 'Update Item' : 'Add Item';
    const buttonClass = isEditing
        ? 'bg-yellow-500 hover:bg-yellow-600'
        : 'bg-indigo-600 hover:bg-indigo-700';

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-8 p-4 bg-gray-100 rounded-lg shadow-inner">
            <input
                type="text"
                name="name"
                placeholder="Item name (e.g. Apples)"
                value={item.name}
                onChange={handleChange}
                required
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <input
                type="number"
                name="quantity"
                min="1"
                value={item.quantity}
                onChange={handleChange}
                className="w-20 p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <button
                type="submit"
                className={`text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out shadow-md hover:shadow-lg ${buttonClass}`}
            >
                {buttonText}
            </button>
        </form>
    );
}

export default ItemForm;
