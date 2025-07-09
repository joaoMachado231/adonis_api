import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Conta from "./Conta";
import User from "./User";

export default class Despesa extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public valor: number;

  @column.date()
  public data: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  // Hook para atualizar saldo da conta ao criar despesa
  public static async afterCreate(despesa: Despesa) {
    const conta = await Conta.query().where("user_id", despesa.userId).first();
    if (conta) {
      conta.saldo -= despesa.valor;
      await conta.save();
    }
  }
}
