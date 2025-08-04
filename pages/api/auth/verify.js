// pages/api/auth/verify.js
import { User } from "@/models/User";
import { verifyToken } from "@/utils/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        valid: false,
        error: "Token requerido",
      });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        valid: false,
        error: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      valid: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("Error verificando token:", error);
    res.status(401).json({
      valid: false,
      error: error.message || "Token inválido",
    });
  }
}
