# Controle Financeiro (front-end)

Front-end em React 16 + React Router 5, empacotado com [Vite](https://vite.dev/). Requer Node.js 20.19+ ou 22.12+.

## Scripts

Na pasta do projeto, depois de `npm install`:

### `npm start` (ou `npm run dev`)

Sobe o servidor de desenvolvimento em [http://localhost:3000](http://localhost:3000), também exposto na rede local (`--host`).
Se a porta 3000 estiver ocupada, o comando falha em vez de trocar de porta.

### `npm test`

Roda os testes uma vez com [Vitest](https://vitest.dev/) (ambiente jsdom).

### `npm run build`

Checa os tipos do `vite.config.mts` e gera o build de produção na pasta `build`.

### `npm run preview`

Serve o conteúdo de `build` em [http://localhost:3000](http://localhost:3000) para conferir o build de produção. Rode `npm run build` antes.
