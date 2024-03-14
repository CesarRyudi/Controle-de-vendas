const express = require('express');
require("dotenv").config();
const clientesRoutes = require('./src/Clientes/routes')
const produtosRoutes = require("./src/Produtos/routes");
const vendasRoutes = require("./src/Vendas/routes");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello world!");
})

app.use('/api/v1/clientes', clientesRoutes);
app.use("/api/v1/produtos", produtosRoutes);
app.use("/api/v1/vendas", vendasRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));

