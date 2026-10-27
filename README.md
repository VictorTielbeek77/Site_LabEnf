# Laboratório de Enfermagem/FS

Site público do Laboratório de Enfermagem/FS, Faculdade de Ciências da Saúde,
Universidade de Brasília, campus UnB Asa Norte. Next.js, TypeScript e Tailwind CSS,
com seis páginas pré-renderizadas e PDF original incluído no projeto.

**Estado:** versão validada e commitada localmente, com envio ao GitHub autorizado,
mas bloqueado por falta de permissão de escrita da conta conectada. A publicação
na Vercel continua pendente; não há endereço público validado. Consulte o
[registro de publicação](docs/publicacao-status.md) e o histórico do Git para o estado do envio.
A elegibilidade e os limites atuais do plano gratuito da Vercel **não foram
confirmados**, pois o acesso à documentação foi recusado pelo proxy. Não há
promessa de gratuidade para o uso institucional. Leia [publicação na Vercel](docs/publicacao-vercel.md)
antes de escolher o plano ou publicar.

## Executar no computador

Requisitos: Git, Node.js **24.x** e npm. Referência validada: Node 24.19.0 e npm 11.9.0.
Depois que esta versão tiver sido enviada ao GitHub:

```sh
git clone https://github.com/VictorTielbeek77/Site_LabEnf.git
cd Site_LabEnf
npm ci
npm run dev
```

No ambiente de nuvem atual, o projeto já está em `/workspace/Site_LabEnf`; não é
necessário clonar novamente. Confirme no histórico remoto que o envio inicial concluiu
antes de usar a clonagem em outro computador.

Abra o endereço **Local** informado pelo terminal do Next.js, normalmente na porta
3000. Ctrl+C encerra o servidor. Para outra porta: `npm run dev -- --port 3001`.
Não são necessárias variáveis de ambiente, chaves ou login Microsoft para rodar o site.

## Build, tipos e testes

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Instale o navegador apenas quando ausente ou após uma atualização do Playwright.
A suíte inicia seu próprio servidor de produção na porta 3100; deixe-a livre e
faça o build antes. `typecheck` gera os tipos de rotas antes de verificar TypeScript.

Neste ambiente Linux, com Chromium já instalado, foi usado:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Essa variável é opcional, específica da seleção do navegador, e não deve ser
cadastrada na Vercel. No computador pessoal, use a instalação do Playwright e o
comando normal. Os testes não enviam respostas aos formulários.

Para executar produção local:

```sh
npm run build
npm start
```

Abra o endereço informado no terminal. Após alterar código, refaça o build antes
de iniciar a produção novamente. Consulte [o guia de manutenção](docs/manutencao.md)
para instruções completas, inclusive Windows/macOS/Linux.

## Páginas e estrutura

| Rota | Conteúdo |
| --- | --- |
| `/` | Apresentação, quatro serviços e percurso calendário → solicitação. |
| `/agendamento` | Consulta prévia ao calendário e formulário de atividades práticas. |
| `/calendario` | Acesso oficial ao Outlook e orientação em caso de falha. |
| `/pops` | Metadados, nota de aplicação, consulta e download do PDF original. |
| `/emprestimos` | Formulário próprio de empréstimos, sem autorização ou disponibilidade automática. |
| `/sobre` | Identificação, localização confirmada e orientação pelos serviços. |

- `src/config/site.ts`: identificação, navegação, serviços e três links oficiais.
- `src/config/laboratory-content.ts`: contatos, fotos e espaços opcionais, ainda vazios.
- `src/config/procedures.ts`: catálogo tipado dos POPs, metadados, tamanho e SHA-256.
- `public/documents/`: PDFs reais, sem dependência dos anexos temporários.
- `src/app/`: páginas, layout, CSS, 404 e ícone decorativo da aba.
- `src/components/`: cabeçalho, menu acessível, rodapé, cartões, botões e avisos.
- `next.config.ts`: cabeçalhos de consulta e download; não usar exportação estática sem adaptação.
- `tests/e2e/`: navegação, acessibilidade, links, metadados, recursos e integridade do PDF.

A identificação visual usa texto e ícones decorativos, sem brasão ou logotipo
institucional inventado. O layout usa fontes locais, sem download de fontes no build.

## Manutenção e publicação

- [Instalação, execução, edição e manutenção](docs/manutencao.md).
- [Envio inicial ao GitHub e importação na Vercel](docs/publicacao-vercel.md).
- [Integridade do PDF e comportamento de consulta/download](docs/pops.md).
- [Conteúdo confirmado e campos futuros](docs/conteudo-institucional.md).
- [Requisitos e critérios de aceite](docs/requisitos.md).
- [Auditoria local e pendências](docs/auditoria.md).

Para alterar links ou textos, consulte o mapa de arquivos no guia de manutenção.
Para substituir/adicionar PDFs, preserve o original, confira os metadados e compare
os hashes antes de atualizar o catálogo e os testes. Não criar documentos fictícios.

## Limitações e condições de validação

O site não tem banco de dados, login próprio, formulário local, armazenamento de
dados pessoais, analytics ou integração paga adicionada. Forms e Outlook abrem em
outra aba; a autenticação dos formulários é feita pela Microsoft com conta @unb.br.

O proxy desta máquina recusou acesso à Microsoft com HTTP 403. URLs e abertura de
nova aba foram testadas, mas carregamento real, conteúdo do calendário e autenticação
institucional continuam pendentes de conferência manual. Não há calendário incorporado.

A auditoria local terminou com 34 testes aprovados em Chromium, além de lint,
tipos e build. Firefox, Safari, dispositivos reais, leitores de tela e o endereço
público após deploy ainda não foram validados. Detalhes em `docs/auditoria.md`.

O ESLint 9 recebe aviso de fim de suporte. Ele permanece fixado por compatibilidade
dos plugins usados; uma atualização deve ser feita separadamente, com novos checks.
Node 24 é suportado no código oficial atual da Vercel consultado, mas isso não
comprova elegibilidade no Hobby ou publicação bem-sucedida. Nenhum recurso pago
foi habilitado e nenhum plano alternativo foi contratado.
