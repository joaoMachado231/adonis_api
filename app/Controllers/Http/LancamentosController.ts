import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Despesa from "App/Models/Despesa";
import Lucro from "App/Models/Lucro";
import { DateTime } from "luxon";

export default class LancamentosController {
  public async adicionarLucro({ request, response }: HttpContextContract) {
    const { user_id, valor } = request.only(["user_id", "valor"]);

    const lucro = await Lucro.create({
      userId: user_id,
      valor,
      data: DateTime.local(),
    });

    return response.created({
      message: "Lucro adicionado com sucesso",
      lucro,
    });
  }

  public async adicionarDespesa({ request, response }: HttpContextContract) {
    const { user_id, valor } = request.only(["user_id", "valor"]);

    const despesa = await Despesa.create({
      userId: user_id,
      valor,
      data: DateTime.local(),
    });

    return response.created({
      message: "Despesa adicionada com sucesso",
      despesa,
    });
  }
}
