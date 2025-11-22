// routes/store.js
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const storeController = require("../controllers/storeController");
const itemsController = require("../controllers/itemsController");

// Listar itens da loja para usuário
router.get("/items", auth, itemsController.getAll);

// Comprar item
router.post("/purchase", auth, storeController.purchase);

module.exports = router;
