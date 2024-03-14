const getClientes = "SELECT * FROM clientes";

const getClienteById = "SELECT * FROM clientes WHERE id = $1";

const checkTelefoneExists = "SELECT s FROM clientes s WHERE s.telefone = $1";

const addCliente =
  "INSERT INTO clientes (nome, telefone, isalphaviewer, endereco, observacao) VALUES ($1, $2, $3, $4, $5)";

const updateCliente =
  "UPDATE clientes SET nome = $2, telefone = $3,  isalphaviewer = $4, endereco = $5, observacao = $6 WHERE id = $1";

const removeCliente = "DELETE FROM clientes WHERE id = $1";

module.exports = {
  getClientes,
  getClienteById,
  checkTelefoneExists,
  addCliente,
  removeCliente,
  updateCliente,
};