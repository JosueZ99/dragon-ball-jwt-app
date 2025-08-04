// pages/characters/[id].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";

export default function CharacterDetail() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (id && isAuthenticated) {
      fetchCharacter();
    }
  }, [id, isAuthenticated]);

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`/api/characters/${id}`);

      if (response.data.success) {
        setCharacter(response.data.data);
      } else {
        setError("Personaje no encontrado");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error cargando el personaje");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
        <button
          onClick={() => router.push("/characters")}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
        >
          Volver a Personajes
        </button>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Personaje no encontrado</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.push("/characters")}
        className="mb-6 text-orange-600 hover:text-orange-700 font-medium"
      >
        ← Volver a Personajes
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={character.image || "/api/placeholder/400/600"}
              alt={character.name}
              className="w-full h-96 md:h-full object-cover"
              onError={(e) => {
                e.target.src = "/api/placeholder/400/600";
              }}
            />
          </div>

          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {character.name}
            </h1>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Información Básica
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>Raza:</strong> {character.race || "Desconocida"}
                  </p>
                  <p>
                    <strong>Género:</strong> {character.gender || "Desconocido"}
                  </p>
                  <p>
                    <strong>Planeta:</strong>{" "}
                    {character.planet || "Desconocido"}
                  </p>
                  <p>
                    <strong>Afiliación:</strong>{" "}
                    {character.affiliation || "Desconocida"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Nivel de Poder
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>Ki Base:</strong> {character.ki || "Desconocido"}
                  </p>
                  <p>
                    <strong>Ki Máximo:</strong>{" "}
                    {character.maxKi || "Desconocido"}
                  </p>
                </div>
              </div>
            </div>

            {character.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Descripción
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {character.description}
                </p>
              </div>
            )}

            {character.transformations &&
              character.transformations.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Transformaciones
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {character.transformations.map((transformation, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800">
                          {transformation.name}
                        </h4>
                        {transformation.image && (
                          <img
                            src={transformation.image}
                            alt={transformation.name}
                            className="w-full h-32 object-cover rounded mt-2"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
