import Route from "@ioc:Adonis/Core/Route";

Route.post("/users/create", "UsersController.create");
Route.post("/login", "AuthController.login");
Route.post("/profit", "LancamentosController.adicionarLucro");
Route.post("/expense", "LancamentosController.adicionarDespesa");
