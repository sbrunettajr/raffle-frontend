"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PainelSorteio } from "@/app/sorteios/ver/_components/painel-sorteio";

function SorteioPageConteudo() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  return <PainelSorteio sorteioId={id} />;
}

export default function SorteioPage() {
  return (
    <Suspense>
      <SorteioPageConteudo />
    </Suspense>
  );
}
