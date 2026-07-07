"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "bot" | "user";
  text: string;
};

const INITIAL_MESSAGE: Message = {
  role: "bot",
  text: "Hola, ¿querés sacar turno? Elegí el día y te confirmo al toque.",
};

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const updatedMessages = [...messages, { role: "user" as const, text }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role === "bot" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Uy, hubo un error. Probá de nuevo en un momento." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-ink/8 bg-white shadow-elevated overflow-hidden flex flex-col">
      <div className="gradient-dark text-paper px-5 py-3.5 flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
        </span>
        <span className="font-mono text-xs tracking-wide text-paper/80">
          asistente de turnos · en línea
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 min-h-[280px] max-h-[340px] overflow-y-auto px-4 py-4 space-y-3"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-2xl px-4 py-2.5 text-sm max-w-[85%] ${
                m.role === "user"
                  ? "bg-ink text-paper rounded-br-md"
                  : "bg-sage/60 text-ink rounded-bl-md"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md px-4 py-3 bg-sage/60 text-ink">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-pulse-soft" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-pulse-soft" style={{ animationDelay: "200ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-pulse-soft" style={{ animationDelay: "400ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="border-t border-ink/5 p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribí tu mensaje…"
          className="flex-1 rounded-full border border-ink/10 bg-sage/30 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all"
        />
        <button
          type="submit"
          className="rounded-full bg-gold text-ink text-sm font-medium px-5 py-2.5 hover:bg-gold-dark hover:text-paper transition-all duration-300 disabled:opacity-50 hover:scale-[1.03] active:scale-[0.97]"
          disabled={loading}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
