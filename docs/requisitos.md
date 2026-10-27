# Requisitos e critérios de aceite

## Escopo acordado

Site público do Laboratório de Enfermagem/FS, Faculdade de Ciências da Saúde,
Universidade de Brasília, campus UnB Asa Norte. Next.js, TypeScript e Tailwind CSS,
com geração estática e compatibilidade com a Vercel. Repositório:
`VictorTielbeek77/Site_LabEnf`.

| Rota | Critério de aceite da versão final |
| --- | --- |
| `/` | Apresentação e acessos aos serviços; percurso calendário → solicitação claro. |
| `/agendamento` | Formulário oficial de atividades, aviso de conta @unb.br e acesso ao calendário. |
| `/calendario` | Link oficial sempre disponível; incorporar somente se suportado e validado. Sem eventos simulados. |
| `/pops` | PDF original íntegro para consulta e download, com alternativa ao visualizador e ressalva sobre validação com a SeMA/CGR. |
| `/emprestimos` | Formulário específico de empréstimos, aviso de conta @unb.br, sem tratar o envio como autorização ou garantia de disponibilidade. |
| `/sobre` | Identificação e localização confirmadas; sem contatos, regras ou recursos inventados. |

## Regras transversais

- Links oficiais e identificação institucional centralizados em `src/config/site.ts`.
- Autenticação dos formulários exclusivamente na Microsoft. A restrição @unb.br
  foi informada pelo usuário; sua verificação exige conta institucional.
- Sem login próprio, banco de dados, estoque, aprovação automática ou API adicional.
- Solicitação não significa confirmação de reserva ou de empréstimo.
- Calendário público mostra disponibilidade e título das atividades, conforme informado.
- Navegação responsiva, acessível por teclado, contraste adequado e movimento reduzido.
- Nenhum envio de formulários durante testes. Nenhum segredo no repositório.
- Sem publicação nesta etapa. GitHub remoto e deploy serão tratados posteriormente.

## Documento fornecido

`POP_LABS_ENF_UnB_.pdf`: “Gerenciamento e descarte seguro de resíduos”, versão 01,
19/10/2026, 4 páginas. A nota de aplicação exige validação da adequação do fluxo
com a SeMA/CGR antes da implementação definitiva. Preservar o original e não
afirmar aprovação definitiva. Cópia integral, comparação de hash, consulta e download
foram implementados na quinta etapa, conforme `docs/pops.md`.

## Aceite desta etapa inicial

- [x] Dependências instaladas com lockfile e versões fixas.
- [x] Seis rotas e componentes compartilhados criados.
- [x] Configuração tipada com os três links exatos.
- [x] Lint, TypeScript e build de produção aprovados.
- [x] Servidor de produção responde às seis rotas com conteúdo esperado.
- [x] Nenhuma publicação realizada.

### Evidências da execução inicial

Validação em 27/10/2026, com Node.js 24.19.0 e npm 11.9.0:

- `npm ci --include=dev --cache /workspace/.cache/npm --no-fund`: instalação pelo
  lockfile concluída. Aviso de fim de suporte do ESLint 9 documentado no README.
- `npm run lint`: sem erros ou avisos de análise.
- `NEXT_TELEMETRY_DISABLED=1 npm run typecheck`: tipos de rotas gerados e TypeScript aprovado.
- `NEXT_TELEMETRY_DISABLED=1 npm run build`: build aprovado; seis páginas estáticas.
- `NEXT_TELEMETRY_DISABLED=1 npm start`: servidor de produção iniciado; requisições
  HTTP locais confirmaram status 200, título principal, idioma e navegação nas seis
  rotas; os três links externos coincidem com os fornecidos, com proteção e aviso
  de abertura em nova aba. Oito recursos CSS/JavaScript retornaram HTTP 200.
- Rota inexistente: HTTP 404 e orientação de retorno ao início confirmados.
- `NEXT_TELEMETRY_DISABLED=1 npm run dev`: desenvolvimento iniciado; HTTP 200 e
  conteúdo esperado confirmados. O Next.js selecionou a porta 3001 porque a 3000
  ainda estava ocupada pelo teste de produção.

Essas verificações não incluem auditoria visual em navegador, autenticação real
nos serviços Microsoft, incorporação do calendário ou download de PDF. Não houve
envio de formulários nem acesso a sessões institucionais. A auditoria completa
continua prevista em etapa posterior.

Os critérios da versão final acima não são todos entregas desta primeira etapa.
O sistema visual, animações e menu móvel foram entregues na segunda etapa,
conforme `docs/sistema-visual.md`. Início, Sobre, Agendamento, Calendário e POPs
foram desenvolvidos nas etapas posteriores abaixo. Empréstimos foi finalizado na
sexta etapa; a auditoria local foi concluída na sétima etapa, registrada abaixo. O calendário usa acesso externo, com as limitações
de validação registradas na quarta etapa.

## Aceite da segunda etapa — sistema visual

- [x] Paleta azul, verde e neutra sem alegação de cores oficiais; identificação textual.
- [x] Cabeçalho, rodapé e componentes reutilizáveis de botões, cartões, avisos e títulos.
- [x] Menu móvel por teclado, estado acessível e fechamento com gerenciamento de foco.
- [x] Indicação da página atual com estilo e `aria-current="page"`.
- [x] Animações discretas, foco visível e respeito a movimento reduzido.
- [x] Lint, tipos e build aprovados; 11 testes de navegador aprovados.
- [x] Seis rotas sem rolagem horizontal em 320, 390, 768, 1152 e 1440 px.
- [x] Análise automática axe-core nas seis rotas em celular e desktop, sem violações
  ou casos inconclusivos de contraste; capturas de tela revisadas.

Essas verificações da interface não validam autenticação Microsoft ou o conteúdo
do calendário externo. Não houve envio de formulários nem publicação do site.

## Aceite da terceira etapa — Início e Sobre

- [x] Inicial com identificação, quatro serviços e percurso calendário → formulário.
- [x] Aviso de conta @unb.br, autenticação Microsoft e ausência de confirmação automática.
- [x] Sobre com identificação, localização confirmada e orientações dos serviços.
- [x] Estrutura tipada para contatos, fotos e espaços, oculta enquanto não houver dados.
- [x] Sem contatos, horários, endereço detalhado, capacidade ou equipamentos inventados.
- [x] Nenhuma orientação do PDF transformada em regra geral do laboratório.
- [x] Todos os acessos de ambas as páginas conferidos em celular e desktop.
- [x] Lint, tipos, build e 15 testes de navegador aprovados; correção de foco do menu.

Detalhes e evidências em `docs/conteudo-institucional.md`.

## Aceite da quarta etapa — Agendamento e Calendário

- [x] Microsoft Forms e exigência de conta @unb.br explicados.
- [x] Consulta ao calendário destacada antes do botão do formulário.
- [x] Envio distinguido de confirmação, sem prazo de resposta inventado.
- [x] Calendário com disponibilidade, títulos e botão oficial sempre disponível.
- [x] Investigação externa realizada: proxy recusou HTTPS com 403; incorporação não validada.
- [x] Alternativa externa útil, sem iframe, eventos fictícios ou promessa de API.
- [x] Nova aba e URL exata verificadas com navegação externa interceptada.
- [x] Lint, tipos, build e 20 testes de navegador aprovados.
- [ ] Acesso real à Microsoft e autenticação institucional: conferência manual pendente.

Evidências e distinção entre testes locais e acesso externo em `docs/agendamento-calendario.md`.

## Aceite da quinta etapa — POPs

- [x] Original localizado e conferido por extração de texto e `pdfinfo`.
- [x] Cópia binária em `public/documents/`, sem dependência do anexo temporário.
- [x] Título, versão 01, elaboração 19/10/2026 e 4 páginas conferidos no original.
- [x] Nota de validação com a SeMA/CGR visível, sem afirmar aprovação definitiva.
- [x] Consulta em nova aba e download separados; sem visualizador incorporado.
- [x] Catálogo tipado para futuros documentos reais, sem POPs fictícios.
- [x] SHA-256 do original, cópia, respostas HTTP e arquivo baixado iguais.
- [x] GET/HEAD 200, `application/pdf`, disposições inline/attachment e Range 206 conferidos.
- [x] Lint, tipos, build e 23 testes de navegador aprovados; celular e desktop revisados.

Detalhes e comportamentos dependentes do navegador em `docs/pops.md`.

## Aceite da sexta etapa — Empréstimos e revisão de textos

- [x] Solicitação pelo Microsoft Forms e exigência de conta @unb.br explicadas.
- [x] Botão “Solicitar empréstimo de materiais” usa a URL original de empréstimos.
- [x] ID diferente do formulário de atividades práticas conferido por teste independente.
- [x] Preenchimento distinguido de autorização e garantia de disponibilidade.
- [x] Sem catálogo, estoque, prazos, responsáveis ou regras de retirada/devolução inventados.
- [x] Textos das seis páginas, metadados e componentes compartilhados revisados.
- [x] Nome uniforme, avisos de nova aba e destinos locais funcionais verificados.
- [x] Sem adição de rastreadores, formulários locais ou armazenamento de dados pessoais.
- [x] Lint, tipos, build e 27 testes de navegador aprovados, sem envio de respostas.
- [ ] Carregamento real do Forms e autenticação: conexão recusada pelo proxy; conferir manualmente.

Evidências e limites em `docs/emprestimos-revisao-textos.md`.

## Aceite da sétima etapa — auditoria local

- [x] Releitura do código, critérios e documento original; validação de produção local.
- [x] Sete novos testes de auditoria; 34 testes totais aprovados, zero falhos/ignorados/flaky.
- [x] Rotas diretas, metadados, console, recursos, 404 e recuperação por teclado verificados.
- [x] Celular/tablet/desktop, fonte a 200%, contraste, foco e movimento reduzido verificados.
- [x] Quatro problemas reproduzidos e corrigidos, com regressões persistentes.
- [x] PDF conferido novamente no original e nas respostas/downloads; hash preservado.
- [x] Tabela de requisito, evidência, resultado e pendência em `docs/auditoria.md`.
- [ ] Acesso real Microsoft e testes manuais com conta @unb.br: bloqueados/pendentes.
- [ ] Outros navegadores, tecnologias assistivas reais e validação após deploy: não executados.

As aprovações desta etapa são locais, sem comprovação de publicação ou acesso remoto.

## Aceite da oitava etapa — manutenção e preparação para publicação

- [x] README e guias de instalação, execução local, build e testes atualizados.
- [x] Mapa de páginas, arquivos de conteúdo, links e manutenção dos PDFs documentado.
- [x] Roteiro futuro de primeiro envio ao GitHub e importação na Vercel, sem execução.
- [x] Node 24.x conferido no código oficial da Vercel; manifesto e lockfile consistentes.
- [x] Configuração Next.js e arquivos estáticos preservados, inclusive cabeçalhos de PDF.
- [x] Instalação pelo lockfile, lint, tipos, build e 34 testes em produção aprovados novamente.
- [x] Arquivos candidatos ao Git conferidos, sem segredos reconhecidos ou artefatos temporários.
- [x] Sem novas dependências, analytics, serviços pagos, commit, push ou deploy nesta etapa.
- [ ] Elegibilidade institucional e cotas atuais do Hobby: documentação bloqueada pelo proxy 403.
- [ ] Aplicar a liberação de `vercel.com` nas configurações do ambiente e repetir a consulta oficial.
- [ ] Microsoft com conta institucional, outros navegadores e validação após futura publicação.

Detalhes, resultados e instruções futuras em `docs/manutencao.md` e
`docs/publicacao-vercel.md`. A preparação local não conclui a avaliação do plano
gratuito nem comprova funcionamento na hospedagem ainda não criada.

## Informações ainda ausentes

Logotipo autorizado, fotografias autorizadas, contatos, endereço detalhado,
horários de funcionamento e regras institucionais de uso, retirada e devolução.
Esses dados não bloqueiam a estrutura inicial e não serão inventados. Domínio
final e adequação ao plano gratuito da Vercel serão verificados antes do deploy.
