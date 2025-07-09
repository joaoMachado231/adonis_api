import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Conta from "App/Models/Conta";
import Despesa from "App/Models/Despesa";
import Lucro from "App/Models/Lucro";
import User from "App/Models/User";

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return response.created({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }

  public async getInfoUser({ request, response }: HttpContextContract) {
    const userId = request.input("user_id");

    const conta = await Conta.query().where("user_id", userId).firstOrFail();
    const lucros: any[] = await Lucro.query().where("user_id", userId);

    let lucroTotal = 0;

    if (lucros) {
      lucros.forEach((lucro) => {
        lucroTotal += Number(lucro.valor);
      });
    }

    const despesas: any[] = await Despesa.query().where("user_id", userId);

    let despesaTotal = 0;

    if (despesas) {
      despesas.forEach((despesa) => {
        despesaTotal += Number(despesa.valor);
      });
    }

    return response.ok({
      conta,
      lucro: lucroTotal,
      despesa: despesaTotal,
    });
  }
}
