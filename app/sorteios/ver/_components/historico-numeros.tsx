"use client";

import type { Sorteio } from "@/lib/types";
import { historicoOrdenado } from "@/lib/utils/selectors";
import { BotaoRemover } from "@/app/_components/botao-remover";

export function HistoricoNumeros({
  sorteio,
  removerNumeroSorteado,
}: {
  sorteio: Sorteio;
  removerNumeroSorteado: (sequencia: number) => void;
}) {
  const historico = historicoOrdenado(sorteio);

  if (historico.length === 0) {
    return <p className="text-sm text-muted">Nenhum número sorteado ainda.</p>;
  }

  return (
    <ul className="flex max-h-80 flex-col gap-1 overflow-y-auto">
      {historico.map((item) => (
        <li
          key={item.sequencia}
          className="flex items-center justify-between gap-2 rounded-md bg-chip px-3 py-1.5 text-sm"
        >
          <span className="shrink-0 text-muted">{item.sequencia}º</span>
          <span className="flex-1 font-mono text-base font-semibold">{item.numero}</span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {new Date(item.criadoEm).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <BotaoRemover onConfirmar={() => removerNumeroSorteado(item.sequencia)} />
        </li>
      ))}
    </ul>
  );
}
