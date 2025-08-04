// components/CharacterCard.js
import Link from "next/link";
import Image from "next/image";

export default function CharacterCard({ character }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64 flex items-center justify-center">
        <img
          src={character.image || "/api/placeholder/300/400"}
          alt={character.name}
          className="h-full object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/300/400";
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {character.name}
        </h3>

        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p>
            <strong>Raza:</strong> {character.race || "Desconocida"}
          </p>
          <p>
            <strong>Planeta:</strong> {character.planet || "Desconocido"}
          </p>
          <p>
            <strong>Ki:</strong> {character.ki || "Desconocido"}
          </p>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {character.description || "Sin descripción disponible."}
        </p>

        <Link
          href={`/characters/${character.id}`}
          className="inline-block bg-orange-600 text-white px-4 py-2 rounded font-medium hover:bg-orange-700 transition-colors"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
