"use client";

import { motion, AnimatePresence } from "framer-motion";

interface FlashMessageProps {
  message: string;
  type: "error" | "success";
}

export default function FlashMessage({ message, type }: FlashMessageProps) {
  const colorClass = type === "error" ? "text-red-500" : "text-green-500";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={{ maxHeight: 50, opacity: 1 }}
          exit={{ maxHeight: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-4 overflow-hidden"
        >
          <div className={`${colorClass} text-center`}>{message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
