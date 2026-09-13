"use client";

import Link from "next/link";
import type { Sorteio } from "@/lib/types";
import { BotaoRemover } from "@/app/_components/botao-remover";

export function SorteioCard({
  sorteio,
  onRemover,
}: {
  sorteio: Sorteio;
  onRemover: (id: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4 shadow-sm">
      <Link href={`/sorteios/${sorteio.id}`} className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{sorteio.nome}</p>
        <p className="text-sm text-muted">
          {sorteio.cartelas.length} {sorteio.cartelas.length === 1 ? "cartela" : "cartelas"} ·{" "}
          {sorteio.numerosSorteados.length}{" "}
          {sorteio.numerosSorteados.length === 1 ? "número sorteado" : "números sorteados"}
        </p>
      </Link>
      <BotaoRemover onConfirmar={() => onRemover(sorteio.id)} label="Remover" />
    </div>
  );
}
