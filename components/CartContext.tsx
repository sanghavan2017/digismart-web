"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  icon: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "digismart_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  // Chỉ ghi localStorage sau khi đã load xong giỏ cũ — tránh ghi đè giỏ bằng [] lúc mount
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage hỏng/bị chặn → bắt đầu với giỏ trống
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // đầy quota/bị chặn → giỏ vẫn dùng được trong phiên hiện tại
    }
  }, [items]);

  function add(item: Omit<CartItem, "qty">) {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function remove(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function setQty(id: string, qty: number) {
    if (qty <= 0) return remove(id);
    setItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)));
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải dùng bên trong <CartProvider>");
  return ctx;
}
