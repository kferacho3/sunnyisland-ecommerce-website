// src/components/EventSearchForm.tsx
"use client";
import { useState } from "react";

export default function EventSearchForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category }),
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Event name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </label>
        <label>
          Category:
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">-- Select Category --</option>
            <option value="103">Music</option>
            <option value="101">Business</option>
            {/* etc. */}
          </select>
        </label>
        <button type="submit">Search</button>
      </form>

      {results && (
        <pre>{JSON.stringify(results, null, 2)}</pre>
      )}
    </div>
  );
}
