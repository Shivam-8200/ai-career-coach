# 🤖 AI Career Coach

An intelligent career guidance platform powered by **Next.js**, **Prisma**, and **Google Gemini API**, designed to provide personalized AI-driven career insights, skill recommendations, and interview preparation assistance.

---

## 🚀 Project Overview

**AI Career Coach** helps students and professionals explore personalized learning paths, career insights, and real-time AI mentoring.  
It combines the power of **LLMs**, **data tracking**, and **automated workflows** via **Inngest** to deliver contextual advice and smart guidance.

> ⚠️ This project is currently **under development**.  
> Core modules like API integration, chat interface, and recommendation engine are being built.

---

## 🏗️ Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend** | Next.js 14 (App Router), React, Tailwind CSS |
| **Backend** | Node.js, Prisma ORM |
| **AI Integration** | Gemini API (Google Generative AI) |
| **Event Handling** | Inngest (for async workflows & background tasks) |
| **Database** | PostgreSQL / MySQL (configurable in `.env`) |
| **Deployment (Planned)** | Vercel (Frontend), Render / Railway (Backend) |

---

## ⚙️ Installation & Setup

Follow these steps to run locally:

```bash
# 1. Clone the repository
git clone https://github.com/Shivam-8200/ai-career-coach.git

# 2. Move into the folder
cd ai-career-coach

# 3. Install dependencies
npm install

# 4. Create a .env file
cp .env.example .env
# Then add your actual Gemini API key and DB credentials

# 5. Run the development server
npm run dev
# or
# yarn dev
# or
# pnpm dev
# or
# bun dev
