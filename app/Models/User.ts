import { afterCreate, BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import Conta from "./Conta";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @afterCreate()
  public static async criaConta(user: User) {
    await Conta.create({ userId: user.id, saldo: 0 });
  }
}
