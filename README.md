# js-parser

# To do

- [x] Identificar e listar padrões de string no código
- [ ] Identificar objetos de requests HTTP/Graphql
- [ ] Identificar APIs do browser que são utilizadas no códigos
- [ ] Analisar + transformar arquivos com base no `.min.js` ou `.sourcemap.js`
- [ ] Prettier no código

# Passos de desenvolvimento

1. Entender como transformar código em um objeto identificável - Criar [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
   1. utilizar esprima e acorn-js
2. Identificar padrões de string
   1. URL
   2. UUIDs
   3. Chamadas HTTP
