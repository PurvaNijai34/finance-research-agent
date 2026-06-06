# Finance Research Agent

## Overview

Finance Research Agent is an AI-powered financial assistant built using Mastra, PostgreSQL, Express.js, and Groq LLM.

The system loads financial transaction, holdings, and mutual fund NAV data into PostgreSQL and allows users to ask natural language finance questions.

The AI Agent (Tara Finance Agent) processes user questions, uses finance tools to fetch data from PostgreSQL, and returns accurate financial insights.

---

# Features

- AI Finance Agent (Tara)
- PostgreSQL Database Integration
- Mastra Agent Framework
- Data Ingestion Pipeline
- Portfolio Value Calculation
- Spending Analysis
- Merchant Spending Analysis
- Monthly Spending Analysis
- Category Breakdown Analysis
- REST API Endpoint
- Mastra Studio Integration

---

# Tech Stack

## Backend

- Node.js
- TypeScript
- Express.js

## AI Framework

- Mastra

## Database

- PostgreSQL

## LLM

- Groq (Llama 3.3 70B Versatile)

---

# Project Structure

```text
master/
│
├── data/
│
├── scripts/
│   └── ingest.ts
│
├── src/
│   │
│   ├── db/
│   │   ├── connection.ts
│   │   ├── createTables.ts
│   │   └── schema.sql
│   │
│   ├── mastra/
│   │   ├── agents/
│   │   │   └── tara-agent.ts
│   │   │
│   │   ├── tools/
│   │   │   └── finance-tool.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── routes/
│   │   └── askRoute.ts
│   │
│   ├── services/
│   │   └── financeService.ts
│   │
│   ├── tools/
│   │   ├── transactionTool.ts
│   │   └── fundTool.ts
│   │
│   └── server.ts
│
├── .env
├── package.json
└── README.md
```

---

# Architecture

User Question
↓
Express API (/ask)
↓
Tara Finance Agent
↓
Finance Tool
↓
PostgreSQL Database
↓
Response Returned

---

# Environment Variables

Create a `.env` file in the root directory.

```env
APP_PORT=your_app_port

DATABASE_URL=your_postgresql_connection_string

GROQ_API_KEY=your_groq_api_key

DATA_DIR=./data/sample_a
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd finance-research-agent
```

Install dependencies:

```bash
npm install
```

---

# Database Setup

Create PostgreSQL tables:

```bash
npx tsx src/db/createTables.ts
```

---

# Data Ingestion

Load sample financial data:

```bash
npx tsx scripts/ingest.ts
```

Expected Output:

```bash
Transactions Inserted: XXX
Funds Inserted: XXX
NAV Records Inserted: XXX
Holdings Inserted: XXX

Data Ingestion Completed Successfully
```

---

# Run Mastra Studio

```bash
npm run dev
```

Open:

```text
http://localhost:4111
```

---

# Run Express API Server

```bash
npm run server
```

Open:

```text
http://localhost:3000
```

---

# API Endpoint

## POST /ask

### Request

```json
{
  "question": "How much did I spend on food?"
}
```

### Response

```json
{
  "answer": "You spent ₹118770.47 on food."
}
```

---


# Evaluation

The project includes an automated evaluation script:

```bash
npx tsx scripts/eval.ts

```


# Sample Questions

### Spending Questions

- How much did I spend on food?
- How much did I spend on travel?
- How much did I spend on health?

### Merchant Questions

- How much did I spend on Amazon?
- How much did I spend on Netflix?
- How much did I spend at Apollo Pharmacy?

### Portfolio Questions

- What is my portfolio value?

### Expense Questions

- What was my biggest expense?

### Monthly Analysis

- How much did I spend in March 2025?

### Category Analysis

- Show category breakdown

---

# Sample Output

Food Spending

```text
You spent ₹118770.47 on food.
```

Portfolio Value

```text
Your portfolio value is ₹119983.80.
```

Biggest Expense

```text
Your biggest expense was ₹34774.89 at NEFT/RENT/HDFC on 3/3/2025.
```

Category Breakdown

```text
travel: ₹1363136.09
transfer: ₹888279.48
rent: ₹472284.88
shopping: ₹457526.92
utilities: ₹228995.41
health: ₹168166.37
food: ₹118770.47
```

---

# Key Components

## Tara Finance Agent

Responsible for:

- Understanding user questions
- Calling finance tools
- Returning accurate financial answers

---

## Finance Tool

Responsible for:

- Executing financial queries
- Accessing PostgreSQL data
- Returning structured answers

---

## PostgreSQL Database

Stores:

- Transactions
- Funds
- Fund NAV History
- Holdings

---

# Future Improvements

- Expense Forecasting
- Investment Recommendations
- RAG Integration
- Vector Database Search
- Multi-Agent Architecture
- Real-time Market Data
- User Authentication

---

# Author

Purva Nijai

Backend Developer