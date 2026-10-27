# Empréstimos e revisão dos textos

## Solicitação de materiais

A página `/emprestimos` explica o Microsoft Forms e o acesso com conta @unb.br.
O botão “Solicitar empréstimo de materiais” usa `siteConfig.links.loans`, sem
alterar os identificadores do link original fornecido pelo usuário.

A página afirma que preencher o formulário não autoriza o empréstimo nem garante
a disponibilidade dos materiais. Não há catálogo, estoque, prazos, responsáveis
ou regras de retirada/devolução inventados. Há um acesso separado ao agendamento
para quem procura realizar uma atividade prática.

## Revisão editorial realizada

Os textos de todas as páginas, metadados e componentes compartilhados foram
lidos e confrontados com os dados confirmados e os critérios registrados.

| Página ou componente | Resultado da revisão |
| --- | --- |
| Início | Quatro serviços e percurso calendário → solicitação preservados; descrição geral padronizada para “agendamentos de atividades práticas”. |
| Sobre | Somente identificação e localização confirmadas; sem contatos, fotos, horários ou equipamentos fictícios. |
| Agendamento | Consulta ao calendário antes do Forms; pedido distinguido de reserva confirmada; nenhum prazo de resposta. |
| Calendário | Consulta de disponibilidade e títulos; falha não significa horário livre; acesso externo permanente. |
| POPs | Consulta/download reais, versão/data/páginas do original e ressalva SeMA/CGR; descrição dos cartões atualizada para indicar que o PDF está disponível. |
| Empréstimos | Formulário próprio, acesso institucional e ausência de autorização ou disponibilidade automática. |
| Cabeçalho, rodapé e metadados | Nome Laboratório de Enfermagem/FS centralizado e uniforme; identificação da UnB e campus confirmados. |
| Aviso de acesso | Redação mais direta: “O envio registra uma solicitação e não representa confirmação automática.” |
| Links, menu e página 404 | Destinos reais e avisos de nova aba; retorno ao início e navegação preservados. |

Não foram criados dados institucionais para preencher lacunas. O PDF original e
suas orientações técnicas permaneceram intactos, sem revisão editorial do binário.

## Verificações concluídas

- `npm run lint`, `npm run typecheck` e `npm run build`: aprovados; seis rotas estáticas.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`:
  27 testes aprovados, sem falhas ou testes ignorados.
- Em 320 e 1440 px, o botão de empréstimos abre uma nova aba e inicia GET para a
  URL exata esperada. O ID foi comparado ao do formulário de atividades práticas:
  são diferentes. A navegação externa foi interceptada e abortada, sem resposta
  fictícia de sucesso e sem POST ou envio de formulário.
- O acesso “Ir para agendamento” leva à página correta, que mantém seu próprio
  formulário de atividades práticas.
- Nas seis páginas, os links locais retornam HTTP 200, fragmentos têm destino,
  links externos usam as três URLs oficiais e apresentam aviso de nova aba e
  proteção `noopener`. Não há links vazios ou provisórios.
- Nome do laboratório, idioma pt-BR e ausência de textos de demonstração conferidos.
- Inspeção do código não encontrou rastreadores, envio de dados, formulários locais
  ou chamadas de armazenamento persistente. Na navegação de produção testada,
  não houve requisições externas automáticas, cookies ou dados em localStorage,
  sessionStorage e IndexedDB. Isso descreve a aplicação, não o Microsoft Forms.
- Regressões de contraste, teclado, movimento reduzido e largura de 320 a 1440 px
  aprovadas. O PDF também continuou passando nos testes de integridade e download.
- Capturas de empréstimos em celular e desktop revisadas visualmente.

## Acesso real ao Forms: limitação observada

Foi tentada uma requisição HTTPS GET ao link de empréstimos com o proxy e a
verificação TLS preservados. O túnel foi recusado com
`Tunnel connection failed: 403 Forbidden`, antes de qualquer resposta da Microsoft.
O host `forms.cloud.microsoft` não constava na lista de destinos configurada no
executor; o status de aplicação da política era desconhecido. A falha não foi
atribuída a credenciais ou permissão da conta Microsoft.

Portanto, os testes comprovam botão, nova aba, URL e distinção entre os links,
mas não comprovam carregamento, conteúdo do Forms ou autenticação. Para concluir
a conferência manual, abrir o botão em um navegador com acesso à Microsoft,
entrar com a própria conta @unb.br e conferir a finalidade de empréstimos, sem
enviar respostas de teste. Não fornecer senhas ou tokens em chat.

Firefox, Safari e leitores de tela reais não foram testados nesta etapa. A
auditoria final, o envio ao GitHub e o deploy permanecem em etapas posteriores.
