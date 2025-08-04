import axios from "axios";

const DRAGONBALL_API_BASE = "https://dragonball-api.com/api";

class DragonBallAPI {
  constructor() {
    this.client = axios.create({
      baseURL: DRAGONBALL_API_BASE,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Obtener todos los personajes
  async getAllCharacters(page = 1, limit = 10) {
    try {
      const response = await this.client.get(
        `/characters?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error obteniendo personajes:", error);
      return this.getFallbackCharacters(page, limit);
    }
  }

  // Obtener un personaje por ID
  async getCharacterById(id) {
    try {
      const response = await this.client.get(`/characters/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo personaje:", error);
      return this.getFallbackCharacter(id);
    }
  }

  // FUNCIÓN DE BÚSQUEDA
  async searchCharacters(searchTerm) {
    const apiEndpoints = [`/characters?name=${encodeURIComponent(searchTerm)}`];

    for (const endpoint of apiEndpoints) {
      try {
        const response = await this.client.get(endpoint);
        if (
          response.data &&
          (response.data.items ||
            response.data.length > 0 ||
            response.data.name)
        ) {
          // Normalizar respuesta dependiendo del formato
          if (response.data.items) {
            return response.data; // Formato con paginación
          } else if (Array.isArray(response.data)) {
            return {
              items: response.data,
              meta: { totalItems: response.data.length },
            };
          } else if (response.data.name) {
            return { items: [response.data], meta: { totalItems: 1 } };
          }
        }
      } catch (endpointError) {
        console.error(`Error en endpoint ${endpoint}:`, endpointError);
        continue;
      }
    }
  }
  catch(error) {
    console.error("Error en API de búsqueda:", error);
  }
}

export default new DragonBallAPI();
