import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class AuthController {
  public async login({ request, response }: HttpContextContract) {
    const { email, password } = request.only(["email", "password"]);

    const user = await User.findBy("email", email);

    if (!user || user.password !== password) {
      return response.unauthorized({ message: "Credenciais inválidas" });
    }

    return {
      message: "Login bem-sucedido",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
