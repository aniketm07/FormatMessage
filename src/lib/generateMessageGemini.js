import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY, GEMINI_MODEL } from "./keys";

const model = GEMINI_MODEL;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const generateMessage = async (formData) => {
  const prompt = `
        I am applying for a job and need help writing a message/email for ${formData.messageType}.

        Here are my details:
        - Referrer/Recruiter Name: ${formData.name}
        - Company I'm applying to: ${formData.company}
        - Role I'm applying for: ${formData.role}
        - Characters Limit: ${formData.charLimit}
        - Job Description: ${formData.jobDescription}

        Additional instructions:
        ${formData.additionalInstructions || "No extra instructions."}

        Please generate a professional, polite, and engaging ${
          formData.messageType
        } that makes me stand out and fits strictly within the character limit.

        Give me plain text without formatting.
        `;
  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
  });
  return response.text;
}

export default generateMessage
