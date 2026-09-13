export function gerarId(): string {
  // crypto.randomUUID exige contexto seguro (HTTPS ou localhost) — em acesso via IP
  // da rede local (comum ao testar no celular) ele pode não existir.
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
