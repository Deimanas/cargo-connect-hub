import { useState } from "react";
import { mockMessages } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, User, Search } from "lucide-react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(mockMessages[0]);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: "1", from: "them", text: selectedChat.lastMessage, time: selectedChat.time },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now().toString(), from: "me", text: message, time: "Dabar" }]);
    setMessage("");
  };

  return (
    <div className="space-y-4 animate-fade-in h-[calc(100vh-8rem)]">
      <div>
        <h1 className="text-2xl font-bold">Žinutės</h1>
        <p className="text-muted-foreground text-sm mt-1">Susirašinėjimas su vežėjais ir užsakovais</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100%-4rem)]">
        {/* Chat list */}
        <Card className="md:col-span-1 flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Ieškoti pokalbių..." className="pl-9 h-9" />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 border-b cursor-pointer transition-colors hover:bg-muted/50 ${selectedChat.id === msg.id ? "bg-muted" : ""}`}
                onClick={() => {
                  setSelectedChat(msg);
                  setChatMessages([{ id: "1", from: "them", text: msg.lastMessage, time: msg.time }]);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm truncate">{msg.from}</p>
                      <span className="text-[11px] text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{msg.company}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.lastMessage}</p>
                  </div>
                  {msg.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">
                      {msg.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat area */}
        <Card className="md:col-span-2 flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">{selectedChat.from}</p>
              <p className="text-xs text-muted-foreground">{selectedChat.company}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-3 py-2 rounded-xl text-sm ${
                  msg.from === "me"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted rounded-bl-sm"
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Rašyti žinutę..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} className="bg-accent text-accent-foreground hover:bg-accent/90" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
