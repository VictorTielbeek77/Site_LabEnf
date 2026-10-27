# Agendamento e calendário

## Comportamento implementado

As URLs permanecem exclusivamente em `src/config/site.ts` no código da aplicação,
com todos os identificadores originais. Os testes contêm os valores esperados
independentemente da configuração para detectar alterações acidentais.

- `/agendamento`: consulta ao calendário antes do Microsoft Forms, exigência de
  conta @unb.br, autenticação pela Microsoft e botão “Abrir formulário de agendamento”.
  O envio não é apresentado como confirmação de reserva. Não há prazo inventado.
- `/calendario`: disponibilidade e títulos das atividades são consultados no
  Outlook, por botão oficial sempre renderizado. Há orientação para consultar o
  período desejado e seguir para agendamento.
- Uma falha de abertura não é interpretada como ausência de atividades ou horário
  livre. A página não simula eventos, horários ou estados de disponibilidade.
- Sem formulário local, API de calendário, sincronização automática ou login próprio.

## Investigação de incorporação

Foram tentadas requisições HTTPS GET às URLs oficiais de Forms e calendário, com
o proxy e a confiança TLS do ambiente preservados. Ambas falharam na abertura do
túnel: `Tunnel connection failed: 403 Forbidden`. Os dois destinos não constam
na lista de hosts do arquivo de política de rede disponibilizado ao executor.
O status do ambiente reportava estado de aplicação da política como desconhecido;
o erro de conexão foi observado diretamente nas operações.

Não houve resposta da origem Microsoft, portanto não foi possível examinar
`X-Frame-Options`, CSP `frame-ancestors`, eventuais redirecionamentos, conteúdo ou
usabilidade do calendário. Isso **não prova que a Microsoft proíbe incorporação**.

Decisão: entregar consulta externa útil, sem iframe, porque a incorporação não
pôde ser validada. Não houve tentativa de remover restrições, desativar TLS,
reescrever identificadores, usar proxies alternativos ou extrair eventos.

Para retestar nesta máquina, os destinos iniciais a autorizar nas configurações
de rede do ambiente são `forms.cloud.microsoft` e `outlook.office365.com`, mantendo
as demais regras existentes. Destinos de redirecionamento devem ser verificados
após uma resposta real, sem ampliar a permissão indiscriminadamente. Essa liberação
não é necessária para compilar ou executar o site: ele não faz requisições à
Microsoft no servidor. A navegação externa ocorre no navegador do visitante.

Antes de adicionar um iframe, verificar permissão de enquadramento, carregamento
real e uso em celular no contexto do site. Um evento `load` ou um iframe vazio
não demonstram funcionamento. Manter o botão externo mesmo se uma incorporação
for validada futuramente.

## Validação técnica concluída

- `npm run lint`, `npm run typecheck` e `npm run build`: aprovados, seis rotas estáticas.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`:
  20 testes aprovados, sem falhas ou testes ignorados.
- Ordem calendário → Forms, aviso @unb.br e distinção entre pedido e confirmação.
- Botões renderizados e visíveis mesmo sem JavaScript.
- Cliques em celular (320 px) e desktop (1440 px) abrem nova aba e iniciam GET para
  as URLs exatas; a página do laboratório permanece aberta. `noopener`, `noreferrer`
  e aviso de nova aba conferidos.
- Nos testes de botões, a navegação externa foi explicitamente interceptada e
  abortada, sem resposta fictícia de sucesso. Isso comprova ação e URL, não o
  carregamento do destino Microsoft ou autenticação.
- Regressões de navegação, teclado, contraste, movimento reduzido e ausência de
  rolagem horizontal nas seis rotas entre 320 e 1440 px aprovadas.
- Capturas de agendamento e calendário em celular e desktop revisadas.
- Nenhum formulário enviado, nenhuma sessão institucional utilizada.

## Conferência manual pendente

No navegador com acesso aos serviços Microsoft:

1. Abrir o calendário oficial e confirmar que disponibilidade e títulos das
   atividades podem ser consultados. Conferir também em celular.
2. Abrir o Forms pelo botão de agendamento, autenticar-se com a própria conta
   @unb.br e conferir acesso ao formulário, sem enviar uma solicitação de teste.
3. Conferir a restrição de acesso institucional na configuração do Forms. Ela
   foi informada pelo usuário, não verificada por uma sessão autenticada aqui.

Não fornecer senhas ou tokens em chat. Firefox, Safari e leitores de tela reais
não foram testados nesta etapa. Nenhum push ou deploy realizado.
