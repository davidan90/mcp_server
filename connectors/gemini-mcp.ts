import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const MCP_COMMANDS = {
  async deactivateUser(args: { userId: number }) {
    const res = await fetch("http://localhost:3000/mcp/commands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        command: "deactivateUser",
        args,
      }),
    });

    return await res.json();
  },
};

async function callGeminiWithPrompt(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const fullPrompt = `Eres un asistente conectado a un backend MCP.
Puedes desactivar usuarios con este formato:
{
  "tool": "deactivateUser",
  "args": { "userId": 1 }
}

Ahora responde al siguiente mensaje del usuario con la herramienta adecuada si es necesario:
"${prompt}"`;

  const result = await model.generateContent(fullPrompt);
  const response = result.response.text();

  try {
    const match = response.match(
      /\{\s*"tool":\s*"(\w+)",\s*"args":\s*(\{.*\})\s*\}/s
    );
    if (!match) throw new Error("No tool call found");

    const tool = match[1];
    const args = JSON.parse(match[2]);

    const handler = MCP_COMMANDS[tool as keyof typeof MCP_COMMANDS];
    if (handler) {
      const result = await handler(args);
      console.log(`🔁 MCP command '${tool}' result:`, result);
    } else {
      console.log("❌ Unknown tool:", tool);
    }
  } catch (err) {
    console.log("💬 Gemini response:", response);
  }
}

// Example usage
callGeminiWithPrompt("Desactiva al usuario con ID 1");
