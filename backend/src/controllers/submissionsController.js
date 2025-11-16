const submissionsModel = require('../models/submissions');
const walletsModel = require('../models/wallets');
const db = require('../db');
exports.create = async (req, res) => { const { goalId, evidenceUrl, comment } = req.body; const userId = req.user.id; const created = await submissionsModel.createSubmission({ userId, goalId, evidenceUrl, comment }); res.status(201).json(created); };
exports.listMine = async (req, res) => { const subs = await submissionsModel.findByUser(req.user.id); res.json(subs); };
exports.listAll = async (req, res) => { const subs = await submissionsModel.findByUser(); res.json(subs); };
exports.approve = async (req, res) => {
  const id = req.params.id;
  const AWARDED = { xp: 50, coins: 20, gems: 1 };
  const conn = await db.getConnection();
  try {
    await conn.execute('BEGIN NULL; END;');
    const submission = await submissionsModel.findById(id);
    if (!submission) return res.status(404).json({ message: 'Not found' });
    if (submission.STATUS === 'approved' || submission.status === 'approved') return res.status(400).json({ message: 'Already approved' });
    const wallet = await walletsModel.getWalletByUser(submission.USER_ID || submission.user_id || submission.userId);
    const newXp = (wallet.XP || wallet.xp || 0) + AWARDED.xp;
    const newCoins = (wallet.COINS || wallet.coins || 0) + AWARDED.coins;
    const newGems = (wallet.GEMS || wallet.gems || 0) + AWARDED.gems;
    await walletsModel.updateWalletByUser(submission.USER_ID || submission.user_id || submission.userId, { xp: newXp, coins: newCoins, gems: newGems });
    await submissionsModel.updateStatus(id, 'approved', { xp: AWARDED.xp, coins: AWARDED.coins, gems: AWARDED.gems });
    res.json({ message: 'Approved and credited' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error' });
  } finally {
    try { await conn.close(); } catch(e) {}
  }
};
exports.reject = async (req, res) => { const id = req.params.id; await submissionsModel.updateStatus(id, 'rejected', {}); res.json({ message: 'Rejected' }); };
exports.cancel = async (req, res) => { const id = req.params.id; const submission = await submissionsModel.findById(id); if (!submission) return res.status(404).json({ message: 'Not found' }); if ((submission.USER_ID || submission.user_id || submission.userId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' }); if ((submission.STATUS || submission.status) !== 'pending') return res.status(400).json({ message: 'Cannot cancel' }); await submissionsModel.deleteSubmission(id); res.status(204).send(); };
