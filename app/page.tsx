"use client";

import { useState } from "react";

export default function Home() {
  const [userMessage, setUserMessage] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!userMessage.trim()) {
      setAiReply("Please type a question first.");
      return;
    }

    setIsLoading(true);
    setAiReply("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const text = await response.text();

      if (!text) {
        setAiReply("No response from the API. Check your Terminal for backend errors.");
        return;
      }

      const data = JSON.parse(text);

      if (!response.ok) {
        setAiReply(data.error || "Something went wrong with the API.");
        return;
      }

      setAiReply(data.reply);
    } catch (error) {
      console.error(error);
      setAiReply("Something went wrong. Check the browser console and Terminal.");
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
            className="w-full p-3 border rounded-xl mb-4"
          />

          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>

          {aiReply && (
            <div className="mt-6 bg-orange-100 p-4 rounded-xl">
              {aiReply}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}