// Netlify Function: secure server-side Google Cloud Text-to-Speech proxy.
// Set GOOGLE_TTS_API_KEY in Netlify Site configuration; never put it in frontend code.
exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) {
    return { statusCode: 503, headers, body: JSON.stringify({ error: "Neural voice is not configured yet." }) };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const text = typeof payload.text === "string" ? payload.text.trim() : "";
    if (!text || text.length > 4500) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Text must contain 1–4500 characters." }) };
    }

    const response = await fetch(
      "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: "bn-IN", name: "bn-IN-Chirp3-HD-Aoede" },
          audioConfig: { audioEncoding: "MP3" }
        })
      }
    );

    const result = await response.json();
    if (!response.ok || !result.audioContent) {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: "Speech provider failed.", details: result.error?.message || "No audio returned." })
      };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ audioContent: result.audioContent }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Unable to generate speech." }) };
  }
};
