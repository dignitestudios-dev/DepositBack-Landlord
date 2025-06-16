import React, { useState, useRef } from 'react';
import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';
import { IoSend } from 'react-icons/io5';
import { MdAttachFile } from 'react-icons/md';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import pdf from "../../assets/pdficon.png"
import userone from "../../assets/userone.png";
import usertwo from "../../assets/usertwo.png";
import user from "../../assets/user.png";
import { useNavigate } from 'react-router';

const users = [
  { id: 1, name: 'Mike Smith (258496)', initials: 'MS', image: userone },
  { id: 2, name: 'Darlene Steward (123456)', initials: 'DS', image: usertwo },
  { id: 3, name: 'Maria Steward (456789)', initials: 'MS', image: user },
];

const initialChats = {
  1: [
    { sender: 'them', type: 'text', text: 'Hi John, I’ve uploaded the move-in photos.', time: '09:20 AM' },
    { sender: 'me', type: 'text', text: 'Thanks Mike! Will check.', time: '09:21 AM' },
    { sender: 'them', type: 'image', file: pdf, name: 'movein1.jpg', time: '09:22 AM' },
    { sender: 'them', type: 'file', file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', name: 'lease-agreement.pdf', time: '09:23 AM' },
    { sender: 'me', type: 'text', text: 'Got it. All good!', time: '09:24 AM' },
  ],
  2: [
    { sender: 'them', type: 'text', text: 'Hey, can you confirm the lease terms?', time: '10:00 AM' },
    { sender: 'me', type: 'text', text: 'Yes, I’ll confirm today.', time: '10:01 AM' },
  ],
  3: [
    { sender: 'them', type: 'text', text: 'Upload complete. Waiting for your review.', time: '11:15 AM' },
  ],
};

const Message = () => {
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [chats, setChats] = useState(initialChats);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef();
  const navigate = useNavigate("");

  const selectedMessages = chats[selectedUserId] || [];

  const handleSendMessage = () => {
    const newMessages = [...(chats[selectedUserId] || [])];

    if (input.trim()) {
      newMessages.push({
        sender: 'me',
        type: 'text',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }

    attachments.forEach(file => {
      newMessages.push({
        file: URL.createObjectURL(file.file),
        name: file.file.name,
        type: file.type,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    });

    setChats(prev => ({ ...prev, [selectedUserId]: newMessages }));
    setInput('');
    setAttachments([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({
      file,
      type: file.type.startsWith('image/') ? 'image' : 'file',
    }));
    setAttachments(prev => [...prev, ...previews]);
  };

  const removeAttachment = (index) => {
    const updated = [...attachments];
    updated.splice(index, 1);
    setAttachments(updated);
  };

  return (
    <div className="bg-[#F6FAFF] min-h-screen">
      <Header />

      <div className="max-w-[1260px] mx-auto px-6 py-10">
        <div className='flex items-center gap-2 mb-6'>
          <button type="button" onClick={() => navigate("/app/dashboard")} >
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
              {users.map(user => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedUserId === user.id ? 'bg-[#E8F0FE]' : 'hover:bg-gray-100'}`}
                >
                  <div className={`w-10 h-10 rounded-full ${user.color}`}>
                    <img src={user.image} alt="" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{user.name}</h4>
                    <p className="text-xs text-gray-600">
                      {chats[user.id]?.[chats[user.id].length - 1]?.text?.slice(0, 25) || 'No messages yet'}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {chats[user.id]?.[chats[user.id].length - 1]?.time || ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center gap-3 border-b pb-3">
              <div className="w-10 h-10 rounded-full">
                <img src={users.find(u => u.id === selectedUserId).image} alt="" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">{users.find(u => u.id === selectedUserId).name}</h4>
                <p className="text-xs text-gray-500">Tenant</p>
              </div>
            </div>

            {/* Messages */}
            <div className="py-6 space-y-6 overflow-y-auto text-sm text-gray-800 h-[500px] pr-2">
              <div className="text-center text-xs text-gray-400">Today</div>

              {selectedMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                  {msg.type === 'text' ? (
                    <div className="bg-blue-700 text-white px-4 py-2 rounded-xl max-w-xs">{msg.text}</div>
                  ) : msg.type === 'image' ? (
                    <img src={msg.file} alt="attachment" className="w-10 rounded-xl shadow" />
                  ) : (
                    <a href={msg.file} download={msg.name} className="bg-gray-200 px-4 py-2 rounded-xl text-blue-700 underline">
                      {msg.name}
                    </a>
                  )}
                  <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Preview Attachments */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-4 border-t pt-4 pb-2">
                {attachments.map((att, idx) => (
                  <div key={idx} className="relative">
                    {att.type === 'image' ? (
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
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="text-blue-600" onClick={handleSendMessage}>
                <IoSend size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Message;
