"use client";

import { useRef, useState } from "react";

export function RegistrarNumeroForm({
  registrarNumero,
}: {
  registrarNumero: (numero: number) => { ok: boolean; motivo?: string };
}) {
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(evento) => {
        evento.preventDefault();
        const numero = Number(valor);
        if (!valor.trim() || !Number.isInteger(numero) || numero <= 0) {
          setErro("Digite um número inteiro positivo.");
          return;
        }

        const resultado = registrarNumero(numero);
        if (!resultado.ok) {
          setErro(resultado.motivo ?? "Não foi possível registrar o número.");
          return;
        }

        setErro(null);
        setValor("");
        inputRef.current?.focus();
      }}
      className="flex flex-col gap-2"
    >
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          value={valor}
          onChange={(evento) => {
            setValor(evento.target.value);
            setErro(null);
          }}
          placeholder="Número sorteado"
          autoFocus
          className="w-0 flex-1 rounded-md border border-border bg-surface px-3 py-2 text-lg text-foreground outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Registrar
        </button>
      </div>
      {erro && <p className="text-sm text-danger">{erro}</p>}
    </form>
  );
}
