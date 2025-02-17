"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Repeat } from "lucide-react";
import Image from "next/image";

// URLs for fetching token prices and icons.
const API_URL = "https://interview.switcheo.com/prices.json";
const ICONS_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";

export default function DarkBrightGlassSwap() {
  // Token and price states.
  const [tokens, setTokens] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Dropdown state and search inputs.
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");

  // Refs for closing dropdowns on outside click.
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch token prices on mount.
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

  // Update conversion result.
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

  // Close dropdowns on outside click.
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Swap tokens.
  const handleSwap = () => {
    setIsFromOpen(false);
    setIsToOpen(false);
    const oldFrom = fromToken;
    setFromToken(toToken);
    setToToken(oldFrom);
  };

  // Handlers for selecting tokens.
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

  // Filter token list for dropdowns.
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
        bg-gradient-to-br from-[#1f1f1f] via-[#2a2a2a] to-[#242424]
        overflow-hidden
      "
    >
      {/* Floating decorative blobs */}
      <div
        className="
          absolute -top-32 -left-32 w-[400px] h-[400px]
          bg-[#3a3a3a] rounded-full blur-3xl opacity-50
        "
      />
      <div
        className="
          absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px]
          bg-[#3a3a3a] rounded-full blur-3xl opacity-50
        "
      />

      {/* Glass container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="
          relative z-10 w-[400px] max-w-full
          bg-gray-800/40 backdrop-blur-lg backdrop-saturate-150
          border border-gray-700/50 rounded-2xl shadow-xl p-6
        "
      >
        <h2 className="text-2xl text-white text-center font-semibold mb-6">
          Currency Swap
        </h2>

        {/* Swap Input Section */}
        <div className="space-y-2 mb-4">
          <label className="text-gray-300">Swap</label>
          <div
            className="
              flex items-center bg-gray-800/40 rounded-xl px-4 py-2
            "
          >
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="
                flex-1 bg-transparent text-white placeholder-gray-400
                outline-none text-lg
              "
              placeholder="0.00"
            />
            {/* From Token Dropdown Button */}
            <div className="relative ml-2" ref={fromDropdownRef}>
              <button
                onClick={() => {
                  setIsFromOpen((prev) => !prev);
                  setIsToOpen(false);
                }}
                className="
                  flex items-center space-x-2 bg-gray-800/40
                  px-3 py-2 rounded-lg focus:outline-none
                  hover:bg-gray-800/60 transition-colors
                "
              >
                {fromToken && (
                  <Image
                    src={`${ICONS_URL}${fromToken}.svg`}
                    alt={fromToken}
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                )}
                <span className="text-white text-sm max-w-[150px] truncate">
                  {fromToken || "Select"}
                </span>
              </button>
              <AnimatePresence>
                {isFromOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="
                      absolute right-0 mt-2
                      bg-gray-800/40 backdrop-blur-lg backdrop-saturate-150
                      border border-gray-700/50 rounded-xl shadow-lg
                      z-50 min-w-[150px] max-h-40 overflow-y-auto
                      custom-scrollbar p-2
                    "
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={fromSearch}
                      onChange={(e) => setFromSearch(e.target.value)}
                      className="
                        w-full p-2 mb-2 rounded bg-gray-800/40 text-white
                        placeholder-gray-400 focus:outline-none
                        focus:bg-gray-800/60
                      "
                    />
                    {filteredFromTokens.map((token) => (
                      <button
                        key={token}
                        onClick={() => handleSelectFrom(token)}
                        className="
                          flex items-center w-full p-2
                          rounded-lg hover:bg-gray-800/60 transition-colors
                        "
                      >
                        <Image
                          src={`${ICONS_URL}${token}.svg`}
                          alt={token}
                          width={20}
                          height={20}
                          className="shrink-0"
                        />
                        <span className="ml-2 text-white text-sm">{token}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Swap Icon */}
        <motion.div
          whileTap={{ rotate: 180 }}
          className="cursor-pointer mb-4"
          onClick={handleSwap}
        >
          <Repeat className="mx-auto text-gray-300" size={24} />
        </motion.div>

        {/* Get Output Section */}
        <div className="space-y-2">
          <label className="text-gray-300">Get</label>
          <div
            className="
              flex items-center bg-gray-800/40 rounded-xl px-4 py-2
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
            {/* To Token Dropdown Button */}
            <div className="relative ml-2" ref={toDropdownRef}>
              <button
                onClick={() => {
                  setIsToOpen((prev) => !prev);
                  setIsFromOpen(false);
                }}
                className="
                  flex items-center space-x-2 bg-gray-800/40
                  px-3 py-2 rounded-lg focus:outline-none
                  hover:bg-gray-800/60 transition-colors
                "
              >
                {toToken && (
                  <Image
                    src={`${ICONS_URL}${toToken}.svg`}
                    alt={toToken}
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                )}
                <span className="text-white text-sm max-w-[150px] truncate">
                  {toToken || "Select"}
                </span>
              </button>
              <AnimatePresence>
                {isToOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="
                      absolute right-0 mt-2
                      bg-gray-800/40 backdrop-blur-lg backdrop-saturate-150
                      border border-gray-700/50 rounded-xl shadow-lg
                      z-50 min-w-[150px] max-h-40 overflow-y-auto
                      custom-scrollbar p-2
                    "
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={toSearch}
                      onChange={(e) => setToSearch(e.target.value)}
                      className="
                        w-full p-2 mb-2 rounded bg-gray-800/40 text-white
                        placeholder-gray-400 focus:outline-none
                        focus:bg-gray-800/60
                      "
                    />
                    {filteredToTokens.map((token) => (
                      <button
                        key={token}
                        onClick={() => handleSelectTo(token)}
                        className="
                          flex items-center w-full p-2
                          rounded-lg hover:bg-gray-800/60 transition-colors
                        "
                      >
                        <Image
                          src={`${ICONS_URL}${token}.svg`}
                          alt={token}
                          width={20}
                          height={20}
                          className="shrink-0"
                        />
                        <span className="ml-2 text-white text-sm">{token}</span>
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
