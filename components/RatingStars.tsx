"use client";

// Hiển thị số sao (readOnly) hoặc cho chọn sao (dùng trong ReviewForm) — FR-012/FR-014.
export default function RatingStars({
  value,
  onChange,
  size = 18,
  readOnly = true,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
}) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }} aria-label={`${value} trên 5 sao`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          onClick={readOnly ? undefined : () => onChange?.(i)}
          style={{
            fontSize: size,
            lineHeight: 1,
            color: i <= Math.round(value) ? "#F07B20" : "var(--border)",
            cursor: readOnly ? "default" : "pointer",
          }}
          role={readOnly ? undefined : "button"}
          aria-label={readOnly ? undefined : `${i} sao`}
        >
          ★
        </span>
      ))}
    </span>
  );
}
