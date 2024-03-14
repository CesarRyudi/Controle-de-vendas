const { Router } = require("express");
const controller = require("./controller")

const router =  Router();

router.get("/", controller.getProdutos);
router.post("/", controller.addProduto);
router.get('/:id', controller.getProdutoById);
router.put("/:id", controller.updateProduto);
router.delete("/:id", controller.removeProduto);

module.exports = router;

