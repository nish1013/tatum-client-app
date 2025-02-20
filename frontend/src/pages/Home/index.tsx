import React, { useState, useEffect } from "react";
import Form from "./form";
import "./style.css";

const randomSymbols = ["Ξ", "₿", "ψ", "∑", "λ", "Ω", "∇", "𝛑", "⌬", "Ξ", "₳", "⚛", "🧬"];

const FloatingText = () => {
  const [items, setItems] = useState<{ id: number; text: string; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const generateFloatingItems = () => {
      return Array.from({ length: 30 }).map((_, index) => ({
        id: index,
        text: randomSymbols[Math.floor(Math.random() * randomSymbols.length)],
        style: {
          position: "fixed",
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          fontSize: `${16 + Math.random() * 30}px`,
          transform: `rotate(${Math.random() * 360}deg)`,
          color: "rgba(0, 255, 204, 0.9)",
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
  const currentYear = new Date().getFullYear();
  return (
    <div className="home relative min-h-screen flex items-center justify-center overflow-hidden">
      <header className="absolute top-0 right-0 p-4">
        <nav>
          <a href="/" className="text-cyan-400 hover:underline">Home</a>
          <a href="https://github.com/nish1013/tatum-client-app" target="_blank" className="text-cyan-400 hover:underline ml-4">Code</a>
          <a href="https://satharasinghe.com/" target="_blank" className="text-cyan-400 hover:underline ml-4">Contact</a>
        </nav>
      </header>
      <FloatingText />
      <div className="relative z-10">
        <Form />
      </div>
      <footer className="absolute bottom-0 w-full text-center py-2 bg-gray-900 text-cyan-400 text-sm">
        &copy; {currentYear} satharasinghe.com All rights reserved.
      </footer>
    </div>
  );
}
