const express = require('express');
require("dotenv").config();
const cors = require("cors");

const clientesRoutes = require('./src/Clientes/routes')
const produtosRoutes = require("./src/Produtos/routes");
const vendasRoutes = require("./src/Vendas/routes");

const app = express();
const port = process.env.PORT;

app.use(express.json());

const allowedOrigins = [
  "https://haru-cookies.vercel.app/",
  "http://localhost:5173/",
];

const corsOptions = {
  origin: allowedOrigins,
};
app.use(cors(corsOptions));



app.get("/", (req, res) => {
    res.status(200).send("Hello world!");
})


// app.use("/clientes", clientesRoutes);

app.use('/api/v1/clientes', clientesRoutes);
app.use("/api/v1/produtos", produtosRoutes);
app.use("/api/v1/vendas", vendasRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));

