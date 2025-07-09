import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Despesas extends BaseSchema {
  protected tableName = "despesas";

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
      table.decimal("valor", 10, 2).notNullable();
      table
        .timestamp("data", { useTz: true })
        .notNullable()
        .defaultTo(this.now());
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
