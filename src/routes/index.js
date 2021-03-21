const express = require("express");
const router = express.Router();

const ClientController = require("../controllers/ClientController");

/** CLIENTES */
router.post("/clients", ClientController.Store);
router.post("/login", ClientController.Login);

module.exports = router;
