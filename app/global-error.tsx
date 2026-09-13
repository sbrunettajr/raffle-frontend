"use client";

// Não depende do tema/CSS do app (globals.css, SorteiosProvider) de propósito:
// este é o último recurso quando até o layout raiz falha, então precisa
// funcionar sozinho mesmo que o que quebrou seja o próprio sistema de tema.
export default function ErroGlobal({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Algo deu errado</h1>
          <p style={{ fontSize: 14, color: "#737373", marginBottom: 16 }}>
            Ocorreu um erro inesperado ao carregar o app. Seus dados continuam salvos neste
            navegador.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              borderRadius: 6,
              background: "#171717",
              color: "#fff",
              padding: "8px 16px",
              fontSize: 14,
              border: "none",
              cursor: "pointer",
            }}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
