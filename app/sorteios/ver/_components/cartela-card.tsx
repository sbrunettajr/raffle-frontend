"use client";

import type { Cartela, Sorteio } from "@/lib/types";
import { cartelaCompleta, numerosBatidos, progresso } from "@/lib/utils/selectors";
import { BotaoRemover } from "@/app/_components/botao-remover";

export function CartelaCard({
  cartela,
  sorteio,
  onRemover,
}: {
  cartela: Cartela;
  sorteio: Sorteio;
  onRemover: (cartelaId: string) => void;
}) {
  const batidos = new Set(numerosBatidos(cartela, sorteio));
  const { batidos: qtdBatidos, total } = progresso(cartela, sorteio);
  const completa = cartelaCompleta(cartela, sorteio);
  const avulsa = cartela.numeros.length === 1;

  return (
    <div
      className={`flex flex-col gap-3 rounded-lg border p-4 ${
        completa ? "border-success-border bg-success-bg" : "border-border bg-surface"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-foreground">{cartela.rotulo}</p>
          {!avulsa && (
            <p className="text-xs text-muted">
              {qtdBatidos} de {total} números
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {completa && (
            <span className="rounded-full bg-success px-2 py-0.5 text-xs font-semibold text-white">
              CARTELA CHEIA 🎉
            </span>
          )}
          <BotaoRemover onConfirmar={() => onRemover(cartela.id)} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {cartela.numeros.map((numero) => (
          <span
            key={numero}
            className={`rounded-full px-2.5 py-0.5 text-sm font-mono ${
              batidos.has(numero)
                ? "bg-success text-white"
                : "bg-chip text-muted"
            }`}
          >
            {numero}
          </span>
        ))}
      </div>
    </div>
  );
}
