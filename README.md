# <img src="./src/app/favicon.ico" width="50" /> Gerador de valor de OS - Protelt <img src="./src/app/favicon.ico" width="50" />

## 📌 Sobre o sistema

### Este sistema é responsável por gerar o valor automático das OS. Desenvovido para a empresa Protelt em Itu/SP.

## 🧠 Critérios pontuados para o sistema
- ✔️ Ser simples, rápido e útil.
- ✔️ Na sua primeira versão deve rodar somente para um único usuário.
- ✔️ O sistema deve ficar no servidor da empresa.

## 🎯 Objetivos principais com esse sistema
- ✔️ Reduzir o tempo gasto na geração do valor da OS.
- ✔️ Melhorar a organização e rastreamento de valor de OS e como foi gerado.
- ✔️ Tornar o processo mais eficiente e menos propenso a erros.

#

## 🖥 Tecnologias Utilizadas
<div align='center'>

!['NextJSLogo'](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
!['ReactLogo'](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
!['TypescriptLogo'](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
!['CssLogo'](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

</div>

    - Next
    - React
        - react-hook-form
        - react-select
        - zod
    - Typescript
    - Css Modules

## Versões utilizadas:
    - Next: 15.2.0
    - React: 19.0.0
        - react-hook-form: 7.54.2
        - react-select: 5.10.0
        - zod: 3.24.2
    - Typescript: 5

## 🙋🏻‍♂ Como me localizar no projeto?

### Todos os arquivos de código fonte do projeto estão em: `./src`

## 🛈 Como o projeto está estruturado

- `./src/app:` Este projeto é em Next e usando o App Router, temos a estrutura sendo chamada em page.tsx.

- `./src/components:` Onde está os componentes que serão reutilizados em diversas partes do código. Neste projeto temos os components:
    - Form: Formulários
        - CreateNewOS: Para criação de novas OS, acionado após clicar no botão de "Gerar nova OS"
    - Header: Cabeçalho que se encontra no canto superior direito do sistema e aparece na tela principal
    - Modal: Esqueleto do modal, criado esse componente para fazer um modal que seja reutilizado de diversas formas
    - Sidebar: Barra lateral esquerda do site
    - Toast: Componente do toast ( Aquela informação que aparece de sucesso ou erro no canto inferior direito quando realiza alguma ação )

- `./src/contexts:` Os contexts são onde separamos os dados e funções que serão compartilhados com toda a aplicação, neste projeto é onde está os contextos de:
    - ModalContext: Todo o contexto e a parte lógica do modal.
    - ToastContext: Todo o contexto e a parte lógica do toast.
    - Vale ressaltar que o arquivo 'AppProvider.tsx' é o responsável por agrupar todos os providers dos contextos e exportar como um arquivo único. 

- `./src/hooks:` Está nossos hooks personalizados com as partes lógicas de todos os nossos componentes:
    - Apis:
        - Post:
            - useCreateNewOS: Parte lógica da componente: Form/CreateNewOS
    - useSideBar: Parte lógica do componente: Sidebar

- `./src/services:` Pasta que contém as funcionalidades de serviço. Temos um único arquivo chamado "QueryClient.tsx" que serve somente para criarmos um QueryClient e exportar o provider neste próprio arquivo, uma vez que assim podemos usar a diretiva 'use client' no arquivo e não no layout da aplicação.

- `./src/styles:` Pasta que contém os arquivos de estilização. Nesta primeira versão temos também um único arquivo, chamado "GlobalStyles.css", este arquivo fica responsável pelos códigos que são de estilização globais do projeto.

## ❔ Como rodar o projeto na minha máquina?

- Antes de tudo, você precisa ter o Git instalado no seu computador. O Git é uma ferramenta que permite clonar e gerenciar repositórios de código.
    - Windows: Baixe o Git <a href="https://git-scm.com/download/win" target="_blank">aqui</a> e siga as instruções de instalação.
    - macOS: Você pode instalar o Git <a href="https://git-scm.com/download/mac" target="_blank">aqui</a> ou usando o Homebrew com o comando brew install git:
        ```bash
        brew install git
        ```
        
    - Linux: Use o gerenciador de pacotes da sua distribuição, por exemplo para Debian/Ubuntu:
        ```bash
        sudo apt install git
        ```
        

- Abra o terminal (no Windows, você pode usar o Git Bash, que é instalado junto com o Git).

- Navegue até o diretório onde deseja armazenar o projeto.

- Execute o comando para clonar o repositório:

    ```bash
    git clone https://github.com/GuilhermeFranciscoPereira/OS-Generator__Frontend.git
    ```
    
- Após clonar o repositório, navegue até a pasta do projeto
    ```bash
    cd OS-Generator__Frontend
    ```
    

- Agora você pode abrir os arquivos do projeto com seu editor de texto ou IDE preferido. Exemplo do vsCode: 
    ```bash
    code .
    ```

- 🚨 Não esqueça que para não ocorrer erros no código ao clonar ele, você deve fazer o comando abaixo 🚨
    ```bash
    npm i
    ```

- Pronto! Todo o site estará funcionado na sua máquina. Porém, caso precise de alguma ajuda em algo entre em contato comigo pelo meu LinkedIn: https://www.linkedin.com/in/guilherme-francisco-pereira-4a3867283

##

## 🎉 É isso! Esse é o nosso sistema, caso tenha ficado com alguma dúvida ou deseje complementar algo diretamente comigo você pode estar entrando em contato através do meu LinkedIn:
> Link do meu LinkedIn: <a href="https://www.linkedin.com/in/guilherme-francisco-pereira-4a3867283" target="_blank">https://www.linkedin.com/in/guilherme-francisco-pereira-4a3867283</a>

### 🚀 Obrigado pela atenção e espero que tenha gostado do que tenha visto aqui, que tal agora dar uma olhada nos meus outros repositórios? 👋🏻

#

### ❤️ Créditos:

#### Crédito dos svg utilizados na landing page (UTILIZANDO O HTML COM SVG):
> <a href="https://icons.getbootstrap.com" target="_blank">https://icons.getbootstrap.com</a>

#### Créditos dos emojis: 
> <a href="https://emojipedia.org" target="_blank">https://emojipedia.org</a>

- #### Créditos dos badges: 
> <a href="https://shields.io" target="_blank">https://shields.io</a>