// pages/index.js
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ¡Bienvenido a Dragon Ball App! 🐉
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Hola {user.username}, explora el universo de Dragon Ball
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            Explora Personajes
          </h2>
          <p className="text-gray-600 mb-4">
            Descubre información detallada sobre todos los personajes del
            universo Dragon Ball.
          </p>
          <button
            onClick={() => router.push("/characters")}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Ver Personajes
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Tu Perfil</h2>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Usuario:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Miembro desde:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-2">
          Aplicación con Autenticación JWT
        </h3>
        <p>
          Esta aplicación demuestra la implementación de JWT (JSON Web Tokens)
          para autenticación segura. Todas las rutas están protegidas y
          requieren autenticación para acceder al contenido.
        </p>
      </div>
    </div>
  );
}
