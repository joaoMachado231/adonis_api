import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Contas extends BaseSchema {
  protected tableName = "contas";

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
      table.decimal("saldo", 12, 2).defaultTo(0);
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
