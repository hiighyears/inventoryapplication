const pool = require("./pool");

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategory(id) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE id=$1",
    [id]
  );
  return rows[0];
}

async function getItemsByCategory(id) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id=$1",
    [id]
  );
  return rows;
}

async function getItem(id) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE id=$1",
    [id]
  );
  return rows[0];
}

async function addCategory(name) {
  await pool.query(
    "INSERT INTO categories (name) VALUES ($1)",
    [name]
  );
}

async function addItem(name, price, category) {
  await pool.query(
    "INSERT INTO items (name, price, category_id) VALUES ($1,$2,$3)",
    [name, price, category]
  );
}

async function deleteItem(id) {
  await pool.query(
    "DELETE FROM items WHERE id=$1",
    [id]
  );
}

module.exports = {
  getCategories,
  getCategory,
  getItemsByCategory,
  getItem,
  addCategory,
  addItem,
  deleteItem
};