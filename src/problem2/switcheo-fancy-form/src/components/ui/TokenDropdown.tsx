"use client";

import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ICONS_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";

interface TokenDropdownProps {
  tokens: string[];
  selectedToken: string;
  isOpen: boolean;
  searchValue: string;
  onToggle: () => void;
  onSearchChange: (value: string) => void;
  onSelect: (token: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

const TokenDropdown: FC<TokenDropdownProps> = ({
  tokens,
  selectedToken,
  isOpen,
  searchValue,
  onToggle,
  onSearchChange,
  onSelect,
  dropdownRef,
}) => {
  const filteredTokens = tokens.filter((token) =>
    token.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 bg-white/20 pr-5 pl-5 py-3 rounded-lg focus:outline-none hover:bg-white/30 transition-colors w-auto justify-center"
      >
        <Image
          src={`${ICONS_URL}${selectedToken}.svg`}
          alt={selectedToken}
          width={28}
          height={28}
          className="shrink-0"
          onError={(e) => {
            e.currentTarget.src = "/warning.svg";
          }}
        />
        <span className="text-white text-lg whitespace-nowrap">
          {selectedToken || "Select"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            style={{ backgroundColor: "rgba(129, 90, 159)" }}
            className="absolute left-0 mt-2 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 rounded-xl shadow-xl z-50 min-w-[200px] max-h-52 overflow-y-auto custom-scrollbar p-3"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full p-3 mb-3 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:bg-white/30 text-lg"
            />
            {filteredTokens.map((token) => (
              <button
                key={token}
                onClick={() => onSelect(token)}
                className="flex items-center w-full p-3 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Image
                  src={`${ICONS_URL}${token}.svg`}
                  alt={token}
                  width={28}
                  height={28}
                  className="shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = "/warning.svg";
                  }}
                />
                <span className="ml-3 text-white text-lg whitespace-nowrap">
                  {token}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TokenDropdown;
