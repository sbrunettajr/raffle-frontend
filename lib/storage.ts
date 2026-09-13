import type { EstadoApp } from "@/lib/types";

export const STORAGE_KEY = "rifa-conferencia:v1";

export const ESTADO_INICIAL: EstadoApp = {
  versao: 1,
  sorteios: [],
};

function migrarEstado(raw: unknown): EstadoApp {
  if (
    typeof raw === "object" &&
    raw !== null &&
    "versao" in raw &&
    "sorteios" in raw &&
    raw.versao === 1 &&
    Array.isArray(raw.sorteios)
  ) {
    return raw as EstadoApp;
  }

  return ESTADO_INICIAL;
}

export function lerEstado(): EstadoApp {
  try {
    const bruto = localStorage.getItem(STORAGE_KEY);
    if (!bruto) return ESTADO_INICIAL;
    return migrarEstado(JSON.parse(bruto));
  } catch {
    return ESTADO_INICIAL;
  }
}

export function salvarEstado(estado: EstadoApp): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  } catch {
    // localStorage indisponível (modo privado, cota excedida, etc.) — ignora silenciosamente.
  }
}
