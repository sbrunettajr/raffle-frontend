"use client";

import { useMemo, useState } from "react";
import type { Sorteio } from "@/lib/types";
import { cartelaCompleta } from "@/lib/utils/selectors";
import { CartelaCard } from "@/app/sorteios/ver/_components/cartela-card";
import { FiltroCartelas } from "@/app/sorteios/ver/_components/filtro-cartelas";

export function ListaCartelas({
  sorteio,
  removerCartela,
}: {
  sorteio: Sorteio;
  removerCartela: (cartelaId: string) => void;
}) {
  const [filtro, setFiltro] = useState("");

  const cartelas = useMemo(() => {
    const termo = filtro.trim().toLowerCase();
    const filtradas = termo
      ? sorteio.cartelas.filter((c) => c.rotulo.toLowerCase().includes(termo))
      : sorteio.cartelas;

    return [...filtradas].sort((a, b) => {
      const aCompleta = cartelaCompleta(a, sorteio);
      const bCompleta = cartelaCompleta(b, sorteio);
      if (aCompleta === bCompleta) return 0;
      return aCompleta ? 1 : -1;
    });
  }, [sorteio, filtro]);

  if (sorteio.cartelas.length === 0) {
    return <p className="text-sm text-muted">Nenhuma cartela cadastrada ainda.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <FiltroCartelas valor={filtro} onChange={setFiltro} />
      {cartelas.length === 0 ? (
        <p className="text-sm text-muted">Nenhuma cartela encontrada para essa busca.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {cartelas.map((cartela) => (
            <CartelaCard
              key={cartela.id}
              cartela={cartela}
              sorteio={sorteio}
              onRemover={removerCartela}
            />
          ))}
        </div>
      )}
    </div>
  );
}
