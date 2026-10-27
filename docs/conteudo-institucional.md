# Conteúdo de Início e Sobre

## Conteúdo confirmado

- Nome: Laboratório de Enfermagem/FS.
- Instituição: Universidade de Brasília.
- Unidade: Faculdade de Ciências da Saúde.
- Localização: campus UnB Asa Norte, sem endereço mais detalhado.
- Serviços: disponibilidade, solicitação de atividades práticas, POPs e empréstimos.
- Formulários: Microsoft Forms com acesso @unb.br, conforme configuração informada
  pelo usuário. O envio é uma solicitação e não implica confirmação automática.

A inicial orienta consultar o calendário antes de acessar o formulário de
agendamento. Sobre organiza os dados institucionais e indica o serviço apropriado
para cada finalidade. Os dois compartilham o catálogo em `src/config/site.ts`.
Nenhuma orientação técnica do PDF foi convertida em regra geral do laboratório.

## Estrutura para complementar a apresentação

`src/config/laboratory-content.ts` contém três coleções tipadas, inicialmente
vazias. `LaboratoryDetails` só renderiza as seções com conteúdo; a página pública
não exibe caixas vazias, contatos de exemplo, fotos genéricas ou textos provisórios.

| Coleção | Informações necessárias para preencher |
| --- | --- |
| `contacts` | Contatos públicos confirmados: rótulo, valor e destino de telefone, e-mail ou página institucional. |
| `photos` | Fotografias autorizadas, descrição alternativa, dimensões reais e legenda quando houver. Colocar os arquivos em `public/images/`; referenciá-los por `/images/…`. |
| `spaces` | Nomes e descrições reais dos espaços, fornecidos pelo responsável. |

Identificação, localização, serviços e links oficiais ficam em `src/config/site.ts`.
Endereço detalhado, localização em mapa, horários, capacidade, equipamentos,
histórico, missão e regras de uso não foram fornecidos e não foram publicados.
Se forem informados, podem ser incorporados sem inferir dados a partir do PDF.

Ao acrescentar conteúdo, atualizar os testes que hoje verificam sua ausência
para conferir os dados confirmados, além de executar lint, tipos, build e testes
de navegador. A estrutura opcional compila, mas fotos e contatos reais ainda não
foram exercitados porque não há material fornecido para essas seções.

## Validação da terceira etapa

- Lint, TypeScript e build de produção aprovados; seis rotas continuam estáticas.
- 15 testes Playwright aprovados em Chromium, sem falhas ou testes ignorados.
- Todos os links do conteúdo de Início e Sobre foram clicados em 320, 390 e
  1440 px; destinos do cabeçalho e rodapé retornaram HTTP 200. Links internos de
  fragmento têm destino existente.
- Nas páginas de destino, os três links oficiais continuam corretos, com aviso
  de nova aba. Nenhum formulário foi enviado nem houve autenticação institucional.
- Ordem calendário → formulário, aviso @unb.br, fatos institucionais e ausência
  de contatos/fotos provisórios conferidos.
- Regressões de teclado, menu, contraste, movimento reduzido e ausência de
  rolagem horizontal nas seis rotas entre 320 e 1440 px aprovadas.
- Corrigido retorno do foco ao reduzir desktop para celular: o navegador podia
  perder o foco antes do evento de mudança de largura. O menu passa a guardar o
  último foco nos links; o teste também confirma que não retira foco do conteúdo.
  O cenário corrigido passou em três execuções consecutivas antes da suíte final.
- Capturas de Início e Sobre em celular e desktop revisadas visualmente.

Na validação da terceira etapa, o acesso a POPs levava à página correspondente
ainda sem PDF. O original foi integrado na quinta etapa, conforme `docs/pops.md`.
Testes em Firefox, Safari e leitores de tela reais continuam
fora da validação atual. Não houve push ou publicação.
