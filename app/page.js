"use client";
import { useState } from "react";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMessage = { role: "assistant", content: data.reply };

    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-purple-600 to-blue-600 p-4 text-white">
      <h1 className="text-4xl font-bold text-center mb-4">FastChat AI</h1>

      <div className="flex-1 bg-white/20 backdrop-blur-md rounded-lg p-4 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[75%] ${
              msg.role === "user"
                ? "bg-green-400 ml-auto text-black"
                : "bg-white/70 text-black"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-xl text-black outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}

