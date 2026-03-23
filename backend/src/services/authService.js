import User from "../models/UserModel.js";
import { compareHashPassword } from "../utils/compareHashPassword.js";
import { generateHashPassword } from "../utils/generateHashPassword.js";
import { generateToken } from "../utils/generateToken.js";

class AuthService {
  constructor() {
    this.user = new User();
  }

  async register(name, email, password) {
    // Validação dos campos.
    if (!name || !email || !password)
      throw new Error("Todos os campos são obrigatórios.");

    // Validação se o usuário já existe.
    const userExists = await this.user.findByEmail(email);
    if (userExists) throw new Error("Usuário já existe.");

    // Gerando Hash da senha.
    const hashPassword = await generateHashPassword(password);

    // Criando usuário.
    const newUser = await this.user.create(name, email, hashPassword);
    if (!newUser) throw new Error("Erro ao criar usuário.");

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }

  async login(email, password) {
    // validação dos campos.
    if (!email || !password)
      throw new Error("Todos os campos são obrigatórios.");

    // Verificar se usuário existe.
    const userExists = await this.user.findByEmail(email);
    if (!userExists) throw new Error("Usuário não existe.");

    // Comparar hashPassword
    const isMatch = await compareHashPassword(password, userExists.password); // Senha digitada/Senha banco de dados~
    if (!isMatch) throw new Error("Senha inválida.");

    // Token gerado
    const token = await generateToken(userExists.id);

    return {
      token,
      user: {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
      },
    };
  }
}

export default new AuthService();
