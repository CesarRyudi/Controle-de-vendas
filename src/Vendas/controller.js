const pool = require("../../db");
const queries = require("./queries");

const getVendas = (req, res) => {
  pool.query(queries.getVendas, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getVendaById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getVendaById, [id], (error, vendaResult) => {
    if (!vendaResult.rows.length) res.send(`Venda não encontrado no id ${id}`);
    else {
      if (error) throw error;

      pool.query(queries.getClientes, (error, clientesResult) => {
        if (error) throw error;

        const clientes = clientesResult.rows;
        const venda = vendaResult.rows[0];

        const cliente = clientes.find(
          (cliente) => cliente.id === venda.id_clientes
        );

        const vendaComCliente = {
          cliente: cliente,
          ...venda,
        };

        pool.query(
          queries.getItensVendaByVendaId,
          [id],
          (error, itensResult) => {
            if (error) throw error;

            const itensVenda = itensResult.rows;

            vendaComCliente.itens_venda = itensVenda;

            res.status(200).json(vendaComCliente);
          }
        );
      });
    }
  });
};

const addVenda = (req, res) => {
  let erro = false;

  const {
    id_clientes,
    data_venda,
    entrega,
    valor_total,
    qt_cookies,
    forma_pagamento,
    observacao,
    produtos,
  } = req.body;

  pool.query(
    queries.checkDataExists,
    [id_clientes, data_venda],
    (error, results) => {
      if (error) {
        erro = true;
        console.error(error);
        res.status(500).send("Erro ao verificar a existência da venda.");
        return;
      }
      if (results.rows[0].count > 0) {
        res.send("Venda já cadastrada!" + JSON.stringify(results.rows));
      } else {
        // Add Venda to db
        pool.query(
          queries.addVenda,
          [
            id_clientes,
            data_venda,
            entrega,
            valor_total,
            qt_cookies,
            forma_pagamento,
            observacao,
          ],
          (error, vendaResults) => {
            if (error) {
              erro = true;
              console.log(error);
              res
                .status(500)
                .send(
                  "Erro ao verificar a existência da venda. -- ERROR:" + error
                );
              return;
            }
            // Get the ID of the inserted venda
            const vendaId = vendaResults.rows[0].id;

            // Insert produtos into itens_venda
            for (const [id_produto, quantidade] of Object.entries(produtos)) {
              pool.query(
                queries.addItemVenda,
                [vendaId, parseInt(id_produto), quantidade],
                (error, itemResults) => {
                  console.log("ID: -------", id_produto);
                  if (error) {
                    erro = error;
                  }
                }
              );
            }
            if (erro) {
              res
                .status(500)
                .send(
                  "Erro ao adicionar itens na tabela itens_venda. -- ERROR:"
                );
            } else {
              console.log("Chegamos aqui", erro);
              res.status(201).send("Venda cadastrada com sucesso!");
            }
          }
        );
      }
    }
  );
};

const updateVenda = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getVendaById, [id], (error, results) => {
    if (!results.rows.length) res.send(`Venda não encontrado no id ${id}`);
    else {
      const newVenda = Object.assign({}, results.rows[0], req.body);
      const {
        id_clientes,
        data_venda,
        entrega,
        valor_total,
        qt_cookies,
        forma_pagamento,
        observacao,
        produtos,
      } = newVenda;
      pool.query(
        queries.updateVenda,
        [
          id,
          id_clientes,
          data_venda,
          entrega,
          valor_total,
          qt_cookies,
          forma_pagamento,
          observacao,
          produtos,
        ],
        (error, results) => {
          if (error) throw error;
          const resposta = [{ msg: "Venda atualizado com sucesso!" }, newVenda];
          res.status(200).json(resposta);
        }
      );
    }
  });
};

const removeVenda = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getVendaById, [id], (error, results) => {
    if (!results.rows.length) res.send(`Venda não encontrado no id ${id}`);
    else
      pool.query(queries.removeVenda, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Venda removido com sucesso!");
      });
  });
};

module.exports = {
  getVendas,
  getVendaById,
  addVenda,
  removeVenda,
  updateVenda,
};
