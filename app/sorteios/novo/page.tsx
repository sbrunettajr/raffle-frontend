import Link from "next/link";
import { FormNovoSorteio } from "@/app/_components/form-novo-sorteio";

export default function NovoSorteioPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-10">
      <div>
        <Link href="/" className="text-sm text-muted hover:underline">
          ← Voltar
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Novo sorteio</h1>
      </div>
      <FormNovoSorteio />
    </main>
  );
}
