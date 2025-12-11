import React from "react";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import { useItems } from "./hooks/useItems";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  const {
    items,
    editingItem,
    setEditingItem,
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleTogglePurchase,
  } = useItems();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
          🛒 My Shopping List
        </h1>

        {/* Show user profile only when logged in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* If NOT logged in → show login & signup */}
      <SignedOut>
        <div className="text-center py-10">
          <p className="text-lg font-semibold mb-6">
            Please sign in to continue
          </p>

          <div className="flex justify-center gap-4">

            {/* Login Button */}
            <SignInButton mode="modal">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
                Login
              </button>
            </SignInButton>

            {/* Sign Up Button */}
            <SignUpButton mode="modal">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
                Sign Up
              </button>
            </SignUpButton>

          </div>
        </div>
      </SignedOut>

      {/* If logged in → show full shopping list app */}
      <SignedIn>
        <ItemForm
          onSubmit={editingItem ? handleUpdateItem : handleAddItem}
          initialData={editingItem}
        />

        <ItemList
          items={items}
          onEdit={setEditingItem}
          onDelete={handleDeleteItem}
          onTogglePurchase={handleTogglePurchase}
        />
      </SignedIn>
    </div>
  );
}

export default App;
