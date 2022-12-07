import { useEffect, useState } from "react";
import { db, increment } from "../services/firebase/firebase";

const chatId = "kGlVQMD1GNNnyg5c5mFO";
//const providerId = "ONGcmIlodOkTI5eyiYpF";
const clientId = "X8GvRYM8Qiqq0fh31oRf";
const chatRef = db.collection("chats").doc(chatId);

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  console.log(messages);

  useEffect(() => {
    if (chatRef) {
      const unsubscribe = chatRef
        .collection("messages")
        .orderBy("date_time", "desc")
        .onSnapshot((query) => {
          const data = query.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });

          setMessages(data);
        });

      return unsubscribe;
    }
  }, []);

  const sendNewMessage = async () => {
    if (!newMessage) {
      return;
    }
    const messageData = {
      message_type: 1,
      sender: clientId,
      text: newMessage,
      date_time: new Date(),
    };

    const messagesRef = chatRef.collection("messages");

    await messagesRef.add(messageData);

    const counterRef = messagesRef.doc("--stats--");
    await counterRef.update({ count: increment });
    const chatContent = document.getElementById("chat-content");
    chatContent.scrollTop = chatContent.scrollHeight;
    setNewMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendNewMessage();
    }
  };

  return (
    <div className="h-5/6 w-2/6 bg-slate-300 flex flex-col box-border">
      <div
        id="chat-content"
        className="flex flex-col-reverse flex-1 bg-zinc-400 text-slate-100 p-5 overflow-auto gap-y-3 scrollbar scroll-smooth"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={` w-2/3 max-w-fit  h-max px-3 py-1 rounded-xl ${
              message.sender === clientId
                ? "rounded-br-none self-end bg-blue-500"
                : " rounded-bl-none self-start bg-zinc-500"
            }`}
          >
            <p className="break-words">{message.text}</p>
          </div>
        ))}
      </div>

      <div className=" h-10 flex">
        <input
          type="text"
          className="flex-1 border-none outline-none p-2"
          value={newMessage}
          onChange={(ev) => setNewMessage(ev.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={sendNewMessage}
          type="button"
          className="w-3/12 outline-none border-none"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
