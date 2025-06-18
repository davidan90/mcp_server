import { OpenAI } from "openai";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

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

const functions = [
  {
    name: "deactivateUser",
    description: "Deactivate a user by ID",
    parameters: {
      type: "object",
      properties: {
        userId: {
          type: "integer",
          description: "The ID of the user to deactivate",
        },
      },
      required: ["userId"],
    },
  },
];

const callChatWithFunctions = async (userMessage: string) => {
  const chat = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: userMessage }],
    functions,
    function_call: "auto",
  });

  const message = chat.choices[0].message;

  if (message.tool_calls) {
    for (const toolCall of message.tool_calls) {
      const { function: fn } = toolCall;
      const name = fn.name;
      const parsedArgs = JSON.parse(fn.arguments);

      const handler = MCP_COMMANDS[name as keyof typeof MCP_COMMANDS];
      if (handler) {
        const result = await handler(parsedArgs);
        console.log(`🔁 MCP command '${name}' result:`, result);
      } else {
        console.log("❌ Unknown function:", name);
      }
    }
  } else {
    console.log("💬 Response:", message.content);
  }
};

// Example usage
callChatWithFunctions("Desactiva al usuario con ID 1");
