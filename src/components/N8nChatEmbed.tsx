import React, { useEffect, useRef } from "react";

export const N8N_WEBHOOK =
  "https://yajeswari.app.n8n.cloud/webhook/bc8449f4-e3fe-4664-9452-ed797d5fd604/chat";

export const N8nChatEmbed: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Load n8n stylesheet
    if (!document.getElementById("n8n-chat-style")) {
      const link = document.createElement("link");
      link.id = "n8n-chat-style";
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
      document.head.appendChild(link);
    }

    // Load and initialize n8n chat widget
    const initN8n = async () => {
      try {
        // @ts-ignore
        const module = await import(/* @vite-ignore */ "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js");
        if (module && typeof module.createChat === "function") {
          module.createChat({
            webhookUrl: N8N_WEBHOOK,
            webhookConfig: {
              method: "POST",
              headers: {},
            },
            showWelcomeScreen: true,
            defaultLanguage: "en",
            initialMessages: [
              "Namaskaram! 🙏 Welcome to RythuSeva Assistant.",
              "Ask me anything about crops, diseases, fertilizers, or mandi prices!",
            ],
            i18n: {
              en: {
                title: "RythuSeva n8n Chatbot",
                subtitle: "Powered by n8n Workflow AI",
                footer: "",
                getStarted: "Start Chatting",
                inputPlaceholder: "Ask crop or farming question...",
              },
            },
          });
        }
      } catch (err) {
        console.warn("Could not auto-mount floating @n8n/chat bundle:", err);
      }
    };

    initN8n();
  }, []);

  return null;
};
