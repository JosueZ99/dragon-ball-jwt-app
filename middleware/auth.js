import { verifyToken } from "@/utils/jwt";
import { User } from "@/models/User";

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Token de acceso requerido",
        code: "NO_TOKEN",
      });
    }

    const decoded = verifyToken(token);

    // Verificar que el usuario aún existe en la base de datos
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        error: "Usuario no válido",
        code: "INVALID_USER",
      });
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };

    next();
  } catch (error) {
    let errorMessage = "Token inválido";
    let errorCode = "INVALID_TOKEN";

    if (error.message === "Token expirado") {
      errorMessage = "Token expirado";
      errorCode = "EXPIRED_TOKEN";
    }

    return res.status(403).json({
      error: errorMessage,
      code: errorCode,
    });
  }
};

// Función para usar en páginas de Next.js
export const withAuth = (handler) => {
  return async (req, res) => {
    return new Promise((resolve, reject) => {
      authenticateToken(req, res, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(handler(req, res));
        }
      });
    });
  };
};
