const express = require("express");
const router = express.Router();

const ClientController = require("../controllers/ClientController");

/** CLIENTES */
router.post("/clients", ClientController.Store);
router.post("/login", ClientController.Login);
router.put("/bannadmin/:id", ClientController.SetBannAdmin);
router.put("/bannclient/:id", ClientController.SetBannClient);

module.exports = router;
