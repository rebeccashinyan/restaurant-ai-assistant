"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!userMessage.trim()) {
      return;
    }

    const currentMessage = userMessage;

    const newUserMessage: Message = {
      role: "user",
      content: currentMessage,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
        }),
      });

      const text = await response.text();

      if (!text) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content:
              "No response from the API. Check your Terminal for backend errors.",
          },
        ]);
        return;
      }

      const data = JSON.parse(text);

      if (!response.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: data.error || "Something went wrong with the API.",
          },
        ]);
        return;
      }

      const newAiMessage: Message = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content:
            "Something went wrong. Check the browser console and Terminal.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-orange-600 mb-4">
          Sakura Kitchen
        </h1>

        <p className="text-gray-700 mb-10">
          AI-powered restaurant assistant
        </p>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Ask Our AI Assistant
          </h2>

          <input
            type="text"
            placeholder="Ask about menu..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="w-full p-3 border rounded-xl mb-4"
          />

          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>

          <div className="mt-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? "bg-orange-500 text-white p-4 rounded-2xl max-w-[70%] ml-auto"
                    : "bg-orange-100 text-gray-900 p-4 rounded-2xl max-w-[70%]"
                }
              >
                {message.content}
              </div>
            ))}

            {isLoading && (
              <div className="bg-orange-100 text-gray-900 p-4 rounded-2xl max-w-[70%]">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">AI is thinking</span>

                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}