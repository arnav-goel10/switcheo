"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Repeat } from "lucide-react";

interface SwapButtonProps {
  rotation: number;
  onClick: () => void;
}

const SwapButton: FC<SwapButtonProps> = ({ rotation, onClick }) => {
  return (
    <motion.div
      animate={{ rotate: rotation }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="cursor-pointer mb-1"
      onClick={onClick}
    >
      <Repeat className="mx-auto text-gray-200" size={32} />
    </motion.div>
  );
};

export default SwapButton;
