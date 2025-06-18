/*
The user will have conversation with chatbox (/api/chat)
Chatbox will be a simple component that displays messages and allows the user to send new messages.
The input is user data
The return  is a list of ingredients that the user will need to solve the skincare problem (NOT VISUAL) 
----this will send a POST request to /api/recommendations, which will search the convex db for products with the specified ingredients
The recommendations component will display the products that match the ingredients
The user will then be able to add the products to their cart

*/
"use client";

import { Button, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState, useRef, useEffect } from "react";

import React from "react";

const Chatbox = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `👋 How can I help you find the right skincare?`,
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ellipsis, setEllipsis] = useState(".");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setEllipsis((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 400);
    return () => clearInterval(interval);
  }, [isLoading]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          { ...messages },
          { role: "user", content: message },
        ]),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let accumulatedText = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          accumulatedText += text;
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const lastMessageIndex = updatedMessages.length - 1;
            updatedMessages[lastMessageIndex].content = accumulatedText;
            return updatedMessages;
          });
        }
      }
    } catch (error) {
      console.error("Failed to send or receive message:", error);
    } finally {
      setIsLoading(false);
      setEllipsis(".");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-72 h-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col">
      {/* <div className="text-sm font-semibold mb-2">Ask Ultai</div>
      <div className="flex-1 overflow-y-auto text-sm text-gray-700">
        <p>👋 How can I help you find the right skincare?</p>
      </div>
      <input
        type="text"
        placeholder="Type your question..."
        className="mt-2 p-2 border rounded focus:outline-none focus:ring"
      /> */}

      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        className="prose prose-lg max-w-none h-full flex flex-col"
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Stack
          direction="column"
          p={2}
          spacing={3}
          className="h-full flex-1 min-h-0"
        >
          <Stack
            direction="column"
            spacing={2}
            flexGrow={1}
            width="100%"
            className="bg-white/95 rounded-xl p-6 prose prose-lg max-w-none overflow-y-auto min-h-0"
            style={{ minHeight: 0 }}
          >
            {messages.map((message, index) => {
              const isAssistant = message.role === "assistant";
              const isLast = index === messages.length - 1;
              return (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={isAssistant ? "flex-start" : "flex-end"}
                >
                  <Box
                    bgcolor={isAssistant ? "#4ecdc4" : "#ff6b6b"}
                    color="white"
                    borderRadius={16}
                    p={3}
                  >
                    {isAssistant && isLast && isLoading ? (
                      <span>Thinking{ellipsis}</span>
                    ) : (
                      message.content
                    )}
                  </Box>
                </Box>
              );
            })}
            <div ref={messagesEndRef} />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            className="bg-white/95 rounded-b-xl p-2"
          ></Stack>
        </Stack>
      </Box>
      <div className="absolute bottom-5 w-full flex items-center flex-end gap-2 p-4 bg-white border-t border-gray-200">
        <TextField
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-[#fa8072] to-[#e9967a] hover:from-[#e9967a] hover:to-[#fa8072] text-white text-base font-semibold rounded-lg shadow transition-all duration-300 flex items-center justify-center gap-2 border border-transparent"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chatbox;
