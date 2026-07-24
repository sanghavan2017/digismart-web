"use client";
import { useState, useRef, useEffect } from "react";
import { products } from "@/data/products";

type Message = { role: "user" | "assistant"; content: string; leadForm?: boolean };

const QUICK_MENU = [
  "So sánh các dòng máy lọc nước",
  "Tư vấn điều hòa phù hợp",
  "Xem bảng giá",
  "Chính sách bảo hành",
];

const WELCOME_SUGGESTIONS = [
  "Gia đình 4 người nên dùng máy lọc nước nào",
  "Điều hòa cho phòng 15m2 giá bao nhiêu",
  "Chi phí lắp đặt",
];

const WELCOME_MESSAGE =
  "Dạ chào anh/chị! Mình là trợ lý AI của DigiSmart. Mình tư vấn điều hòa, máy lọc nước Cleansui & Kitz — so sánh, gợi ý theo nhu cầu, anh/chị cứ hỏi tự nhiên nhé.";

const productIndex = new Map(products.map(p => [p.id, p]));

function escapeHtml(t: string) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Dọn markdown (bảng, heading, bold) phòng AI không tuân thủ đúng system prompt
function sanitizeMarkdown(text: string) {
  text = text.replace(/^#{1,6}\s*/gm, "");
  text = text.replace(/\*\*(.*?)\*\*/g, "$1");
  text = text.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "$1");
  text = text
    .split("\n")
    .map(line => {
      const t = line.trim();
      if (/^\|?[\s:|-]+\|[\s:|-]*$/.test(t) && t.includes("-")) return null;
      if (t.startsWith("|") && t.endsWith("|")) {
        const cells = t.split("|").map(c => c.trim()).filter(c => c.length);
        return "- " + cells.join(" — ");
      }
      return line;
    })
    .filter((l): l is string => l !== null)
    .join("\n");
  return text;
}

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

// Tách tag {{LEAD_FORM}} (tín hiệu từ AI: nên mời khách để lại liên hệ) ra khỏi nội dung hiển thị
function stripLeadFormTag(text: string): { text: string; hasLeadForm: boolean } {
  const hasLeadForm = /\{\{LEAD_FORM\}\}/.test(text);
  return { text: text.replace(/\{\{LEAD_FORM\}\}/g, "").trimEnd(), hasLeadForm };
}

// Lấy tên sản phẩm {{CARD:id}} nhắc tới gần nhất trong 1 câu trả lời, để gắn kèm khi gửi lead
function extractLastProductName(text: string): string | undefined {
  const matches = [...text.matchAll(/\{\{CARD:([^}]+)\}\}/g)];
  if (matches.length === 0) return undefined;
  const lastId = matches[matches.length - 1][1].trim();
  return productIndex.get(lastId)?.name;
}

// Số điện thoại di động Việt Nam: 0 hoặc +84, đầu số 3/5/7/8/9, đủ 10 số (0xxxxxxxxx)
function isValidVnPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(0|\+84)(3|5|7|8|9)\d{8}$/.test(cleaned);
}

// Thay {{CARD:id}} bằng card ảnh + giá thật từ data/products.ts
function renderReplyHtml(text: string) {
  const clean = sanitizeMarkdown(text);
  const escaped = escapeHtml(clean);
  const withBreaks = escaped.replace(/\n/g, "<br>");
  return withBreaks.replace(/\{\{CARD:([^}]+)\}\}/g, (_match, id) => {
    const p = productIndex.get(id.trim());
    if (!p) return "";
    const imgHtml = p.imageUrl
      ? `<img src="${p.imageUrl}" alt="${escapeHtml(p.name)}" style="width:100%;height:100%;object-fit:contain" />`
      : `<span style="font-size:26px">${p.icon}</span>`;
    return `<div class="dgs-pc">
      <div class="dgs-pc-img">${imgHtml}</div>
      <div class="dgs-pc-info">
        <div class="dgs-pc-name">${escapeHtml(p.name)}</div>
        <div class="dgs-pc-price">${formatPrice(p.price)}</div>
      </div>
    </div>`;
  });
}

// Form thu thập tên + SĐT ngay trong chat, hiện khi AI phát tín hiệu {{LEAD_FORM}} — gửi thẳng
// vào /api/lead có sẵn (dùng chung hạ tầng lead/email của website, không tạo route mới).
function ChatLeadCapture({
  productName,
  onSubmitted,
}: {
  productName?: string;
  onSubmitted: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  async function handleSubmit() {
    if (!name.trim()) {
      setError("Anh/chị nhập giúp họ tên nhé.");
      return;
    }
    if (!isValidVnPhone(phone)) {
      setError("Số điện thoại chưa đúng định dạng, anh/chị kiểm tra lại giúp mình.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          note: "Yêu cầu tư vấn từ Chatbot",
          productName,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError("Có lỗi xảy ra, anh/chị thử lại hoặc gọi hotline 0778 886 758 giúp mình.");
        setSubmitting(false);
        return;
      }
      onSubmitted();
    } catch {
      setError("Có lỗi xảy ra, anh/chị thử lại hoặc gọi hotline 0778 886 758 giúp mình.");
      setSubmitting(false);
    }
  }

  return (
    <div className="dgs-lead">
      <input
        className="dgs-lead-input"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Họ tên"
        disabled={submitting}
      />
      <input
        className="dgs-lead-input"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Số điện thoại"
        inputMode="tel"
        disabled={submitting}
      />
      {error && <div className="dgs-lead-error">{error}</div>}
      <div className="dgs-lead-actions">
        <button className="dgs-lead-submit" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Đang gửi..." : "Gửi, để CSKH gọi lại"}
        </button>
        <button className="dgs-lead-dismiss" onClick={() => setDismissed(true)} disabled={submitting}>
          Để sau
        </button>
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [lastProductName, setLastProductName] = useState<string | undefined>(undefined);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<unknown>(null);
  const userToggled = useRef(false);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (userToggled.current) return;
      setOpen(true);
      setWelcomed(true);
      setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  function speak(html: string) {
    if (!voiceOn || typeof window === "undefined" || !window.speechSynthesis) return;
    const plain = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!plain) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(plain);
    utter.lang = "vi-VN";
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.startsWith("vi"));
    if (viVoice) utter.voice = viVoice;
    window.speechSynthesis.speak(utter);
  }

  async function send(text?: string) {
    const content = text || input;
    if (!content.trim() || loading) return;
    const userMsg: Message = { role: "user", content };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      const { text: reply, hasLeadForm } = stripLeadFormTag(data.reply || "");
      const productName = extractLastProductName(reply);
      if (productName) setLastProductName(productName);
      setMessages(prev => [...prev, { role: "assistant", content: reply, leadForm: hasLeadForm }]);
      speak(renderReplyHtml(reply));
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline 0778 886 758." }]);
    }
    setLoading(false);
  }

  function handleLeadSubmitted() {
    setLeadSubmitted(true);
    setMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: "Dạ DigiSmart đã nhận được thông tin, sẽ gọi lại anh/chị sớm nhất. Cần gấp thì gọi ngay 0778 886 758 nhé.",
      },
    ]);
  }

  function startVoice() {
    const SpeechRecognition =
      (window as Window & { SpeechRecognition?: typeof window.SpeechRecognition }).SpeechRecognition ||
      (window as Window & { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt không hỗ trợ voice. Vui lòng dùng Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  }

  function handleOpen() {
    userToggled.current = true;
    const next = !open;
    setOpen(next);
    if (next && !welcomed) {
      setWelcomed(true);
      setTimeout(() => {
        setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
      }, 300);
    }
  }

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000, fontFamily: "var(--font-sans)" }}>
      <style>{`
        .dgs-pc { display:flex; gap:10px; align-items:center; background:var(--brand-light); border:1px solid #cfe3f5; border-radius:14px; padding:8px; margin:8px 0; }
        .dgs-pc-img { width:48px; height:48px; flex-shrink:0; border-radius:10px; background:#fff; display:flex; align-items:center; justify-content:center; overflow:hidden; border:1px solid #e0ecf8; }
        .dgs-pc-info { flex:1; min-width:0; }
        .dgs-pc-name { font-size:12px; font-weight:700; color:var(--brand); line-height:1.3; }
        .dgs-pc-price { font-size:13px; font-weight:800; color:#F07B20; margin-top:2px; }
        .dgs-lead { display:flex; flex-direction:column; gap:6px; background:var(--brand-light); border:1px solid #cfe3f5; border-radius:14px; padding:10px; margin-top:6px; width:100%; }
        .dgs-lead-input { border:1px solid var(--border); border-radius:10px; padding:6px 10px; font-size:0.78rem; font-family:inherit; outline:none; }
        .dgs-lead-actions { display:flex; gap:6px; }
        .dgs-lead-submit { flex:1; background:var(--brand); color:#fff; border:none; border-radius:20px; padding:6px 10px; font-size:0.75rem; font-weight:600; cursor:pointer; font-family:inherit; }
        .dgs-lead-dismiss { background:#fff; border:1px solid var(--border); color:var(--muted); border-radius:20px; padding:6px 10px; font-size:0.75rem; cursor:pointer; font-family:inherit; }
        .dgs-lead-error { color:#c0392b; font-size:0.7rem; }
      `}</style>
      {open && (
        <div style={{ position: "absolute", bottom: 68, right: 0, width: 340, background: "#fff", borderRadius: 16, border: "1px solid var(--border)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-dark, #042C53))", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>💧</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff", margin: 0 }}>DigiSmart — Tư vấn AI</p>
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", margin: 0 }}>Sẵn sàng hỗ trợ</p>
            </div>
            <button onClick={() => setVoiceOn(v => !v)} title="Đọc to câu trả lời"
              style={{ background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", borderRadius: 8, padding: "4px 8px", fontSize: "0.85rem" }}>
              {voiceOn ? "🔊" : "🔇"}
            </button>
          </div>

          {/* Quick menu */}
          <div style={{ background: "var(--brand-light)", padding: "8px 10px", display: "flex", gap: 6, flexWrap: "wrap", borderBottom: "1px solid #dce8f8" }}>
            {QUICK_MENU.map(q => (
              <button key={q} onClick={() => send(q)}
                style={{ background: "#fff", border: "1.5px solid var(--brand)", color: "var(--brand)", borderRadius: 20, padding: "3px 10px", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ padding: 12, height: 280, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {messages.length === 0 && (
              <div style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.78rem", marginTop: 20 }}>
                Bắt đầu trò chuyện với trợ lý DigiSmart
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%" }}>
                <div style={{ padding: "8px 12px", borderRadius: 12, fontSize: "0.8rem", lineHeight: 1.5, background: m.role === "user" ? "var(--brand)" : "var(--bg)", color: m.role === "user" ? "#fff" : "var(--text)", borderBottomRightRadius: m.role === "user" ? 4 : 12, borderBottomLeftRadius: m.role === "assistant" ? 4 : 12 }}>
                  {m.role === "assistant" ? (
                    <span dangerouslySetInnerHTML={{ __html: renderReplyHtml(m.content) }} />
                  ) : (
                    m.content
                  )}
                </div>
                {m.role === "assistant" && m.leadForm && !leadSubmitted && i === messages.length - 1 && (
                  <ChatLeadCapture productName={lastProductName} onSubmitted={handleLeadSubmitted} />
                )}
              </div>
            ))}
            {messages.length === 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {WELCOME_SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    style={{ background: "var(--brand-light)", border: "1px solid #b8d4ef", color: "var(--brand)", borderRadius: 14, padding: "5px 12px", fontSize: "0.72rem", fontFamily: "inherit", cursor: "pointer" }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            {loading && (
              <div style={{ alignSelf: "flex-start", background: "var(--bg)", padding: "8px 12px", borderRadius: 12, borderBottomLeftRadius: 4, fontSize: "0.8rem", color: "var(--muted)" }}>
                Đang nhập...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 10, borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <button onClick={startVoice}
                style={{ background: listening ? "var(--accent)" : "var(--bg)", border: "1px solid var(--border)", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}
                title="Nhấn để nói">
                {listening ? "🔴" : "🎤"}
              </button>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
                placeholder={listening ? "Đang nghe..." : "Hỏi bất cứ điều gì về sản phẩm..."}
                style={{ flex: 1, border: "1px solid var(--border)", borderRadius: 20, padding: "7px 12px", fontSize: "0.8rem", fontFamily: "inherit", outline: "none" }} />
              <button onClick={() => send()} disabled={loading}
                style={{ background: "var(--brand)", color: "#fff", border: "none", padding: "7px 14px", borderRadius: 20, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
                Gửi
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "var(--muted)" }}>
              <span>DigiSmart Assistant</span>
              <a href="tel:0778886758" style={{ color: "var(--brand)", fontWeight: 600, textDecoration: "none" }}>📞 0778 886 758</a>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button onClick={handleOpen}
        style={{ width: 54, height: 54, background: "var(--brand)", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", boxShadow: "0 4px 16px rgba(26,77,58,0.4)", position: "relative", color: "#fff" }}>
        {open ? "✕" : "💬"}
        {!open && (
          <span style={{ position: "absolute", top: -4, right: -4, background: "var(--accent)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>AI</span>
        )}
      </button>
    </div>
  );
}
