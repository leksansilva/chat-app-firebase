import { useEffect, useState } from "react";
import { api } from "../services/api";

export function TicketList({ onSelectTicket }) {
  const [tickets, setTickets] = useState([]);

  const getTickets = () => {
    api.get("/tickets").then((response) => {
      if (response.status === 200) {
        const tickets = response.data;

        setTickets(tickets);
      }
    });
  };

  const handleCreateTicket = () => {
    api.post("/tickets").then((response) => {
      if (response.status === 200) {
        const ticket = response.data;
        onSelectTicket(ticket.id);
      }
    });
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div className="w-96 p-2">
      {tickets.map((ticket) => (
        <div
          className="px-2 py-5 my-5 border-black border flex justify-between"
          key={ticket.id}
        >
          <h1 className="font-bold font-lg">Ticket {ticket.id}</h1>
          <button
            onClick={() => onSelectTicket(ticket.id)}
            className=" bg-blue-500  text-white py-1 px-2 hover:bg-blue-700"
          >
            Entrar na conversa
          </button>
        </div>
      ))}
      <div className="px-2 py-5 my-5 border-black border flex justify-between">
        <h1 className="font-bold font-lg">Novo ticket</h1>
        <button
          onClick={handleCreateTicket}
          className=" bg-green-500  text-white py-1 px-2 hover:bg-green-700"
        >
          Iniciar nova conversa
        </button>
      </div>
    </div>
  );
}
