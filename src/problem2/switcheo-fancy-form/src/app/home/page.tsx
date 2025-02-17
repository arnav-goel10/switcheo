import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { /*ChevronDown,*/ Repeat } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card, { CardContent } from "@/components/ui/Card";

const API_URL = "https://interview.switcheo.com/prices.json";
const ICONS_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";

export default function SwapForm() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const priceMap: { [key: string]: number } = {};
        data.forEach((item: { currency: string; price: number }) => {
          priceMap[item.currency] = item.price;
        });
        setPrices(priceMap);
        setTokens(Object.keys(priceMap));
        setFromToken(Object.keys(priceMap)[0]);
        setToToken(Object.keys(priceMap)[1]);
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    alert(
      `Swapped ${amount} ${fromToken} for ${convertedAmount.toFixed(
        6
      )} ${toToken}`
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <Card className="w-[400px] bg-black/30 backdrop-blur-md rounded-xl border border-gray-700 p-6 shadow-xl">
        <CardContent className="space-y-4">
          <h2 className="text-xl text-white text-center font-semibold">
            Currency Swap
          </h2>
          <div className="space-y-2">
            <label className="text-gray-400">Swap</label>
            <div className="flex items-center bg-gray-800 p-3 rounded-lg">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent text-white text-lg focus:outline-none"
                placeholder="0.00"
              />
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-transparent text-white text-lg focus:outline-none"
              >
                {tokens.map((token) => (
                  <option key={token} value={token} className="text-black">
                    {token}
                  </option>
                ))}
              </select>
              {fromToken && (
                <Image
                  src={`${ICONS_URL}${fromToken}.svg`}
                  alt={fromToken}
                  width={24}
                  height={24}
                />
              )}
            </div>
          </div>

          <motion.div whileTap={{ rotate: 180 }}>
            <Repeat className="mx-auto text-gray-400" size={24} />
          </motion.div>

          <div className="space-y-2">
            <label className="text-gray-400">Get</label>
            <div className="flex items-center bg-gray-800 p-3 rounded-lg">
              <input
                type="text"
                value={convertedAmount.toFixed(6)}
                readOnly
                className="flex-1 bg-transparent text-white text-lg focus:outline-none"
              />
              <select
                value={toToken || ""}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-transparent text-white text-lg focus:outline-none"
              >
                {tokens.map((token) => (
                  <option key={token} value={token} className="text-black">
                    {token}
                  </option>
                ))}
              </select>
              {toToken && (
                <Image
                  src={`${ICONS_URL}${toToken}.svg`}
                  alt={toToken}
                  width={24}
                  height={24}
                />
              )}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Swap
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
