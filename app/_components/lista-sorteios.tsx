"use client";

import { useSorteios } from "@/lib/hooks/use-sorteios";
import { FormNovoSorteio } from "@/app/_components/form-novo-sorteio";
import { SorteioCard } from "@/app/_components/sorteio-card";

export function ListaSorteios() {
  const { hidratado, sorteios, removerSorteio } = useSorteios();

  if (!hidratado) {
    return <p className="text-sm text-muted">Carregando seus sorteios…</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <FormNovoSorteio />

      {sorteios.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border-strong p-6 text-center text-sm text-muted">
          Nenhum sorteio cadastrado ainda. Crie o primeiro acima.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {sorteios.map((sorteio) => (
            <SorteioCard key={sorteio.id} sorteio={sorteio} onRemover={removerSorteio} />
          ))}
        </div>
      )}
    </div>
  );
}
