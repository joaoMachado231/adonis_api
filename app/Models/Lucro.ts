import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Conta from "./Conta";
import User from "./User";

export default class Lucro extends BaseModel {
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

  // Hook para atualizar saldo da conta ao criar lucro
  public static async afterCreate(lucro: Lucro) {
    const conta = await Conta.query().where("user_id", lucro.userId).first();
    if (conta) {
      conta.saldo += lucro.valor;
      await conta.save();
    }
  }
}
