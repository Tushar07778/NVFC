
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private getApiKey(): string {
    // Check if process and process.env exist before accessing
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    return "";
  }

  async generateMatchReport(matchDetails: string) {
    const apiKey = this.getApiKey();
    if (!apiKey) return "API Key not configured. Unable to generate report.";

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a professional sports journalist. Write a compelling, 200-word football match report for Narmada Valley Football Club (NVFC) based on these details: ${matchDetails}. Use a passionate tone suitable for the club's official website.`,
      });
      return response.text || "Report generated but no content returned.";
    } catch (error) {
      console.error("Error generating match report:", error);
      return "Unable to generate report at this time.";
    }
  }

  async summarizePlayerStats(playerName: string, stats: any) {
    const apiKey = this.getApiKey();
    if (!apiKey) return "Top performing player at Narmada Valley Football Club.";

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, professional player bio summary for ${playerName} who has the following stats: ${JSON.stringify(stats)}. Mention their importance to the NVFC team.`,
      });
      return response.text || "Top performing player at Narmada Valley Football Club.";
    } catch (error) {
      console.error("Error generating player bio:", error);
      return "Top performing player at Narmada Valley Football Club.";
    }
  }
}

export const geminiService = new GeminiService();
