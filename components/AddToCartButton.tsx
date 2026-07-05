"use client";
import { useState } from "react";
import { useCart, type CartItem } from "./CartContext";

export default function AddToCartButton({
  product,
  style,
}: {
  product: Omit<CartItem, "qty">;
  style?: React.CSSProperties;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        add(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      style={{
        background: added ? "#EAF6EE" : "#fff",
        color: added ? "#1E7B3C" : "var(--brand)",
        border: `1.5px solid ${added ? "#1E7B3C" : "var(--brand)"}`,
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        transition: "all 0.15s",
        ...style,
      }}
    >
      {added ? "✓ Đã thêm vào giỏ" : "🛒 Thêm vào giỏ"}
    </button>
  );
}
