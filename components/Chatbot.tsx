"use client";
import { useState, useRef, useEffect } from "react";
import { products } from "@/data/products";

type Message = { role: "user" | "assistant"; content: string };

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

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      speak(renderReplyHtml(data.reply));
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline 0778 886 758." }]);
    }
    setLoading(false);
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
              <div key={i} style={{ maxWidth: "88%", padding: "8px 12px", borderRadius: 12, fontSize: "0.8rem", lineHeight: 1.5, alignSelf: m.role === "user" ? "flex-end" : "flex-start", background: m.role === "user" ? "var(--brand)" : "var(--bg)", color: m.role === "user" ? "#fff" : "var(--text)", borderBottomRightRadius: m.role === "user" ? 4 : 12, borderBottomLeftRadius: m.role === "assistant" ? 4 : 12 }}>
                {m.role === "assistant" ? (
                  <span dangerouslySetInnerHTML={{ __html: renderReplyHtml(m.content) }} />
                ) : (
                  m.content
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
        style={{ width: 54, height: 54, background: "var(--brand)", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", boxShadow: "0 4px 16px rgba(26,77,58,0.4)", position: "relative" }}>
        {open ? "✕" : "💬"}
        {!open && (
          <span style={{ position: "absolute", top: -4, right: -4, background: "var(--accent)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>AI</span>
        )}
      </button>
    </div>
  );
}
