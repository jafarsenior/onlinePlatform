// src/pages/Dashboard/Assistent.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Assistent = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Salom! Bugun sizga qanday yordam bera olaman? 🤖" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom after each message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Mock backend javobi (fetch bilan)
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // 🔹 Bu yerda siz haqiqiy backendga so‘rov yuborasiz:
      // const res = await fetch("http://localhost:5000/api/chat", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message: input }),
      // });
      // const data = await res.json();

      // Mock javob:
      const data = { reply: `Siz aytdingiz: "${input}" — bu juda qiziq fikr! 😊` };

      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
        setIsTyping(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Kechirasiz, server bilan bog‘lanib bo‘lmadi 😢" },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2A2A2A] text-white flex flex-col"
    >
      <h2 className="text-3xl font-bold text-[#C5A46D] mb-4 text-center">
        AI Assistant 🤖
      </h2>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto border border-[#C5A46D]/20 rounded-xl p-4 space-y-4 bg-[#1E1E1E]/50 shadow-inner">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-2xl text-sm md:text-base ${
                msg.sender === "user"
                  ? "bg-[#C5A46D] text-[#1E1E1E] rounded-br-none"
                  : "bg-[#2A2A2A] text-white border border-[#C5A46D]/30 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* Typing loader */}
        {isTyping && (
          <div className="flex items-center gap-2 text-[#C5A46D]">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-[#C5A46D] rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-[#C5A46D] rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-[#C5A46D] rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
            <span className="text-sm">AI typing...</span>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="mt-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Xabar yozing..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 rounded-xl bg-[#2A2A2A] border border-[#C5A46D]/30 text-white focus:outline-none focus:border-[#C5A46D]"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-3 bg-[#C5A46D] text-[#1E1E1E] rounded-xl font-semibold hover:bg-yellow-600 transition"
        >
          Yuborish
        </button>
      </div>
    </motion.div>
  );
};

export default Assistent;
