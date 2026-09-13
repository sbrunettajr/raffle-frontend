import type { Cartela, NumeroSorteado, Sorteio } from "@/lib/types";

export function numerosBatidos(cartela: Cartela, sorteio: Sorteio): number[] {
  const sorteados = new Set(sorteio.numerosSorteados.map((n) => n.numero));
  return cartela.numeros.filter((numero) => sorteados.has(numero));
}

export function progresso(cartela: Cartela, sorteio: Sorteio): { batidos: number; total: number } {
  return { batidos: numerosBatidos(cartela, sorteio).length, total: cartela.numeros.length };
}

export function cartelaCompleta(cartela: Cartela, sorteio: Sorteio): boolean {
  const { batidos, total } = progresso(cartela, sorteio);
  return total > 0 && batidos === total;
}

export function historicoOrdenado(sorteio: Sorteio): NumeroSorteado[] {
  return [...sorteio.numerosSorteados].sort((a, b) => b.sequencia - a.sequencia);
}

export function numeroJaSorteado(sorteio: Sorteio, numero: number): boolean {
  return sorteio.numerosSorteados.some((n) => n.numero === numero);
}
