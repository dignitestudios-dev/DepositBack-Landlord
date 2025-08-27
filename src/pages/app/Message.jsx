import React, { useState, useRef, useEffect, useContext } from "react";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import { IoSend } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import pdf from "../../assets/pdficon.png";
import userone from "../../assets/userone.png";
import usertwo from "../../assets/usertwo.png";
import user from "../../assets/user.png";
import { useLocation, useNavigate } from "react-router";
import { useFetchData } from "../../hooks/api/Get";
import {
  getOrCreateChat,
  getUserChatsWithDetails,
  listenToMessages,
  sendMessage,
} from "../../firebase/messages";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AppContext } from "../../context/AppContext";
import { chatTime } from "../../lib/helpers";

const Message = () => {
  const { userData } = useContext(AppContext);

  const location = useLocation();
  const tenantUid = location?.state?.tenantId;

  const [selectedUser, setSelectedUser] = useState("");

  const [chats, setChats] = useState({});

  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [chatList, setChatList] = useState([]);
  console.log("🚀 ~ Message ~ chatList:", chatList);
  const [selectedMessages, setSelectedMessages] = useState([]);
  console.log("🚀 ~ Message ~ selectedMessages:", selectedMessages);

  const [chatId, setChatId] = useState("");

  const fileInputRef = useRef();
  const navigate = useNavigate("");

  const handleSendMessage = () => {
    sendMessage(chatId, userData?.uid, input);

    const newMessages = [...(chats[selectedUser.uid] || [])];

    if (input.trim()) {
      newMessages.push({
        sender: "me",
        type: "text",
        text: input,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }

    attachments.forEach((file) => {
      newMessages.push({
        file: URL.createObjectURL(file.file),
        name: file.file.name,
        type: file.type,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    });

    setChats((prev) => ({ ...prev, [selectedUser.uid]: newMessages }));
    setInput("");
    setAttachments([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      type: file.type.startsWith("image/") ? "image" : "file",
    }));
    setAttachments((prev) => [...prev, ...previews]);
  };

  const removeAttachment = (index) => {
    const updated = [...attachments];
    updated.splice(index, 1);
    setAttachments(updated);
  };

  useEffect(() => {
    if (!userData?.uid) return;
    const unsubscribe = getUserChatsWithDetails(
      "landlord",
      userData?.uid,
      (chats) => {
        console.log("Chats:", chats);
        setChatList(chats);
      }
    );

    // return () => unsubscribe();
  }, [userData]);
  // useEffect(() => {
  //   if (!selectedUser?.uid) return;

  //   const unsubscribe = listenToMessages(selectedUser?.uid, (msgs) => {
  //     console.log("Messages for chat:", msgs);
  //     // setMessages(msgs);
  //   });
  //   console.log("🚀 ~ Message ~ unsubscribe:", unsubscribe);

  //   return () => unsubscribe(); // cleanup when chatId changes
  // }, [selectedUser]);

  // useEffect(() => {
  //   getOrCreateChat("0RZOn1pB1PdYqWiWSf5WuhrsbmR2", tenantUid);
  //   getUserChatsWithDetails(
  //     "landlord",
  //     "0RZOn1pB1PdYqWiWSf5WuhrsbmR2",
  //     setChatList
  //   );
  // }, []);

  // useEffect(() => {
  //   if (!userData?.uid) return;

  //   // listen for chats where current user is a participant
  //   const q = query(
  //     collection(db, "chats"),
  //     where("participants." + "landlord", "==", userData?.uid) // OR tenant, adjust for your logic
  //     // you may need to use OR queries if user can be landlord OR tenant
  //   );

  //   const unsub = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     const sorted = data.sort(
  //       (a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
  //     );
  //     console.log("🚀 ~ Message ~ sorted:", sorted);
  //     setChatList(sorted);
  //     // setLoadingChats(false);
  //   });

  //   return () => unsub();
  // }, [userData]);

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setSelectedMessages(msgs);
      // setMessages(msgs);
      // setLoading(false);
    });

    return () => unsub();
  }, [chatId]);

  const messagesRef = collection(db, "chats");

  onSnapshot(messagesRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
    });
  });

  return (
    <div className="max-w-[1260px] mx-auto px-6 py-10">
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
            {chatList?.map((user) => (
              <div
                key={user?.user?.id}
                onClick={() => {
                  setSelectedUser(user?.user);
                  setChatId(user?.chatId);
                }}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  selectedUser.uid === user?.user?.uid
                    ? "bg-[#E8F0FE]"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className={`w-10 h-10 rounded-full ${user.color}`}>
                  <img
                    src={user?.user?.profilePicture}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="flex-1 pt-2.5">
                  <h4 className="text-sm font-semibold">{user?.user?.name}</h4>
                  {/* <p className="text-xs text-gray-600">
                    {chats[user.id]?.[chats[user.id].length - 1]?.text?.slice(
                      0,
                      25
                    ) || "No messages yet"}
                  </p> */}
                </div>
                <span className="text-xs text-gray-400">
                  {user?.timestamp ? chatTime(user.timestamp) : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        {selectedUser ? (
          <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            {/* Header */}

            <div className="flex items-center gap-3 border-b pb-3">
              <div className="w-10 h-10 rounded-full">
                <img
                  src={selectedUser?.profilePicture}
                  alt=""
                  className="w-10 h-10 rounded-full object-fill"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold">{selectedUser?.name}</h4>
                <p className="text-xs text-gray-500">Tenant</p>
              </div>
            </div>

            <div className="py-6 space-y-6 overflow-y-auto text-sm text-gray-800 h-[500px] pr-2">
              <div className="text-center text-xs text-gray-400">Today</div>

              {selectedMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.senderId === userData?.uid ? "items-end" : "items-start"
                  }`}
                >
                  <div className="bg-blue-700 text-white px-4 py-2 rounded-xl max-w-xs">
                    {msg.text}
                  </div>
                  {/* {msg.type === "text" ? (
                    <div className="bg-blue-700 text-white px-4 py-2 rounded-xl max-w-xs">
                      {msg.text}
                    </div>
                  ) : msg.type === "image" ? (
                    <img
                      src={msg.file}
                      alt="attachment"
                      className="w-10 rounded-xl shadow"
                    />
                  ) : (
                    <a
                      href={msg.file}
                      download={msg.name}
                      className="bg-gray-200 px-4 py-2 rounded-xl text-blue-700 underline"
                    >
                      {msg.name}
                    </a>
                  )} */}
                  <span className="text-xs text-gray-400 mt-1">
                    {msg?.timestamp ? chatTime(msg.timestamp) : ""}
                  </span>
                </div>
              ))}
            </div>

            {/* Preview Attachments */}
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
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-[2px] text-xs"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <div className="flex items-center gap-3 pt-4 border-t">
              <button
                className="bg-blue-600 text-white rounded-full p-2"
                onClick={() => fileInputRef.current.click()}
              >
                <MdAttachFile size={16} />
              </button>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                type="text"
                placeholder="Type Here..."
                className="flex-1 px-4 py-2 rounded-full border text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button className="text-blue-600" onClick={handleSendMessage}>
                <IoSend size={24} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end w-full">
            <div className=" ">No chat selected</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
