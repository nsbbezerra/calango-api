exports.up = function (knex) {
  return knex.schema.createTable("raffles", function (table) {
    table.increments("id");
    table.string("identify").notNullable().unique();
    table.string("name").notNullable();
    table.integer("qtd_numbers").notNullable();
    table.datetime("draw_date").notNullable();
    table.time("draw_time").notNullable();
    table
      .integer("client_id")
      .references("clients.id")
      .notNullable()
      .onDelete("CASCADE");
    table.json("pix_keys");
    table.json("bank_transfer");
    table.string("description").notNullable();
    table.string("justify");
    table.string("refused");
    table
      .enu("status", ["open", "cancel", "drawn", "waiting", "refused"])
      .notNullable()
      .defaultTo("waiting");
    table.integer("number_drawn");
    table.string("thumbnail");
    table.string("banner");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("raffles");
};
