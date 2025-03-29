import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'

dotenv.config
var KEY = process.env.apiKey

const ai = new GoogleGenAI({ apiKey: ""});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();
