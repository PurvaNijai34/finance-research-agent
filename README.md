# Finance Research Agent

## Overview

Finance Research Agent is an AI-powered financial assistant built using Mastra, PostgreSQL, Express.js, TypeScript, and Groq LLM.

The system ingests financial transactions, mutual fund data, and holdings into PostgreSQL and allows users to ask natural language finance questions.

The Tara Finance Agent uses Mastra tools to query PostgreSQL and return accurate financial insights.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Data Ingestion](#data-ingestion)
- [Run Mastra Studio](#run-mastra-studio)
- [Run API Server](#run-api-server)
- [API Endpoint](#api-endpoint)
- [Evaluation](#evaluation)
- [Supported Questions](#supported-questions)
- [Sample Output](#sample-output)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

# Features

- AI Finance Agent (Tara)
- Mastra Agent Framework
- PostgreSQL Integration
- Data Ingestion Pipeline
- Spending Analysis
- Merchant Spending Analysis
- Category Breakdown Analysis
- Monthly Spending Analysis
- Portfolio Value Calculation
- REST API Endpoint
- Evaluation Script
- Mastra Studio Support
- Render Deployment Ready

---

# Tech Stack

## Backend

- Node.js
- TypeScript
- Express.js

## AI Framework

- Mastra

## Database

- PostgreSQL (Neon)

## LLM

- Groq (Llama 3.3 70B Versatile)

---

# Project Structure

```text
finance-research-agent/
│
├── data/
│
├── scripts/
│   ├── ingest.ts
│   └── eval.ts
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
├── README.md
└── DESIGN.md
```

---

# Architecture

```text
User Question
      │
      ▼
Express API (/ask)
      │
      ▼
Tara Finance Agent
      │
      ▼
Finance Tool
      │
      ▼
Finance Service
      │
      ▼
PostgreSQL Database
      │
      ▼
Response Returned
```

---

# Environment Variables

Create a `.env` file:

```env
APP_PORT=3000

DATABASE_URL=your_postgresql_connection_string

GROQ_API_KEY=your_groq_api_key

DATA_DIR=./data/sample_a

API_BASE_URL=http://localhost:3000/api
```

---

# Installation

Clone repository:

```bash
git clone https://github.com/PurvaNijai34/finance-research-agent.git
```

Move into project:

```bash
cd finance-research-agent
```

Install dependencies:

```bash
npm install
```

---

# Database Setup

Create tables:

```bash
npx tsx src/db/createTables.ts
```

---

# Data Ingestion

Load default dataset:

```bash
npx tsx scripts/ingest.ts
```

Load custom dataset:

```bash
DATA_DIR=./data/sample_x npx tsx scripts/ingest.ts
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

---

# Run API Server

```bash
npm run server
```

API Base URL:

```text
http://localhost:3000
```

> **Note:** Use either `npm run dev` (Mastra Studio) or `npm run server` (Express API) depending on what you want to test.

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

Run evaluation suite:

```bash
npx tsx scripts/eval.ts
```

The evaluation script:

- Sends multiple questions to `/ask`
- Validates responses
- Prints pass/fail summary
- Displays failed cases

---

# Supported Questions

## Spending Analysis

- How much did I spend on food?
- How much did I spend on travel?
- How much did I spend on health?
- How much did I spend on groceries?
- How much did I spend on transport?

## Merchant Analysis

- How much did I spend on Amazon?
- How much did I spend using AMZN?
- How much did I spend on Netflix?
- How much did I spend at Apollo Pharmacy?

## Portfolio Analysis

- What is my portfolio value?

## Expense Analysis

- What was my biggest expense?

## Monthly Analysis

- How much did I spend in March 2025?

## Category Analysis

- Show category breakdown

## No Data Cases

- Do I have any rent data in April 2025?

---

# Sample Output

## Food Spending

```text
You spent ₹118770.47 on food.
```

## Portfolio Value

```text
Your portfolio value is ₹119983.80.
```

## Biggest Expense

```text
Your biggest expense was ₹34774.89 at NEFT/RENT/HDFC on 3/3/2025.
```

---

# Deployment

Application is deployed on Render.

Production API:

```text
https://finance-research-agent-073i.onrender.com
```

---

# Future Improvements

- Expense Forecasting
- Investment Recommendations
- RAG Integration
- Vector Search
- Multi-Agent Architecture
- Real-Time Market Data
- User Authentication

---

# Author

**Purva Nijai**

### - 💼 GitHub: [PurvaNijai34](https://github.com/PurvaNijai34)

### - 🔗 LinkedIn: https://www.linkedin.com/in/purva-nijai-6041002a5/

### - 📧 Email: purvanijai05@gmail.com