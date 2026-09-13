"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "tema";
type Tema = "light" | "dark";

const ouvintes = new Set<() => void>();

function temaPreferidoPeloSistema(): Tema {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

function lerTemaResolvido(): Tema {
  try {
    const armazenado = localStorage.getItem(STORAGE_KEY);
    if (armazenado === "light" || armazenado === "dark") return armazenado;
  } catch {
    // localStorage indisponível (contexto inseguro, navegação privada, etc.) — cai para o sistema.
  }
  return temaPreferidoPeloSistema();
}

function obterSnapshotServidor(): Tema {
  return "light";
}

function inscrever(ouvir: () => void): () => void {
  ouvintes.add(ouvir);
  return () => ouvintes.delete(ouvir);
}

function definirTema(tema: Tema) {
  try {
    localStorage.setItem(STORAGE_KEY, tema);
  } catch {
    // localStorage indisponível — a preferência só não persiste entre sessões.
  }
  document.documentElement.setAttribute("data-theme", tema);
  ouvintes.forEach((ouvir) => ouvir());
}

export function AlternarTema() {
  const tema = useSyncExternalStore(inscrever, lerTemaResolvido, obterSnapshotServidor);

  // Reaplica o atributo no <html> sempre que o tema resolvido mudar. Em produção é
  // um no-op (o script inline no <head> já aplicou antes do paint); em desenvolvimento
  // corrige o atributo que o Strict Mode reseta ao remontar.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  return (
    <button
      type="button"
      onClick={() => definirTema(tema === "dark" ? "light" : "dark")}
      aria-label={tema === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground hover:bg-surface-hover"
    >
      {tema === "dark" ? "☀️ Claro" : "🌙 Escuro"}
    </button>
  );
}
