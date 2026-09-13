"use client";

export function FiltroCartelas({
  valor,
  onChange,
}: {
  valor: string;
  onChange: (valor: string) => void;
}) {
  return (
    <input
      type="text"
      value={valor}
      onChange={(evento) => onChange(evento.target.value)}
      placeholder="Buscar por rótulo…"
      className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
    />
  );
}
