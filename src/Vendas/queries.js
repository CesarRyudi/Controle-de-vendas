const getVendas = "SELECT * FROM vendas ORDER BY id"; 

const getVendaById = "SELECT * FROM vendas WHERE id = $1";

const checkDataExists =
  "SELECT COUNT(*) AS count FROM vendas WHERE id_clientes = $1 AND data_venda = $2";

const addVenda =
  "INSERT INTO vendas (id_clientes, data_venda, entrega, valor_total, qt_cookies, forma_pagamento, observacao) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";

const updateVenda =
  "UPDATE vendas SET id_clientes = $2, data_venda = $3,  entrega = $4, valor_total = $5, qt_cookies = $6, forma_pagamento = $7, observacao = $8 WHERE id = $1";

const removeVenda = "DELETE FROM vendas WHERE id = $1";

const getClientes = "SELECT * FROM clientes";

const addItemVenda = "INSERT INTO itens_venda (id_venda, id_produto, quantidade) VALUES ($1, $2, $3)";

const getItensVendaByVendaId = "SELECT produtos.*, itens_venda.quantidade FROM itens_venda JOIN produtos ON itens_venda.id_produto = produtos.id WHERE itens_venda.id_venda = $1"; 

module.exports = {
  getVendas,
  getVendaById,
  checkDataExists,
  addVenda,
  removeVenda,
  updateVenda,
  getClientes,
  addItemVenda,
  getItensVendaByVendaId,
};