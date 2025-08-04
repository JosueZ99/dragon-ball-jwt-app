// components/Navbar.js
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-orange-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-white text-2xl font-bold">
            🐉 Dragon Ball App
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/characters"
                  className="text-white hover:text-orange-200 transition-colors"
                >
                  Personajes
                </Link>
                <span className="text-orange-200">Hola, {user.username}!</span>
                <button
                  onClick={logout}
                  className="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-orange-200 transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800 transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
