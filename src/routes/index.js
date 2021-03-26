const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../configs/multer");

const ClientController = require("../controllers/ClientController");
const ConfigsController = require("../controllers/ConfigsController");
const SiteController = require("../controllers/SiteController");
const RaffleController = require("../controllers/RaffleController");
const NumbersController = require("../controllers/NumbersController");

/** CLIENTES */
router.post("/clients", ClientController.Store);
router.post("/login", ClientController.Login);
router.put("/bannadmin/:id", ClientController.SetBannAdmin);
router.put("/bannclient/:id", ClientController.SetBannClient);
router.put("/clients/:id", ClientController.Update);
router.get("/clients", ClientController.Show);

/** CONFIGS */
router.post("/configs", ConfigsController.Store);
router.get("/configs", ConfigsController.Show);
router.put("/configs/:id", ConfigsController.Update);

/** SITE */
router.get("/site", SiteController.Show);

/** RAFFLES */
router.post(
  "/raffle",
  multer(multerConfig).single("thumbnail"),
  RaffleController.Store
);
router.put(
  "/banner/:id",
  multer(multerConfig).single("banner"),
  RaffleController.StoreBanner
);
router.get("/raffles", RaffleController.Show);
router.get("/findRaffle", RaffleController.Find);
router.get("/numbers/:id", RaffleController.FindNumbers);
router.get("/findDesk", RaffleController.FindDesk);
router.put("/manAdmin/:id", RaffleController.ManageByAdmin);

/** NUMEROS */
router.post("/numbers", NumbersController.Buy);

module.exports = router;
