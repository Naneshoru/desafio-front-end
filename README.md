Este projeto teve como objetivo o desenvolvimento do desafio proposto de construir a visualização de uma tabela com os dados vindos de uma api simulada do json server.

Foi adotada uma abordagem de menor uso de bibliotecas externas, e um maior uso do Typescript com
componentes modularizados para simplificação do fluxo de dados.

#### 1. Funcionalidades <br>
  a. Processamento dos dados para exibição (e.g. formato de datas e telefone) <br>
  b. Filtragem (por nome, cargo, data de admissão ou telefone) no front <br>
  c. Ordenação (campos ordenáveis) via query params
  
#### 2. Responsividade <br>
   Tamanhos web e mobile, adaptando a tabela para uma melhor UX ao comparar as informações (e.g. Sticky cards). Animações ao expandir informações, adaptações e pontos de quebras de linha oportunas nos textos das diferentes colunas, além da área de ação no botão aumentada no mobile.
   
#### 3. Testes <br>
  Foram criados testes visando aumentar a confiabilidade das funcionalidades do projeto em qualquer uma das configurações que permite (e.g. mobile ou web, default ou custom table) com destaque para as operações de filtragem e ordenação, além dos estados como o de carregamento, exibição dos dados e sem dados, visto que são partes importantes do funcionamento e precisam ser detectados rapidamente qualquer possível incongruência.

##### Ferramentas de teste <br>
  Foi utilizado o Jest e Testing Library / React para isso, provendo o ferramental básico de teste para rodar e simular a DOM, respectivamente, além de eventos de usuário com o user-event. As demais bibliotecas utilizadas são de suporte adicional para os testes, como suporte para uso de typescript, svg ou path aliases, por exemplo.
  
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
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ou
```bash
  yarn
```

• inicie o servidor de desenvolvimento com: 
```bash
  npm run dev
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ou
```bash
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
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ou
```bash
yarn dlx json-server@0.17.4 db.json
```
Agora verificar em [http://localhost:3000/employees](http://localhost:3000/employees).

<br>

para executar os testes, basta rodar:
```bash
yarn test
```

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
@uidotdev/usehooks v2.4.1 → com hooks utilitários, como um para responder a tamanhos de tela <br> 
jest v29.7.0 <br> 
@testing-library/react v16.2.0 <br> 
@testing-library/user-event v14.6.1

---

→ Context API, para gerenciamento dos estados <br> 
→ fetch API, para requisições http <br>
→ tratamento para reduzir o número de buscas ao digitar <br>
→ foi adicionado tratamento para nomes (abreviação dos nomes do meio) <br>
→ e ajuste dinâmico para uma melhor exibição das fotos <br>
(ou iniciais do nome caso não tenha uma foto → é possível verificar isso apagando alguma string do db.json)
