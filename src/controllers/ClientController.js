const knex = require("../database/index");
const uniqid = require("uniqid");

module.exports = {
  async Store(req, res) {
    const {
      name,
      cpf,
      phone,
      email,
      street,
      number,
      comp,
      district,
      cep,
      city,
      state,
    } = req.body;

    try {
      await knex("clients").insert({
        identify: uniqid("cliente-"),
        name,
        cpf,
        phone,
        email,
        street,
        number,
        comp,
        district,
        cep,
        city,
        state,
      });

      return res.status(201).json({ message: "Cadastro efetuado com sucesso" });
    } catch (error) {
      let erros = {
        status: "400",
        type: "Erro no cadastro",
        message: "Ocorreu um erro ao cadastrar o cliente",
        err: error.message,
      };
      return res.status(400).json(erros);
    }
  },

  async Login(req, res) {
    const { cpf } = req.body;
    try {
      const client = await knex.select("*").from("clients").where({ cpf });
      return res.status(200).json(client);
    } catch (error) {
      let erros = {
        status: "400",
        type: "Erro no login",
        message: "Ocorreu um erro ao fazer o login",
        err: error.message,
      };
      return res.status(400).json(erros);
    }
  },
};
