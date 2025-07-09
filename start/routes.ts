import Route from "@ioc:Adonis/Core/Route";

Route.post("/users/create", "UsersController.create");
Route.post("/login", "AuthController.login");
Route.post("/profit", "LancamentosController.adicionarLucro");
Route.post("/expense", "LancamentosController.adicionarDespesa");
Route.get("/objetivos", "ObjetivosController.listarPorUsuario");
Route.post("/objetivos/create", "ObjetivosController.criar");
Route.delete("/objetivos/:id", "ObjetivosController.excluir");
Route.post("/objetivos/adicionar-saldo", "ObjetivosController.adicionarSaldo");
Route.post("/objetivos/remover-saldo", "ObjetivosController.removerSaldo");
Route.get("/info", "UsersController.getInfoUser");
