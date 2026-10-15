# Política de Segurança

## Versões Suportadas

Como este é um projeto client-side apenas (rodando no navegador do usuário, sem backend), não há versões "suportadas" no sentido tradicional de patches de segurança. O código roda inteiramente no dispositivo do usuário.

## Reportando uma Vulnerabilidade

Se você descobrir uma vulnerabilidade de segurança, por favor **não abra uma issue pública**. Em vez disso, envie um email para **security@ensina-logica.example.com** (substitua pelo email real) com:

1. Descrição da vulnerabilidade
2. Passos para reproduzir
3. Impacto potencial
4. Sugestão de correção (se tiver)

Responderemos em até 72 horas e trabalharemos na correção o mais rápido possível.

## Modelo de Ameaça

### O que NÃO é preocupação (por design)
- **Injeção de SQL/NoSQL**: Não há banco de dados
- **Autenticação/Autorização quebrada**: Não há contas de usuário
- **Exposição de dados sensíveis em logs**: Não há logs de servidor
- **CSRF/XSS em APIs**: Não há APIs
- **Vazamento de segredos em build**: Não há build step, segredos não existem no código

### O que É preocupação
- **XSS via conteúdo renderizado**: Unidades teóricas e exercícios renderizam markdown/HTML. Mitigação: KaTeX e highlight.js são bibliotecas confiáveis, conteúdo vem de arquivos locais versionados (não user-generated), anotações do usuário são escapadas antes de renderizar.
- **Prototype pollution**: Validação de schema JSON em `scripts/validate.mjs` previne dados malformados.
- **localStorage exhaustion**: Dados de progresso são pequenos (< 1MB). Mitigação: limpeza periódica de dados antigos de SRS.
- **Supply chain**: Bibliotecas terceiras (KaTeX, highlight.js) são hospedadas localmente com versões fixas. Atualizações requerem revisão manual.

## Boas Práticas para Contribuidores

- Não adicione `eval()`, `Function()`, `innerHTML` com dados não confiáveis
- Use `textContent` em vez de `innerHTML` para dados do usuário (anotações)
- Valide todo input JSON contra schema antes de usar
- Mantenha dependências atualizadas apenas após revisão de changelog e licença
- Não introduza fetch/XHR para domínios externos

## Divulgação Responsável

Agradecemos pesquisadores de segurança que seguem divulgação responsável. Não oferecemos bounty, mas creditaremos no CHANGELOG e ATTRIBUTIONS.md (se aplicável).