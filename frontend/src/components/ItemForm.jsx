import React, { useState, useEffect } from 'react';

function ItemForm({ onSubmit, initialData }) {
    // 1. State Initialization
    // Initialize state with initialData (for editing) or default values (for adding)
    const [item, setItem] = useState(initialData || { name: '', quantity: 1, is_purchased: 0 });

    // 2. Effect Hook to Sync State when in Edit Mode
    // This ensures the form updates when a user clicks 'Edit' on a different item.
    useEffect(() => {
        setItem(initialData || { name: '', quantity: 1, is_purchased: 0 });
    }, [initialData]);
    
    // 3. Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // The quantity input ensures value is treated as a number
        const updatedValue = name === 'quantity' ? parseInt(value) : value;
        setItem(prev => ({ ...prev, [name]: updatedValue }));
    };

    // 4. Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!item.name.trim()) return; // Prevent empty submissions
        
        onSubmit(item); // Call the appropriate handler (handleAddItem or handleUpdateItem)

        if (!initialData) { 
            // Clear form only after adding a new item, not after updating
            setItem({ name: '', quantity: 1, is_purchased: 0 });
        }
    };

    // Dynamic styling and text based on mode (Add vs. Edit)
    const isEditing = !!initialData;
    const buttonText = isEditing ? 'Update Item' : 'Add Item';
    const buttonClass = isEditing
        ? 'bg-yellow-500 hover:bg-yellow-600' // Yellow for Update
        : 'bg-indigo-600 hover:bg-indigo-700'; // Indigo for Add

    return (
        // Modern form layout with flexbox, padding, light background, and inner shadow
        <form onSubmit={handleSubmit} className="flex gap-2 mb-8 p-4 bg-gray-100 rounded-lg shadow-inner">
            <input
                type="text"
                name="name"
                placeholder="Item name (e.g., Apples)"
                value={item.name}
                onChange={handleChange}
                required
                // Tailwind classes for input: full width growth, padding, border, focus effect
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <input
                type="number"
                name="quantity"
                min="1"
                value={item.quantity}
                onChange={handleChange}
                // Tailwind classes for quantity input: fixed width, text-center
                className="w-20 p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <button
                type="submit"
                // Tailwind classes for button: dynamic color, text color, font, transition, shadow
                className={`text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out shadow-md hover:shadow-lg ${buttonClass}`}
            >
                {buttonText}
            </button>
        </form>
    );
}

export default ItemForm;