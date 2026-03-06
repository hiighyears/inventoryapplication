#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  timeadded VARCHAR ( 255 ),
  message VARCHAR ( 255 )
);

INSERT INTO messages (name, timeadded, message)
VALUES
  ('Alice', 'Today', 'Hello world'),
  ('Bob', 'Yesterday', 'Nice to meet you'),
  ('Sam', 'Today', 'Learning Node!');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL || "postgresql://n@localhost:5432/top_users",
    ssl: process.env.DATABASE_URL
      ? { rejectUnauthorized: false }
      : false,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
