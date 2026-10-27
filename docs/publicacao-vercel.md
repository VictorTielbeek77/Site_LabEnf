# Preparação para GitHub e Vercel — sem publicação

Este documento é um roteiro para a etapa de publicação. Nenhum comando de push,
conexão de projeto ou deploy foi executado nesta preparação.

## 1. Elegibilidade e limites do plano gratuito: conferência pendente

**Não há promessa de hospedagem gratuita para este uso institucional.**

Em 27/10/2026, a tentativa de ler `https://vercel.com/docs/plans/hobby` foi recusada
pelo proxy: `Tunnel connection failed: 403 Forbidden`, antes de receber conteúdo
da Vercel. Portanto, não foram confirmadas as condições ou cotas vigentes do Hobby.
O bloqueio é desta conexão de desenvolvimento, não evidência de indisponibilidade
do site da Vercel.

O caráter educacional/institucional do laboratório não deve ser tratado como
autorização automática para qualquer plano gratuito. Não se conclui, sem a leitura
atual, que este caso seja elegível ou inelegível. Antes de selecionar o plano,
conferir a documentação e, se houver ambiguidade, obter posicionamento da Vercel.

| Condição/limite a conferir na documentação atual | Situação nesta preparação |
| --- | --- |
| Tipos de uso aceitos: pessoal, institucional e comercial | Não confirmado. |
| Regras de conta, equipe, colaboradores e repositórios GitHub | Não confirmado. |
| Transferência de dados/CDN, requisições e políticas ao exceder cotas | Não confirmado. |
| Builds, tempo de compilação, concorrência e quantidade de deploys | Não confirmado. |
| Limites de projetos, arquivos e tamanho de artefatos | Não confirmado. |
| Funções e otimização de imagens, caso passem a ser usadas | Não confirmado. |
| Recursos adicionais, eventual cobrança e regras de atualização de plano | Não confirmado. |

Não foram copiados números antigos ou presumidos limites. O repositório oficial
de código da Vercel, acessível nesta máquina, não substitui os termos e a tabela
atual de preços/cotas. Não foi escolhido outro provedor nem contratado plano pago.
Se uma restrição for confirmada, explicá-la antes de decidir outra solução.

Fontes oficiais a conferir, sem leitura bem-sucedida nesta máquina:

- [Vercel Hobby](https://vercel.com/docs/plans/hobby)
- [Limites da Vercel](https://vercel.com/docs/limits)
- [Documentação da Vercel](https://vercel.com/docs)

O domínio `vercel.com` foi acrescentado ao **rascunho** de rede do ambiente,
preservando as regras anteriores e o preset de gerenciadores de pacotes. Salvar
o rascunho não aplica a regra. Para concluir a consulta aqui, revisar/salvar nas
configurações e publicar o **ambiente de desenvolvimento**, não o site; depois
retestar as páginas oficiais. Não é necessário liberar a rede para rodar o site localmente.

## 2. Node e configuração técnica

O projeto usa Next.js com App Router e Node **24.x**, especificado em `.nvmrc` e
`engines.node: >=24 <25`. A instalação e a produção locais usam Node 24.19.0.

O suporte a `nodejs24.x` foi conferido no código oficial atual da Vercel, no commit
`c628be7835e03a965b93e9cf9e2bd5ac2acbf5eb`:

[Definição de versões Node nos build-utils da Vercel](https://github.com/vercel/vercel/blob/c628be7835e03a965b93e9cf9e2bd5ac2acbf5eb/packages/build-utils/src/fs/node-version.ts)

Essa é uma verificação técnica do código oficial, não leitura da documentação de
planos nem validação de um projeto já criado na Vercel. Conferir também a opção
24.x no painel ao importar o projeto.

| Campo na importação | Configuração prevista |
| --- | --- |
| Repositório | `VictorTielbeek77/Site_LabEnf` |
| Framework Preset | Next.js |
| Root Directory | Raiz do repositório, onde está `package.json` |
| Node.js Version | 24.x |
| Install Command | `npm ci --include=dev` |
| Build Command | `npm run build` |
| Output Directory | Padrão do preset Next.js; não configurar `out` |
| Production Branch | `main`, após existir no GitHub |
| Variáveis da aplicação | Nenhuma nesta versão |

As dependências de desenvolvimento são necessárias no build para TypeScript,
PostCSS e tipos dos testes. O build não executa Playwright nem baixa Chromium.

Não foi adicionado `vercel.json`: o preset Next.js e `next.config.ts` já definem
o comportamento necessário. Não usar `output: "export"` ou hospedar apenas HTML
sem adaptação: a regra de download por query depende dos cabeçalhos configurados.

## 3. Revisar e enviar o primeiro commit ao GitHub — etapa futura

A leitura do remoto funcionou, e ele não anunciou HEAD ou branch main na consulta
desta preparação. O checkout local está sem commits, no branch `work`, com os
arquivos do site ainda não enviados. Revalidar o estado imediatamente antes de
qualquer envio; outra pessoa pode ter alterado o remoto nesse intervalo.

Antes do primeiro envio:

1. Revisar os arquivos e executar instalação, lint, tipos, build e testes.
2. Configurar sua identidade de autor no Git, se necessário, usando seu nome e
   e-mail escolhido no GitHub; autenticar pelo mecanismo seguro do GitHub.
3. Conferir `git status` e `git ls-remote --heads origin main`. Se main já existir,
   preservar e reconciliar o histórico antes de enviar; não usar force push.
4. Adicionar somente os arquivos do projeto, revisar o conteúdo preparado e criar
   o commit inicial quando a etapa de envio for autorizada.

Exemplo de seleção explícita dos arquivos, **para executar apenas na etapa autorizada**:

```sh
git add .gitignore .nvmrc AGENTS.md README.md package.json package-lock.json next.config.ts postcss.config.mjs eslint.config.mjs tsconfig.json playwright.config.ts src public tests docs
git diff --cached --stat
git diff --cached
git commit -m "Cria site do Laboratório de Enfermagem FS"
```

Se o branch ainda for `work` e não houver outro branch local main, renomeá-lo com
`git branch -m main`. Se já estiver em main, não renomear. Se houver conflito de
nomes ou histórico, investigar antes de prosseguir. Depois, somente com autorização:

```sh
git push -u origin main
```

O remote origin já aponta para o repositório solicitado; não é necessário recriá-lo.
Não alterar a visibilidade do repositório sem decisão do responsável. Para transferir
a manutenção a uma organização ou equipe, preservar permissões e conferir as
condições do plano antes de configurar colaboração.

## 4. Importar na Vercel — depois da conferência do plano e do push

1. Entrar na Vercel pelo navegador com a conta que manterá o projeto.
2. Confirmar que o plano escolhido é permitido para o uso pretendido. Não iniciar
   trial pago, habilitar recursos pagos ou contratar plano sem autorização.
3. Abrir a opção de adicionar/importar projeto e conectar o GitHub pelo fluxo oficial.
4. Selecionar o repositório existente `VictorTielbeek77/Site_LabEnf`.
5. Conferir os campos da tabela da seção 2. Os nomes das telas podem mudar; revisar
   o resumo de configuração antes de continuar.
6. Não cadastrar tokens Microsoft: os formulários autenticam o visitante na Microsoft,
   e o site não precisa de credenciais para funcionar.
7. Acionar Deploy **somente na etapa autorizada** e acompanhar o resultado do build.
8. Guardar o endereço real emitido pela Vercel; não presumir qual será o domínio.

Não é necessário executar `npm start` como comando de deploy na Vercel; o preset
Next.js prepara a execução na plataforma. O servidor `npm start` é usado na produção local.

## 5. Validar após publicar

- Abrir as seis rotas diretamente e navegar pelo menu em celular e computador.
- Conferir a 404, idioma, títulos, recursos e console.
- Abrir os três links oficiais e conferir os dois Forms com conta @unb.br, sem
  enviar respostas de teste; verificar o calendário real.
- Consultar e baixar o PDF, conferindo o hash, tipo `application/pdf` e disposições
  `inline` / `attachment` na URL com `?download=1`.
- Confirmar que o site não adicionou analytics, rastreadores, login local ou integrações pagas.

Registrar URL, commit e resultado real. Um build local ou uma tela de importação
não prova que o deploy concluiu.

## 6. Atualizações posteriores

Após a integração estar ativa e validada, alterações enviadas ao branch de produção
podem acionar novos deploys conforme as configurações do projeto. Executar os
checks antes de cada envio e conferir o resultado na Vercel. Não assumir que o
site foi atualizado apenas porque o push terminou.

## 7. Verificação desta preparação — 27/10/2026

As verificações abaixo foram executadas novamente nesta etapa, não apenas
copiadas do relato da auditoria anterior. A suíte iniciou `npm start -- --port 3100`
para testar o build de produção local.

| Verificação | Evidência e resultado |
| --- | --- |
| Instalação reproduzível | `npm ci --include=dev` concluiu; lockfile v3 preservado e coerente com manifesto/engines. |
| Análise estática e tipos | `npm run lint` e `npm run typecheck` concluíram sem erros. |
| Build de produção | `NEXT_TELEMETRY_DISABLED=1 npm run build` concluiu. |
| Testes funcionais em produção | 34 aprovados, zero falhos, ignorados ou flaky; execução em Chromium com duas workers e sem retries. |
| Páginas e recursos | Seis rotas diretas HTTP 200; oito recursos de script/estilo verificados; nenhum erro de console, requisição falha ou resposta de recurso com erro. |
| PDF | Consulta, download, cabeçalhos e integridade aprovados; SHA-256 preservado. |
| Arquivos candidatos ao Git | 54 arquivos inspecionados; nenhum segredo reconhecido pelos padrões usados ou artefato temporário encontrado. A análise por padrões não prova ausência universal de segredos. |
| Dependências | Três dependências de produção necessárias e dez de desenvolvimento usadas pelas ferramentas; nenhuma nova dependência, analytics ou integração paga adicionada. |
| Documentação | Destinos dos links Markdown locais dos guias conferidos. |
| GitHub | Consulta somente de leitura; remoto sem HEAD/main anunciados. Nenhum commit ou push. |
| Vercel | Sem projeto vinculado, deploy ou leitura bem-sucedida dos termos/cotas atuais. |

O npm mostrou alguns artefatos opcionais WASM do instalador como `extraneous` em
`node_modules`. A inspeção do lockfile identificou entradas opcionais, e
`npm prune --dry-run --json` não propôs remoção nem alterou o lockfile. Esses
artefatos locais não são dependências diretas adicionadas nem arquivos para versionar.

O relatório bruto desta execução está temporariamente em
`/tmp/labenf-preparation-tests.json`; ele não integra o repositório. As pendências
de Microsoft, outros navegadores, tecnologias assistivas reais, plano Vercel e
validação no futuro endereço público permanecem abertas.
