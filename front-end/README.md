# Fretefy Teste Técnico - Front-end

Este projeto utiliza uma **Fake API** criada com o **JSON Server** para simular o backend.

## Como funciona
Deixei o Json Server para facilitar a busca e edição dos dados

```
src/api/db.json
```

## Instalação

```bash
npm install -g json-server@0.17.4
```

## Instruções para rodar a Fake API
Você pode executar o servidor JSON Server de duas maneiras:

### 1. Usando um script npm
```bash
npm run api
```

Esse comando está configurado no arquivo `package.json` e executa:

```bash
npx json-server --watch src/api/db.json --port 3333
```

### 2. Executando diretamente o JSON Server

```bash
npx json-server --watch src/api/db.json --port 3333
```

Depois de rodar a API, ela estará disponível no seguinte endereço:

```
http://localhost:3333
```
