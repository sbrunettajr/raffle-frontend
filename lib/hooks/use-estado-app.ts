"use client";

import { useSyncExternalStore } from "react";
import type { EstadoApp } from "@/lib/types";
import { ESTADO_INICIAL, lerEstado, salvarEstado } from "@/lib/storage";

type Ouvinte = () => void;

const ouvintes = new Set<Ouvinte>();
let cache: EstadoApp | null = null;

function obterSnapshot(): EstadoApp {
  if (cache === null) {
    cache = lerEstado();
  }
  return cache;
}

function obterSnapshotServidor(): EstadoApp {
  return ESTADO_INICIAL;
}

function inscrever(ouvir: Ouvinte): () => void {
  ouvintes.add(ouvir);
  return () => {
    ouvintes.delete(ouvir);
  };
}

/** Lê o estado atual sem se inscrever para re-renders (uso fora do render, em handlers). */
export function obterEstadoAtual(): EstadoApp {
  return obterSnapshot();
}

/** Aplica uma atualização, persiste em localStorage e notifica todos os componentes inscritos. */
export function atualizarEstadoApp(atualizador: (atual: EstadoApp) => EstadoApp): EstadoApp {
  const novo = atualizador(obterSnapshot());
  cache = novo;
  salvarEstado(novo);
  ouvintes.forEach((ouvir) => ouvir());
  return novo;
}

/** Estado reativo: re-renderiza o componente quando o estado mudar. */
export function useEstadoApp(): EstadoApp {
  return useSyncExternalStore(inscrever, obterSnapshot, obterSnapshotServidor);
}
