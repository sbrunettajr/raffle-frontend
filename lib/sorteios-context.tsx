"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import type { Cartela, NumeroSorteado, Resultado, Sorteio } from "@/lib/types";
import { atualizarEstadoApp, obterEstadoAtual, useEstadoApp } from "@/lib/hooks/use-estado-app";
import { useHidratado } from "@/lib/hooks/use-hidratado";
import { gerarId } from "@/lib/utils/ids";

type SorteiosContextValor = {
  hidratado: boolean;
  sorteios: Sorteio[];
  criarSorteio: (nome: string) => Sorteio;
  removerSorteio: (id: string) => void;
  adicionarCartela: (sorteioId: string, rotulo: string, numeros: number[]) => Resultado;
  removerCartela: (sorteioId: string, cartelaId: string) => void;
  registrarNumero: (sorteioId: string, numero: number) => Resultado;
  removerNumeroSorteado: (sorteioId: string, sequencia: number) => void;
};

const SorteiosContext = createContext<SorteiosContextValor | null>(null);

export function SorteiosProvider({ children }: { children: ReactNode }) {
  const estado = useEstadoApp();
  const hidratado = useHidratado();

  const criarSorteio = useCallback((nome: string): Sorteio => {
    const novoSorteio: Sorteio = {
      id: gerarId(),
      nome: nome.trim() || "Sorteio sem nome",
      criadoEm: new Date().toISOString(),
      proximaSequencia: 1,
      cartelas: [],
      numerosSorteados: [],
    };

    atualizarEstadoApp((atual) => ({
      ...atual,
      sorteios: [...atual.sorteios, novoSorteio],
    }));

    return novoSorteio;
  }, []);

  const removerSorteio = useCallback((id: string) => {
    atualizarEstadoApp((atual) => ({
      ...atual,
      sorteios: atual.sorteios.filter((sorteio) => sorteio.id !== id),
    }));
  }, []);

  const adicionarCartela = useCallback(
    (sorteioId: string, rotulo: string, numeros: number[]): Resultado => {
      const numerosUnicos = Array.from(new Set(numeros));
      if (numerosUnicos.length === 0) {
        return { ok: false, motivo: "Informe ao menos um número válido." };
      }

      const novaCartela: Cartela = {
        id: gerarId(),
        rotulo: rotulo.trim() || "Sem rótulo",
        numeros: numerosUnicos,
        criadaEm: new Date().toISOString(),
      };

      atualizarEstadoApp((atual) => ({
        ...atual,
        sorteios: atual.sorteios.map((sorteio) =>
          sorteio.id === sorteioId
            ? { ...sorteio, cartelas: [...sorteio.cartelas, novaCartela] }
            : sorteio
        ),
      }));

      return { ok: true };
    },
    []
  );

  const removerCartela = useCallback((sorteioId: string, cartelaId: string) => {
    atualizarEstadoApp((atual) => ({
      ...atual,
      sorteios: atual.sorteios.map((sorteio) =>
        sorteio.id === sorteioId
          ? { ...sorteio, cartelas: sorteio.cartelas.filter((cartela) => cartela.id !== cartelaId) }
          : sorteio
      ),
    }));
  }, []);

  const registrarNumero = useCallback((sorteioId: string, numero: number): Resultado => {
    const sorteio = obterEstadoAtual().sorteios.find((s) => s.id === sorteioId);
    if (!sorteio) {
      return { ok: false, motivo: "Sorteio não encontrado." };
    }
    if (sorteio.numerosSorteados.some((n) => n.numero === numero)) {
      return { ok: false, motivo: `O número ${numero} já foi registrado.` };
    }

    const novoNumero: NumeroSorteado = {
      numero,
      sequencia: sorteio.proximaSequencia,
      criadoEm: new Date().toISOString(),
    };

    atualizarEstadoApp((atual) => ({
      ...atual,
      sorteios: atual.sorteios.map((s) =>
        s.id === sorteioId
          ? {
              ...s,
              proximaSequencia: s.proximaSequencia + 1,
              numerosSorteados: [...s.numerosSorteados, novoNumero],
            }
          : s
      ),
    }));

    return { ok: true };
  }, []);

  const removerNumeroSorteado = useCallback((sorteioId: string, sequencia: number) => {
    atualizarEstadoApp((atual) => ({
      ...atual,
      sorteios: atual.sorteios.map((sorteio) =>
        sorteio.id === sorteioId
          ? {
              ...sorteio,
              numerosSorteados: sorteio.numerosSorteados.filter((n) => n.sequencia !== sequencia),
            }
          : sorteio
      ),
    }));
  }, []);

  const valor: SorteiosContextValor = {
    hidratado,
    sorteios: estado.sorteios,
    criarSorteio,
    removerSorteio,
    adicionarCartela,
    removerCartela,
    registrarNumero,
    removerNumeroSorteado,
  };

  return <SorteiosContext.Provider value={valor}>{children}</SorteiosContext.Provider>;
}

export function useSorteiosContext(): SorteiosContextValor {
  const contexto = useContext(SorteiosContext);
  if (!contexto) {
    throw new Error("useSorteiosContext deve ser usado dentro de <SorteiosProvider>");
  }
  return contexto;
}
