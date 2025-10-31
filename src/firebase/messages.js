import { onMessage } from "firebase/messaging";
import { db, messaging } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export function getUserChatsWithDetails(currentRole, userId, callback) {
  if (!userId) {
    callback([]);
    return () => {}; // safe unsubscribe fallback
  }

  const chatsRef = collection(db, "chats");
  const q = query(
    chatsRef,
    where(`participants.${currentRole}`, "==", userId)
    // orderBy("timestamp", "asc"
  );

  // Return unsubscribe function
  return onSnapshot(q, async (snapshot) => {
    const chatList = await Promise.all(
      snapshot.docs.map(async (chatDoc) => {
        let chatData = { id: chatDoc.id, ...chatDoc.data() };
        const participants = chatData.participants || {};

        const otherRole = currentRole === "tenant" ? "landlord" : "tenant";
        const otherUserId = participants[otherRole];

        if (otherUserId) {
          const otherUserRef = doc(db, "users", otherUserId);
          const otherUserSnap = await getDoc(otherUserRef);

          if (otherUserSnap.exists()) {
            const userDoc = otherUserSnap.data();
            const roleData = (userDoc.roles || {})[otherRole];

            if (roleData) {
              chatData.user = {
                uid: otherUserId,
                email: userDoc.email,
                id: userDoc._id,
                name: roleData.name,
                profilePicture: roleData.profilePicture,
                role: otherRole,
              };
            }
          }
        }

        return chatData;
      })
    );

    callback(chatList);
  });
}

export async function getOrCreateChat(currentUserId, tenantId) {
  const chatsRef = collection(db, "chats");

  // check if chat already exists between landlord and tenant
  const q = query(
    chatsRef,
    where(`participants.landlord`, "==", currentUserId),
    where(`participants.tenant`, "==", tenantId)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    // chat already exists
    return snapshot.docs[0].id;
  }

  // else create new chat
  const docRef = await addDoc(chatsRef, {
    participants: {
      landlord: currentUserId,
      tenant: tenantId,
    },
    timestamp: serverTimestamp(),
  });

  return docRef.id;
}

export async function sendMessage(chatId, senderId, content) {
  const messagesRef = collection(db, "chats", chatId, "messages");
 
  await addDoc(messagesRef, {
    senderId,
    content,
    timestamp: serverTimestamp(),
  });
}

export function listenToMessages(chatId, callback) {
  if (!chatId) return;

  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(messages);
  });
}

const key = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const genAI = new GoogleGenerativeAI(key);

// ✅ Create chat session globally (persistent)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: "You are a helpful assistant specialized in property management. Respond in a friendly, helpful tone.",
        },
      ],
    },
  ],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 200,
  },
});

export async function generateAIResponse(prompt) {
  try {
    console.log("Gemini Key:", key);

    // ✅ Send new message in ongoing chat
    const result = await chat.sendMessage(prompt);

    const text =
      result?.response?.text?.() ||
      result?.response?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join(" ") ||
      "Sorry, I didn’t get that 😅";

    return text;
  } catch (err) {
    console.error("AI Error:", err);
    return "Sorry, I couldn’t process that right now 😅";
  }
}

