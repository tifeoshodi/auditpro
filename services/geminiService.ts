
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Use the API key directly from process.env.API_KEY as required by guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAuditAnalysis = async (findings: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following audit findings and suggest risk categories and remediation steps: ${findings}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            riskRating: { type: Type.STRING },
            suggestedRemediation: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            complianceImplications: { type: Type.STRING }
          },
          // Fix: Use propertyOrdering to align with the provided guidelines for Type.OBJECT schema
          propertyOrdering: ["summary", "riskRating", "suggestedRemediation", "complianceImplications"]
        }
      }
    });
    
    // Fix: Access response.text as a property (not a method) and trim whitespace
    const jsonStr = response.text || '{}';
    return JSON.parse(jsonStr.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateAuditReportDraft = async (projectData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Draft a formal executive summary for an audit project with these details: ${JSON.stringify(projectData)}`,
      config: {
        temperature: 0.7,
        topP: 0.8
      }
    });
    // Fix: Access response.text as a property per @google/genai guidelines
    return response.text || '';
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};