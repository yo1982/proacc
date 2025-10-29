
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is available in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY is not set. AI features will not be available.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getFinancialSummary = async (data: any): Promise<string> => {
    if (!API_KEY) {
        return "API Key is not configured. Please set up your API key to use the AI Financial Assistant.";
    }
    try {
        const prompt = `
            You are a professional accounting assistant. Based on the following financial data, provide a concise, insightful summary of the company's performance.
            Highlight key trends, potential areas of concern, and positive aspects. The data is as follows:
            ${JSON.stringify(data, null, 2)}
            
            Keep the summary to 2-3 short paragraphs.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating financial summary:", error);
        return "An error occurred while analyzing the financial data. Please try again later.";
    }
};
   