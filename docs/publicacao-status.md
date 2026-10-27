# Registro da etapa de envio e publicação

Em 27/10/2026, o responsável autorizou o envio ao GitHub e a publicação pública
na Vercel condicionada à adequação do plano gratuito, sem contratação paga,
criação de conta ou aceite de termos em seu nome.

## GitHub: acesso corrigido

- Repositório: https://github.com/VictorTielbeek77/Site_LabEnf.
- Branch de destino: `main`.
- O bloqueio anterior identificava `MatheusCavalcanteLopes` e retornava HTTP 403.
- Após o responsável publicar o ambiente, `gh api user` retornou **VictorTielbeek77**;
  o acesso ao repositório confirmou permissão de escrita e o teste de envio passou.
- A consulta do remoto imediatamente antes desta atualização não anunciou HEAD/main.
  O envio deve ser normal, preservando o histórico, sem force push.
- O resultado efetivo do push e o commit são comprovados pelo histórico remoto e
  pelo relato final da execução, sem declarar conclusão antecipadamente aqui.

Nesta retomada, lint, tipos e build passaram novamente, e a suíte iniciou produção
local e concluiu com **34 testes aprovados**, zero falhos, ignorados ou flaky.
Os 55 arquivos versionados foram inspecionados para segredos e artefatos; nenhum
achado nos padrões utilizados. Links locais da documentação conferidos, PDF e
lockfile preservados. O relatório temporário desta rodada é
`/tmp/labenf-account-fixed-tests.json`; ele não integra o repositório.

O arquivo `site-labenf.zip` é uma cópia de transferência, não integra os commits.
Depois do push confirmado, também é possível obter o projeto no GitHub por
**Code → Download ZIP**, sem depender da exportação de artefatos deste chat.

## Vercel: condição de publicação ainda não atendida

A rede foi aplicada, e Hobby, Fair Use Guidelines e Limits oficiais responderam
HTTP 200. Os limites atuais e as fontes estão em `publicacao-vercel.md`.

A restrição do Hobby a **uso pessoal e não comercial** foi confirmada. A
permissão para este portal institucional não foi confirmada. Sob a autorização
condicional do responsável, não criar deploy nem iniciar trial/upgrade pago.
Solicitar confirmação à Vercel é uma etapa a cargo do responsável; nenhuma mensagem
foi enviada em seu nome e não foi escolhida outra hospedagem.

Também não há integração Vercel autenticada disponível nesta sessão. Não foram
criados projeto, integração de Git, conta ou deploy; termos não foram aceitos em
nome do responsável. A ligação automática com `main` só deve ser configurada
quando a elegibilidade e o acesso seguro à Vercel estiverem resolvidos.

## Próximo passo da hospedagem

Obter confirmação de que o uso institucional é aceito no plano sem custo. Se houver
restrição aplicável, decidir outra solução que aceite esse uso, antes de mudar a
hospedagem. Não é necessário reconectar o GitHub novamente: o acesso foi corrigido.
Depois de resolver a condição do plano, seguir a configuração documentada e testar
a URL real emitida pela plataforma. Até então, rotas, menu móvel, recursos e PDF
no domínio de produção permanecem **não executados**.

Os três links Microsoft são públicos como links, mas os formulários autenticam
na Microsoft. A conferência real com conta `@unb.br` continua manual e sem envio
de respostas de teste.
