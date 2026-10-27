# Preparação para GitHub e Vercel — sem publicação

Este documento contém as configurações e condições de publicação. O estado atual
do envio ao GitHub está no histórico remoto e em `publicacao-status.md`. Nenhum
projeto Vercel foi conectado ou implantado nesta etapa.

## 1. Plano gratuito: restrição documentada e elegibilidade institucional pendente

**Não publicar este site no Hobby sem confirmar sua elegibilidade institucional.**

Em 27/10/2026, após o responsável publicar o ambiente de desenvolvimento,
a rede ficou aplicada e as três fontes oficiais abaixo responderam HTTP 200:

- [Vercel Hobby](https://vercel.com/docs/plans/hobby)
- [Fair Use Guidelines — Commercial usage](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage)
- [Limites da Vercel](https://vercel.com/docs/limits)

A documentação afirma: **“Hobby teams are restricted to non-commercial personal
use only.”** O plano gratuito se destina a uso pessoal e não comercial. Este
portal presta serviços institucionais de um laboratório universitário; ausência
de venda ou pagamento não confirma, por si, que esse uso é pessoal e permitido.
Não foi encontrada nessas páginas uma exceção expressa para este laboratório.
A elegibilidade precisa de confirmação da Vercel antes de qualquer deploy.

A definição documentada de uso comercial também inclui pagamento a funcionário
ou consultor envolvido na produção. Não foram presumidos vínculos ou pagamentos
dos envolvidos neste projeto. Havendo dúvida, a própria documentação orienta
consultar o suporte da Vercel; nenhuma mensagem foi enviada em nome do responsável.

### Limites relevantes conferidos

Valores consultados em 27/10/2026; podem mudar. As cotas não autorizam um tipo de
uso que o plano restringe, nem comprovam capacidade para um tráfego ainda desconhecido.

| Recurso/condição | Hobby, conforme documentação consultada |
| --- | --- |
| Uso aceito | Pessoal e não comercial. |
| Fast Data Transfer | 100 GB por mês incluídos. |
| Fast Origin Transfer | 10 GB por mês incluídos. |
| Requisições CDN | 1.000.000 por mês incluídas. |
| Deploys | 100 por dia; rate limit de 100 por hora. |
| Concorrência | 1 deploy simultâneo. |
| Build | Máximo de 45 minutos; máquina de 2 vCPUs, 8 GB RAM e disco de 32 GB. |
| Projetos e domínios | 200 projetos; 50 domínios por projeto. |
| Upload de fontes pela CLI | Até 100 MB e 15.000 arquivos; não confundir com tamanho de um único PDF. |
| Funções, se usadas | 1.000.000 invocações/mês, 4 CPU-h e 360 GB-h de memória; duração máxima de 300 s. |
| Otimização de imagens, se usada | 5.000 transformações, 300.000 leituras e 100.000 gravações de cache/mês. |
| Colaboração e Git | Sem recursos de colaboração de equipe; Hobby não conecta projetos a repositórios pertencentes a organizações Git. |

O repositório atual pertence a uma conta pessoal, mas isso não transforma o site
institucional em projeto de uso pessoal. Funções, analytics, armazenamento e
outros serviços não foram habilitados para consumir as respectivas cotas.

Segundo a página do Hobby, na maioria dos excessos é necessário aguardar até
30 dias para usar novamente o recurso. Não configurar upgrade automático, trial,
cartão ou recursos pagos. Nenhum plano pago foi contratado e nenhuma alternativa
de hospedagem foi selecionada. Primeiro explicar a restrição; depois, se necessário,
o responsável poderá decidir uma solução que aceite o uso institucional sem custo.

As falhas 403 registradas na preparação anterior eram do proxy e foram resolvidas
para estas consultas. Não é necessário repetir a configuração de rede ou trocar
contas GitHub para resolver a condição contratual do Hobby.

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
| Production Branch | `main` |
| Variáveis da aplicação | Nenhuma nesta versão |

As dependências de desenvolvimento são necessárias no build para TypeScript,
PostCSS e tipos dos testes. O build não executa Playwright nem baixa Chromium.

Não foi adicionado `vercel.json`: o preset Next.js e `next.config.ts` já definem
o comportamento necessário. Não usar `output: "export"` ou hospedar apenas HTML
sem adaptação: a regra de download por query depende dos cabeçalhos configurados.

## 3. Revisar e enviar alterações ao GitHub

O destino é `VictorTielbeek77/Site_LabEnf`, branch `main`. Após a publicação do
ambiente, `gh api user` identificou `VictorTielbeek77`, as permissões do repositório
incluíram escrita e o teste de push foi aprovado. Não é mais necessário conceder
acesso à conta anterior ou trocar a identidade de autor dos commits existentes.

Antes de cada envio autorizado:

1. Conferir `git status`, o branch atual e `git ls-remote --heads origin main`.
2. Buscar e comparar alterações remotas, preservando qualquer histórico existente.
   Se houver divergência, reconciliar antes do envio; não usar force push.
3. Executar lint, tipos, build e testes para o código alterado.
4. Selecionar somente os arquivos necessários com `git add <caminhos>`, revisar
   `git diff --cached` e `git diff --cached --check`, e criar o commit.
5. Enviar com `git push -u origin main` e comparar o hash remoto com `git rev-parse HEAD`.

O ZIP `site-labenf.zip` foi criado somente para transferência ao responsável e não
deve ser adicionado ao commit. Dependências, build, logs, segredos e credenciais
permanecem fora do versionamento. Não alterar origin, visibilidade ou colaboradores
sem uma decisão explícita do responsável.

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

## 7. Registro histórico da preparação anterior — 27/10/2026

As verificações abaixo pertencem à preparação anterior, antes da publicação do
ambiente e da correção da identidade GitHub. Foram executadas, não apenas
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
