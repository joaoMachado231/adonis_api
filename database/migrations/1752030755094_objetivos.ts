import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Objetivos extends BaseSchema {
  protected tableName = "objetivos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("nome", 100).notNullable();
      table.decimal("valor_meta", 10, 2).notNullable();
      table.decimal("valor_atual", 10, 2).defaultTo(0);
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
