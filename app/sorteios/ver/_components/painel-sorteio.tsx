"use client";

import Link from "next/link";
import { useSorteio } from "@/lib/hooks/use-sorteios";
import { RegistrarNumeroForm } from "@/app/sorteios/ver/_components/registrar-numero-form";
import { HistoricoNumeros } from "@/app/sorteios/ver/_components/historico-numeros";
import { FormNovaCartela } from "@/app/sorteios/ver/_components/form-nova-cartela";
import { ListaCartelas } from "@/app/sorteios/ver/_components/lista-cartelas";

export function PainelSorteio({ sorteioId }: { sorteioId: string }) {
  const {
    hidratado,
    sorteio,
    adicionarCartela,
    removerCartela,
    registrarNumero,
    removerNumeroSorteado,
  } = useSorteio(sorteioId);

  if (!hidratado) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-10">
        <p className="text-sm text-muted">Carregando…</p>
      </main>
    );
  }

  if (!sorteio) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 px-4 py-10">
        <p className="text-sm text-muted">Sorteio não encontrado.</p>
        <Link href="/" className="text-sm text-foreground underline">
          Voltar para a lista de sorteios
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-10">
      <div>
        <Link href="/" className="text-sm text-muted hover:underline">
          ← Todos os sorteios
        </Link>
        <h1 className="mt-2 truncate pr-16 text-2xl font-semibold">{sorteio.nome}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="flex flex-col gap-4">
          <h2 className="font-medium text-muted">Conferência</h2>
          <RegistrarNumeroForm registrarNumero={registrarNumero} />
          <HistoricoNumeros sorteio={sorteio} removerNumeroSorteado={removerNumeroSorteado} />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-medium text-muted">Cartelas</h2>
          <FormNovaCartela adicionarCartela={adicionarCartela} />
          <ListaCartelas sorteio={sorteio} removerCartela={removerCartela} />
        </section>
      </div>
    </main>
  );
}
