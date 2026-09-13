"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSorteios } from "@/lib/hooks/use-sorteios";

export function FormNovoSorteio() {
  const { criarSorteio } = useSorteios();
  const router = useRouter();
  const [nome, setNome] = useState("");

  return (
    <form
      onSubmit={(evento) => {
        evento.preventDefault();
        if (!nome.trim()) return;
        const sorteio = criarSorteio(nome);
        router.push(`/sorteios/${sorteio.id}`);
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <input
        type="text"
        value={nome}
        onChange={(evento) => setNome(evento.target.value)}
        placeholder="Nome do sorteio (ex: Rifa da Igreja)"
        className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
      />
      <button
        type="submit"
        disabled={!nome.trim()}
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-40"
      >
        Criar sorteio
      </button>
    </form>
  );
}
