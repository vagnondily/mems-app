-- database/schema.sql

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(50) REFERENCES roles(name) DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sites table
CREATE TABLE IF NOT EXISTS sites (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  location TEXT,
  status VARCHAR(50),
  last_visited DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Planning table
CREATE TABLE IF NOT EXISTS planning (
  id SERIAL PRIMARY KEY,
  site_id INTEGER REFERENCES sites(id),
  activity_type VARCHAR(100),
  planned_date DATE,
  status VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  site_id INTEGER REFERENCES sites(id),
  activity_type VARCHAR(100),
  performed_by INTEGER REFERENCES users(id),
  date_performed DATE,
  outcome TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Logs table
CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (name) VALUES ('superuser'), ('admin'), ('creator'), ('validator'), ('viewer')
ON CONFLICT (name) DO NOTHING;
