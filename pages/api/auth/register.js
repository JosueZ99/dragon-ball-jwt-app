// pages/api/auth/register.js
import { User } from "@/models/User";
import { generateToken } from "@/utils/jwt";
import { validatePassword } from "@/utils/password";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { username, email, password } = req.body;

    // Validaciones básicas
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Username, email y password son requeridos",
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Formato de email inválido",
      });
    }

    // Validar contraseña
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: "Contraseña no válida",
        details: passwordValidation.errors,
      });
    }

    // Crear usuario
    const newUser = await User.create({ username, email, password });

    // Generar token JWT
    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.created_at,
      },
      token,
    });
  } catch (error) {
    console.error("Error en registro:", error);

    if (error.message === "El usuario o email ya existe") {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: "Error interno del servidor" });
  }
}
