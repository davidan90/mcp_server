# MCP Server POC

Proof of concept of an MCP (Model Context Protocol) server built with **NestJS**, **Prisma**, and **SQLite**. It allows retrieving and modifying the context of the `User` model via commands.

Includes an AI connector to OpenAI and Gemini LLMs to trigger commands programmatically.

---

## 🚀 Technologies Used
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [OpenAI GPT-4 API](https://platform.openai.com/docs)
- [Gemini API (Google AI)](https://ai.google.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📦 Installation
```bash
npm install
```

---

## ⚙️ Configuration
### 1. Create `.env` file
```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...
```

### 2. Generate the database
```bash
npx prisma migrate dev --name init
```

---

## 🧪 Sample Seed (optional)
```bash
npx ts-node prisma/seed.ts
```

---

## 🏁 Useful Scripts
```bash
npm run start:dev         # Run the server in development mode
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run database migrations
```

---

## 🧠 MCP Endpoints
### Get context
`GET /mcp/context`

### Update context
`PATCH /mcp/context`
```json
{
  "userId": 1,
  "isActive": false
}
```

### Execute command
`POST /mcp/commands`
```json
{
  "command": "deactivateUser",
  "args": { "userId": 1 }
}
```

---

## 🤖 LLM Connectors

### OpenAI (GPT-4 + functions)
```bash
npx ts-node connectors/openai-mcp.ts
```
> Sends a user message to GPT-4 and calls MCP commands automatically if needed.

### Gemini (Google AI)
```bash
npx ts-node connectors/gemini-mcp.ts
```
> Uses Gemini 1.5 Flash to generate tool calls and execute MCP actions.

---

## 📁 Project Structure
```
mcp-server/
├── src/              # NestJS backend
├── prisma/           # Prisma schema & seeds
├── connectors/       # AI-based external clients
├── .env              # API keys and DB
├── package.json
```

---

## 📬 Contact
This project is a proof of concept and ready to be expanded with more tools, validation layers, and LLM functions.
