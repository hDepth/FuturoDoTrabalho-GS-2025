const oracledb = require("oracledb");
require("dotenv").config();

let pool;

async function init() {
  pool = await oracledb.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
    poolMin: 1,
    poolMax: 5,
    poolIncrement: 1,
  });

  console.log("Connected to Oracle DB!");
}

// Função para pegar uma conexão
async function getConnection() {
  if (!pool) await init();
  return await pool.getConnection();
}

// Função execute() usada por todos os models
async function execute(sql, params = {}) {
  let conn;

  try {
    conn = await getConnection();
    const result = await conn.execute(sql, params, { autoCommit: true });
    return result;
  } finally {
    if (conn) await conn.close();
  }
}

module.exports = {
  init,
  getConnection,
  execute,
};
