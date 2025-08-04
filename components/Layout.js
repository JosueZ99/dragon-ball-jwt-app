// components/Layout.js
import { useAuth } from "@/hooks/useAuth";
import Navbar from "./Navbar";
import LoadingSpinner from "./LoadingSpinner";

export default function Layout({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
