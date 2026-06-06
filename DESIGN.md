## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [High Level Flow](#high-level-flow)
- [Database Design](#database-design)
- [Schema Design Decisions](#schema-design-decisions)
- [Data Ingestion Strategy](#data-ingestion-strategy)
- [Agent Design](#agent-design)
- [Tool Design](#tool-design)
- [Service Layer Design](#service-layer-design)
- [Database Query Layer](#database-query-layer)
- [Grounding Strategy](#grounding-strategy)
- [Financial Calculation Logic](#financial-calculation-logic)
- [API Design](#api-design)
- [Evaluation Strategy](#evaluation-strategy)
- [Observability](#observability)
- [Failure Inspection](#failure-inspection)
- [Error Handling](#error-handling)
- [Long Running Async Tools](#long-running-async-tools)
- [Deployment](#deployment)
- [Design Decisions](#design-decisions)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
- [Conclusion](#conclusion)





## Overview

The Finance Research Agent is an AI-powered financial assistant built using Mastra, PostgreSQL, Express.js, TypeScript, and Groq LLM.

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
2. Express API receives the request through POST `/ask`.
3. The request is forwarded to Tara Finance Agent.
4. Tara Agent invokes Finance Tool.
5. Finance Tool calls Finance Service.
6. Finance Service determines the query type.
7. Appropriate database query is executed.
8. PostgreSQL returns the requested data.
9. Tara Agent generates the final response.
10. Response is returned to the user.

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


# Schema Design Decisions

The database schema was designed to separate transactional data from investment data.

## Transactions

### Primary Key

- id

### Purpose

- Stores all spending activity
- Supports merchant analysis
- Supports category analysis

## Funds

### Primary Key

- id

### Purpose

- Stores mutual fund metadata

## Fund NAVs

### Composite Key

- (fund_id, nav_date)

### Foreign Key

- fund_id references Funds(id)

### Purpose

- Stores historical NAV values
- Supports portfolio valuation

## Holdings

### Composite Key

- (fund_id, purchase_date)

### Foreign Key

- fund_id references Funds(id)

### Purpose

- Stores user investment holdings

Indexes are automatically created on primary keys and are used for efficient lookups and aggregations.

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

The dataset directory can be changed using:

```bash
DATA_DIR=./data/sample_x npx tsx scripts/ingest.ts
```

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
- Return concise and accurate responses

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
- Groceries spending
- Transport spending
- Merchant spending
- Amazon alias lookup (AMZN)
- Portfolio value
- Biggest expense
- Monthly spending
- Category breakdown
- Transfer analysis
- No-data detection

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
- hasRentDataInApril2025()
- getRecurringSubscriptions()

---

## Fund Tool

Provides investment-related queries.

### Functions

- getFundCount()
- getPortfolioValue()
- getTotalPortfolioValue()

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
# Grounding Strategy

All responses are grounded in PostgreSQL data.

The agent is instructed to always use Finance Tool and never fabricate values.

The LLM is responsible only for formatting responses.

All financial calculations are performed through SQL queries and service-layer logic before being returned to the agent.

This ensures that answers are generated from actual stored data rather than model assumptions.

---


# Financial Calculation Logic

## Category Spending

Formula:

```text
Total Spend = SUM(amount)
```

Filtered by category.

---

## Merchant Spending

Formula:

```text
Total Merchant Spend = SUM(amount)
```

Merchant matching uses case-insensitive partial matching.

Example:

- Amazon
- AMZN

Both resolve to the same merchant.

---

## Monthly Spending

Formula:

```text
SUM(amount)
```

Filtered by month and year.

---

## Portfolio Value

Formula:

```text
Portfolio Value = SUM(units × latest NAV)
```

Across all holdings.

---

## Transfer Calculation

Formula:

```text
SUM(amount)
```

Where category = 'transfer'.

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



---

# Evaluation Strategy

The evaluation script sends predefined finance questions to the `/ask` endpoint.

Returned answers are compared against expected values and facts.

The script reports:

- Passed cases
- Failed cases
- Total execution summary

Covered scenarios include:

- Category spending
- Merchant spending
- Portfolio valuation
- Monthly spending
- Merchant aliases
- Transfers
- Recurring subscriptions
- No-data cases

---

# Observability

Observability is provided through application logs.

The following events are logged:

- API requests
- Tool execution
- Database queries
- Error handling

This allows debugging of successful and failed requests.

Screenshots of successful runs and no-data responses are included in the repository.

---

# Failure Inspection

Failures can be inspected through:

- Express server logs
- Tool execution logs
- PostgreSQL query responses

When an unsupported question is received, the system returns a controlled response instead of crashing.

---



---

# Long Running Async Tools

This milestone was not implemented.

The current dataset size is small and all operations complete synchronously within a few seconds.

If implemented in the future, asynchronous jobs could be used for large-scale financial analysis tasks.

---

# Deployment

The application is deployed on Render.

## Benefits

- Easy deployment
- Free hosting tier
- GitHub integration

## Tradeoffs

- Free instances may sleep after inactivity.
- Initial request latency may increase after cold starts.

---

# Known Limitations

Current limitations include:

- Merchant aliases are partially rule-based.
- Fund return calculations are not yet implemented.
- Holding realised return calculations are not yet implemented.
- Recurring subscription detection uses simple heuristics.

With additional time, these areas would be expanded using more advanced financial analytics.
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

## Why Groq?

- Fast inference speed
- Reliable tool calling
- Free developer tier
- Easy integration with Mastra

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

The solution combines PostgreSQL, Mastra, Groq, and Express.js to deliver accurate financial insights through tool-based AI reasoning while ensuring that all responses are grounded in database data. 
