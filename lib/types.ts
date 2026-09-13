export type NumeroSorteado = {
  numero: number;
  sequencia: number;
  criadoEm: string;
};

export type Cartela = {
  id: string;
  rotulo: string;
  numeros: number[];
  criadaEm: string;
};

export type Sorteio = {
  id: string;
  nome: string;
  criadoEm: string;
  proximaSequencia: number;
  cartelas: Cartela[];
  numerosSorteados: NumeroSorteado[];
};

export type EstadoApp = {
  versao: 1;
  sorteios: Sorteio[];
};

export type Resultado = { ok: true } | { ok: false; motivo: string };
