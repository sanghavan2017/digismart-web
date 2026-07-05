"use client";
import { useState } from "react";
import LeadForm from "./LeadForm";

export default function LeadFormButton({
  productName,
  style,
  children,
}: {
  productName?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        style={{
          background: "var(--brand)", color: "#fff", border: "none", cursor: "pointer",
          fontFamily: "var(--font-sans)", fontWeight: 700,
          ...style,
        }}
      >
        {children}
      </button>
      {open && <LeadForm productName={productName} onClose={() => setOpen(false)} />}
    </>
  );
}
