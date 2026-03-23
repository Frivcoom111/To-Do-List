import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const auth = async (request, response, next) => {
  try {
    // Pegando token no header.
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(401).json({ message: "Token não fornecido." });
    }

    // Retirando o Bearer do token
    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, JWT_SECRET);

    request.userId = decoded.id;

    next();
  } catch (error) {
    return response
      .status(401)
      .json({ message: "Token inválido ou expirado." });
  }
};
