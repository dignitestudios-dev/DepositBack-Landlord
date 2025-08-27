import { onMessage } from "firebase/messaging";
import { auth, db, messaging } from "./firebase";
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

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export async function getUserChatsWithDetails(currentRole, userId, callback) {
  if (!userId) {
    callback([]);
    return;
  }

  const chatsRef = collection(db, "chats");
  const q = query(
    chatsRef,
    where(`participants.${currentRole}`, "==", userId),
    orderBy("timestamp", "desc")
  );

  return onSnapshot(q, async (snapshot) => {
    const chatList = await Promise.all(
      snapshot.docs.map(async (chatDoc) => {
        let chatData = { id: chatDoc.id, ...chatDoc.data() };
        const participants = chatData.participants || {};

        // Example: if currentRole is tenant, otherRole = landlord
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
  console.log("🚀 ~ 83 ===> ~ tenantId:", tenantId);
  console.log("🚀 ~ 84 ====> ~ currentUserId:", currentUserId);
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
  console.log("🚀 ~ getOrCreateChat ~ docRef:", docRef);

  return docRef.id;
}

export async function sendMessage(chatId, senderId, text) {
  const messagesRef = collection(db, "chats", chatId, "messages");

  await addDoc(messagesRef, {
    senderId,
    text,
    timestamp: serverTimestamp(),
  });
}

export function listenToMessages(chatId, callback) {
  if (!chatId) return;

  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc")); // oldest → newest

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(messages);
  });
}
