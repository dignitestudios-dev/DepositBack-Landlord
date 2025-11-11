import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import chatai from "../../assets/chatai.png";
import chataiicon from "../../assets/chataiicon.png";
import user from "../../assets/user.png";
import { generateAIResponse } from "../../firebase/messages";

const Chatai = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false); // 👈 new state
  const messagesEndRef = useRef(null); // 👈 for auto-scroll

  const toggleChat = () => setIsOpen(!isOpen);

  
  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = `${hours > 12 ? hours - 12 : hours}:${minutes
      .toString()
      .padStart(2, "0")}${hours >= 12 ? "pm" : "am"}`;

    const userMsg = { from: "user", text: newMessage, time };
    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");

    // 🧠 Show typing animation
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(
        `You are a helpful property assistant. User said: "${newMessage}"`
      );

      const botMsg = { from: "bot", text: aiResponse, time };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, I couldn’t process that right now 😅",
          time,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 text-white px-4 py-2 rounded-full z-50"
      >
        <img src={chatai} className="h-16 w-auto" alt="" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-[7em] w-[30em] max-w-full bg-white rounded-2xl shadow-lg border z-50">
          <div className="bg-[#003897] text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={chataiicon} className="h-10 w-auto" alt="" />
              <div className="leading-tight">
                <p className="font-semibold">I’m DB AI! 👋</p>
                <span className="text-sm text-gray-200">
                  How can I help you?
                </span>
              </div>
            </div>
            <button onClick={toggleChat} className="text-white">
              <AiOutlineClose size={20} />
            </button>
          </div>

          <div className="p-4 space-y-3 max-h-80 overflow-y-auto bg-[#F7F9FB]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.from === "bot" ? (
                  <div className="bg-white p-3 rounded-xl shadow text-sm max-w-[80%]">
                    {msg.text.split("\n").map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                    <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                  </div>
                ) : (
                  <div className="">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#0151DA] text-white px-4 py-2 rounded-xl text-sm max-w-[80%]">
                        {msg.text}
                      </div>
                      <img
                        src={user}
                        alt="User"
                        className="h-8 w-auto  rounded-full object-cover"
                      />
                    </div>

                    <p className="text-xs text-gray-600 mt-1 text-right">
                      {msg.time}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-xl shadow text-sm max-w-[60%] flex items-center gap-2">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  
                </div>
              </div>
            )}
            <div ref={messagesEndRef} ></div>
          </div>

          <div className="border-t px-4 py-3 flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type here..."
              className="w-full text-sm border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="text-white bg-[#0151DA] p-2 rounded-full"
            >
              <IoMdSend size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatai;
