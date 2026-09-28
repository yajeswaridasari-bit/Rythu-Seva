import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  VolumeX,
  Bot,
  User,
  CheckCircle2,
  Workflow,
  ExternalLink,
  RefreshCw,
  Info,
} from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../data/translations";
import { speakText, stopSpeaking, isSpeaking } from "../utils/speech";

export const N8N_WEBHOOK_DISPLAY =
  "https://yajeswari.app.n8n.cloud/webhook/bc8449f4-e3fe-4664-9452-ed797d5fd604/chat";

interface AgriChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  textEn: string;
  textTe?: string;
  tips?: string[];
  source?: "n8n" | "ai" | "fallback";
}

export const AgriChatModal: React.FC<AgriChatModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [engine, setEngine] = useState<"n8n" | "gemini">("n8n");
  const [n8nStatus, setN8nStatus] = useState<{
    active: boolean;
    loading: boolean;
    details: string;
  }>({
    active: false,
    loading: true,
    details: "Checking webhook...",
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      textEn:
        "Namaskaram! I am your AI agricultural chatbot powered by n8n. Ask any question about crop diseases, pest remedies, fertilizer dosages, or live mandi prices!",
      textTe:
        "నమస్కారం రైతు సోదరులారా! నేను మీ n8n AI వ్యవసాయ చాట్‌బాట్‌ను. మీ పంట తెగుళ్లు, ఎరువులు లేదా వ్యవసాయ సమస్యలపై ఏదైనా ప్రశ్న అడగండి.",
      tips: [
        "Ask about specific chemical dosages per pump or per acre.",
        "Request organic alternatives like Neem oil or Jeevamrutham.",
      ],
      source: "n8n",
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check n8n webhook status
  const checkStatus = async () => {
    setN8nStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/n8n/status");
      const data = await res.json();
      setN8nStatus({
        active: !!data.active,
        loading: false,
        details: data.details || (data.active ? "Connected" : "Inactive"),
      });
    } catch {
      setN8nStatus({
        active: false,
        loading: false,
        details: "Could not reach webhook",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkStatus();
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || inputQuestion).trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      textEn: textToSend,
      textTe: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion("");
    setLoading(true);
    stopSpeaking();
    setPlayingMsgId(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: textToSend,
          language: lang,
          engine,
          sessionId: `session-${Date.now()}`,
          chatHistory: messages.map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            text: lang === "te" && m.textTe ? m.textTe : m.textEn,
          })),
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to get advice");
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "bot",
        textEn: json.data.answerEn,
        textTe: json.data.answerTe,
        tips: json.data.tips,
        source: json.source || (engine === "n8n" ? "n8n" : "ai"),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "bot",
        textEn:
          "Unable to connect to AI advisor. For emergency assistance, please dial the Kisan Call Centre at 1800-180-1551 (Toll-free).",
        textTe:
          "సలహాదారుకి అనుసంధానం కాలేకపోయింది. అత్యవసర సహాయం కొరకు కిసాన్ కాల్ సెంటర్ 1800-180-1551 నంబరుకు కాల్ చేయండి.",
        source: "fallback",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAudio = (msg: ChatMessage) => {
    if (playingMsgId === msg.id || isSpeaking()) {
      stopSpeaking();
      setPlayingMsgId(null);
    } else {
      const textToSpeak = lang === "te" && msg.textTe ? msg.textTe : msg.textEn;
      const started = speakText(
        textToSpeak,
        lang,
        () => setPlayingMsgId(null),
        () => setPlayingMsgId(null)
      );
      if (started) setPlayingMsgId(msg.id);
    }
  };

  const handleMicToggle = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = lang === "te" ? "te-IN" : "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputQuestion(transcript);
      handleSend(transcript);
    };

    recognition.start();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-2xl h-[88vh] max-h-[720px] flex flex-col border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/90 flex items-center justify-center text-emerald-200 border border-emerald-700/60 shadow-inner">
              <Workflow className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base font-serif">
                  {engine === "n8n" ? "n8n Agri Chatbot" : t.advisorModal.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700/80 text-emerald-200 uppercase tracking-wide border border-emerald-600">
                  {engine === "n8n" ? "n8n Workflow" : "Gemini AI"}
                </span>
              </div>
              <p className="text-xs text-stone-300 truncate max-w-xs sm:max-w-sm">
                Webhook: {N8N_WEBHOOK_DISPLAY.replace("https://", "")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="p-1.5 rounded-xl hover:bg-emerald-800 text-stone-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Engine Switcher & Webhook Status Ribbon */}
        <div className="px-4 py-2 bg-stone-100/90 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-stone-600">Engine:</span>
            <button
              onClick={() => setEngine("n8n")}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                engine === "n8n"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>n8n Chatbot</span>
            </button>
            <button
              onClick={() => setEngine("gemini")}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                engine === "gemini"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Rythu Mitra (Gemini)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold text-[11px] ${
                n8nStatus.active
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-amber-100 text-amber-800 border border-amber-300"
              }`}
              title={n8nStatus.details}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  n8nStatus.active ? "bg-emerald-600 animate-pulse" : "bg-amber-600"
                }`}
              />
              <span>{n8nStatus.active ? "n8n Live" : "n8n Standby"}</span>
            </span>

            <button
              onClick={checkStatus}
              disabled={n8nStatus.loading}
              className="p-1 rounded-md text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition cursor-pointer"
              title="Ping n8n webhook"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${n8nStatus.loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Info banner if n8n is in standby */}
        {!n8nStatus.active && engine === "n8n" && (
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-amber-950 text-xs flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="leading-tight">
              Webhook connected. If inactive, click the <b>Active</b> toggle in your n8n canvas (top right). Automatic AI fallback is active in the meantime.
            </span>
          </div>
        )}

        {/* Quick Questions Pills */}
        <div className="px-4 py-2 bg-white border-b border-stone-200 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="font-bold text-stone-500 whitespace-nowrap">
            {t.advisorModal.suggestedQuestions}
          </span>
          <button
            onClick={() => handleSend(t.advisorModal.suggested1)}
            className="px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50 text-stone-700 font-medium whitespace-nowrap cursor-pointer transition shrink-0"
          >
            {t.advisorModal.suggested1}
          </button>
          <button
            onClick={() => handleSend(t.advisorModal.suggested2)}
            className="px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50 text-stone-700 font-medium whitespace-nowrap cursor-pointer transition shrink-0"
          >
            {t.advisorModal.suggested2}
          </button>
          <button
            onClick={() => handleSend(t.advisorModal.suggested3)}
            className="px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50 text-stone-700 font-medium whitespace-nowrap cursor-pointer transition shrink-0"
          >
            {t.advisorModal.suggested3}
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/70">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                    {msg.source === "n8n" ? (
                      <Workflow className="w-4 h-4 text-emerald-200" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 space-y-2 text-sm ${
                    isUser
                      ? "bg-emerald-700 text-white shadow-xs rounded-tr-none"
                      : "bg-white text-stone-800 border border-stone-200 shadow-xs rounded-tl-none"
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-stone-100 text-[11px] text-stone-400">
                      <span className="font-semibold flex items-center gap-1 text-emerald-800">
                        {msg.source === "n8n" ? (
                          <>
                            <Workflow className="w-3 h-3 text-emerald-600" />
                            <span>n8n Chatbot</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>Rythu Mitra AI</span>
                          </>
                        )}
                      </span>
                    </div>
                  )}

                  <p className="leading-relaxed whitespace-pre-wrap">
                    {lang === "te" && msg.textTe ? msg.textTe : msg.textEn}
                  </p>

                  {/* Tips list if any */}
                  {msg.tips && msg.tips.length > 0 && (
                    <div className="pt-2 border-t border-stone-100 space-y-1 text-xs text-stone-600">
                      {msg.tips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bot message audio listen button */}
                  {!isUser && (
                    <div className="pt-1 flex items-center justify-end">
                      <button
                        onClick={() => handleToggleAudio(msg)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                      >
                        {playingMsgId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-stone-700 text-white flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0">
                <Workflow className="w-4 h-4 text-emerald-200 animate-spin" />
              </div>
              <div className="bg-white border border-stone-200 rounded-2xl p-4 text-xs text-stone-500 flex items-center gap-2 shadow-xs">
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span>
                  {engine === "n8n"
                    ? "Consulting n8n AI workflow..."
                    : "Rythu Mitra is preparing scientific advice..."}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleMicToggle}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                isListening
                  ? "bg-rose-600 border-rose-600 text-white animate-pulse"
                  : "bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100"
              }`}
              title="Voice Input (Telugu / English)"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder={
                engine === "n8n"
                  ? "Ask n8n chatbot about crops, pests, fertilizers..."
                  : t.advisorModal.placeholder
              }
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
            />

            <button
              type="submit"
              disabled={!inputQuestion.trim() || loading}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 cursor-pointer ${
                !inputQuestion.trim() || loading
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs"
              }`}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t.advisorModal.sendBtn}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
