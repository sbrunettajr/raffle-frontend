"use client";

import { useSyncExternalStore } from "react";

function inscrever(): () => void {
  return () => {};
}

/**
 * true somente após o primeiro render no cliente. Usa useSyncExternalStore (em vez de
 * useState + useEffect) para evitar o padrão "setState dentro de efeito" e o mismatch
 * de hidratação: o servidor sempre recebe `false`, o cliente sempre recebe `true`.
 */
export function useHidratado(): boolean {
  return useSyncExternalStore(inscrever, () => true, () => false);
}
