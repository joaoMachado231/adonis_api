import Route from "@ioc:Adonis/Core/Route";

Route.post("/users/create", "UsersController.create");
Route.post("/login", "AuthController.login");
