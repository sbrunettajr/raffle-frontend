"use client";

import { useState } from "react";
import type { Resultado } from "@/lib/types";
import { parseNumeros } from "@/lib/utils/parse-numeros";

export function FormNovaCartela({
  adicionarCartela,
}: {
  adicionarCartela: (rotulo: string, numeros: number[]) => Resultado;
}) {
  const [rotulo, setRotulo] = useState("");
  const [texto, setTexto] = useState("");
  const [primeiroNumero, setPrimeiroNumero] = useState("");
  const [quantidade, setQuantidade] = useState("10");
  const [erro, setErro] = useState<string | null>(null);

  const { numeros, invalidos } = parseNumeros(texto);

  function gerarSequencia() {
    const inicio = Number(primeiroNumero);
    const qtd = Number(quantidade);

    if (!Number.isInteger(inicio) || inicio <= 0) {
      setErro("Informe o primeiro número da sequência.");
      return;
    }
    if (!Number.isInteger(qtd) || qtd <= 0) {
      setErro("Informe uma quantidade de números válida.");
      return;
    }

    const sequencia = Array.from({ length: qtd }, (_, indice) => inicio + indice);
    setTexto(sequencia.join(", "));
    setErro(null);
  }

  return (
    <form
      onSubmit={(evento) => {
        evento.preventDefault();
        if (numeros.length === 0) {
          setErro("Informe ao menos um número válido.");
          return;
        }

        const resultado = adicionarCartela(rotulo, numeros);
        if (!resultado.ok) {
          setErro(resultado.motivo);
          return;
        }

        setErro(null);
        setRotulo("");
        setTexto("");
        setPrimeiroNumero("");
      }}
      className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4"
    >
      <h3 className="font-medium text-foreground">Cadastrar cartela</h3>

      <input
        type="text"
        value={rotulo}
        onChange={(evento) => setRotulo(evento.target.value)}
        placeholder="Rótulo (ex: Minha, Maria, Cartela avulsa)"
        className="rounded-md border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
      />

      <div className="flex flex-col gap-2 rounded-md border border-border p-3">
        <p className="text-xs text-muted">
          Cartela de números consecutivos? Informe só o primeiro e a quantidade.
        </p>
        <div className="flex flex-wrap items-end gap-2">
          <label className="flex flex-col gap-1 text-xs text-muted">
            Primeiro número
            <input
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={primeiroNumero}
              onChange={(evento) => setPrimeiroNumero(evento.target.value)}
              placeholder="ex: 101"
              className="w-28 rounded-md border border-border px-2 py-1.5 text-sm text-foreground outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted">
            Quantidade
            <input
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={quantidade}
              onChange={(evento) => setQuantidade(evento.target.value)}
              className="w-24 rounded-md border border-border px-2 py-1.5 text-sm text-foreground outline-none focus:border-accent"
            />
          </label>
          <button
            type="button"
            onClick={gerarSequencia}
            className="rounded-md border border-border bg-chip px-3 py-1.5 text-sm text-foreground hover:bg-surface-hover"
          >
            Gerar sequência
          </button>
        </div>
      </div>

      <textarea
        value={texto}
        onChange={(evento) => {
          setTexto(evento.target.value);
          setErro(null);
        }}
        placeholder="Números (cole ou digite separados por espaço, vírgula ou quebra de linha). Para um número avulso, digite só um."
        rows={3}
        className="resize-none rounded-md border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
      />

      {numeros.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {numeros.map((numero) => (
            <span
              key={numero}
              className="rounded-full bg-chip px-2.5 py-0.5 text-sm font-mono text-foreground"
            >
              {numero}
            </span>
          ))}
        </div>
      )}

      {invalidos.length > 0 && (
        <p className="text-xs text-warning">
          Ignorado (não é um número válido): {invalidos.join(", ")}
        </p>
      )}

      {erro && <p className="text-sm text-danger">{erro}</p>}

      <button
        type="submit"
        disabled={numeros.length === 0}
        className="self-start rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-40"
      >
        Adicionar cartela
      </button>
    </form>
  );
}
