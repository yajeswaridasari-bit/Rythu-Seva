import React, { useState, useRef, useEffect } from "react";
import {
  Workflow,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  VolumeX,
  Bot,
  User,
  CheckCircle2,
  RefreshCw,
  Info,
  Copy,
  Check,
  RotateCcw,
  Zap,
  Globe,
  Radio,
} from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../data/translations";
import { speakText, stopSpeaking, isSpeaking } from "../utils/speech";

export const N8N_WEBHOOK_URL_DISPLAY =
  "https://yajeswari.app.n8n.cloud/webhook/bc8449f4-e3fe-4664-9452-ed797d5fd604/chat";

interface N8nChatViewProps {
  lang: Language;
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  textEn: string;
  textTe?: string;
  tips?: string[];
  source?: "n8n" | "ai" | "fallback";
  timestamp: string;
}

export const N8nChatView: React.FC<N8nChatViewProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [engine, setEngine] = useState<"n8n" | "gemini">("n8n");
  const [n8nStatus, setN8nStatus] = useState<{
    active: boolean;
    loading: boolean;
    details: string;
    checkedAt?: string;
  }>({
    active: false,
    loading: true,
    details: "Checking webhook...",
  });

  const [sessionId, setSessionId] = useState<string>(
    () => `rythu-${Math.random().toString(36).substring(2, 9)}`
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      textEn:
        "Namaskaram! I am your AI agricultural advisor powered by your n8n cloud workflow. Ask any question about crop diseases, pest remedies, chemical dilutions, or agricultural market trends!",
      textTe:
        "నమస్కారం రైతు సోదరులారా! నేను మీ n8n క్లౌడ్ వర్క్‌ఫ్లో ఆధారిత AI వ్యవసాయ సలహాదారుని. మీ పంట తెగుళ్లు, పురుగుల నివారణ, ఎరువుల మోతాదు లేదా మార్కెట్ ధరలపై ఏదైనా ప్రశ్న అడగండి!",
      tips: [
        "Ask specific dosage per acre (e.g., 'How much Chlorantraniliprole for paddy?')",
        "Request organic management (e.g., 'Neem oil or Jeevamrutham preparation')",
        "Check spraying weather suitability",
      ],
      source: "n8n",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Ping n8n status
  const checkStatus = async () => {
    setN8nStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/n8n/status");
      const data = await res.json();
      setN8nStatus({
        active: !!data.active,
        loading: false,
        details: data.details || (data.active ? "Connected & Active" : "Waiting for activation"),
        checkedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      });
    } catch {
      setN8nStatus({
        active: false,
        loading: false,
        details: "Unable to reach n8n server",
        checkedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || inputQuestion).trim();
    if (!textToSend || loading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      textEn: textToSend,
      textTe: textToSend,
      timestamp: timeStr,
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
          sessionId,
          chatHistory: messages.map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            text: lang === "te" && m.textTe ? m.textTe : m.textEn,
          })),
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to receive advice");
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "bot",
        textEn: json.data.answerEn,
        textTe: json.data.answerTe,
        tips: json.data.tips,
        source: json.source || (engine === "n8n" ? "n8n" : "ai"),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "bot",
        textEn:
          "Unable to complete query. For immediate emergency agricultural advice, please call the Kisan Toll-Free Helpline at 1800-180-1551.",
        textTe:
          "ప్రశ్నను పూర్తి చేయలేకపోయాము. తక్షణ వ్యవసాయ సహాయం కొరకు కిసాన్ కాల్ సెంటర్ 1800-180-1551 (ఉచితం) నంబరుకు కాల్ చేయండి.",
        source: "fallback",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleMicToggle = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice speech recognition is not supported in this browser.");
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

  const resetChat = () => {
    stopSpeaking();
    setPlayingMsgId(null);
    const newSid = `rythu-${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(newSid);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        textEn:
          "Chat history cleared. How can I help your farm today? Ask about crops, fertilizers, pest control, or weather.",
        textTe:
          "చాట్ చరిత్ర క్లియర్ చేయబడింది. ఈ రోజు మీ పొలానికి నేను ఏ విధంగా సహాయపడగలను? పంటలు, ఎరువులు లేదా చీడపీడల గురించి అడగండి.",
        tips: ["Ask about dosage per acre", "Ask organic alternatives"],
        source: "n8n",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const quickQuestions = [
    {
      en: "How to prevent thrips in chilli organically?",
      te: "మిర్చిలో నల్ల తామర పురుగులను సేంద్రీయంగా ఎలా నివారించాలి?",
    },
    {
      en: "What is the recommended Urea & DAP split dose for 1 acre paddy?",
      te: "ఎకరం వరికి యూరియా, డీఏపీ ఎన్ని దఫాలుగా వేయాలి?",
    },
    {
      en: "How to identify pink bollworm in cotton and what chemical spray to use?",
      te: "పత్తిలో గులాబీ రంగు కాయ తొలుచు పురుగు నివారణకు ఏ మందు పిచికారీ చేయాలి?",
    },
    {
      en: "How to cure Tikka leaf spot in Groundnut?",
      te: "వేరుశనగలో టిక్కా ఆకుమచ్చ తెగులు నివారణ ఏమిటి?",
    },
    {
      en: "What precautions should be taken before spraying pesticides in windy weather?",
      te: "గాలి ఎక్కువగా ఉన్నప్పుడు మందులు పిచికారీ చేసేటప్పుడు ఎలాంటి జాగ్రత్తలు తీసుకోవాలి?",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Introduction Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/50 via-teal-50/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
              <Workflow className="w-3.5 h-3.5 text-emerald-700" />
              <span>Connected n8n Cloud Webhook</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
              {lang === "te" ? "n8n AI వ్యవసాయ చాట్‌బాట్" : "n8n AI Agricultural Chatbot"}
            </h2>

            <p className="text-stone-600 text-sm leading-relaxed">
              {lang === "te"
                ? "మీ n8n క్లౌడ్ వర్క్‌ఫ్లోతో అనుసంధానించబడిన ఇంటెలిజెంట్ అసిస్టెంట్. తెలుగు మరియు ఇంగ్లీష్ భాషలలో పంట తెగుళ్లు, రసాయనాల మోతాదు మరియు మార్కెట్ ధరలపై సమాధానాలు పొందండి."
                : "Real-time agro-intelligence integrated with your n8n workflow. Ask questions in English or Telugu with instant voice narration and agronomic recommendations."}
            </p>
          </div>

          {/* Webhook Status Widget */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 shrink-0 lg:w-84">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-600" />
                <span>Webhook Status</span>
              </span>

              <button
                onClick={checkStatus}
                disabled={n8nStatus.loading}
                className="p-1 rounded-md text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition cursor-pointer flex items-center gap-1 text-[11px]"
                title="Refresh webhook status"
              >
                <RefreshCw className={`w-3 h-3 ${n8nStatus.loading ? "animate-spin text-emerald-600" : ""}`} />
                <span>Check</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs ${
                  n8nStatus.active
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-amber-100 text-amber-900 border border-amber-300"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    n8nStatus.active ? "bg-emerald-600 animate-pulse" : "bg-amber-600"
                  }`}
                />
                <span>{n8nStatus.active ? "Connected & Active" : "Standby (Waiting for Active Toggle)"}</span>
              </span>
            </div>

            <div className="text-[11px] text-stone-500 font-mono truncate bg-white p-2 rounded-lg border border-stone-200">
              {N8N_WEBHOOK_URL_DISPLAY}
            </div>

            <button
              onClick={() => setShowConfig(!showConfig)}
              className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showConfig ? "Hide n8n setup instructions" : "How to activate in n8n"}</span>
            </button>
          </div>
        </div>

        {/* Accordion helper if n8n is waiting for toggle */}
        {showConfig && (
          <div className="mt-6 pt-6 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Open n8n Canvas</span>
              </div>
              <p className="text-stone-600">
                Log into your n8n workspace at <b>yajeswari.app.n8n.cloud</b> and open the agricultural workflow.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Toggle "Active"</span>
              </div>
              <p className="text-stone-600">
                In the top-right corner of the n8n editor, toggle the switch from <b>Inactive</b> to <b>Active</b> and save.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Dual Engine Failover</span>
              </div>
              <p className="text-stone-600">
                While on standby, our smart AI fallback automatically handles all farmer queries so no messages are ever lost!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Interface Container */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
        {/* Chat Control Toolbar */}
        <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Engine Selector */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-600">Engine:</span>
            <button
              onClick={() => setEngine("n8n")}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                engine === "n8n"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>n8n Chatbot</span>
            </button>

            <button
              onClick={() => setEngine("gemini")}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                engine === "gemini"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Gemini Agro AI</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-stone-500 font-mono text-[11px] bg-white px-2.5 py-1 rounded-lg border border-stone-200">
              <Globe className="w-3 h-3 text-emerald-600" />
              <span>Session: {sessionId}</span>
            </div>

            <button
              onClick={resetChat}
              className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer flex items-center gap-1 font-semibold"
              title="Start a new session"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Suggested Quick Questions Scrollable Strip */}
        <div className="px-5 py-2.5 bg-emerald-950 text-white flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="font-bold text-emerald-300 whitespace-nowrap shrink-0 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>{lang === "te" ? "త్వరిత ప్రశ్నలు:" : "Quick Questions:"}</span>
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(lang === "te" ? q.te : q.en)}
              className="px-3 py-1 rounded-full bg-emerald-900/90 border border-emerald-700/80 hover:bg-emerald-800 text-stone-200 hover:text-white font-medium whitespace-nowrap cursor-pointer transition shrink-0"
            >
              {lang === "te" ? q.te : q.en}
            </button>
          ))}
        </div>

        {/* Message Thread Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/70">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            const textToDisplay = lang === "te" && msg.textTe ? msg.textTe : msg.textEn;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-700">
                    {msg.source === "n8n" ? (
                      <Workflow className="w-4 h-4 text-emerald-200" />
                    ) : (
                      <Bot className="w-4 h-4 text-emerald-200" />
                    )}
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 space-y-2.5 text-sm ${
                    isUser
                      ? "bg-emerald-700 text-white shadow-xs rounded-tr-none"
                      : "bg-white text-stone-800 border border-stone-200 shadow-xs rounded-tl-none"
                  }`}
                >
                  {/* Message Meta Header */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-stone-100 text-[11px] text-stone-400">
                    <span className="font-bold flex items-center gap-1.5">
                      {isUser ? (
                        <span className="text-emerald-100">You (Farmer)</span>
                      ) : msg.source === "n8n" ? (
                        <span className="text-emerald-800 flex items-center gap-1">
                          <Workflow className="w-3 h-3 text-emerald-600" />
                          <span>n8n AI Advisor</span>
                        </span>
                      ) : (
                        <span className="text-amber-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Agri Scientist AI</span>
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-stone-400">{msg.timestamp}</span>
                  </div>

                  {/* Message Content */}
                  <div className="leading-relaxed whitespace-pre-wrap font-sans">
                    {textToDisplay}
                  </div>

                  {/* Scientific Actionable Tips */}
                  {msg.tips && msg.tips.length > 0 && (
                    <div className="pt-2.5 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                      {msg.tips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons Toolbar on Bot Message */}
                  {!isUser && (
                    <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-100">
                      <button
                        onClick={() => handleCopy(msg.id, textToDisplay)}
                        className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer p-1"
                        title="Copy message text"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleToggleAudio(msg)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer p-1"
                      >
                        {playingMsgId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen (చదవండి)</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-stone-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-9 h-9 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 border border-emerald-700">
                <Workflow className="w-4 h-4 text-emerald-200 animate-spin" />
              </div>
              <div className="bg-white border border-stone-200 rounded-3xl p-4 text-xs text-stone-600 flex items-center gap-3 shadow-xs">
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span>
                  {engine === "n8n"
                    ? "Consulting connected n8n cloud workflow..."
                    : "Preparing agricultural pathology advice..."}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-stone-200">
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
              className={`p-3 rounded-2xl border transition cursor-pointer shrink-0 ${
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
                  ? lang === "te"
                    ? "n8n చాట్‌బాట్‌ను పంటలు, తెగుళ్లు, ఎరువుల గురించి అడగండి..."
                    : "Ask n8n chatbot about crop diseases, pest remedies, fertilizer doses..."
                  : t.advisorModal.placeholder
              }
              className="flex-1 px-4 py-3 rounded-2xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50/60"
            />

            <button
              type="submit"
              disabled={!inputQuestion.trim() || loading}
              className={`px-5 py-3 rounded-2xl font-bold text-sm transition flex items-center gap-2 cursor-pointer shrink-0 ${
                !inputQuestion.trim() || loading
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20"
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{t.advisorModal.sendBtn}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
