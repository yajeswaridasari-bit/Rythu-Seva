// Web Speech API wrapper for Telugu and English audio reading

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakText(
  text: string,
  lang: "te" | "en" = "en",
  onEnd?: () => void,
  onError?: () => void
): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported in this browser");
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!text || !text.trim()) return false;

  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;

  // Try to pick appropriate voice
  const voices = window.speechSynthesis.getVoices();
  const targetLang = lang === "te" ? "te-IN" : "en-IN";

  const voice = voices.find(
    (v) =>
      v.lang.toLowerCase() === targetLang.toLowerCase() ||
      v.lang.toLowerCase().startsWith(lang)
  );

  if (voice) {
    utterance.voice = voice;
  }

  utterance.lang = targetLang;
  utterance.rate = lang === "te" ? 0.9 : 0.95; // Slightly slower for clear agricultural comprehension
  utterance.pitch = 1.0;

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn("Speech error:", e);
    currentUtterance = null;
    if (onError) onError();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function isSpeaking(): boolean {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
}
