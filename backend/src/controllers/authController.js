import authService from "../services/authService.js";

// Classe AuthController e seus métodos.
class AuthController {
  async register(request, response, next) {
    try {
      const { name, email, password } = request.body; // Desestruturação do body

      const userCreated = await authService.register(name, email, password); // Para passar por parâmetro
      if (!userCreated) {
        response.status(404).json({ message: "Erro ao criar usuário." });
      }

      return response.status(201).json({
        message: "Usuário criado com sucesso.",
        user: userCreated.user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(request, response, next) {
    try {
      const { email, password } = request.body;

      const user = await authService.login(email, password);
      if (!user) {
        return response.status(404).json({ message: "Erro ao logar." });
      }

      response.status(200).json({
        message: "Logado com sucesso.",
        token: user.token,
        user: user.user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();