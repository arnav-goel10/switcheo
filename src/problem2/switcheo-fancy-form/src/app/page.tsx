"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Repeat } from "lucide-react";
import Image from "next/image";

// Adjust to your actual data endpoints/icons:
const API_URL = "https://interview.switcheo.com/prices.json";
const ICONS_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";

export default function PurpleGlassSwap() {
  // Token & price states
  const [tokens, setTokens] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rotation, setRotation] = useState(0); // new state for rotation

  // Dropdown states
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");

  // Refs for closing dropdowns on outside click
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch token prices on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const priceMap: { [key: string]: number } = {};
        data.forEach((item: { currency: string; price: number }) => {
          priceMap[item.currency] = item.price;
        });
        setPrices(priceMap);

        const allTokens = Object.keys(priceMap);
        setTokens(allTokens);

        if (allTokens.length > 1) {
          setFromToken(allTokens[0]);
          setToToken(allTokens[1]);
        }
      });
  }, []);

  // Recalculate conversion
  useEffect(() => {
    if (
      amount &&
      fromToken &&
      toToken &&
      prices[fromToken] &&
      prices[toToken]
    ) {
      setConvertedAmount(
        (parseFloat(amount) * prices[fromToken]) / prices[toToken]
      );
    } else {
      setConvertedAmount(0);
    }
  }, [amount, fromToken, toToken, prices]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFromOpen(false);
      }
      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target as Node)
      ) {
        setIsToOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Swap tokens and update rotation state
  const handleSwap = () => {
    setIsFromOpen(false);
    setIsToOpen(false);
    const oldFrom = fromToken;
    setFromToken(toToken);
    setToToken(oldFrom);
    setRotation((prev) => prev + 180);
  };

  // Handlers for selecting tokens
  const handleSelectFrom = (token: string) => {
    setFromToken(token);
    setIsFromOpen(false);
    setFromSearch("");
  };

  const handleSelectTo = (token: string) => {
    setToToken(token);
    setIsToOpen(false);
    setToSearch("");
  };

  // Filter tokens
  const filteredFromTokens = tokens.filter((token) =>
    token.toLowerCase().includes(fromSearch.toLowerCase())
  );
  const filteredToTokens = tokens.filter((token) =>
    token.toLowerCase().includes(toSearch.toLowerCase())
  );

  return (
    <div
      className="
        relative min-h-screen flex items-center justify-center
        bg-gradient-to-br from-[#1b0125] via-[#2a003e] to-[#3c0055]
        overflow-hidden
      "
    >
      {/* Floating decorative blobs */}
      <div
        className="
          absolute -top-40 -left-40 w-[500px] h-[500px]
          bg-pink-500 rounded-full blur-3xl opacity-30
        "
      />
      <div
        className="
          absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px]
          bg-purple-500 rounded-full blur-3xl opacity-30
        "
      />

      {/* Glass Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="
          relative z-10 w-[420px] max-w-full
          bg-white/10 backdrop-blur-xl backdrop-saturate-200
          border border-white/10 rounded-3xl shadow-2xl p-8
        "
      >
        <h2 className="text-2xl text-white text-center font-semibold mb-6">
          Currency Swap
        </h2>

        {/* Swap Input */}
        <div className="space-y-2 mb-4">
          <label className="text-gray-200">Send</label>
          <div
            className="
              flex items-center bg-white/10 rounded-xl px-4 py-2
            "
          >
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="
                flex-1 bg-transparent text-white placeholder-gray-300
                outline-none text-lg
                [appearance:textfield]
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none
              "
              placeholder="0.00"
            />
            {/* FROM dropdown button */}
            <div className="relative ml-2" ref={fromDropdownRef}>
              <button
                onClick={() => {
                  setIsFromOpen((prev) => !prev);
                  setIsToOpen(false);
                }}
                className="
                  flex items-center space-x-2 bg-white/20
                  px-4 py-2 rounded-lg focus:outline-none
                  hover:bg-white/30 transition-colors
                  w-[100px]
                "
              >
                <Image
                  src={`${ICONS_URL}${fromToken}.svg`}
                  alt={fromToken}
                  width={20}
                  height={20}
                  className="shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = "/warning.svg";
                  }}
                />
                <span className="text-white text-sm max-w-[110px] truncate">
                  {fromToken || "Select"}
                </span>
              </button>

              {/* Animated FROM dropdown */}
              <AnimatePresence>
                {isFromOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.2 }}
                    style={{ backgroundColor: "rgba(129, 90, 159)" }}
                    className="
                      absolute right-0 mt-2
                      backdrop-blur-2xl      
                      backdrop-saturate-150
                      border border-white/10 rounded-xl shadow-xl
                      z-50 min-w-[180px] max-h-40 overflow-y-auto
                      custom-scrollbar p-2
                    "
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={fromSearch}
                      onChange={(e) => setFromSearch(e.target.value)}
                      className="
                        w-full p-2 mb-2 rounded bg-white/20 text-white
                        placeholder-gray-300 focus:outline-none
                        focus:bg-white/30
                      "
                    />
                    {filteredFromTokens.map((token) => (
                      <button
                        key={token}
                        onClick={() => handleSelectFrom(token)}
                        className="
                          flex items-center w-full p-2
                          rounded-lg hover:bg-white/30 transition-colors
                        "
                      >
                        <Image
                          src={`${ICONS_URL}${token}.svg`}
                          alt={token}
                          width={20}
                          height={20}
                          className="shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = "/warning.svg";
                          }}
                        />
                        <span className="ml-2 text-white text-sm max-w-[110px] truncate">
                          {token}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Swap Icon with smoother 180° spin animation */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="cursor-pointer mb-4"
          onClick={handleSwap}
        >
          <Repeat className="mx-auto text-gray-200" size={24} />
        </motion.div>

        {/* Get Output */}
        <div className="space-y-2">
          <label className="text-gray-200">Receive</label>
          <div
            className="
              flex items-center bg-white/10 rounded-xl px-4 py-2
            "
          >
            <input
              type="text"
              value={convertedAmount.toFixed(6)}
              readOnly
              className="
                flex-1 bg-transparent text-white
                outline-none text-lg
              "
            />
            {/* TO dropdown button */}
            <div className="relative ml-2" ref={toDropdownRef}>
              <button
                onClick={() => {
                  setIsToOpen((prev) => !prev);
                  setIsFromOpen(false);
                }}
                className="
                  flex items-center space-x-2 bg-white/20
                  px-4 py-2 rounded-lg focus:outline-none
                  hover:bg-white/30 transition-colors
                  w-[100px]
                "
              >
                <Image
                  src={`${ICONS_URL}${toToken}.svg`}
                  alt={toToken}
                  width={20}
                  height={20}
                  className="shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = "/warning.svg";
                  }}
                />
                <span className="text-white text-sm max-w-[110px] truncate">
                  {toToken || "Select"}
                </span>
              </button>

              {/* Animated TO dropdown */}
              <AnimatePresence>
                {isToOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.2 }}
                    style={{ backgroundColor: "rgba(129, 90, 159)" }}
                    className="
                      absolute right-0 mt-2
                      backdrop-blur-2xl
                      backdrop-saturate-150
                      border border-white/10 rounded-xl shadow-xl
                      z-50 min-w-[180px] max-h-40 overflow-y-auto
                      custom-scrollbar p-2
                    "
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={toSearch}
                      onChange={(e) => setToSearch(e.target.value)}
                      className="
                        w-full p-2 mb-2 rounded bg-white/20 text-white
                        placeholder-gray-300 focus:outline-none
                        focus:bg-white/30
                      "
                    />
                    {filteredToTokens.map((token) => (
                      <button
                        key={token}
                        onClick={() => handleSelectTo(token)}
                        className="
                          flex items-center w-full p-2
                          rounded-lg hover:bg-white/30 transition-colors
                        "
                      >
                        <Image
                          src={`${ICONS_URL}${token}.svg`}
                          alt={token}
                          width={20}
                          height={20}
                          className="shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = "/warning.svg";
                          }}
                        />
                        <span className="ml-2 text-white text-sm max-w-[110px] truncate">
                          {token}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
