"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Repeat } from "lucide-react";
import Image from "next/image";

const API_URL = "https://interview.switcheo.com/prices.json";
const ICONS_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";

export default function PurpleGlassSwap() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rotation, setRotation] = useState(0);

  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");

  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSwap = () => {
    setIsFromOpen(false);
    setIsToOpen(false);
    const oldFrom = fromToken;
    setFromToken(toToken);
    setToToken(oldFrom);
    setRotation((prev) => prev + 180);
  };

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

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="
          relative z-10 w-[460px] max-w-full
          bg-white/10 backdrop-blur-xl backdrop-saturate-200
          border border-white/10 rounded-3xl shadow-2xl p-8
        "
      >
        <h2 className="text-3xl text-white text-center font-semibold mb-8">
          Currency Swap
        </h2>

        {/* Swap Input */}
        <div className="space-y-3 mb-6">
          <label className="text-gray-200 text-xl">Swap</label>
          <div
            className="
              flex items-center bg-white/10 rounded-xl px-6 py-5
            "
          >
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="
                flex-1 bg-transparent text-white placeholder-gray-300
                outline-none text-2xl
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
                  flex items-center space-x-3 bg-white/20
                  pr-10 pl-3 py-3 rounded-lg focus:outline-none
                  hover:bg-white/30 transition-colors
                  w-auto
                "
              >
                <Image
                  src={`${ICONS_URL}${fromToken}.svg`}
                  alt={fromToken}
                  width={28}
                  height={28}
                  className="shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = "/warning.svg";
                  }}
                />
                <span className="text-white text-lg whitespace-nowrap">
                  {fromToken || "Select"}
                </span>
              </button>

              <AnimatePresence>
                {isFromOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.2 }}
                    style={{ backgroundColor: "rgba(129, 90, 159)" }}
                    className="
                      absolute left-0 mt-2
                      backdrop-blur-2xl
                      backdrop-saturate-150
                      border border-white/10 rounded-xl shadow-xl
                      z-50 min-w-[200px] max-h-52 overflow-y-auto
                      custom-scrollbar p-3
                    "
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={fromSearch}
                      onChange={(e) => setFromSearch(e.target.value)}
                      className="
                        w-full p-3 mb-3 rounded bg-white/20 text-white
                        placeholder-gray-300 focus:outline-none
                        focus:bg-white/30 text-lg
                      "
                    />
                    {filteredFromTokens.map((token) => (
                      <button
                        key={token}
                        onClick={() => handleSelectFrom(token)}
                        className="
                          flex items-center w-full p-3
                          rounded-lg hover:bg-white/30 transition-colors
                        "
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
          </div>
        </div>

        {/* Swap Icon */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="cursor-pointer mb-6"
          onClick={handleSwap}
        >
          <Repeat className="mx-auto text-gray-200" size={32} />
        </motion.div>

        {/* Get Output */}
        <div className="space-y-3">
          <label className="text-gray-200 text-xl">Get</label>
          <div
            className="
              flex items-center bg-white/10 rounded-xl px-6 py-5
            "
          >
            <input
              type="text"
              value={convertedAmount.toFixed(6)}
              readOnly
              className="
                flex-1 bg-transparent text-white
                outline-none text-2xl
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
                  flex items-center space-x-3 bg-white/20
                  pr-10 pl-3 py-3 rounded-lg focus:outline-none
                  hover:bg-white/30 transition-colors
                  w-auto
                "
              >
                <Image
                  src={`${ICONS_URL}${toToken}.svg`}
                  alt={toToken}
                  width={28}
                  height={28}
                  className="shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = "/warning.svg";
                  }}
                />
                <span className="text-white text-lg whitespace-nowrap">
                  {toToken || "Select"}
                </span>
              </button>

              <AnimatePresence>
                {isToOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.2 }}
                    style={{ backgroundColor: "rgba(129, 90, 159)" }}
                    className="
                      absolute left-0 mt-2
                      backdrop-blur-2xl
                      backdrop-saturate-150
                      border border-white/10 rounded-xl shadow-xl
                      z-50 min-w-[200px] max-h-52 overflow-y-auto
                      custom-scrollbar p-3
                    "
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={toSearch}
                      onChange={(e) => setToSearch(e.target.value)}
                      className="
                        w-full p-3 mb-3 rounded bg-white/20 text-white
                        placeholder-gray-300 focus:outline-none
                        focus:bg-white/30 text-lg
                      "
                    />
                    {filteredToTokens.map((token) => (
                      <button
                        key={token}
                        onClick={() => handleSelectTo(token)}
                        className="
                          flex items-center w-full p-3
                          rounded-lg hover:bg-white/30 transition-colors
                        "
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
          </div>
        </div>
      </motion.div>
    </div>
  );
}
