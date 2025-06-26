"use client";

import { Button, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState, useRef, useEffect } from "react";
import React from "react";

const Chatbox = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `👋 Ready to build your perfect skincare routine?\nLet's start with your main skin concerns...`,
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ellipsis, setEllipsis] = useState(".");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  type Routine = {
    cleanser?: string;
    toner?: string;
    serum?: string;
    moisturizer?: string;
    sunscreen?: string;
  };

  const [routine, setRoutine] = useState<Routine | null>(null);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setEllipsis((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 400);
    return () => clearInterval(interval);
  }, [isLoading]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const newMessages = [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ];
    setMessages(newMessages);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("Response data:", data);
      const { aiResponse } = data;

      // Update assistant message with the response
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].content = aiResponse;
        console.log("Updated is: ", updated);
        return updated;
      });

      // Pass routine to parent component
      if (routine) {
        console.log("Routine passed from chat agent!:", routine);

        setRoutine(routine);
      }
    } catch (error) {
      console.error("Failed to send or receive message:", error);
    } finally {
      setIsLoading(false);
      setEllipsis(".");
    }
  };

  return (
    <div className="w-full h-[600px] bg-white/90 border border-sage-200 rounded-lg shadow-lg flex flex-col backdrop-blur-sm">
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        className="prose prose-lg max-w-none h-full flex flex-col"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(51, 75, 53, 0.1)",
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
            className="bg-gradient-to-br from-white/95 to-green-50/90 rounded-xl p-6 prose prose-lg max-w-none overflow-y-auto min-h-0"
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
                    bgcolor={isAssistant ? "#84c288" : "#D2B48C"}
                    color="white"
                    borderRadius={16}
                    p={3}
                    sx={{ whiteSpace: "pre-wrap" }}
                  >
                    {isAssistant && isLast && isLoading ? (
                      <span>Thinking{ellipsis}</span>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
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
          />
        </Stack>
      </Box>

      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-green-50/80 to-white/90 border-t border-green-200/50 mt-auto">
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
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6b8e6b",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6b8e6b",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#6b8e6b",
            },
          }}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          disabled={isLoading}
          className="px-4 py-2 text-white text-base font-semibold rounded-lg shadow transition-all duration-300 flex items-center justify-center gap-2 border border-transparent"
          sx={{
            backgroundColor: "#6b8e6b",
            "&:hover": {
              backgroundColor: "#5a7a5a",
            },
            "&:disabled": {
              backgroundColor: "#a0a0a0",
            },
          }}
        >
          Send
        </Button>
      </div>
      {routine && (
        <Box
          mt={2}
          p={2}
          bgcolor="#f7fafc"
          borderRadius={2}
          boxShadow={1}
          className="prose prose-lg max-w-none"
        >
          <h3>Your Personalized Skincare Routine</h3>
          <ul>
            <li>
              <strong>Cleanser:</strong> {routine.cleanser}
            </li>
            <li>
              <strong>Toner:</strong> {routine.toner}
            </li>
            <li>
              <strong>Serum:</strong> {routine.serum}
            </li>
            <li>
              <strong>Moisturizer:</strong> {routine.moisturizer}
            </li>
            <li>
              <strong>Sunscreen:</strong> {routine.sunscreen}
            </li>
          </ul>
        </Box>
      )}
    </div>
  );
};

export default Chatbox;
