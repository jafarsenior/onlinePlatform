import React, { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";

const Assistent = () => {
  const { darkMode } = useContext(ThemeContext);
  const [messages, setMessages] = useState(() => {
    // Chat tarixini localStorage dan olish
    const saved = localStorage.getItem("assistantMessages");
    return saved
      ? JSON.parse(saved)
      : [{ sender: "ai", text: "Salom! Bugun sizga qanday yordam bera olaman? 🤖" }];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Rang sxemalari
  const bgMain = darkMode
    ? "from-[#1E1E1E] to-[#2A2A2A]"
    : "from-white to-gray-100";
  const textMain = darkMode ? "text-white" : "text-gray-800";
  const aiBubble = darkMode
    ? "bg-[#2A2A2A] text-white border border-[#C5A46D]/30 rounded-bl-none"
    : "bg-gray-100 text-gray-900 border border-yellow-500/20 rounded-bl-none";
  const userBubble = darkMode
    ? "bg-[#C5A46D] text-[#1E1E1E] rounded-br-none"
    : "bg-yellow-500 text-white rounded-br-none";
  const borderColor = darkMode ? "border-[#C5A46D]/20" : "border-gray-300";

  // Scroll to bottom after each message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Chatni localStorage da saqlash
  useEffect(() => {
    localStorage.setItem("assistantMessages", JSON.stringify(messages));
  }, [messages]);

  // Xabar yuborish
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // 🔹 Hozircha mock javob (backend o‘rniga)
      // Agar backend bo‘lsa, shu yerda fetch ishlatiladi
      const data = {
        reply: `Siz aytdingiz: "${input}" — bu juda qiziq fikr! 😊`,
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
        setIsTyping(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Kechirasiz, server bilan bog‘lanib bo‘lmadi 😢",
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    // Enter - yuborish, Shift + Enter - yangi qator
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center gap-2 text-[#C5A46D] mt-2">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 bg-[#C5A46D] rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></span>
        ))}
      </div>
      <span className="text-sm opacity-80">AI yozmoqda...</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 min-h-screen bg-gradient-to-b ${bgMain} ${textMain} flex flex-col`}
    >
      {/* Title */}
      <h2 className="text-3xl font-bold text-[#C5A46D] mb-4 text-center">
        AI Assistant 🤖
      </h2>

      {/* Chat oynasi */}
      <div
        className={`flex-1 overflow-y-auto rounded-xl p-4 space-y-4 shadow-inner border ${borderColor}`}
      >
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
                msg.sender === "user" ? userBubble : aiBubble
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input qismi */}
      <div className="mt-4 flex items-center gap-3">
        <textarea
          placeholder="Xabar yozing..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className={`flex-1 p-3 rounded-xl resize-none border focus:outline-none ${
            darkMode
              ? "bg-[#2A2A2A] text-white border-[#C5A46D]/30 focus:border-[#C5A46D]"
              : "bg-white text-gray-800 border-gray-300 focus:border-yellow-500"
          }`}
        />
        <button
          onClick={sendMessage}
          className={`px-5 py-3 rounded-xl font-semibold transition ${
            darkMode
              ? "bg-[#C5A46D] text-[#1E1E1E] hover:bg-yellow-600"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          Yuborish
        </button>
      </div>
    </motion.div>
  );
};

export default Assistent;
