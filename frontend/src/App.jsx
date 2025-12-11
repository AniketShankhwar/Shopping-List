// src/App.jsx

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

export default function App() {
  return (
    <div className="p-6 max-w-xl mx-auto">

      <SignedOut>
        <div className="text-center mt-10">
          <SignInButton />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">My Shopping List</h1>
          <UserButton />
        </div>

        <ItemForm />
        <div className="mt-6">
          <ItemList />
        </div>
      </SignedIn>
    </div>
  );
}
