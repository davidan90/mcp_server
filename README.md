# MCP Server POC

Proof of concept of an MCP (Model Context Protocol) server built with **NestJS**, **Prisma**, and **SQLite**. It allows retrieving and modifying the context of the `User` model via commands.

---

## 🚀 Technologies Used
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
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
```

### 2. Generate the database
```bash
npx prisma migrate dev --name init
```

---

## 🧪 Sample Seed (optional)
You can populate sample data by creating a `prisma/seed.ts` script.

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
  "command": "desactivarUsuario",
  "args": { "userId": 1 }
}
```

---

## 📁 Project Structure
```
src/
├── mcp/           # MCP logic (context and commands)
├── user/          # User service
├── main.ts        # Application entry point

prisma/
├── schema.prisma  # DB model and configuration
```

## 📬 Contact
This project is a proof of concept. It can be easily extended to include more models, command logic, WebSocket support, and more.