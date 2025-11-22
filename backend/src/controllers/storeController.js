// src/controllers/storeController.js
const storeModel = require("../models/store");
const walletsModel = require("../models/wallets");
const rewardsModel = require("../models/userRewards");
const transactionsModel = require("../models/transactions");
const db = require("../db");

exports.purchase = async (req, res) => {
  let connection;
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    if (!itemId)
      return res.status(400).json({ message: "itemId é obrigatório" });

    // obtém conexão e inicia transação
    connection = await db.getConnection();
    // opcional: não necessário executar BEGIN por padrão, mas mantemos controle do commit/rollback
    // we'll control commits manually

    // 🔎 1. Verifica item (usar conexão para consistência)
    const item = await storeModel.getStoreItem(itemId, connection);
    if (!item) {
      await connection.close();
      return res.status(404).json({ message: "Item não encontrado" });
    }

    const itemPrice = Number(item.PRICE);
    if (isNaN(itemPrice)) {
      throw new Error("Preço do item inválido (NaN)");
    }

    if (Number(item.STOCK) <= 0)
      return res.status(400).json({ message: "Item sem estoque" });

    // 💰 2. Verifica wallet
    const wallet = await walletsModel.getWalletByUser(userId, connection);
    if (!wallet) {
      await connection.close();
      return res.status(404).json({ message: "Carteira não encontrada" });
    }

    const currentCoins = Number(wallet.COINS);
    if (isNaN(currentCoins)) {
      throw new Error("Saldo da carteira inválido (NaN)");
    }

    if (currentCoins < itemPrice) {
      await connection.close();
      return res.status(400).json({ message: "Moedas insuficientes" });
    }

    const newBalance = currentCoins - itemPrice;

    // 🔻 3. Atualiza wallet (na mesma conexão)
    await walletsModel.updateWalletByUser(userId, {
      coins: newBalance,
      xp: Number(wallet.XP || 0),
      gems: Number(wallet.GEMS || 0),
    }, connection);

    // 🔄 4. Cria transaction
    await transactionsModel.createTransaction({
      userId,
      amount: -itemPrice,
      type: "PURCHASE",
      description: `Compra do item ${item.NAME}`,
    }, connection);

    // 🎁 5. Cria reward pendente
    const reward = await rewardsModel.createReward({
      userId,
      itemId,
      status: "PENDING",
    }, connection);

    // 📦 6. Decrementa estoque (mesma conexão)
    const decOk = await storeModel.decrementStock(itemId, connection);
    if (!decOk) {
      // estoque já era 0 ou falha na atualização
      throw new Error("Falha ao decrementar estoque");
    }

    // 🔥 Commit final
    await connection.commit();

    res.status(201).json({
      message: "Item solicitado com sucesso",
      rewardId: reward.ID
    });

  } catch (err) {
    console.error("Erro na compra:", err);

    if (connection) {
      try {
        await connection.rollback();
      } catch (rbErr) {
        console.error("Erro ao dar rollback:", rbErr);
      }
    }

    // Se for erro conhecido, retornar status apropriado
    if (err.message && err.message.includes("NaN")) {
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ message: "Erro ao solicitar item" });
  } finally {
    if (connection) {
      try { await connection.close(); } catch (e) {}
    }
  }
};
