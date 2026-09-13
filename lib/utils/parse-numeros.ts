export type ParseNumerosResultado = {
  numeros: number[];
  invalidos: string[];
};

export function parseNumeros(texto: string): ParseNumerosResultado {
  const tokens = texto
    .split(/[\s,;]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);

  const numeros: number[] = [];
  const invalidos: string[] = [];
  const vistos = new Set<number>();

  for (const token of tokens) {
    const valido = /^\d+$/.test(token) && Number(token) > 0;

    if (!valido) {
      invalidos.push(token);
      continue;
    }

    const numero = Number(token);

    if (!vistos.has(numero)) {
      vistos.add(numero);
      numeros.push(numero);
    }
  }

  return { numeros, invalidos };
}
