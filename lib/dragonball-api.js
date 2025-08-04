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
      // Datos de fallback en caso de que la API no esté disponible
      return this.getFallbackCharacters();
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

  // Buscar personajes por nombre
  async searchCharacters(name) {
    try {
      const response = await this.client.get(
        `/characters?name=${encodeURIComponent(name)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error buscando personajes:", error);
      return { items: [], meta: { totalItems: 0 } };
    }
  }

  // Datos de fallback si la API no está disponible
  getFallbackCharacters() {
    return {
      items: [
        {
          id: 1,
          name: "Goku",
          ki: "60,000,000,000,000,000",
          maxKi: "90,000,000,000,000,000,000,000,000,000,000,000",
          race: "Saiyan",
          gender: "Male",
          description:
            "Goku es el protagonista principal de Dragon Ball. Es un Saiyan enviado a la Tierra.",
          image: "/api/placeholder/300/400",
          affiliation: "Z Fighter",
          planet: "Vegeta",
        },
        {
          id: 2,
          name: "Vegeta",
          ki: "54,000,000,000,000,000",
          maxKi: "19,400,000,000,000,000,000,000,000,000,000,000",
          race: "Saiyan",
          gender: "Male",
          description:
            "Vegeta es el príncipe de los Saiyans y uno de los personajes principales de Dragon Ball.",
          image: "/api/placeholder/300/400",
          affiliation: "Z Fighter",
          planet: "Vegeta",
        },
        {
          id: 3,
          name: "Piccolo",
          ki: "2,000,000,000",
          maxKi: "500,000,000,000,000,000",
          race: "Namekian",
          gender: "Male",
          description:
            "Piccolo es un Namekiano y uno de los guerreros Z más poderosos.",
          image: "/api/placeholder/300/400",
          affiliation: "Z Fighter",
          planet: "Namek",
        },
      ],
      meta: {
        totalItems: 3,
        itemCount: 3,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    };
  }

  getFallbackCharacter(id) {
    const characters = this.getFallbackCharacters().items;
    return characters.find((char) => char.id === parseInt(id)) || characters[0];
  }
}

export default new DragonBallAPI();
