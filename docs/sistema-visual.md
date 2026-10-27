# Sistema visual e navegação

## Direção visual

Azul profundo, verde e fundos neutros claros. São escolhas de interface, sem
alegação de identidade visual oficial da UnB. Identificação textual do laboratório
obtida de `src/config/site.ts`, sem logotipo, brasão ou fotografia clínica.
Ícones SVG decorativos representam calendário, documentos, materiais e ensino;
não são anunciados como conteúdo pelos leitores de tela.

Títulos usam Georgia e o texto usa Arial com alternativas locais. Não há download
de fontes. Espaçamento, tipografia e colunas se adaptam à largura disponível.
O foco tem contorno visível; links de navegação têm área mínima de 44 px de altura.

As cores estão nas variáveis de `src/app/globals.css`. Componentes compartilhados:

| Componente | Uso |
| --- | --- |
| `SiteHeader`, `SiteFooter` | Identificação e navegação global. |
| `SiteNavigation` | Página ativa e menu expansível. |
| `PageIntro` | Título principal, contexto e ilustração decorativa. |
| `LinkButton`, `ExternalLink` | Ações de navegação primárias e secundárias; aviso de nova aba. |
| `ServiceCard` | Acessos aos serviços com ícone, título e descrição. |
| `Notice` | Orientações informativas, sem anúncio indevido de alerta. |
| `Icon` | Ícones decorativos consistentes. |

## Navegação e movimento

O menu expande no fluxo da página, sem ser um diálogo modal: não prende o foco e
usa links normais, sem `role="menu"`. O botão tem nome acessível, `aria-controls`
e `aria-expanded`. A navegação desktop aparece a partir de 72 rem.

- Enter ou Espaço abre e fecha o menu; Tab percorre os links.
- Escape fecha e devolve foco ao botão.
- Clicar fora ou levar o foco para fora fecha o menu.
- Navegar por um link fecha o menu e leva o foco ao conteúdo.
- Alterar rota ou usar o histórico reinicia o estado fechado.
- Ao reduzir uma tela desktop com foco no menu, o foco retorna ao botão visível.
- A rota ativa tem fundo, sublinhado e `aria-current="page"`.
- O link “Pular para o conteúdo” aparece ao receber foco pelo teclado.

Entradas e hover usam movimentos curtos. Com `prefers-reduced-motion: reduce`,
animações e transições ficam desativadas e não há deslocamento dos cartões.

## Evidências da segunda etapa

Validação em Chromium 154, em 27/10/2026:

- `npm run lint`, `npm run typecheck` e `npm run build`: aprovados; páginas estáticas.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`:
  11 testes aprovados, sem testes ignorados ou falhos.
- Seis rotas verificadas sem rolagem horizontal com o menu aberto e fechado nas
  larguras 320, 390 e 768 px, e com navegação desktop em 1152 e 1440 px.
- axe-core verificou as seis páginas em 390 e 1440 px, incluindo o menu aberto no
  celular, com regras WCAG A/AA: zero violações e nenhum contraste inconclusivo.
- Navegação por teclado, Escape, clique fora, saída com Tab, histórico, mudança
  de largura, página ativa, foco visível e movimento reduzido verificados.
- Capturas da página inicial em desktop, celular e menu aberto revisadas visualmente.

Contrastes calculados pela fórmula WCAG, em relação aos respectivos fundos:

| Uso | Contraste |
| --- | --- |
| Texto principal / fundo claro | 13,17:1 |
| Texto secundário / branco | 6,21:1 |
| Texto branco / botão verde | 6,92:1 |
| Texto branco / botão em hover | 9,99:1 |
| Texto do aviso / fundo do aviso | 8,57:1 |
| Página ativa / fundo ativo | 8,82:1 |
| Texto do rodapé / fundo azul | 9,56:1 |
| Foco / fundo claro | 7,00:1 |
| Foco / fundo do rodapé | 8,81:1 |

Testes automáticos não equivalem a uma auditoria completa com leitores de tela.
Firefox, Safari e autenticação institucional não foram testados nesta etapa.
