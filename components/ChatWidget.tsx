"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "bot" | "user";
  text: string;
};

const INITIAL_MESSAGE: Message = {
  role: "bot",
  text: "¡Hola! Soy el asistente virtual de Estudio Dental Aguirre. ¿En qué puedo ayudarte? Podés consultarme por turnos, servicios, o cualquier otra cosa.",
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
    <div className="w-full max-w-sm rounded-xl2 border border-ink/10 bg-white shadow-lg overflow-hidden flex flex-col">
      <div className="bg-teal-dark text-paper px-4 py-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gold" />
        <span className="font-mono text-xs tracking-wide">
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
              className={`rounded-xl2 px-3 py-2 text-sm max-w-[85%] ${m.role === "user"
                  ? "bg-sage text-ink"
                  : "bg-paper border border-ink/10 text-ink"
                }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-xl2 px-3 py-2 text-sm bg-paper border border-ink/10 text-ash">
              escribiendo…
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="border-t border-ink/10 p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribí tu mensaje…"
          className="flex-1 rounded-full border border-ink/15 px-4 py-2 text-sm outline-none focus:border-gold"
        />
        <button
          type="submit"
          className="rounded-full bg-gold text-ink text-sm font-medium px-4 py-2 hover:bg-gold-dark hover:text-paper transition-colors disabled:opacity-50"
          disabled={loading}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
