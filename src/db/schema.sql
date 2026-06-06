CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
 transaction_date DATE,
 merchant TEXT,
 category TEXT,
 amount NUMERIC,
 currency TEXT,
 memo TEXT
);


CREATE TABLE IF NOT EXISTS funds (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS fund_navs (
    id SERIAL PRIMARY KEY,

    fund_id TEXT NOT NULL,

    nav_date DATE NOT NULL,

    nav NUMERIC(12,4) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_fund
    FOREIGN KEY (fund_id)
    REFERENCES funds(id)
    ON DELETE CASCADE,

    CONSTRAINT unique_fund_nav
    UNIQUE(fund_id, nav_date)
);


CREATE TABLE IF NOT EXISTS holdings (
    id SERIAL PRIMARY KEY,

    fund_id TEXT NOT NULL,

    fund_name TEXT NOT NULL,

    units NUMERIC(12,4) NOT NULL,

    purchase_date DATE NOT NULL,

    purchase_nav NUMERIC(12,4) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_holding_fund
    FOREIGN KEY (fund_id)
    REFERENCES funds(id)
    ON DELETE CASCADE,

    CONSTRAINT unique_holding
    UNIQUE(fund_id, purchase_date)
);


CREATE INDEX IF NOT EXISTS idx_transaction_date
ON transactions(transaction_date);

CREATE INDEX IF NOT EXISTS idx_transaction_category
ON transactions(category);

CREATE INDEX IF NOT EXISTS idx_transaction_merchant
ON transactions(merchant);

CREATE INDEX IF NOT EXISTS idx_fund_nav_date
ON fund_navs(nav_date);

CREATE INDEX IF NOT EXISTS idx_fund_nav_fund
ON fund_navs(fund_id);