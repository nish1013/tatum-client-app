import React, { useState, useEffect } from "react";
import Form from "./form";
import "./style.css";

const randomSymbols = ["Ξ", "₿", "ψ", "∑", "λ", "Ω", "∇", "𝛑", "⌬", "Ξ", "₳", "⚛", "🧬"];
const randomWords = ["Decentralized", "Immutable", "Web3", "Crypto", "Ethereum", "Bitcoin", "Smart Contracts", "L1", "L2", "Web3"];

const FloatingText = () => {
  const [items, setItems] = useState<{ id: number; text: string; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const generateFloatingItems = () => {
      return Array.from({ length: 30 }).map((_, index) => ({
        id: index,
        text: Math.random() > 0.5
          ? randomSymbols[Math.floor(Math.random() * randomSymbols.length)]
          : randomWords[Math.floor(Math.random() * randomWords.length)],
        style: {
          position: "fixed",
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          fontSize: `${16 + Math.random() * 30}px`,
          transform: `rotate(${Math.random() * 360}deg)`,
          color: "rgba(0, 255, 204, 0.9)", // Bright cyan for visibility
          textShadow: "0 0 8px #00ffcc, 0 0 12px #00ffcc",
          animation: `floatText ${5 + Math.random() * 6}s linear infinite alternate`,
        },
      }));
    };

    setItems(generateFloatingItems());
  }, []);

  return (
    <>
      {items.map((item) => (
        <span key={item.id} className="floating-text" style={item.style}>
          {item.text}
        </span>
      ))}
    </>
  );
};

export function Home() {
  return (
    <div className="home relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <FloatingText />
      <div className="relative z-10">
        <Form />
      </div>
    </div>
  );
}
