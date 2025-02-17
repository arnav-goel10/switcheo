"use client";

import { motion } from "framer-motion";

interface SubmitButtonProps {
  onClick: () => void;
  label?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  label = "Submit",
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="
         w-full mt-6 py-3 rounded-xl
         bg-gradient-to-r from-purple-500 to-pink-500
         text-white font-semibold shadow-lg transition-all
      "
    >
      {label}
    </motion.button>
  );
};

export default SubmitButton;
