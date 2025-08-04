// pages/api/characters/[id].js
import { withAuth } from "@/middleware/auth";
import dragonBallAPI from "@/lib/dragonball-api";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "ID del personaje requerido",
      });
    }

    const character = await dragonBallAPI.getCharacterById(id);

    if (!character) {
      return res.status(404).json({
        success: false,
        error: "Personaje no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: character,
      user: req.user.username,
    });
  } catch (error) {
    console.error("Error obteniendo personaje:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
}

export default withAuth(handler);
