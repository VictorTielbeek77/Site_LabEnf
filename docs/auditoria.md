# Auditoria do site — 27/10/2026

Auditoria da versão de produção local, confrontada com os pedidos originais e
`docs/requisitos.md`. Código, configurações, testes e PDF foram relidos; os
resultados abaixo vêm de novas execuções. Não houve publicação ou envio ao GitHub.

**Resultado final: 34 testes aprovados, zero falhos, zero ignorados e zero flaky.**
Lint, tipos e build passaram. Quatro problemas foram reproduzidos e corrigidos.
O acesso real aos serviços Microsoft continua bloqueado e não é declarado aprovado.

## Matriz de requisitos

| Requisito | Evidência executada | Resultado | Pendência |
| --- | --- | --- | --- |
| 1. Páginas, navegação e acesso direto | Seis rotas retornaram HTTP 200; percursos por clique, cabeçalho, rodapé, histórico e retorno da 404 executados. | Aprovado localmente. | Repetir no endereço público após deploy. |
| 2. Três links oficiais | Valores completos comparados aos links fornecidos, IDs distintos e GET de nova aba observados em celular/desktop. Sem envio de formulários. | Destinos e ações aprovados; acesso remoto bloqueado. | Conferir conteúdo do calendário e acesso aos dois Forms em navegador com acesso à Microsoft. |
| 3. PDF, consulta e download | Original relido: versão 01, 19/10/2026, 4 páginas. SHA-256 do original/cópia/HTTP/download iguais; GET/HEAD 200, application/pdf, inline/attachment e Range 206. | Aprovado localmente. | Leitor de PDF do navegador e comportamento em dispositivos reais não auditados. |
| 4. Celular, tablet e computador | Seis rotas em 320, 390, 768, 1024, 1152 e 1440 px; fonte raiz a 200% em 390 px; revisão visual de capturas das seis páginas. | Aprovado nas condições testadas, após correção de sobreposição. | Aparelhos reais e zoom nativo de outros navegadores não executados. |
| 5. Menu, teclado, foco, contraste e rótulos | Enter, Espaço, Tab, Escape, clique fora, histórico, mudanças de largura e foco visível; axe-core nas seis rotas em celular, tablet e desktop, e na 404; movimento reduzido. | Aprovado automaticamente, após correção de foco. | Leitores de tela reais; auditoria automática não certifica toda a acessibilidade. |
| 6. Console, recursos e largura | Zero erros de console/JavaScript, falhas de requisição ou respostas HTTP >=400 na navegação normal das seis páginas; oito recursos de script/estilo observados. Sem rolagem horizontal nas dimensões testadas. | Aprovado, após correção do favicon ausente. | Conferência após deploy. O 404 intencional é testado separadamente. |
| 7. Calendário indisponível/bloqueado | Navegação externa deliberadamente abortada; botão e aviso permanecem disponíveis, sem eventos simulados ou inferência de horário livre; acesso ao agendamento continua funcionando. | Alternativa externa aprovada localmente. | Calendário real e permissão/usabilidade de incorporação não validados; nenhum iframe incluído. |
| 8. Confirmações, dados inventados e segredos | Revisão dos arquivos confrontada com dados fornecidos; sem reservas locais, estoque ou regras inventadas. Padrões de segredos examinados sem candidatos; sem formulários locais, cookies, armazenamento persistente ou requisições externas automáticas na navegação testada. | Aprovado no escopo inspecionado. | Varredura por padrões não é garantia universal; conteúdos opcionais permanecem vazios até serem fornecidos. |
| 9. Build e tipos | npm run lint, npm run typecheck e NEXT_TELEMETRY_DISABLED=1 npm run build concluídos com código 0. Seis páginas estáticas, 404 e ícone gerados. | Aprovado. | Instalação em outro computador e execução na Vercel pertencem às próximas etapas. |
| 10. Metadados, idioma e erro | Títulos e descrições únicos nas seis rotas, viewport e pt-BR; 404 com status 404, título próprio, noindex e retorno ao início por teclado. | Aprovado, após correção do título da 404. | Metadados com domínio final, quando definido. |

## Problemas corrigidos

| Problema reproduzido | Correção | Regressão que verifica |
| --- | --- | --- |
| Requisição implícita a /favicon.ico retornava 404 e gerava erro no console. | Ícone decorativo de livro em src/app/icon.svg, declarado pelo Next.js; não representa brasão ou logotipo oficial. | Console/recursos das seis páginas. |
| A 404 herdava o título da página inicial. | Metadados próprios em src/app/not-found.tsx, preservando noindex do Next.js. | HTTP 404, título, noindex, acessibilidade e retorno por teclado. |
| O foco era perdido ao ampliar celular para desktop, com menu aberto ou fechado. | O componente lembra o foco no botão e o transfere ao link atual quando o botão fica oculto; preserva foco fora da navegação. | Dois cenários novos e os testes anteriores de mudança inversa, Tab e Escape. |
| Com fonte raiz a 200%, o menu encobria parte do nome do laboratório. A ausência de rolagem horizontal não detectava o problema. | Limites de largura e quebra de texto na identificação do cabeçalho. | Comparação geométrica entre fragmentos de texto e botão, além de largura, ações e teclado. |

As primeiras sete regressões específicas tiveram três aprovações e quatro
reprovações, correspondentes aos três primeiros problemas (dois casos de foco).
A inspeção visual encontrou o quarto problema; o teste geométrico adicionado
reprovou antes do ajuste de CSS. Após as correções, a suíte completa terminou
com 34 aprovações. Um erro de tipagem no teste novo de imagens também foi
corrigido antes das regressões; tipos e build finais passaram.

## Execução e reprodução

Ferramentas disponíveis e usadas: Node.js 24.19.0, npm 11.9.0, Next.js 16.4.3,
Playwright 1.64.1, axe-core/Playwright 4.14.0 e Chromium 154.0.8037.57. Nenhuma
instalação extra foi necessária. O aviso de fim de suporte do ESLint 9, mantido
pela compatibilidade dos plugins, continua documentado no README.

```sh
cd /workspace/Site_LabEnf
npm run lint
NEXT_TELEMETRY_DISABLED=1 npm run typecheck
NEXT_TELEMETRY_DISABLED=1 npm run build
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

A suíte inicia e encerra seu servidor na porta 3100, exige build prévio e não
reutiliza um servidor desconhecido. Retries estão desativados. A execução final
levou aproximadamente 48 segundos. Para Chromium gerenciado pelo Playwright,
seguir o README e omitir a variável do executável local.

Os testes novos estão em `tests/e2e/audit.spec.ts`. Eles complementam os percursos,
URLs oficiais e integridade do PDF já exercitados nos demais arquivos de testes.
Não há respostas de sucesso simuladas para a Microsoft: navegações externas dos
testes de botões são interceptadas e abortadas explicitamente.

As evidências consolidadas, estatísticas do runner, hash e observações de rede e
recursos ficam em `docs/auditoria-evidencias.json`. A execução final começou em
27/10/2026 às 13:57, horário de São Paulo. Não há valores de credenciais no relatório.

## Pendências e verificações não executadas

**Bloqueadas nesta máquina:** três GETs novos, para calendário e os dois Forms,
retornaram `Tunnel connection failed: 403 Forbidden` no proxy antes de alcançar
a Microsoft. Os hosts não estão listados na configuração disponibilizada; o estado
de aplicação da política foi reportado como desconhecido. Não se atribui o erro a
credenciais, à conta UnB ou a uma proibição de iframe pela Microsoft.

**Manuais com conta @unb.br:** conferir acesso e finalidade dos dois formulários,
e a restrição a contas institucionais, sem enviar respostas de teste. Conferir
também o calendário público, seus horários e títulos de atividades. Usar a própria
sessão Microsoft; não compartilhar senhas ou tokens em chat.

**Não executadas:** Firefox, Safari, aparelhos reais, NVDA/JAWS/VoiceOver e avaliação
de acessibilidade dentro do leitor nativo do PDF. Fonte raiz a 200% não equivale
a testar todos os mecanismos de zoom ou configurações de sistema.

**Próximas etapas, fora desta auditoria local:** envio ao GitHub, conexão e deploy
na Vercel, elegibilidade/limites do plano gratuito e verificação do endereço público.
O tutorial de execução local e conexão à Vercel permanece previsto para o final
da sequência, conforme solicitado.
