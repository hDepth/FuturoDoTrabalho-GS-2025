require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// -------------------------------
// 🔐 Rotas de autenticação / usuários
// -------------------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/wallet", require("./routes/wallet"));
app.use("/api/ranking", require("./routes/ranking"));
app.use("/api/submissions", require("./routes/submissions"));
app.use("/api/redeem", require("./routes/redeem"));
app.use("/api/goals", require("./routes/goals"));

// -------------------------------
// 🛒 Rotas da Loja
// -------------------------------
app.use("/api/store", require("./routes/store"));                 // compra / itens da loja
app.use("/api/admin/store", require("./routes/adminStore"));      // admin: itens + recompensas

// -------------------------------
// 🎁 Rotas de itens / recompensas do usuário
// -------------------------------
app.use("/api/items", require("./routes/items"));                 // público
app.use("/api/rewards", require("./routes/rewards"));             // usuário

// -------------------------------
// 💰 Rotas de transações
// -------------------------------
app.use("/api/transactions", require("./routes/transactions"));   // mine + admin

// -------------------------------
app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(port, () => {
  console.log("Server listening on port", port);
});
