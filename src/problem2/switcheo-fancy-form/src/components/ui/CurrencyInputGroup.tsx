"use client";

import React from "react";
import TokenDropdown from "@/components/ui/TokenDropdown";

interface CurrencyInputGroupProps {
  label: string;
  inputValue: string;
  onInputChange?: (value: string) => void;
  token: string;
  tokens: string[];
  isDropdownOpen: boolean;
  searchValue: string;
  onDropdownToggle: () => void;
  onSearchChange: (value: string) => void;
  onSelectToken: (token: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  readOnly?: boolean;
}

const CurrencyInputGroup: React.FC<CurrencyInputGroupProps> = ({
  label,
  inputValue,
  onInputChange,
  token,
  tokens,
  isDropdownOpen,
  searchValue,
  onDropdownToggle,
  onSearchChange,
  onSelectToken,
  dropdownRef,
  readOnly = false,
}) => {
  return (
    <div className="space-y-3 mb-6">
      <label className="text-gray-200 text-xl">{label}</label>
      <div className="flex items-center bg-white/10 rounded-xl px-6 py-5">
        <input
          type={onInputChange ? "number" : "text"}
          value={inputValue}
          onChange={(e) => onInputChange && onInputChange(e.target.value)}
          readOnly={readOnly}
          className="flex-1 bg-transparent text-white placeholder-gray-300 outline-none text-2xl max-w-[200px] mr-2"
          placeholder="0"
        />
        <TokenDropdown
          tokens={tokens}
          selectedToken={token}
          isOpen={isDropdownOpen}
          searchValue={searchValue}
          onToggle={onDropdownToggle}
          onSearchChange={onSearchChange}
          onSelect={onSelectToken}
          dropdownRef={dropdownRef}
        />
      </div>
    </div>
  );
};

export default CurrencyInputGroup;
