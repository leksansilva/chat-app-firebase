import axios from "axios";
import { useState } from "react";

export function Chat({ ticketId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendNewMessage = async () => {
    if (!newMessage) {
      return;
    }
    const messageData = {
      content: newMessage,
    };

    const result = await axios.post(
      `http://localhost:8080/api/tickets/${ticketId}/messages`,
      messageData
    );

    if (result.status === 200) {
      const ticket = result.data;
      setMessages(ticket.messages);
    }
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
              message.senderType === 0
                ? "rounded-br-none self-end bg-blue-500"
                : " rounded-bl-none self-start bg-zinc-500"
            }`}
          >
            <p className="break-words">{message.content}</p>
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
