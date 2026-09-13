import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite acessar o servidor de desenvolvimento pelo IP da rede local (ex: pelo
  // celular). Sem isso, o Next bloqueia por segurança os assets/endpoints de dev
  // quando a origem da requisição não é "localhost", travando o app na tela de
  // carregamento. Ajuste o IP se o da sua máquina mudar (ex: trocou de rede Wi-Fi).
  allowedDevOrigins: ["10.0.0.113"],
};

export default nextConfig;
