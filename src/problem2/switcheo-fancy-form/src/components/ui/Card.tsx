import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-gray-800 p-6 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
