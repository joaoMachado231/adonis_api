import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Objetivo extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public nome: string;

  @column()
  public valorMeta: number;

  @column()
  public valorAtual: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
