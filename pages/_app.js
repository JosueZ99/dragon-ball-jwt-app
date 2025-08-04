// pages/_app.js
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps, router }) {
  // Páginas que no necesitan Layout (login, register)
  const noLayoutPages = ["/login", "/register"];
  const showLayout = !noLayoutPages.includes(router.pathname);

  return (
    <AuthProvider>
      {showLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}
