# AI Customer Support Chat — Spur Store E-commerce Support

A polished, production-ready full-stack customer support chat application. Built with **Next.js 16 (App Router) + React 19** on the frontend, **Express.js + TypeScript + Prisma** on the backend, and powered by **Google Gemini 2.5 Flash** for intelligent policy-driven AI responses.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, ShadCN UI, TanStack Query (v5), React Markdown.
- **Backend:** Express, TypeScript, Prisma (v6), PostgreSQL, Zod (validation), Helmet & CORS (security), Express Rate Limit.
- **AI Engine:** Google Gemini 2.5 Flash (via official Google Gen AI SDK), customized with store policy knowledge guidelines.

```
┌─────────────────┐       HTTP / REST        ┌────────────────┐
│   Frontend      │  ─────────────────────>  │    Backend     │
│   (Next.js)     │  <─────────────────────  │   (Express)    │
└─────────────────┘      (JSON Payload)      └────────────────┘
         │                                           │
         │ (Session ID stored                        │ (Prisma Client query)
         ▼  in LocalStorage)                         ▼
┌─────────────────┐                         ┌────────────────┐
│  Browser Store  │                         │   PostgreSQL   │
│ (LocalStorage)  │                         │   (Database)   │
└─────────────────┘                         └────────────────┘
                                                     │
                                                     │ (Google Gemini SDK API call)
                                                     ▼
                                            ┌────────────────┐
                                            │   Google AI    │
                                            │ (Gemini Flash) │
                                            └────────────────┘
```

---

## 📁 Project Structure

```
spur-chat/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment configuration & DB client
│   │   ├── controllers/     # Request handlers & error routing
│   │   ├── middleware/      # Rate limiter & global error handler
│   │   ├── repositories/    # Database queries & Prisma abstraction
│   │   ├── routes/          # Express route definitions
│   │   ├── services/        # Business logic & LLM (Gemini) interface
│   │   ├── types/           # TypeScript interfaces & DTOs
│   │   ├── validators/      # Request payload schema validation (Zod)
│   │   ├── app.ts           # Express application configuration
│   │   └── server.ts        # Server listener entrypoint
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js pages & root layout
│   │   ├── components/      # Chat UI widgets & UI primitives
│   │   ├── hooks/           # useChat state & React Query mutation hooks
│   │   ├── lib/             # Utility & session helper functions
│   │   ├── services/        # Fetch API service handlers
│   │   └── types/           # TypeScript chat typings
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

---

## 🚀 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection URL string | `postgresql://postgres:postgres@localhost:5433/spur_chat?schema=public` |
| `GEMINI_API_KEY` | Google Gemini AI Console Key | `AIzaSy...` |
| `PORT` | Local express backend port | `3001` |
| `NODE_ENV` | Development or Production flag | `development` |
| `CORS_ORIGIN` | Allowed Client Origins | `http://localhost:3000` |

### Frontend (`frontend/.env`)

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Full URL path pointing to express server | `http://localhost:3001` |

---

## ⚙️ Local Development Setup

### 1. Prerequisites
- **Node.js** (v20+ recommended)
- **Docker** (to easily run PostgreSQL)

### 2. Database Setup
Spin up a local PostgreSQL instance on port `5433`:
```bash
docker run --name spur-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=spur_chat -p 5433:5432 -d postgres:15-alpine
```

### 3. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create your `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   *Make sure `DATABASE_URL` matches your postgres credentials and `GEMINI_API_KEY` contains a valid Google AI API Key.*
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run Prisma database migrations & generate client:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Run in development mode:
   ```bash
   npm run dev
   ```
   *The backend will boot up at `http://localhost:3001`.*

### 4. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Create your `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *Open `http://localhost:3000` in your browser to view the application.*

---

## 📡 API Reference

### 1. Send Message
- **Endpoint:** `POST /api/chat/message`
- **Rate Limit:** Max 20 requests per minute per IP.
- **Request Body:**
  ```json
  {
    "message": "What is your return policy?",
    "sessionId": "a82df3b9-1234-5678-abcd-ef0123456789" // Optional: creates new session if omitted
  }
  ```
- **Response:**
  ```json
  {
    "reply": "We accept returns within 30 days of delivery. The item must be unused...",
    "sessionId": "a82df3b9-1234-5678-abcd-ef0123456789"
  }
  ```

### 2. Get Chat Session History
- **Endpoint:** `GET /api/chat/history/:sessionId`
- **Response:**
  ```json
  [
    {
      "sender": "user",
      "text": "What is your return policy?",
      "createdAt": "2026-06-09T20:00:00.000Z"
    },
    {
      "sender": "ai",
      "text": "We accept returns within 30 days of delivery...",
      "createdAt": "2026-06-09T20:00:05.000Z"
    }
  ]
  ```

---

## 🧠 AI Design Decisions

1. **Model Selection:** **Gemini 2.5 Flash** is used due to its ultra-low latency, modern context window capabilities, and cost efficiency, making it perfect for real-time customer support scenarios.
2. **Temperature (0.4):** Set to `0.4` to ensure responses remain consistent, factual, and strictly aligned with store policies without inventing answers.
3. **Context Window (Last 10 turns):** The database dynamically queries and sends the last 10 messages from the session to Gemini's chat turns. This maintains recent context while avoiding context inflation and keeping performance optimal.
4. **Failsafe System Guard:** If Gemini encounters api limitations, rate-limiting (`429`), or transient network failures, the service intercepts the error and returns a friendly, contextual failure message (e.g., "I'm receiving too many requests right now. Please wait a moment and try again.") instead of crashing the endpoint.

---

## 🛡️ Security & Robustness Highlights

- **Input Validation:** Zod enforces strict string length constraints (`1` to `2000` characters) and uuid format validation.
- **Rate Limiting:** Protects the AI endpoint against spam or DDoS using `express-rate-limit`.
- **Headers:** Helmet is registered in Express to secure HTTP headers.
- **Error Boundaries:** A global error handler catches all database or network failures without leaking stack traces or database configurations to the client.
