import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thanks for your message. We'll look into it!", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-green-50">
      <Navbar />

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-md px-4 py-3 rounded-xl text-sm shadow-md ${
              msg.sender === "user"
                ? "bg-green-200 text-right self-end ml-auto"
                : "bg-white text-left self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="border-t p-4 bg-white flex items-center gap-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
