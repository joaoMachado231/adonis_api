import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
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
}
