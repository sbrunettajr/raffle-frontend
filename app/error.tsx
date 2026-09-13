"use client";

export default function ErroPagina({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-10 text-center">
      <h1 className="text-xl font-semibold text-foreground">Algo deu errado</h1>
      <p className="text-sm text-muted">
        Ocorreu um erro inesperado. Seus sorteios e cartelas continuam salvos neste navegador.
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
      >
        Tentar novamente
      </button>
    </main>
  );
}
