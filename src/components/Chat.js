import { useEffect, useRef, useState } from "react";
import { api } from "../services/api";

export function Chat({ ticketId, onLeaveChat }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollbarRef = useRef();

  const getTicketById = (ticketId) => {
    api.get(`tickets/${ticketId}`).then((response) => {
      if (response.status === 200) {
        const ticket = response.data;
        setMessages((prevState) => {
          if (prevState.length < ticket.messages.length) {
            scrollbarRef.current.scrollTo(0, scrollbarRef.current.scrollHeight);
          }
          return ticket.messages;
        });
      }
    });
  };

  useEffect(() => {
    if (ticketId) {
      getTicketById(ticketId);
      const intervalId = setInterval(() => getTicketById(ticketId), 5000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [ticketId]);

  const sendNewMessage = async () => {
    if (!newMessage) {
      return;
    }
    const messageData = {
      content: newMessage,
    };

    const response = await api.post(
      `/tickets/${ticketId}/messages`,
      messageData
    );

    if (response.status === 200) {
      getTicketById(ticketId);
      setNewMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendNewMessage();
    }
  };

  return (
    <div className="h-screen 5/6 w-[600px] bg-slate-300 flex flex-col box-border">
      <div className="p-2 flex justify-between">
        <h1 className="text-lg font-bold">Ticket {ticketId}</h1>
        <button
          onClick={onLeaveChat}
          className=" bg-red-500  text-white py-1 px-2 hover:bg-red-700"
        >
          Sair da conversa
        </button>
      </div>
      <div
        ref={scrollbarRef}
        className="overflow-y-auto scrollbar scroll-smooth bg-zinc-400 flex-1"
      >
        <div
          id="chat-content"
          className="flex flex-col justify-end flex-1  text-slate-100 p-5 gap-y-3   "
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
