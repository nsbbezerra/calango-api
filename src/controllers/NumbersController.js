const knex = require("../database/index");
const date_fns = require("date-fns");

module.exports = {
  async Buy(req, res) {
    const { raffle_id, client_id, numbers, expiration_date } = req.body;
    const expiration = date_fns.addHours(new Date(expiration_date), 24);
    try {
      async function SaveNumber(num) {
        await knex("numbers").insert({
          raffle_id,
          client_id,
          expiration_date: expiration,
          number: num,
        });
      }
      await numbers.forEach((element) => {
        SaveNumber(parseInt(element));
      });
      return res.status(201).json({
        message:
          "Números reservados com sucesso, entre em contado com o administrador para a liberação.",
      });
    } catch (error) {
      let erros = {
        status: "400",
        type: "Erro no login",
        message: "Ocorreu um erro ao reservar os números",
        err: error.message,
      };
      return res.status(400).json(erros);
    }
  },

  async Find(req, res) {
    const { id } = req.body;
    try {
      const raffle = await knex
        .select("*")
        .from("raffles")
        .where({ identify: id });
      const validate = await knex
        .select("*")
        .from("numbers")
        .where({ raffle_id: raffle.id });
      async function revalidate(id) {
        await knex("numbers").where({ id: id }).update({ status: "free" });
      }
      await validate.forEach((element) => {
        if (date_fns.isAfter(new Date(element.expiration_date), new Date())) {
          revalidate(element.id);
        }
      });
      const numbers = await knex
        .select("*")
        .from("numbers")
        .where({ raffle_id: id })
        .innerJoin("clients", "clients.id", "numbers.client_id");
      return res.status(200).json({ numbers, raffle });
    } catch (error) {
      let erros = {
        status: "400",
        type: "Erro no login",
        message: "Ocorreu um erro ao buscar os números",
        err: error.message,
      };
      return res.status(400).json(erros);
    }
  },
};
