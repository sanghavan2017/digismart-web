"use client";
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const QUICK_REPLIES = [
  "Sản phẩm diệt côn trùng",
  "Máy sấy tóc & gia dụng",
  "Phụ kiện điện thoại",
  "Chính sách bảo hành",
  "Cách đặt hàng",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Xin chào! Mình là trợ lý Digismart 👋 Bạn cần tư vấn sản phẩm gì hôm nay?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
 const recognitionRef = useRef<unknown>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send(text?: string) {
    const content = text || input;
    if (!content.trim() || loading) return;
    const userMsg: Message = { role: "user", content };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại." }]);
    }
    setLoading(false);
  }

  function startVoice() {
    const SpeechRecognition = (window as Window & { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition }).SpeechRecognition || (window as Window & { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;
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

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {open && (
        <div style={{ position: "absolute", bottom: 68, right: 0, width: 320, background: "#fff", borderRadius: 16, border: "1px solid var(--border)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ background: "var(--brand)", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🤖</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff", margin: 0 }}>Digismart AI</p>
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", margin: 0 }}>Tư vấn sản phẩm 24/7</p>
            </div>
            <div style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%" }} />
          </div>

          {/* Messages */}
          <div style={{ padding: 12, height: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ maxWidth: "85%", padding: "8px 12px", borderRadius: 12, fontSize: "0.8rem", lineHeight: 1.5, alignSelf: m.role === "user" ? "flex-end" : "flex-start", background: m.role === "user" ? "var(--brand)" : "var(--bg)", color: m.role === "user" ? "#fff" : "var(--text)", borderBottomRightRadius: m.role === "user" ? 4 : 12, borderBottomLeftRadius: m.role === "assistant" ? 4 : 12 }}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", background: "var(--bg)", padding: "8px 12px", borderRadius: 12, borderBottomLeftRadius: 4, fontSize: "0.8rem", color: "var(--muted)" }}>
                Đang nhập...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div style={{ padding: "6px 10px", display: "flex", flexWrap: "wrap", gap: 6, borderTop: "1px solid var(--border)" }}>
              {QUICK_REPLIES.map(q => (
                <button key={q} onClick={() => send(q)}
                  style={{ fontSize: "0.72rem", padding: "4px 10px", borderRadius: 20, border: "1px solid var(--brand)", background: "var(--brand-light)", color: "var(--brand)", cursor: "pointer", fontFamily: "inherit" }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: 10, borderTop: "1px solid var(--border)", display: "flex", gap: 6, alignItems: "center" }}>
            <button onClick={startVoice}
              style={{ background: listening ? "var(--accent)" : "var(--bg)", border: "1px solid var(--border)", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}
              title="Nhấn để nói">
              {listening ? "🔴" : "🎤"}
            </button>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder={listening ? "Đang nghe..." : "Nhập câu hỏi..."}
              style={{ flex: 1, border: "1px solid var(--border)", borderRadius: 20, padding: "7px 12px", fontSize: "0.8rem", fontFamily: "inherit", outline: "none" }} />
            <button onClick={() => send()} disabled={loading}
              style={{ background: "var(--brand)", color: "#fff", border: "none", padding: "7px 14px", borderRadius: 20, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
              Gửi
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button onClick={() => setOpen(!open)}
        style={{ width: 54, height: 54, background: "var(--brand)", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", boxShadow: "0 4px 16px rgba(26,77,58,0.4)", position: "relative" }}>
        {open ? "✕" : "💬"}
        {!open && (
          <span style={{ position: "absolute", top: -4, right: -4, background: "var(--accent)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>AI</span>
        )}
      </button>
    </div>
  );
}