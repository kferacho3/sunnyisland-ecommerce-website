// src/components/ui/FormInput.tsx
import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function FormInput({ label, ...props }: FormInputProps) {
  return (
    <div className="flex flex-col mb-2">
      {label && (
        <label className="mb-1 text-xs sm:text-sm font-semibold">{label}</label>
      )}
      <input
        {...props}
        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-sm outline-none focus:border-secondary transition duration-150 dark:text-white"
      />
    </div>
  );
}
