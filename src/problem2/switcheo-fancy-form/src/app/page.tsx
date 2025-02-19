"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTokenData } from "@/hooks/useTokenData";
import { convertAmount } from "@/utils/convertAmount";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import CurrencyInputGroup from "@/components/ui/CurrencyInputGroup";
import SwapButton from "@/components/ui/SwapButton";
import BackgroundShapes from "@/components/ui/BackgroundShapes";
import SubmitButton from "@/components/ui/SubmitButton";
import FlashMessage from "@/components/ui/FlashMessage";
import { validateSwapInputs } from "@/utils/validateSwapInputs";

export default function CurrencySwapForm() {
  const { tokens, prices } = useTokenData();

  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");

  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tokens.length > 1) {
      if (!fromToken) setFromToken(tokens[0]);
      if (!toToken) setToToken(tokens[1]);
    }
  }, [tokens, fromToken, toToken]);

  useEffect(() => {
    if (
      amount &&
      fromToken &&
      toToken &&
      prices[fromToken] &&
      prices[toToken]
    ) {
      setConvertedAmount(
        convertAmount(parseFloat(amount), prices[fromToken], prices[toToken])
      );
    } else {
      setConvertedAmount(0);
    }
  }, [amount, fromToken, toToken, prices]);

  useOutsideClick(fromDropdownRef, () => {
    setIsFromOpen(false);
  });
  useOutsideClick(toDropdownRef, () => {
    setIsToOpen(false);
  });

  const handleSwap = () => {
    setIsFromOpen(false);
    setIsToOpen(false);
    const oldFrom = fromToken;
    setFromToken(toToken);
    setToToken(oldFrom);
    setRotation((prev) => prev + 180);
  };

  const handleSubmit = () => {
    const { valid, error: validationError } = validateSwapInputs(
      amount,
      fromToken,
      toToken
    );
    if (!valid) {
      setError(validationError || "Validation failed.");
      setSuccess("");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setAmount("");
    setError("");
    setSuccess("Swap successful!");
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b0125] via-[#2a003e] to-[#3c0055] overflow-hidden">
      <BackgroundShapes />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-[460px] max-w-full bg-white/10 backdrop-blur-xl backdrop-saturate-200 border border-white/10 rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-3xl text-white text-center font-semibold mb-8">
          Currency Swap
        </h2>

        <CurrencyInputGroup
          label="Send"
          inputValue={amount}
          onInputChange={setAmount}
          token={fromToken}
          tokens={tokens}
          isDropdownOpen={isFromOpen}
          searchValue={fromSearch}
          onDropdownToggle={() => {
            setIsFromOpen((prev) => !prev);
            setIsToOpen(false);
          }}
          onSearchChange={setFromSearch}
          onSelectToken={(token) => {
            setFromToken(token);
            setIsFromOpen(false);
            setFromSearch("");
          }}
          dropdownRef={fromDropdownRef}
        />

        <SwapButton rotation={rotation} onClick={handleSwap} />

        <CurrencyInputGroup
          label="Receive"
          inputValue={parseFloat(convertedAmount.toFixed(8)).toString()}
          token={toToken}
          tokens={tokens}
          isDropdownOpen={isToOpen}
          searchValue={toSearch}
          onDropdownToggle={() => {
            setIsToOpen((prev) => !prev);
            setIsFromOpen(false);
          }}
          onSearchChange={setToSearch}
          onSelectToken={(token) => {
            setToToken(token);
            setIsToOpen(false);
            setToSearch("");
          }}
          dropdownRef={toDropdownRef}
          readOnly={true}
        />

        <SubmitButton onClick={handleSubmit} label="Submit" />

        <FlashMessage message={error} type="error" />
        <FlashMessage message={success} type="success" />
      </motion.div>
    </div>
  );
}
