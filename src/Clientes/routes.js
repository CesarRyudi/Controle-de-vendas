const { Router } = require("express");
const controller = require("./controller")

const router =  Router();

router.get("/", controller.getClientes);
router.post("/", controller.addCliente);
router.get('/:id', controller.getClienteById);
router.put("/:id", controller.updateCliente);
router.delete("/:id", controller.removeCliente);

module.exports = router;

