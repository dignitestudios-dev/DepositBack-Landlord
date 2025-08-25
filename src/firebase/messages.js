import { onMessage } from "firebase/messaging";
import { auth, db, messaging } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export async function getUserChatsWithDetails(currentRole, userId, callback) {
  console.log("🚀 ~ 21 ~ uid:", userId);

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
  console.log("🚀 ~ getUserChatsWithDetails ~ q:", q);

  return onSnapshot(q, async (snapshot) => {
    const chatList = await Promise.all(
      snapshot.docs.map(async (chatDoc) => {
        console.log(chatDoc, "chatDoc");

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

    console.log("🚀 ~ getUserChatsWithDetails ~ 72 chatList:", chatList);

    callback(chatList);
  });
}
