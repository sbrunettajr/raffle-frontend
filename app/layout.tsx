import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SorteiosProvider } from "@/lib/sorteios-context";
import { AlternarTema } from "@/app/_components/alternar-tema";
import "./globals.css";

// crypto.randomUUID exige contexto seguro (HTTPS ou localhost). Acessando o app pelo
// IP da rede local (ex: testando pelo celular), o navegador trata a origem como
// insegura e a função não existe — o que quebra a hidratação do React em modo dev
// (o cliente de HMR/devtools do Next depende dela). Este polyfill roda antes de
// qualquer outro script, usando crypto.getRandomValues, que não tem essa restrição.
const SCRIPT_POLYFILL_UUID = `(function(){try{if(typeof crypto!=="undefined"&&typeof crypto.randomUUID!=="function"&&typeof crypto.getRandomValues==="function"){crypto.randomUUID=function(){var b=new Uint8Array(16);crypto.getRandomValues(b);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;var h=Array.from(b,function(x){return x.toString(16).padStart(2,"0")});return h.slice(0,4).join("")+"-"+h.slice(4,6).join("")+"-"+h.slice(6,8).join("")+"-"+h.slice(8,10).join("")+"-"+h.slice(10,16).join("")}}}catch(e){}})()`;

const SCRIPT_TEMA_INICIAL = `(function(){try{var t=localStorage.getItem("tema");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conferência de Rifas",
  description: "Cadastre suas cartelas e confira os números sorteados em tempo real.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: SCRIPT_POLYFILL_UUID }} />
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA_INICIAL }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SorteiosProvider>
          <div className="fixed right-3 top-3 z-10 sm:right-4 sm:top-4">
            <AlternarTema />
          </div>
          {children}
        </SorteiosProvider>
      </body>
    </html>
  );
}
