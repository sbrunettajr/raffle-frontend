import { PainelSorteio } from "@/app/sorteios/[id]/_components/painel-sorteio";

export default async function SorteioPage({ params }: PageProps<"/sorteios/[id]">) {
  const { id } = await params;
  return <PainelSorteio sorteioId={id} />;
}
