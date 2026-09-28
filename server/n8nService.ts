export const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "https://yajeswari.app.n8n.cloud/webhook/bc8449f4-e3fe-4664-9452-ed797d5fd604/chat";

export const N8N_TEST_WEBHOOK_URL =
  "https://yajeswari.app.n8n.cloud/webhook-test/bc8449f4-e3fe-4664-9452-ed797d5fd604/chat";

export const N8N_BASE_WEBHOOK_URL =
  "https://yajeswari.app.n8n.cloud/webhook/bc8449f4-e3fe-4664-9452-ed797d5fd604";

export interface N8nChatResponse {
  success: boolean;
  output: string;
  source: "n8n" | "n8n_test" | "fallback";
  raw?: any;
  statusMessage?: string;
}

export async function sendChatToN8n(params: {
  message: string;
  sessionId?: string;
  language?: string;
}): Promise<N8nChatResponse> {
  const { message, sessionId = `rythu-${Date.now()}`, language = "en" } = params;

  const payload = {
    action: "sendMessage",
    sessionId,
    chatInput: message,
    message,
    question: message,
    query: message,
    input: message,
    language,
    timestamp: new Date().toISOString(),
  };

  const urlsToTry = [N8N_WEBHOOK_URL, N8N_TEST_WEBHOOK_URL, N8N_BASE_WEBHOOK_URL];

  let lastError: any = null;

  for (const url of urlsToTry) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const contentType = res.headers.get("content-type") || "";
        let replyText = "";
        let rawData: any = null;

        if (contentType.includes("application/json")) {
          const json = await res.json();
          rawData = json;
          if (typeof json === "string") {
            replyText = json;
          } else if (Array.isArray(json) && json.length > 0) {
            replyText = json[0].output || json[0].text || json[0].message || JSON.stringify(json[0]);
          } else if (json && typeof json === "object") {
            replyText =
              json.output ||
              json.text ||
              json.message ||
              json.response ||
              (json.data && (json.data.output || json.data.text || json.data.message)) ||
              JSON.stringify(json);
          }
        } else {
          replyText = await res.text();
        }

        if (replyText && replyText.trim()) {
          return {
            success: true,
            output: replyText.trim(),
            source: url === N8N_TEST_WEBHOOK_URL ? "n8n_test" : "n8n",
            raw: rawData,
          };
        }
      } else {
        const errorJson = await res.json().catch(() => null);
        lastError = {
          status: res.status,
          message: errorJson?.message || res.statusText,
          hint: errorJson?.hint,
          url,
        };
      }
    } catch (err: any) {
      lastError = { message: err?.message, url };
    }
  }

  return {
    success: false,
    output: "",
    source: "fallback",
    statusMessage:
      lastError?.hint ||
      lastError?.message ||
      "n8n webhook is currently waiting for activation in the n8n canvas.",
  };
}

export async function checkN8nStatus(): Promise<{
  active: boolean;
  webhookUrl: string;
  details: string;
}> {
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "ping", chatInput: "ping" }),
    });

    if (res.status === 404) {
      const data = await res.json().catch(() => ({}));
      return {
        active: false,
        webhookUrl: N8N_WEBHOOK_URL,
        details:
          data.hint ||
          "Workflow is currently inactive. Toggle the workflow to Active in the top-right of your n8n editor.",
      };
    }

    return {
      active: res.ok,
      webhookUrl: N8N_WEBHOOK_URL,
      details: res.ok ? "Connected & Active" : `Response status: ${res.status}`,
    };
  } catch (err: any) {
    return {
      active: false,
      webhookUrl: N8N_WEBHOOK_URL,
      details: err?.message || "Could not reach n8n server",
    };
  }
}
