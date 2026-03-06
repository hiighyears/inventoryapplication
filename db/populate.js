require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS items (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255),
 price INTEGER,
 category_id INTEGER REFERENCES categories(id)
);

INSERT INTO categories (name)
VALUES ('Laptops'),('Keyboards'),('Monitors');

INSERT INTO items (name, price, category_id)
VALUES
('MacBook Pro',2000,1),
('Dell XPS',1800,1),
('Mechanical Keyboard',120,2),
('LG Monitor',300,3);
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || "postgresql://n@localhost:5432/top_users",
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized:false } : false
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("database seeded");
}

main();