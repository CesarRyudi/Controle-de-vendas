const pool = require("../../db");
const queries = require('./queries');


const getProdutos = (req, res) =>{
    pool.query(queries.getProdutos, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    });
};

const getProdutoById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getProdutoById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addProduto = (req, res) => {
    const {nome, recheio, descricao, preco, preco_kit} = req.body;

    // Check if telefone exists
    pool.query(queries.checkNomeExists, [nome], (error, results) => {
        if(results.rows.length) {
            res.send("Nome já cadastrado");
        }
        // Add Produto to db
        else pool.query(
          queries.addProduto,
          [nome, recheio, descricao, preco, preco_kit],
          (error, results) => {
            if (error) throw error;
            res.status(201).send("Produto cadastrado com sucesso!");
          }
        );
    })



    // pool.query(queries.getProdutoById, [id], (error, results) => {
    //     if (error) throw error;
    //     res.status(200).json(results.rows);
    // });
};

const updateProduto = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getProdutoById, [id], (error, results) => {
    if (!results.rows.length) res.send(`Produto não encontrado no id ${id}`);
    else {
        const newProduto = Object.assign({}, results.rows[0], req.body);
        const { nome, recheio, descricao, preco, preco_kit } = newProduto;
        pool.query(
          queries.updateProduto,
          [id, nome, recheio, descricao, preco, preco_kit],
          (error, results) => {
            if (error) throw error;
            const resposta = [
              { msg: "Produto atualizado com sucesso!" },
              newProduto,
            ];
            res.status(200).json(resposta);
          }
        );
    }
  });
};

const removeProduto = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getProdutoById, [id], (error, results) => {
    if (!results.rows.length) res.send(`Produto não encontrado no id ${id}`);
    
    else pool.query(queries.removeProduto, [id], (error, results) => {
       if (error) throw error;
         res.status(200).send("Produto removido com sucesso!");
     });

  });
};

module.exports = {
  getProdutos,
  getProdutoById,
  addProduto,
  removeProduto,
  updateProduto,
};