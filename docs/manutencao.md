# Manutenção do site

Este guia se refere ao Laboratório de Enfermagem/FS, campus UnB Asa Norte.
O site tem seis páginas públicas, sem login próprio, banco de dados ou formulários
locais. Forms e Outlook são acessados em outra aba. O PDF original faz parte do projeto.

## Preparar o computador

Instale Git e **Node.js 24.x**, com npm, pelos instaladores oficiais. Não escolha
automaticamente outra versão principal do Node: `.nvmrc` e `package.json` exigem 24.
A referência validada é Node 24.19.0 / npm 11.9.0. Não são necessárias chaves,
contas Microsoft ou variáveis de ambiente para iniciar o site.

**Depois do envio inicial da versão ao GitHub**, obtenha o projeto:

```sh
git clone https://github.com/VictorTielbeek77/Site_LabEnf.git
cd Site_LabEnf
npm ci
npm run dev
```

Confirme no histórico remoto a conclusão do envio desta versão antes de cloná-la
em outro computador. No ambiente de desenvolvimento atual, use
`cd /workspace/Site_LabEnf` no lugar de clonar.

Se já usa nvm no macOS/Linux, dentro da pasta do projeto execute `nvm install`
e `nvm use`. Não é necessário instalar nvm para usar o instalador do Node.

Abra no navegador o endereço indicado como **Local** no terminal do Next.js.
A porta padrão é 3000. Mantenha o terminal aberto; Ctrl+C encerra o servidor.
Se a porta estiver ocupada, use `npm run dev -- --port 3001` e abra o novo endereço
informado. Não encerre processos de outras aplicações para liberar uma porta.

## Instalar e verificar alterações

Use `npm ci` para reproduzir o lockfile. Não use `npm update` como etapa normal
de instalação. Alterações intencionais de dependências devem atualizar o lockfile
e passar novamente pelas verificações.

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

O navegador do Playwright precisa ser instalado apenas quando ausente ou após
uma atualização que exija outra versão. Em Linux, eventuais bibliotecas do sistema
podem exigir `npx playwright install --with-deps chromium`.

O teste inicia seu próprio servidor de produção na porta **3100**, que deve estar
livre. Faça o build antes dos testes. Não é preciso executar `npm start` para a suíte.
Os testes não enviam respostas aos formulários Microsoft.

No ambiente de nuvem foi usado o Chromium já instalado:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Esse último comando é específico do ambiente Linux atual. No computador pessoal,
instale o Chromium pelo Playwright e use o comando normal, sem essa variável.
Ela não é uma variável necessária na Vercel.

## Conferir a versão de produção

```sh
npm run build
npm start
```

Abra o endereço **Local** apresentado no terminal e confira as seis rotas também
digitando seus caminhos diretamente. Teste PDF, menu móvel e links externos.
Ctrl+C encerra esse servidor. Se alterar código ou configuração, refaça o build
antes de reiniciar a produção; `npm start` usa o build existente.

## Onde alterar cada conteúdo

| Necessidade | Arquivo ou pasta |
| --- | --- |
| Nome, instituição, campus, domínio institucional e links oficiais | `src/config/site.ts` |
| Títulos e descrições dos quatro serviços | `services` em `src/config/site.ts` |
| Texto e composição de cada página | `src/app/.../page.tsx` |
| Contatos, fotos e espaços confirmados | `src/config/laboratory-content.ts` |
| Catálogo de POPs e seus metadados | `src/config/procedures.ts` |
| Arquivos originais dos POPs | `public/documents/` |
| Fotos reais autorizadas, quando fornecidas | `public/images/` e cadastro em `laboratory-content.ts` |
| Cores, espaçamentos, foco e responsividade | `src/app/globals.css` |
| Cabeçalho, rodapé, cartões e avisos | `src/components/` |
| Título/descrição geral e idioma | `src/app/layout.tsx` |
| Página 404 e ícone decorativo da aba | `src/app/not-found.tsx` e `src/app/icon.svg` |
| Cabeçalhos de consulta/download | `next.config.ts` |

Preserve integralmente os identificadores dos links Microsoft. O Forms de
empréstimos tem um ID diferente do Forms de atividades práticas. Não coloque
senhas, tokens ou credenciais nas URLs ou nos arquivos.

Contatos, fotos e espaços estão vazios de propósito; as seções não aparecem até
receberem dados reais. Não preencher lacunas com exemplos no site público.
Ver também `docs/conteudo-institucional.md`.

## Adicionar ou substituir PDFs

O documento atual é `public/documents/POP_LABS_ENF_UnB_.pdf`. Ele foi preservado
integralmente, com versão 01, elaboração em 19/10/2026 e quatro páginas. A ressalva
de validação do fluxo com a SeMA/CGR deve permanecer visível enquanto constar no documento.

Para **adicionar outro POP**:

1. Receba o PDF real e confira título, versão, data, quantidade de páginas e notas.
2. Copie o binário original para `public/documents/`, com nome distinto e simples,
   sem subpastas. Não recrie ou recomprima o documento.
3. Acrescente uma entrada em `src/config/procedures.ts`, com ID único, título,
   versão como texto, data ISO, páginas, nome do arquivo, bytes, SHA-256 e nota
   de aplicação, se existir no original.
4. Compare o hash entre o original e a cópia; verifique consulta e download.
5. Amplie os testes para o novo documento e execute as verificações de produção.

Para **substituir por uma nova versão**, prefira um arquivo com nome distinto e
altere a entrada correspondente do catálogo para essa versão. Preserve o arquivo
anterior e seu histórico. Isso evita confundir versões e facilita conferir a origem.
Não mantenha título, data, páginas ou nota antigos se o novo original os alterar.

Se for necessário reutilizar o mesmo nome, preserve antes a versão anterior no
histórico do Git, confirme os novos bytes e refaça a validação após publicar.
Não substitua o hash esperado de um teste apenas para fazê-lo passar: compare
primeiro com o novo original legítimo e registre sua versão.

Comandos para obter o hash, substituindo o caminho pelo arquivo real:

| Sistema | Comando |
| --- | --- |
| Windows PowerShell | `Get-FileHash "public/documents/POP_LABS_ENF_UnB_.pdf" -Algorithm SHA256` |
| macOS | `shasum -a 256 public/documents/POP_LABS_ENF_UnB_.pdf` |
| Linux | `sha256sum public/documents/POP_LABS_ENF_UnB_.pdf` |

No PowerShell, `(Get-Item "public/documents/POP_LABS_ENF_UnB_.pdf").Length` mostra
o tamanho em bytes. A versão inicial e suas evidências estão em `docs/pops.md`.
Ao alterar metadados ou a versão, ajuste os testes correspondentes somente com
base no documento conferido.

## O que versionar

Inclua código, configurações, testes, documentação, `package.json`,
`package-lock.json` e os PDFs reais de `public/`. O arquivo `AGENTS.md` contém a
orientação gerada pelo Next.js para agentes de programação e permanece no projeto.

Não inclua `node_modules/`, `.next/`, relatórios temporários de testes,
`*.tsbuildinfo`, logs, `.env*` ou `.vercel/`. Essas exclusões estão em `.gitignore`.
Dependências instaladas e build local são esperados na máquina de desenvolvimento,
mas não compõem os arquivos enviados ao GitHub.

## Limitações conhecidas

- A consulta real ao Microsoft Forms e ao Outlook foi recusada pelo proxy da nuvem.
  Os alvos e a abertura de nova aba foram testados, mas autenticação @unb.br e
  calendário real exigem conferência manual em navegador com acesso à Microsoft.
- Não há calendário incorporado, estoque, confirmação automática ou formulário local.
- O leitor nativo de PDF varia por navegador. Consulta e download são separados.
- Os testes automatizados foram executados em Chromium. Firefox, Safari, aparelhos
  reais e leitores de tela reais continuam fora da validação executada.
- O ESLint 9 emite aviso de fim de suporte. A configuração atual preserva a
  compatibilidade declarada pelos plugins e passa na análise; atualizar a ferramenta
  deve ser uma tarefa própria, com nova validação.
- A documentação Vercel foi consultada após a publicação do ambiente: o Hobby é
  limitado a uso pessoal e não comercial. A elegibilidade institucional não foi
  confirmada. Ver os limites e a condição de publicação em `docs/publicacao-vercel.md`.
