// pages/api/characters/index.js
import { withAuth } from "@/middleware/auth";
import dragonBallAPI from "@/lib/dragonball-api";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { page = 1, limit = 10, search } = req.query;

    let characters;
    if (search) {
      characters = await dragonBallAPI.searchCharacters(search);
    } else {
      characters = await dragonBallAPI.getAllCharacters(
        parseInt(page),
        parseInt(limit)
      );
    }

    res.status(200).json({
      success: true,
      data: characters,
      user: req.user.username, // Incluir info del usuario autenticado
    });
  } catch (error) {
    console.error("Error obteniendo personajes:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
}

export default withAuth(handler);
