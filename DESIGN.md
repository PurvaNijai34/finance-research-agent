# Finance Research Agent - Design Document

## Overview

The Finance Research Agent is an AI-powered financial assistant built using Mastra, PostgreSQL, Express.js, and Google Gemini.

The objective of this project is to allow users to ask finance-related questions in natural language and receive accurate answers based on financial data stored in PostgreSQL.

The system ingests financial data from JSON files, stores it in PostgreSQL, and uses a Mastra Agent (Tara Finance Agent) to answer user queries through tool calling.

---

# System Architecture

```text
User
  │
  ▼
POST /ask
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
Transaction Tool / Fund Tool
  │
  ▼
PostgreSQL Database
  │
  ▼
Response
```

---

# High Level Flow

1. User sends a question.
2. Express API receives the request through POST /ask.
3. The request is forwarded to Tara Finance Agent.
4. Tara Agent invokes Finance Tool.
5. Finance Tool calls Finance Service.
6. Finance Service determines the query type.
7. Appropriate database query is executed.
8. PostgreSQL returns the requested data.
9. Tara Agent generates the final response.
10. Response is returned to the user.

---

# Technology Stack

## Backend

- Node.js
- TypeScript
- Express.js

## AI Framework

- Mastra

## Database

- PostgreSQL

## LLM

- Google Gemini 2.5 Flash

---

# Database Design

The system uses PostgreSQL as the primary data source.

Financial data is stored in four tables.

---

## Transactions Table

Stores all user financial transactions.

### Columns

- id
- transaction_date
- merchant
- category
- amount
- currency
- memo

### Purpose

- Spending analysis
- Merchant analysis
- Category analysis
- Expense tracking

---

## Funds Table

Stores mutual fund metadata.

### Columns

- id
- name
- category

### Purpose

- Fund reference information

---

## Fund NAVs Table

Stores historical NAV values.

### Columns

- fund_id
- nav_date
- nav

### Purpose

- Portfolio valuation
- NAV tracking

---

## Holdings Table

Stores user investment holdings.

### Columns

- fund_id
- fund_name
- units
- purchase_date
- purchase_nav

### Purpose

- Portfolio calculations
- Investment analysis

---

# Data Ingestion Strategy

Data is provided in JSON format.

Three sample datasets are available:

- sample_a
- sample_b
- sample_c

The ingestion script performs the following:

1. Reads JSON files.
2. Loads transactions into the Transactions table.
3. Loads funds into the Funds table.
4. Loads NAV history into the Fund NAVs table.
5. Loads holdings into the Holdings table.
6. Prevents duplicate inserts using `ON CONFLICT`.

---

# Agent Design

## Tara Finance Agent

### Responsibilities

- Understand user questions
- Invoke finance tools
- Generate accurate responses
- Prevent hallucinations
- Return concise answers

### Agent Rules

- Always use Finance Tool
- Never fabricate financial data
- Only answer from database results

---

# Tool Design

## Finance Tool

Finance Tool acts as a bridge between the AI Agent and PostgreSQL.

### Responsibilities

- Receive finance questions
- Call Finance Service
- Return structured answers

### Benefits

- Separation of concerns
- Reusable business logic
- Easier maintenance

---

# Service Layer Design

## Finance Service

Finance Service contains the business logic.

### Responsibilities

- Parse user questions
- Identify query intent
- Call appropriate database functions
- Format final responses

### Supported Queries

- Food spending
- Travel spending
- Health spending
- Merchant spending
- Portfolio value
- Biggest expense
- Monthly spending
- Category breakdown

---

# Database Query Layer

## Transaction Tool

Provides transaction-related queries.

### Functions

- getTotalSpendingByCategory()
- getBiggestExpense()
- getMerchantSpending()
- getMonthlySpending()
- getCategoryBreakdown()

---

## Fund Tool

Provides investment-related queries.

### Functions

- getFundCount()
- getPortfolioValue()
- getTotalPortfolioValue()

---

# API Design

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

### Purpose

Provides a simple interface for external applications to interact with the Finance Agent.

---

# Error Handling

The system handles:

- Invalid questions
- Missing data
- Database errors
- API failures

### Example Response

```json
{
  "answer": "Sorry, I could not understand the question."
}
```

---

# Design Decisions

## Why PostgreSQL?

- Reliable relational database
- Strong SQL support
- Efficient aggregation queries
- Suitable for financial data

## Why Mastra?

- Built-in Agent framework
- Tool calling support
- Easy LLM integration
- Clean architecture

## Why Gemini?

- Fast responses
- Strong tool-calling capabilities
- Cost-effective for development

---

# Future Improvements

- Fund return calculations
- Realized gain/loss analysis
- Recurring expense detection
- Subscription analysis
- Spending trends
- Budget recommendations
- Multi-agent architecture
- Real-time financial data

---

# Conclusion

The Finance Research Agent provides a scalable and maintainable architecture for answering financial questions using natural language.

The solution combines PostgreSQL, Mastra, Gemini, and Express.js to deliver accurate financial insights through tool-based AI reasoning while ensuring that all responses are grounded in database data.