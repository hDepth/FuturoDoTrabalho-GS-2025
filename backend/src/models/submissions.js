const db = require('../db');
const oracledb = require('oracledb');

// Criar uma submissão
async function createSubmission({ userId, goalId, evidenceUrl, comment }) {
  const conn = await db.getConnection();

  try {
    const result = await conn.execute(
      `INSERT INTO submissions 
        (user_id, goal_id, evidence_url, comment, status)
       VALUES 
        (:userId, :goalId, :evidenceUrl, :comment, 'pending')
       RETURNING id INTO :id`,
      {
        userId,
        goalId,
        evidenceUrl,
        comment,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      },
      { autoCommit: true }
    );

    return {
      id: result.outBinds.id[0],
      userId,
      goalId,
      evidenceUrl,
      comment,
      status: "pending",
    };
  } finally {
    await conn.close();
  }
}

// Buscar submissões de um usuário
async function findByUser(userId) {
  const conn = await db.getConnection();

  try {
    const res = await conn.execute(
      `SELECT * 
         FROM submissions
        WHERE user_id = :userId
        ORDER BY created_at DESC`,
      { userId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return res.rows;
  } finally {
    await conn.close();
  }
}

// Buscar submissão específica
async function findById(id) {
  const conn = await db.getConnection();

  try {
    const res = await conn.execute(
      `SELECT * FROM submissions WHERE id = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return res.rows[0];
  } finally {
    await conn.close();
  }
}

// Atualizar status e recompensas
async function updateStatus(id, status, awarded) {
  const conn = await db.getConnection();

  try {
    const binds = {
      id,
      status,
      awarded_xp: awarded?.xp || 0,
      awarded_coins: awarded?.coins || 0,
      awarded_gems: awarded?.gems || 0,
    };

    await conn.execute(
      `UPDATE submissions
          SET status = :status,
              awarded_xp = :awarded_xp,
              awarded_coins = :awarded_coins,
              awarded_gems = :awarded_gems,
              updated_at = SYSTIMESTAMP
        WHERE id = :id`,
      binds,
      { autoCommit: true }
    );

    return true;
  } finally {
    await conn.close();
  }
}

// Deletar submissão
async function deleteSubmission(id) {
  const conn = await db.getConnection();

  try {
    await conn.execute(
      `DELETE FROM submissions WHERE id = :id`,
      { id },
      { autoCommit: true }
    );

    return true;
  } finally {
    await conn.close();
  }
}

module.exports = {
  createSubmission,
  findByUser,
  findById,
  updateStatus,
  deleteSubmission,
};
