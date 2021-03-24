const knex = require("../database/index");
const uniqid = require("uniqid");
const config = require("../configs/index");

module.exports = {
  async Store(req, res) {
    const {
      name,
      qtd_numbers,
      draw_date,
      draw_time,
      client_id,
      pix_keys,
      bank_transfer,
      description,
      raffle_value,
    } = req.body;
    const { filename } = req.file;
    try {
      const [id] = await knex("raffles")
        .insert({
          identify: uniqid("sorteio-"),
          name,
          qtd_numbers,
          draw_date,
          draw_time,
          client_id,
          pix_keys,
          bank_transfer,
          description,
          thumbnail: filename,
          raffle_value,
        })
        .returning("id");
      return res.status(201).json({
        message: "Sorteio cadastrado com sucesso, aguarde a liberação",
        id,
      });
    } catch (error) {
      console.log(error);
      let erros = {
        status: "400",
        type: "Erro no cadastro",
        message: "Ocorreu um erro ao cadastrar o sorteio",
        err: error.message,
      };
      return res.status(400).json(erros);
    }
  },

  async StoreBanner(req, res) {
    const { id } = req.params;
    const { filename } = req.file;

    try {
      await knex("raffles").where({ id: id }).update({ banner: filename });
      return res.status(201).json({ message: "Banner inserido com sucesso" });
    } catch (error) {
      console.log(error);
      let erros = {
        status: "400",
        type: "Erro no cadastro",
        message: "Ocorreu um erro ao cadastrar o banner do sorteio",
        err: error.message,
      };
      return res.status(400).json(erros);
    }
  },

  async ManageByAdmin(req, res) {
    const { id } = req.params;
    const { status, refused } = req.body;

    try {
      await knex("raffles").where({ id: id }).update({ status, refused });
      return res.status(201).json({ message: "Alteração concluída com êxito" });
    } catch (error) {
      let erros = {
        status: "400",
        type: "Erro no cadastro",
        message: "Ocorreu um erro ao editar as informações",
        err: error.message,
      };
      return res.status(400).json(erros);
    }
  },

  async ManageByClient(req, res) {
    const { id } = req.params;
    const { status, justify } = req.body;

    try {
      await knex("raffles").where({ id: id }).update({ status, justify });
      return res.status(201).json({ message: "Alteração concluída com êxito" });
    } catch (error) {
      let erros = {
        status: "400",
        type: "Erro no cadastro",
        message: "Ocorreu um erro ao editar as informações",
        err: error.message,
      };
      return res.status(400).json(erros);
    }
  },

  async ChangeDate(req, res) {
    const { id } = req.params;
    const { draw_date, draw_time } = req.body;

    try {
      await knex("raffles").where({ id: id }).update({ draw_date, draw_time });
      return res.status(201).json({ message: "Alteração concluída com êxito" });
    } catch (error) {
      let erros = {
        status: "400",
        type: "Erro no cadastro",
        message: "Ocorreu um erro ao editar as informações",
        err: error.message,
      };
      return res.status(400).json(erros);
    }
  },

  async Show(req, res) {
    try {
      const raffles = await knex
        .select("*")
        .from("raffles")
        .orderBy("created_at", "desc");
      return res.status(200).json(raffles);
    } catch (error) {
      let erros = {
        status: "400",
        type: "Erro no cadastro",
        message: "Ocorreu um erro ao buscar as informações",
        err: error.message,
      };
      return res.status(400).json(erros);
    }
  },

  async Find(req, res) {
    const { identify } = req.params;

    try {
      const raffle = await knex
        .select("*")
        .from("raffles")
        .where({ identify })
        .first();
      const numbers = await knex
        .select([
          "numbers.id",
          "number.raffle_id",
          "numbers.status",
          "numbers.number",
          "clients.name",
        ])
        .from("numbers")
        .where({ raffle_id: raffle.id })
        .innerJoin("clients", "clients.id", "numbers.client_id");
      return res.status(200).json({ raffle, numbers });
    } catch (error) {
      let erros = {
        status: "400",
        type: "Erro no cadastro",
        message: "Ocorreu um erro ao buscar as informações",
        err: error.message,
      };
      return res.status(400).json(erros);
    }
  },
};