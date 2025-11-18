import { useState, useRef, useEffect, useContext } from "react";
import { IoSend } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { RiLoader3Fill } from "react-icons/ri";

import { useNavigate } from "react-router";
import { getUserChatsWithDetails, sendMessage } from "../../firebase/messages";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AppContext } from "../../context/AppContext";
import { chatTime } from "../../lib/helpers";
import { ErrorToast } from "../../components/global/Toaster";
import axios from "../../axios";

const Message = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("normal"); // "normal" or "emergency"

  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [sendingMessageLoading, setSendingMessageLoading] = useState(false);

  const fileInputRef = useRef();

  // 🔹 Fetch chats
  useEffect(() => {
    if (!userData?.uid) return;

    const unsubscribe = getUserChatsWithDetails(
      "landlord",
      userData?.uid,
      (chats) => {
        setChatList(chats);
        setLoading(false);
      }
    );

    return () => unsubscribe && unsubscribe();
  }, [userData]);

  // 🔹 Listen to messages in selected chat
  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsub();
  }, [chatId]);

  // 🔹 File Upload
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploadFileLoading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("file", file));

      const { data } = await axios.post("/chat/upload", formData);

      if (data?.success) {
        const previews = files.map((file) => ({
          file,
          type: file.type.startsWith("image/") ? "image" : "file",
        }));

        const upload = data?.data?.url;
        const uploadArray = Array.isArray(upload) ? upload : [upload];

        setAttachments((prev) => [...prev, ...previews]);
        setUploadedImages(uploadArray);
      }
    } catch (error) {
      ErrorToast(error.response?.data?.message || "Failed to upload file");
    } finally {
      setUploadFileLoading(false);
    }
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔹 Send Message
  const handleSendMessage = async () => {
    if (!chatId || (!input.trim() && uploadedImages.length === 0)) return;

    setSendingMessageLoading(true);
    try {
      await sendMessage(
        chatId,
        userData?.uid,
        uploadedImages.length > 0 ? uploadedImages : input
      );

      // optimistic reset
      setInput("");
      setAttachments([]);
      setUploadedImages([]);
    } catch (error) {
      console.log("🚀 ~ handleSendMessage ~ error:", error);
      ErrorToast("Failed to send message");
    } finally {
      setSendingMessageLoading(false);
    }
  };

  return (
    <div className="max-w-[1260px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button type="button" onClick={() => navigate("/app/dashboard")}>
          <FaArrowLeft size={16} />
        </button>
        <h1 className="text-2xl font-semibold">Messages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 mb-4 rounded-xl border text-sm"
          />

          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-gray-400 text-center py-6">
                Loading chats...
              </p>
            ) : chatList?.length > 0 ? (
              chatList.map((chat) => (
                <div
                  key={chat?.user?.uid}
                  onClick={() => {
                    setSelectedUser(chat?.user);
                    setChatId(chat?.id); // use chat.id from Firestore, not chatId if undefined
                  }}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    selectedUser?.uid === chat?.user?.uid
                      ? "bg-[#E8F0FE]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={chat?.user?.profilePicture}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 pt-2.5">
                    <h4 className="text-sm font-semibold">
                      {chat?.user?.name}
                    </h4>
                  </div>
                  <span className="text-xs text-gray-400">
                    {chat?.timestamp ? chatTime(chat.timestamp) : ""}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-6">
                No chats found
              </p>
            )}
          </div>
        </div>

        {/* Chat Window */}
        {selectedUser ? (
          <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b pb-3">
              <img
                src={selectedUser?.profilePicture}
                alt=""
                className="w-10 h-10 rounded-full object-fill"
              />
              <div>
                <h4 className="text-sm font-semibold">{selectedUser?.name}</h4>
                <p className="text-xs text-gray-500">Tenant</p>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className={`px-4 py-1 rounded-full font-semibold ${
                  activeTab === "normal"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("normal")}
              >
                Messages
              </button>
              <button
                className={`px-4 py-1 rounded-full font-semibold ${
                  activeTab === "emergency"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("emergency")}
              >
                Emergency
              </button>
            </div>
            {/* Messages */}
            <div className="py-6 space-y-6 overflow-y-auto text-sm text-gray-800 h-[500px] pr-2">
              {false ? (
                <p className="text-center text-gray-400">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="text-center text-gray-400">
                  No messages in this chat yet.
                </p>
              ) : (
                messages
                  .filter((msg) =>
                    activeTab === "emergency" ? msg.emergency : !msg.emergency
                  )
                  .map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.senderId === userData?.uid ? "items-end" : "items-start"
                  }`}
                >
                  {Array.isArray(msg.content) ? (
                    <div className="flex gap-2 flex-wrap">
                      {msg.content.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt="attachment"
                          onClick={() => window.open(url, "_blank")}
                          className="w-32 h-32 object-cover rounded-xl shadow"
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`${
                        msg?.emergency
                          ? "bg-red-600 text-white" // 🔴 emergency message
                          : msg.senderId === userData?.uid
                          ? "bg-blue-700 text-white"
                          : "bg-gray-300 text-black"
                      } px-4 py-2 rounded-xl max-w-xs`}
                    >
                      {msg.content}
                    </div>
                  )}
                  <span className="text-xs text-gray-400 mt-1">
                    {msg?.timestamp ? chatTime(msg.timestamp) : ""}
                  </span>
                </div>
              )))}
            </div>
{activeTab === 'normal' && (
<>

    {attachments.length > 0 && (
              <div className="flex flex-wrap gap-4 border-t pt-4 pb-2">
                {attachments.map((att, idx) => (
                  <div key={idx} className="relative">
                    {att.type === "image" ? (
                      <img
                        src={URL.createObjectURL(att.file)}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="bg-gray-200 px-3 py-2 rounded-lg text-xs max-w-[150px]">
                        {att.file.name}
                      </div>
                    )}
                    <button
                      onClick={() => removeAttachment(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-[2px]"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <div className="flex items-center gap-3 pt-4 border-t">
              {uploadFileLoading ? (
                <RiLoader3Fill
                  size={20}
                  className="animate-spin text-blue-600"
                />
              ) : (
                <button
                  className="bg-blue-600 text-white rounded-full p-2"
                  onClick={() => fileInputRef.current.click()}
                  disabled={sendingMessageLoading}
                >
                  <MdAttachFile size={16} />
                </button>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                disabled={uploadedImages.length > 0 || sendingMessageLoading}
                type="text"
                placeholder="Type Here..."
                className="flex-1 px-4 py-2 rounded-full border text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="text-blue-600"
                onClick={handleSendMessage}
                disabled={sendingMessageLoading}
              >
                {sendingMessageLoading ? (
                  <RiLoader3Fill size={20} className="animate-spin" />
                ) : (
                  <IoSend size={24} />
                )}
              </button>
            </div></>
) }
            {/* Preview Attachments */}
        
          </div>
        ) : (
          <div className="flex items-center justify-center col-span-2">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
