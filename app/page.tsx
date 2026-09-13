import { ListaSorteios } from "@/app/_components/lista-sorteios";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Conferência de Rifas</h1>
        <p className="text-sm text-muted">
          Cadastre suas cartelas e confira os números sorteados em tempo real.
        </p>
      </div>
      <ListaSorteios />
    </main>
  );
}
