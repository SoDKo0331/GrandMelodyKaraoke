
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the Grand Concierge at Grand Melody, a world-class luxury VIP Karaoke lounge. 
Your goal is to help guests plan their perfect night. 
You can:
1. Recommend songs based on mood, group size, or genre (e.g., power ballads for 5 friends).
2. Suggest drink pairings for specific musical vibes.
3. Describe the atmosphere of our suites (Royal, Empress, Gold).
Maintain a sophisticated, helpful, and slightly formal tone. 
Keep responses concise but elegant.
`;

export const getConciergeResponse = async (userPrompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.9,
      },
    });
    return response.text || "I apologize, my melodic circuits are experiencing a brief intermission. How else may I assist you?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The Grand Concierge is currently attending to another guest. Please try again in a moment.";
  }
};
