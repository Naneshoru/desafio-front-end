Este projeto teve como objetivo o desenvolvimento do desafio proposto de construir a visualização de uma tabela com os dados vindos de uma api simulada do json server.

Foi adotada uma abordagem de menor uso de bibliotecas externas, e um maior uso do Typescript com
componentes modularizados para simplificação do fluxo de dados.

#### 1. Funcionalidades <br>
  a. Processamento dos dados para exibição (e.g. formato de datas e telefone) <br>
  b. Filtragem (por nome, cargo, data de admissão ou telefone) no front <br>
  c. Ordenação (campos ordenáveis) via query params
  
#### 2. Responsividade <br>
   Tamanhos web e mobile, adaptando a tabela para uma melhor UX ao comparar as informações. (e.g. Sticky cards), <br>
   animação ao expandir informações, pontos de quebras de linha nos textos
   
#### 3. Testes <br>
  ...
  
---

## :page_facing_up: Pré-requisitos

• Node.js versão 20 ou superior <br>
• Package manager (e.g. npm, yarn) <br>
• JSON Server (de preferência 0.17.4) <br>
• Navegador compatível com ES6+ (Chrome, Edge, Firefox, etc.) <br>

---

## :rocket: Começando

• instalação das dependências:
```bash
  npm i
  # ou
  yarn
```

• inicie o servidor de desenvolvimento com: 
```bash
  npm run dev
  # ou
  yarn dev
```
<br>

Abra [http://localhost:5173](http://localhost:5173) com o browser. Esta é a porta padrão do Vite.

<br>

• instale o json server para acessar os dados via api simulada: <br>

```bash
npm i -g json-server@0.17.4
```

OBS: você pode usar esta versão do json-server para uma melhor funcionalidade → v0.17.4 <br>
<br>

• inicie e deixe executando a api simulada com:
```bash
json-server --watch db.json
```

se tiver problemas, execute: 
```bash
npx json-server db.json 
# or 
yarn dlx json-server db.json
```
Agora pode abrir [http://localhost:3000/employees](http://localhost:3000/employees) no browser.

<br>
<br>

## 🔨 Ferramentas utilizadas

---
node v20.17.0 <br> 
npm v8.19.4 <br> 
yarn v4.6.0

---
react v19 <br> 
vite v6.1.0 <br> 
json-server v0.17.4 <br> 
@uidotdev/usehooks v2.4.1 → com hooks utilitários, como um para responder a tamanhos de tela

---

Context API, para gerenciamento dos estados <br> 
fetch API, para requisições http
