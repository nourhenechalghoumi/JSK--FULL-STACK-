-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK(role IN ('admin', 'manager', 'user')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  members TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TIMESTAMP,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  location TEXT,
  date TIMESTAMP,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sponsors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS staff (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  position TEXT,
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leadership (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  position TEXT,
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hiring_applications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  cv_url TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT,
  date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (password: admin123)
INSERT INTO users (name, email, password_hash, role)
VALUES ('Admin User', 'admin@esports.com', '$2a$10$xJwL5v5Jz7T7N7bQ5LzH.evJYw8X9Qd8Z5rYc5X5v5Y5v5Y5v5Y5v', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Sample data
INSERT INTO teams (name, description, members)
VALUES 
('Valorant Squad', 'Our professional Valorant team', 'Player1,Player2,Player3'),
('CS2 Legends', 'Counter-Strike 2 champions', 'Alpha,Beta,Gamma')
ON CONFLICT (name) DO NOTHING;

INSERT INTO events (name, location, date, description)
VALUES 
('Spring Championship', 'Los Angeles', '2025-03-15 10:00:00', 'Annual tournament'),
('Valorant Masters', 'Online', '2025-02-20 14:00:00', 'International competition')          
ON CONFLICT (name) DO NOTHING;

INSERT INTO sponsors (name, logo_url, link)
VALUES 
('TechCorp', 'https://example.com/logo1.png', 'https://techcorp.com'),
('GameStudio', 'https://example.com/logo2.png', 'https://gamestudio.com')   
ON CONFLICT (name) DO NOTHING;

INSERT INTO staff (name, position, bio, photo_url)
VALUES 
('John Doe', 'Team Manager', 'Experienced esports manager', 'https://example.com/john_doe.png'),
('Jane Smith', 'Coach', 'Strategic coach with a winning mindset', 'https://example.com/jane_smith.png') 
ON CONFLICT (name) DO NOTHING;

INSERT INTO leadership (name, position, bio, photo_url)     
VALUES 
('Alice Johnson', 'CEO', 'Leading the organization with vision', 'https://example.com/alice_johnson.png'),
('Bob Brown', 'CTO', 'Innovating technology for esports', 'https://example.com/bob_brown.png')      
ON CONFLICT (name) DO NOTHING;
