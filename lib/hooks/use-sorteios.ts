"use client";

import { useMemo } from "react";
import { useSorteiosContext } from "@/lib/sorteios-context";

export function useSorteios() {
  const { hidratado, sorteios, criarSorteio, removerSorteio } = useSorteiosContext();
  return { hidratado, sorteios, criarSorteio, removerSorteio };
}

export function useSorteio(id: string) {
  const contexto = useSorteiosContext();

  const sorteio = useMemo(
    () => contexto.sorteios.find((s) => s.id === id),
    [contexto.sorteios, id]
  );

  return {
    hidratado: contexto.hidratado,
    sorteio,
    adicionarCartela: (rotulo: string, numeros: number[]) =>
      contexto.adicionarCartela(id, rotulo, numeros),
    removerCartela: (cartelaId: string) => contexto.removerCartela(id, cartelaId),
    registrarNumero: (numero: number) => contexto.registrarNumero(id, numero),
    removerNumeroSorteado: (sequencia: number) => contexto.removerNumeroSorteado(id, sequencia),
  };
}
