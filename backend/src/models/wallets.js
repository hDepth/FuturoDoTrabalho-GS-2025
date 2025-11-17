const db = require("../db");
const oracledb = require("oracledb");

module.exports = {
  // Criar carteira ao registrar usuário
  async createWallet(userId) {
    const conn = await db.getConnection();

    try {
      await conn.execute(
        `
        INSERT INTO wallets (user_id, coins, xp, gems)
        VALUES (:userId, 0, 0, 0)
        `,
        { userId },
        { autoCommit: true }
      );

      return { userId, coins: 0, xp: 0, gems: 0 };
    } finally {
      await conn.close();
    }
  },

  // Buscar carteira pelo ID do usuário
  async getWalletByUser(userId) {
    const conn = await db.getConnection();

    try {
      const result = await conn.execute(
        `
        SELECT id, user_id, coins, xp, gems
        FROM wallets
        WHERE user_id = :userId
        `,
        { userId },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      await conn.close();
    }
  },

  // Atualizar carteira (método antigo, mantido)
  async updateWallet(userId, coins, xp, gems) {
    const conn = await db.getConnection();

    try {
      await conn.execute(
        `
        UPDATE wallets
        SET coins = :coins,
            xp = :xp,
            gems = :gems
        WHERE user_id = :userId
        `,
        { coins, xp, gems, userId },
        { autoCommit: true }
      );

      return true;
    } finally {
      await conn.close();
    }
  },

  // 🔥 NOVO — método que o submissionsController espera
  async updateWalletByUser(userId, { coins, xp, gems }) {
    const conn = await db.getConnection();

    try {
      await conn.execute(
        `
        UPDATE wallets
        SET coins = :coins,
            xp = :xp,
            gems = :gems
        WHERE user_id = :userId
        `,
        { coins, xp, gems, userId },
        { autoCommit: true }
      );

      return true;
    } finally {
      await conn.close();
    }
  }
};
