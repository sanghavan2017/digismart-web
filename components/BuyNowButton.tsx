"use client";
import { useRouter } from "next/navigation";
import { useCart, type CartItem } from "./CartContext";

export default function BuyNowButton({
  product,
  style,
}: {
  product: Omit<CartItem, "qty">;
  style?: React.CSSProperties;
}) {
  const { add } = useCart();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        add(product);
        router.push("/thanh-toan");
      }}
      style={{
        background: "#F07B20",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        ...style,
      }}
    >
      Mua ngay
    </button>
  );
}
