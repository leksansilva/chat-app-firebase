import { useState } from "react";
import { Chat } from "./components/Chat";
import { TicketList } from "./components/TicketList";

function App() {
  const [currentTicketId, setCurrendTicketId] = useState(null);
  return (
    <div className="h-screen w-screen bg-slate-500 flex justify-center">
      {currentTicketId ? (
        <Chat
          ticketId={currentTicketId}
          onLeaveChat={() => {
            setCurrendTicketId(null);
          }}
        />
      ) : (
        <TicketList onSelectTicket={setCurrendTicketId} />
      )}
    </div>
  );
}

export default App;
