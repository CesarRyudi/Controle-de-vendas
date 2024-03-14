const { Router } = require("express");
const controller = require("./controller")

const router =  Router();

router.get("/", controller.getVendas);
router.post("/", controller.addVenda);
router.get('/:id', controller.getVendaById);
router.put("/:id", controller.updateVenda);
router.delete("/:id", controller.removeVenda);

module.exports = router;

