import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, Music } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hey there! Tell me how you're feeling today.",
    sender: "ai",
    timestamp: new Date(),
  },
];

const initialPrompt = `Listen to the user with compassion and provide them reassuance and support for their feelings.`;

const TherapistChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiKey = "AIzaSyBEcoVu-L4ZgaCBcaEcDdX2Q2YAzmxcD8g";

  const ssendMessage = useMutation({
    mutationFn: (input: string) => {
      return axios.post("http://localhost:3001/generate", {
        prompt: initialPrompt,
      });
    },
    onSuccess: (data) => {
      // call the next function
      setMessages((prev) => [
        ...prev,
        { id: "2", text: data.data.text, sender: "ai", timestamp: new Date() },
      ]);
    },
    onError: (error) => {
      console.error("Error:", (error as Error).message);
    },
  });

  // const sendMessage = async () => {
  //   if (!input.trim()) return;

  //   const userMessage: Message = {
  //     id: Date.now().toString(),
  //     text: input,
  //     sender: "user",
  //     timestamp: new Date(),
  //   };

  //   setMessages((prev) => [...prev, userMessage]);
  //   setInput("");
  //   setIsLoading(true);

  //   try {
  //     const response = await callGeminiAPI(input);

  //     const aiMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       text: response,
  //       sender: "ai",
  //       timestamp: new Date(),
  //     };

  //     setMessages((prev) => [...prev, aiMessage]);
  //   } catch (error) {
  //     console.error("Error calling Gemini API:", error);
  //     toast.error("Sorry, I had trouble responding. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // Call the Gemini API to generate a response
  // const callGeminiAPI = async (userInput: string): Promise<string> => {
  //   try {
  //     const response = await fetch(
  //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           contents: [
  //             {
  //               parts: [
  //                 {
  //                   text: `You are a compassionate, professional psychiatrist. Your goal is to provide supportive therapeutic responses to the user. Be empathetic, reflective, and focus on the user's emotions and experiences. Suggest healthy coping mechanisms when appropriate and occasionally recommend music therapy. Keep responses concise and conversational. The user says: ${userInput}`,
  //                 },
  //               ],
  //             },
  //           ],
  //           generationConfig: {
  //             temperature: 0.7,
  //             topK: 40,
  //             topP: 0.95,
  //             maxOutputTokens: 1024,
  //           },
  //           safetySettings: [
  //             {
  //               category: "HARM_CATEGORY_HARASSMENT",
  //               threshold: "BLOCK_MEDIUM_AND_ABOVE",
  //             },
  //             {
  //               category: "HARM_CATEGORY_HATE_SPEECH",
  //               threshold: "BLOCK_MEDIUM_AND_ABOVE",
  //             },
  //             {
  //               category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
  //               threshold: "BLOCK_MEDIUM_AND_ABOVE",
  //             },
  //             {
  //               category: "HARM_CATEGORY_DANGEROUS_CONTENT",
  //               threshold: "BLOCK_MEDIUM_AND_ABOVE",
  //             },
  //           ],
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
  //       const response = data.candidates[0].content.parts[0].text;
  //       return response;
  //     } else if (data.promptFeedback?.blockReason) {
  //       return "I'm unable to respond to that. Let's discuss something else that might help you.";
  //     } else {
  //       throw new Error("Unexpected API response structure");
  //     }
  //   } catch (error) {
  //     console.error("Error in Gemini API call:", error);
  //     return "I apologize, but I'm having trouble connecting right now. Could you please try again in a moment?";
  //   }
  // };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ssendMessage.mutate(input);
    }
  };

  return (
    <div className="therapeutic-card flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
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
            onClick={() => ssendMessage.mutate(input)}
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
