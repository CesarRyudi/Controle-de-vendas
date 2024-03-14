const getProdutos = "SELECT * FROM produtos ORDER BY id"; 

const getProdutoById = "SELECT * FROM produtos WHERE id = $1";

const checkNomeExists = "SELECT s FROM produtos s WHERE s.nome = $1";

const addProduto =
  "INSERT INTO produtos (nome, recheio, descricao, preco, preco_kit) VALUES ($1, $2, $3, $4, $5)";

const updateProduto =
  "UPDATE produtos SET nome = $2, recheio = $3,  descricao = $4, preco = $5, preco_kit = $6 WHERE id = $1";

const removeProduto = "DELETE FROM produtos WHERE id = $1";

module.exports = {
  getProdutos,
  getProdutoById,
  checkNomeExists,
  addProduto,
  removeProduto,
  updateProduto,
};