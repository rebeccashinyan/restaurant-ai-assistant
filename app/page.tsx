"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const recommendedItems = [
  {
    name: "Sakura Bloom Latte",
    price: "$7",
    description:
      "Ceremonial-grade matcha blended with milk and topped with delicate sakura cream foam.",
  },
  {
    name: "Matcha Mille Crepe",
    price: "$9",
    description:
      "Delicate layers of crepes with rich ceremonial matcha cream.",
  },
  {
    name: "Ube Cheesecake",
    price: "$8",
    description: "Creamy ube cheesecake with a buttery graham crust.",
  },
];

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
          Sakura Bloom Matcha
        </h1>

        <p className="text-gray-700 mb-10">
          AI-powered matcha café assistant
        </p>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Ask Our AI Assistant
          </h2>

          <input
            type="text"
            placeholder="Ask about drinks, desserts, or recommendations..."
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
                  <span className="text-sm text-gray-600">
                    AI is thinking
                  </span>

                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Recommended Items
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-orange-100 rounded-2xl p-4 bg-orange-50"
                >
                  <h4 className="font-semibold text-orange-700">
                    {item.name}
                  </h4>

                  <p className="font-bold mt-1">{item.price}</p>

                  <p className="text-sm text-gray-600 mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}