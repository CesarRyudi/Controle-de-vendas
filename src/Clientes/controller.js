const pool = require("../../db");
const queries = require('./queries');


const getClientes = (req, res) =>{
    pool.query(queries.getClientes, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    });
};

const getClienteById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getClienteById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addCliente = (req, res) => {
    const {nome, telefone, isalphaviewer, endereco, observacao} = req.body;

    // Check if telefone exists
    pool.query(queries.checkTelefoneExists, [telefone], (error, results) => {
        if(results.rows.length) {
            res.send("Telefone já cadastrado");
        }
        // Add cliente to db
        else pool.query(queries.addCliente, [
          nome,
          telefone,
          isalphaviewer,
          endereco,
          observacao,
        ], (error, results) => {
            if (error) throw error;
            res.status(201).send("Cliente cadastrado com sucesso!");

        });
    })



    // pool.query(queries.getClienteById, [id], (error, results) => {
    //     if (error) throw error;
    //     res.status(200).json(results.rows);
    // });
};

const updateCliente = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getClienteById, [id], (error, results) => {
    if (!results.rows.length) res.send(`Cliente não encontrado no id ${id}`);
    else {
        const newCliente = Object.assign({}, results.rows[0], req.body);
        const { nome, telefone, isalphaviewer, endereco, observacao } =
          newCliente;
        pool.query(
            queries.updateCliente,
            [id, nome, telefone, isalphaviewer, endereco, observacao],
            (error, results) => {
            if (error) throw error;
            const resposta = [
                {msg:"Cliente atualizado com sucesso!"},
                newCliente
            ]
                res
              .status(200)
              .json(resposta);
            }
        );
    }
  });
};

const removeCliente = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getClienteById, [id], (error, results) => {
    if (!results.rows.length) res.send(`Cliente não encontrado no id ${id}`);
    
    else pool.query(queries.removeCliente, [id], (error, results) => {
       if (error) throw error;
         res.status(200).send("Cliente removido com sucesso!");
     });

  });
};

module.exports = {
  getClientes,
  getClienteById,
  addCliente,
  removeCliente,
  updateCliente,
};