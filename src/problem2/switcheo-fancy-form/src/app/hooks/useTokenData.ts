import { useState, useEffect } from "react";

const API_URL = "https://interview.switcheo.com/prices.json";

export const useTokenData = () => {
  const [tokens, setTokens] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

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
      });
  }, []);

  return { tokens, prices };
};
