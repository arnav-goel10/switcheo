import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
