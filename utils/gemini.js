const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const sarvamApiKey = process.env.SARVAM_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const originalChatSession = model.startChat({
    generationConfig,
});

// Wrapper function to use Gemini with Sarvam AI as fallback
async function sendMessageWithFallback(prompt) {
    try {
        // Try Gemini API first
        console.log("Attempting to use Gemini API...");
        const result = await originalChatSession.sendMessage(prompt);
        const response = result.response.text();
        console.log("Gemini API succeeded");
        return {
            response: {
                text: () => response
            }
        };
    } catch (geminiError) {
        console.error("Gemini API failed:", geminiError.message);
        console.log("Falling back to Sarvam AI...");
        
        try {
            // Fallback to Sarvam AI
            const response = await axios.post(
                "https://api.sarvam.ai/v1/chat/completions",
                {
                    messages: [
                        {
                            content: prompt,
                            role: "user",
                        },
                    ],
                    model: "sarvam-m",
                    max_tokens: 2000,
                },
                {
                    headers: {
                        "api-subscription-key": sarvamApiKey,
                        "Content-Type": "application/json",
                    },
                    timeout: 30000,
                },
            );

            const rawContent = response.data?.choices?.[0]?.message?.content;
            if (!rawContent) {
                throw new Error("No content in Sarvam response");
            }

            console.log("Sarvam AI succeeded");
            return {
                response: {
                    text: () => rawContent
                }
            };
        } catch (sarvamError) {
            console.error("Sarvam AI also failed:", sarvamError.message);
            throw new Error(`Both APIs failed. Gemini: ${geminiError.message}, Sarvam: ${sarvamError.message}`);
        }
    }
}

// Export a chat session wrapper that uses the fallback logic
export const chatSession = {
    sendMessage: sendMessageWithFallback
};
