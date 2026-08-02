// src/components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center px-4 py-2 border border-secondary text-white bg-secondary hover:bg-transparent hover:text-secondary transition-colors duration-150 ${className}`}
    >
      {children}
    </button>
  );
}
