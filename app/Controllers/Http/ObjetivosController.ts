import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Conta from "App/Models/Conta";
import Objetivo from "App/Models/Objetivo";

export default class ObjetivosController {
  public async criar({ request, response }: HttpContextContract) {
    const { user_id, nome, valor_meta } = request.only([
      "user_id",
      "nome",
      "valor_meta",
    ]);

    const objetivo = await Objetivo.create({
      userId: user_id,
      nome,
      valorMeta: valor_meta,
      valorAtual: 0,
    });

    return response.created({ message: "Objetivo criado", objetivo });
  }

  public async excluir({ params, response }: HttpContextContract) {
    const objetivo = await Objetivo.findOrFail(params.id);

    const conta = await Conta.query().where("user_id", objetivo.userId).first();

    if (conta) {
      conta.saldo = Number(conta.saldo) + Number(objetivo.valorAtual);
      await conta.save();
    }

    await objetivo.delete();

    return response.ok({ message: "Objetivo excluído" });
  }

  public async adicionarSaldo({ request, response }: HttpContextContract) {
    const { objetivo_id, valor } = request.only(["objetivo_id", "valor"]);

    const objetivo = await Objetivo.findOrFail(objetivo_id);
    const conta = await Conta.query()
      .where("user_id", objetivo.userId)
      .firstOrFail();

    if (Number(conta.saldo) < Number(valor)) {
      return response.badRequest({ message: "Saldo insuficiente na conta" });
    }

    objetivo.valorAtual = Number(objetivo.valorAtual) + Number(valor);
    conta.saldo = Number(conta.saldo) - Number(valor);

    await objetivo.save();
    await conta.save();

    return response.ok({
      message: "Valor adicionado ao objetivo",
      objetivo,
      conta,
    });
  }

  public async listarPorUsuario({ request, response }: HttpContextContract) {
    const userId = request.input("user_id");

    const objetivos = await Objetivo.query()
      .where("user_id", userId)
      .orderBy("id", "desc");

    return response.ok({ objetivos });
  }

  public async removerSaldo({ request, response }: HttpContextContract) {
    const { objetivo_id, valor } = request.only(["objetivo_id", "valor"]);

    const objetivo = await Objetivo.findOrFail(objetivo_id);
    const conta = await Conta.query()
      .where("user_id", objetivo.userId)
      .firstOrFail();

    if (Number(objetivo.valorAtual) < Number(valor)) {
      return response.badRequest({
        message: "Valor excede o valor atual do objetivo",
      });
    }

    objetivo.valorAtual = Number(objetivo.valorAtual) - Number(valor);
    conta.saldo = Number(conta.saldo) + Number(valor);
    await objetivo.save();
    await conta.save();

    return response.ok({
      message: "Valor removido do objetivo",
      objetivo,
      conta,
    });
  }
}
