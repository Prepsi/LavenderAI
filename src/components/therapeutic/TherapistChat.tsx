import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, Music } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const messageArray: Message[] = [];

const initialPrompt = `
Listen to the user with compassion and provide them reassuance and support for their feelings.
Do not use an asterisk (*) to emphasize words.
First, respond with this: "Hey there! Tell me how you're feeling today."
`;

const TherapistChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(messageArray);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initPrompt = useMutation({
    mutationFn: () => {
      return axios.post("http://localhost:3001/generate", {
        prompt: initialPrompt,
      });
    },
    onSuccess: (data) => {
      // call the next function
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: data.data.text,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    },
    onError: (error) => {
      console.error("Error:", (error as Error).message);
    },
  });

  useEffect(() => {
    initPrompt.mutate();
  }, []);

  const sendMessage = useMutation({
    mutationFn: (input: string) => {
      return axios.post("http://localhost:3001/generate", {
        prompt: input,
      });
    },
    onSuccess: (data) => {
      // call the next function
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: data.data.text,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    },
    onError: (error) => {
      console.error("Error:", (error as Error).message);
    },
  });

  const handleSend = (e) => {
    e.preventDefault();
    console.log("input", input);
    sendMessage.mutate(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage.mutate(input);
    }
  };

  return (
    <div className="therapeutic-card flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.text}
              className={
                msg.sender === "user" ? "chat-message-user" : "chat-message-ai"
              }
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="chat-message-ai">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-therapeutic-purple animate-bounce" />
                <div
                  className="w-2 h-2 rounded-full bg-therapeutic-purple animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-therapeutic-purple animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-therapeutic-purple/10 p-4">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1"
          />

          <Button
            onClick={() => handleSend}
            size="icon"
            className="shrink-0 bg-therapeutic-purple hover:bg-therapeutic-darkPurple"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapistChat;
