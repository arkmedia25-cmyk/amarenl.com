"use client";

import { useState, useEffect, useCallback } from "react";
import { ShoppingCart, X, MapPin } from "lucide-react";

const PURCHASES = [
  { action: "heeft de Happy Juice Pack besteld", product: "Happy Juice Pack" },
  { action: "is begonnen met MentaBiotics", product: "MentaBiotics" },
  { action: "heeft HL5 collageen besteld", product: "HL5" },
  { action: "gebruikt nu de Triangle of Wellness", product: "Triangle of Wellness" },
  { action: "heeft Energy+ ontdekt", product: "Energy+" },
  { action: "is gestart met Sleep+", product: "Sleep+" },
  { action: "heeft de Gut-Brain Gids gedownload", product: null },
];

const CITIES = [
  "Amsterdam", "Rotterdam", "Utrecht", "Den Haag", "Eindhoven",
  "Groningen", "Tilburg", "Almere", "Breda", "Nijmegen",
  "Arnhem", "Haarlem", "Enschede", "Zaanstad", "Amersfoort",
  "Apeldoorn", "Den Bosch", "Hoofddorp", "Maastricht", "Leiden",
  "Dordrecht", "Zoetermeer", "Zwolle", "Deventer", "Delft",
];

const TIME_AGO = [
  "Zojuist", "2 minuten geleden", "5 minuten geleden",
  "8 minuten geleden", "12 minuten geleden", "15 minuten geleden",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<{
    city: string;
    action: string;
    time: string;
  } | null>(null);

  const showToast = useCallback(() => {
    const purchase = randomItem(PURCHASES);
    setCurrent({
      city: randomItem(CITIES),
      action: purchase.action,
      time: randomItem(TIME_AGO),
    });
    setVisible(true);

    // Auto-hide after 6 seconds
    setTimeout(() => setVisible(false), 6000);
  }, []);

  useEffect(() => {
    // First toast after 15 seconds
    const initial = setTimeout(showToast, 15000);

    // Then every 30-60 seconds
    const interval = setInterval(() => {
      const delay = 30000 + Math.random() * 30000; // 30-60s
      setTimeout(showToast, delay);
    }, 60000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [showToast]);

  if (!visible || !current) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 animate-slide-up max-w-sm">
      <div className="bg-white rounded-xl shadow-xl border border-[var(--color-border)] p-4 flex items-start gap-3">
        {/* Icon */}
        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
          <ShoppingCart size={18} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[var(--color-text)] leading-snug">
            <span className="font-semibold">Iemand uit {current.city}</span>{" "}
            {current.action}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={10} className="text-gray-400" />
            <span className="text-[10px] text-gray-400">{current.time}</span>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="text-gray-300 hover:text-gray-500 shrink-0"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
