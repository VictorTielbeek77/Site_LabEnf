# POPs: arquivo original, consulta e download

## Documento conferido

O anexo `POP_LABS_ENF_UnB_.pdf` foi localizado e lido com `pdftotext -layout` e
`pdfinfo`, antes da implementação. O quadro de controle e a estrutura do original
confirmam:

- Título: Gerenciamento e descarte seguro de resíduos.
- Versão: 01.
- Elaboração: 19 de outubro de 2026.
- Extensão: 4 páginas, 150290 bytes.

A página reproduz, como citação, a ressalva da nota de aplicação:

> A adequação desse fluxo deverá ser validada com a SeMA/CGR antes da implementação definitiva deste POP.

Não é atribuída aprovação institucional definitiva. As orientações técnicas não
foram reescritas ou convertidas em regras gerais do laboratório.

## Arquivo e integridade

A cópia binária está em `public/documents/POP_LABS_ENF_UnB_.pdf`. O site e os testes
não precisam do caminho temporário do anexo. Não houve conversão, recompressão,
edição ou reconstrução do PDF.

SHA-256 registrado a partir do original:

```text
fc2276351426f5a40e87e4bc809738bef1bdf5b00798c99d2e2ad20c67b10a72
```

Esse hash e o tamanho coincidiram no anexo, na cópia do projeto, nas duas
respostas HTTP completas e nos arquivos efetivamente baixados pelo Chromium.

## Consulta e download

| Ação | URL | Resposta verificada |
| --- | --- | --- |
| Consultar PDF | `/documents/POP_LABS_ENF_UnB_.pdf` | HTTP 200, `application/pdf`, `Content-Disposition: inline`. |
| Baixar PDF | `/documents/POP_LABS_ENF_UnB_.pdf?download=1` | HTTP 200, `application/pdf`, `Content-Disposition: attachment`. |

Uma só cópia do arquivo atende às duas ações. As regras em `next.config.ts` mudam
a disposição de conteúdo quando a consulta `download=1` está presente, sem API,
rota de leitura de disco ou duplicação do binário. O link de download também usa
o atributo HTML `download` com o nome original. Respostas têm `nosniff`.

GET e HEAD foram verificados nas duas URLs. O acesso parcial `Range: bytes=0-15`
retornou HTTP 206, `Content-Range: bytes 0-15/150290` e os bytes corretos.

## Comportamentos que dependem do navegador

- “Consultar PDF” abre o endereço direto em nova aba, com aviso visível e nome
  acessível. Não há iframe, embed, visualizador de terceiros ou dependência de JavaScript.
- `inline` permite abrir o leitor de PDF do navegador, mas suas configurações
  podem fazer download ou encaminhar para outro aplicativo. Não se promete o
  mesmo leitor em todos os dispositivos.
- “Baixar PDF” sinaliza download por cabeçalho e atributo HTML. No Chromium, o
  evento de download ocorreu e o arquivo salvo preservou nome, tamanho e hash.
  Diálogo de salvamento, pasta de destino e interface em celulares dependem do navegador.
- O conteúdo do leitor nativo, leitores de tela dentro do PDF, Safari/iOS e Firefox
  não foram auditados. A página oferece os links diretos sem depender desse leitor.
- Cabeçalhos e arquivo ainda devem ser reconferidos no endereço público após o
  futuro deploy na Vercel. Esta etapa validou a versão de produção local.

## Adicionar outros POPs

1. Receber o documento real e conferir seu título, versão, data, páginas e notas.
2. Copiar o arquivo integral para `public/documents/`, usando nome distinto e sem
   sobrescrever o POP atual. Preferir nomes simples, sem subpastas ou caracteres especiais.
3. Acrescentar uma entrada em `src/config/procedures.ts`: id único, título, versão
   como texto, data ISO, páginas, nome do arquivo, bytes, SHA-256 e nota de aplicação
   quando existente. A nota não é presumida para outros documentos.
4. O componente `ProcedureCard` gera os metadados, a nota e ambas as ações a partir
   do catálogo. Datas são formatadas com UTC explícito, sem deslocar o dia.
5. Conferir o hash contra o novo original e estender os testes de integridade e
   acesso ao arquivo. Não cadastrar documentos fictícios ou cartões vazios.

## Verificação executada

Para substituir um documento por uma nova versão e obter hashes em Windows,
macOS ou Linux, seguir também `docs/manutencao.md`. Atualizar os metadados e testes
somente após conferir o novo original, preservando a versão anterior.

Na quinta etapa, lint, tipos e build passaram e a suíte Playwright teve 23 testes aprovados,
sem falhas ou testes ignorados. Os testes de POPs incluem HTTP real, comparação
binária, abertura de nova aba e download efetivo em 320 e 1440 px. A suíte também
verifica contraste, teclado, movimento reduzido e ausência de rolagem horizontal
nas seis rotas entre 320 e 1440 px. Capturas da página foram revisadas em celular
e desktop. Nenhum push ou deploy foi realizado.
