"use client";

import { useEffect, useState } from "react";

export function BotaoRemover({
  onConfirmar,
  label = "remover",
}: {
  onConfirmar: () => void;
  label?: string;
}) {
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    if (!confirmando) return;
    const id = setTimeout(() => setConfirmando(false), 3000);
    return () => clearTimeout(id);
  }, [confirmando]);

  if (confirmando) {
    return (
      <button
        type="button"
        onClick={() => {
          setConfirmando(false);
          onConfirmar();
        }}
        className="shrink-0 rounded px-1.5 py-0.5 text-xs font-medium text-danger hover:bg-danger-bg-strong"
      >
        confirmar?
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirmando(true)}
      className="shrink-0 rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-danger-bg hover:text-danger"
    >
      {label}
    </button>
  );
}
