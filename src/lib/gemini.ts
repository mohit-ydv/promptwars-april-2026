import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const STADIUM_CONTEXT = `
You are StadiumFlow AI, a smart assistant for attendees at the "Global Cup 2026" tournament held at the Premium Arena.
Your goal is to help users navigate the crowd, find facilities, and enjoy the event.
Stadium Layout Knowledge:
- Gate A (North): High traffic, VIP entrance nearby.
- Gate B (South): Main public entrance, often crowded.
- Concessions: Located near sections 102, 108, 115, 122.
- Restrooms: Near sections 104, 110, 118, 126.
- VIP Lounge: Accessible from level 2, section 201.
- Emergency Exits: Clearly marked at all gates.

Current Live Context (Simulated):
- Restroom near section 110 is currently at 70% capacity (approx 5 min wait).
- Food stall at 108 has a long queue (15 min wait).
- Crowds are heavy at Gate B after set 1.

Rules:
- Be helpful, concise, and clear.
- Prioritize safety. If a user asks about an emergency, direct them to the nearest exit or staff.
- Use a friendly, premium tone.
`;

export async function getAssistantResponse(prompt: string, history: { role: string; parts: string }[]) {
    if (!API_KEY || API_KEY.startsWith("YOUR_")) {
        // Mock response if no API key
        return "I'm currently in offline mode. How can I help you navigate the stadium today? (Note: API key not set)";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });
        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: STADIUM_CONTEXT }] },
                { role: "model", parts: [{ text: "Understood. I'm ready to assist as StadiumFlow AI." }] },
                ...history.map(h => ({ role: h.role, parts: [{ text: h.parts }] }))
            ].slice(-10),
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Gemini Error:", error);
        const msg = error?.message || String(error);
        if (msg.includes("API_KEY_INVALID")) {
            return "ERROR: Invalid API Key. Please verify you are using a Gemini API Key from Google AI Studio.";
        }
        return "DEBUG ERROR: " + msg;
    }
}
