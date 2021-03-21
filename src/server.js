require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, function () {
  console.log(`App rodando na porta ${port}, para cancelar pressione CTRL+C`);
});
