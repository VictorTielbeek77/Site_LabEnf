# Registro da etapa de envio e publicação

Em 27/10/2026, o responsável autorizou o envio ao GitHub e a publicação pública
na Vercel condicionada à adequação do plano gratuito, sem contratação paga,
criação de conta ou aceite de termos em seu nome.

## GitHub

- Repositório: https://github.com/VictorTielbeek77/Site_LabEnf.
- Branch de destino selecionada: `main`.
- Antes do envio, as consultas de leitura não anunciaram branches ou HEAD remoto;
  o checkout local estava sem commits, no branch `work`.
- Os arquivos existentes foram preservados. O envio deve ser normal, sem force push;
  conferir o hash remoto depois para comprovar a conclusão.
- O histórico do Git e o relato da execução registram o commit e o resultado efetivo.
  Este documento não declara um envio bem-sucedido antecipadamente.

Os resultados da preparação anterior em `publicacao-vercel.md` descrevem aquela
etapa histórica. Nesta etapa, lint, tipos, build e testes de produção são executados
novamente antes do envio. Não se confunde teste local com validação pública.

Nesta execução, lint, tipos e build concluíram sem erros. A suíte iniciou o
servidor de produção e terminou com **34 testes aprovados**, zero falhos, ignorados
ou flaky. Os acessos diretos, menu móvel, destinos oficiais, alternativa do calendário,
PDF, recursos e console passaram localmente. Os destinos Microsoft foram
interceptados nos testes de abertura, sem comprovar autenticação ou carregamento real.

Foram inspecionados os 55 arquivos preparados para o commit; nenhum segredo foi
reconhecido pelos padrões utilizados e nenhum artefato temporário foi incluído.
O lockfile aponta apenas para `registry.npmjs.org`, e o PDF mantém o SHA-256
registrado no original. `git diff --cached --check` concluiu sem problemas.

## Vercel: publicação bloqueada

A liberação de `vercel.com` continua apenas no rascunho de configuração; a política
observada do ambiente não inclui esse domínio. A tentativa anterior de ler os termos
e limites oficiais recebeu 403 do proxy, antes do servidor da Vercel. Não foi
confirmado que o Hobby atende ao uso institucional nem quais cotas estão vigentes.
Por isso, não criar deploy, ativar trial ou selecionar outro plano neste estado.

Não há ferramenta de integração Vercel disponível nesta sessão, credencial Vercel
declarada ou configuração local de projeto/autenticação encontrada. Não foi
configurado projeto, integração de Git ou publicação automática. Nenhuma senha
ou token deve ser enviado no chat.

## Ações seguras para desbloquear

1. Nas configurações deste ambiente de desenvolvimento, revisar/salvar a liberação
   de `vercel.com` e `api.vercel.com`, preservando os destinos atuais. A inclusão está
   salva no rascunho; aplicar/publicar o ambiente e conferir a propagação antes de
   tentar novamente. Publicar o ambiente não publica o site.
2. Conferir as condições e limites atuais nas fontes oficiais indicadas em
   `publicacao-vercel.md`. Se houver restrição institucional, explicar a restrição
   antes de propor outra hospedagem; não contratar alternativa paga.
3. Com plano adequado confirmado, usar uma conta Vercel existente e conectar o
   GitHub pelo fluxo oficial no navegador. Não criar conta nem aceitar termos por
   outra pessoa. Se surgir necessidade de aceite, o responsável deve analisá-lo.
4. Sem uma integração autenticada disponível à sessão, o responsável pode importar
   o repositório pelo painel da Vercel, seguindo a configuração documentada. Para
   execução pelo agente, será necessária uma ferramenta/CLI com autenticação segura
   disponível no ambiente; não basta estar conectado em outro navegador.
5. Depois de autorizado o plano, usar `main` como branch de produção. Somente após
   a Vercel confirmar o deploy, registrar o endereço real e executar a validação
   pública completa. Até lá, rotas públicas, menu móvel, recursos e PDF no domínio
   de produção permanecem **não executados**.

Os três links Microsoft são públicos como links, mas os formulários autenticam
na Microsoft. A conferência real com conta `@unb.br` continua manual e sem envio
de respostas de teste.
