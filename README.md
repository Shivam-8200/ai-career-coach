# 🤖 AI Career Coach (Sensai)

AI-powered career guidance platform built with  
Next.js 15, Prisma, Clerk, ShadCN UI, Postgres (Neon), and Gemini 2.5 Flash API.

---

## 📌 Overview

A modern platform that assists students with:
- AI-generated quizzes  
- Domain-based recommendations  
- Performance dashboards  
- AI resume & cover letter generation  

---

<details>
<summary>🧩 <strong>Features</strong></summary>

- AI-based quiz generation  
- Correct answers with explanations  
- Score-wise motivational messages  
- Dashboard analytics (Recharts)  
- AI resume builder (Markdown preview)  
- AI cover letter generator  
- Clerk authentication (JWT-based)  
- Inngest background jobs  
- ShadCN UI + Tailwind CSS  
- Vercel deployment  

</details>

---

<details>
<summary>🏗 <strong>Tech Stack</strong></summary>

**Frontend:** Next.js 15, React, Tailwind CSS, ShadCN UI  
**Backend:** Node.js, Prisma ORM, Server Actions  
**AI Engine:** Google Gemini 2.5 Flash  
**Database:** Postgres (Neon)  
**Authentication:** Clerk  
**Background Tasks:** Inngest  
**Deployment:** Vercel  

</details>

---
<details>
<summary>⚙️ <strong>Installation & Setup</strong></summary>

### 1️⃣ Clone repository
git clone https://github.com/Shivam-8200/ai-career-coach.git

### 2️⃣ Install dependencies
npm install
### 3️⃣ Create `.env`
GEMINI_API_KEY=""
DATABASE_URL=""
CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
INNGEST_EVENT_KEY=""
### 4️⃣ Apply Prisma schema
npx prisma migrate deploy
### 5️⃣ Start development server
npm run dev

</details>

---

<details>
<summary>📦 <strong>Environment Variables</strong></summary>

### 🔐 Authentication
CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
### 🤖 Gemini AI
GEMINI_API_KEY=""
### 🗄 Database
DATABASE_URL="postgresql://..."
### ⚙ Inngest
INNGEST_EVENT_KEY=""


</details>

---

<details>
<summary>🧠 <strong>How AI Quiz Works</strong></summary>

1. User selects a domain

2. Frontend sends domain → server action

3. Server action calls Gemini API

4. AI returns:

    10 MCQs

    Correct answers

    Detailed explanations

5. UI renders quiz

6. Score & motivational message displayed

7. Dashboard updates via Prisma

   </details>

---

<details>
<summary>📊 <strong>Dashboard Analytics</strong></summary>

**Built with:** Recharts + Prisma  

Shows:
- Quiz attempts  
- Performance graphs  
- Domain insights  

Files:
app/(main)/dashboard/page.jsx
app/(main)/dashboard/_component/performance-chart.jsx

</details>

---

<details>
<summary>📝 <strong>AI Resume Builder</strong></summary>

Features:
Live Markdown preview

AI-enhanced rewriting

Download-ready resume

Files:
actions/resume.js
app/(main)/resume/_components/resume-builder.jsx

</details>

---

<details>
<summary>✉️ <strong>AI Cover Letter Generator</strong></summary>

Features:
Enter job role & experience

AI generates professional letter

Editable & savable

File:
actions/cover-letter.js

</details>

---

<details>
<summary>🔐 <strong>Authentication (Clerk)</strong></summary>

Secure sign-in/sign-up

JWT-based sessions

Route protection via middleware.js

Server-side authorization


File:
middleware.js

</details>

---

<details>
<summary>🚀 <strong>Deployment (Vercel)</strong></summary>

Hosted on Vercel

GitHub → Vercel CI/CD

Serverless API routes for AI

Secure environment variables

</details>

---

<details>
<summary>🧪 <strong>Testing</strong></summary>

✔ Quiz generation tests
✔ AI explanation accuracy
✔ Authentication flow validation
✔ Dashboard data consistency checks
✔ Resume & cover-letter AI tests

</details>

---
## 📄 License  
This project is open source under the MIT License.

---

## ⭐ Support  
If you find this project useful, please ⭐ star the repository!


