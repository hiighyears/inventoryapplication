const pool = require("./pool");

async function getAllmessages() {
  const result = await pool.query("SELECT current_database()");
  console.log(result.rows);
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;

}

async function addMessage(name, message, timeadded) {
  await pool.query(
    "INSERT INTO messages (name, timeadded, message) VALUES ($1, $2, $3)",
    [name, timeadded, message]
  );
}

async function getMessageById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM messages WHERE id = $1",
    [id]
  );

  return rows[0];
}


module.exports = {
  getAllmessages,
  addMessage,
  getMessageById,
};
