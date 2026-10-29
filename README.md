# 🧪 Suíte de Testes Automatizados E2E - Automation Exercise

Projeto de testes funcionais desenvolvido com **Cypress**, utilizando o site [Automation Exercise](https://automationexercise.com/). 

O projeto adota uma arquitetura utilizando o padrão **Page Object Model (POM)**, separação de massa de dados via **Fixtures**, **Custom Commands**, geração de relatórios interativos com **Mochawesome** e integração contínua (CI/CD) via **GitHub Actions** com suporte a disparo manual.

---

## 🏛️ Arquitetura e Modularização

O projeto segue boas práticas de engenharia de automação de testes com clara separação de responsabilidades:

```text
trabalho-testes-web/
├── .github/
│   └── workflows/
│       └── cypress.yml                    # Pipeline CI/CD no GitHub Actions (com trigger manual)
├── cypress/
│   ├── fixtures/
│   │   └── userData.json                  # Massa de dados de teste (perfil, endereço, pagamento)
│   ├── support/
│   │   ├── pages/                         # 🧩 Camada de Page Objects (POM)
│   │   │   ├── home.page.js               # Elementos e ações da Home e Header
│   │   │   ├── signupLogin.page.js        # Formulários de Login e Cadastro
│   │   │   ├── register.page.js           # Formulário detalhado de registro de conta
│   │   │   ├── account.page.js            # Telas de conta criada / deletada
│   │   │   ├── products.page.js           # Catálogo e busca de produtos
│   │   │   ├── productDetail.page.js      # Detalhes e especificações de produto
│   │   │   ├── cart.page.js               # Carrinho de compras
│   │   │   ├── checkout.page.js           # Checkout, endereço e revisão do pedido
│   │   │   ├── payment.page.js            # Pagamento e confirmação de compra
│   │   │   ├── footer.page.js             # Rodapé global e newsletter
│   │   │   └── index.js                   # Barrel export centralizado dos Page Objects
│   │   ├── commands.js                    # Comandos customizados do Cypress
│   │   └── e2e.js                         # Configurações globais e supressão de scripts de ads
│   └── e2e/                               # 📝 Casos de Teste (Especificações)
│       ├── testCase1_registerUser.cy.js
│       ├── testCase2_loginUser.cy.js
│       ├── testCase3_loginUserIncorrect.cy.js
│       ├── testCase4_logoutUser.cy.js
│       ├── testCase5_registerExistingEmail.cy.js
│       ├── testCase8_verifyProductsAndDetail.cy.js
│       ├── testCase9_searchProduct.cy.js
│       ├── testCase10_verifySubscriptionHome.cy.js
│       ├── testCase15_placeOrderRegisterBeforeCheckout.cy.js
│       └── testCase16_placeOrderLoginBeforeCheckout.cy.js
├── cypress.config.js                      # Configuração do Cypress, base URL e relatórios
├── package.json                           # Dependências e scripts de execução
├── .gitignore                             # Ignora node_modules, relatórios e artefatos
└── README.md                              # Documentação do projeto
```

---

## 📋 Casos de Teste Implementados

| Caso de Teste | Nome | Descrição |
| :---: | :--- | :--- |
| **01** | `testCase1_registerUser.cy.js` | Fluxo completo de cadastro de usuário, verificação de login e exclusão de conta. |
| **02** | `testCase2_loginUser.cy.js` | Login de usuário com credenciais válidas e exclusão de conta ao final. |
| **03** | `testCase3_loginUserIncorrect.cy.js` | Tentativa de login com e-mail/senha incorretos e validação da mensagem de erro. |
| **04** | `testCase4_logoutUser.cy.js` | Login de usuário com credenciais válidas e logout com retorno à tela de login. |
| **05** | `testCase5_registerExistingEmail.cy.js` | Tentativa de cadastro com e-mail já existente e validação do erro retornado. |
| **08** | `testCase8_verifyProductsAndDetail.cy.js` | Acesso à lista de produtos e validação detalhada dos 6 atributos do produto. |
| **09** | `testCase9_searchProduct.cy.js` | Pesquisa de produto por nome e validação de todos os produtos retornados. |
| **10** | `testCase10_verifySubscriptionHome.cy.js` | Rolagem até o rodapé da Home e inscrição na newsletter com mensagem de sucesso. |
| **15** | `testCase15_placeOrderRegisterBeforeCheckout.cy.js` | Registro antes do checkout, adição ao carrinho, pagamento completo e exclusão da conta. |
| **16** | `testCase16_placeOrderLoginBeforeCheckout.cy.js` | Login antes do checkout, adição ao carrinho, pagamento completo e exclusão da conta. |

> **Nota de Confiabilidade & Independência:**  
> Os testes que exigem contas válidas utilizam pré-condições com criação prévia de usuário via API (`POST /api/createAccount`) e e-mails dinâmicos com `Date.now()`. Isso garante que nenhum teste sofra com colisão de dados (*flakiness*) ou falhe por contas já deletadas.

---

## 💻 Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/)

---

## 🚀 Instalação

Clone o repositório e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd trabalho-testes-web
npm install
```

---

## ▶️ Executando os Testes

### 1. Modo Interativo (Interface Gráfica do Cypress)
Permite acompanhar a execução dos testes em tempo real pelo navegador:

```bash
npm run cypress:open
```
*Selecione **E2E Testing** -> Escolha o navegador desejado -> Clique no caso de teste.*

### 2. Modo Headless (Terminal)
Executa os testes diretamente no terminal e gera o relatório Mochawesome:

```bash
# Executa todos os testes
npm test

# Executa um teste específico
npm run cypress:run -- --spec cypress/e2e/testCase1_registerUser.cy.js
npm run cypress:run -- --spec cypress/e2e/testCase15_placeOrderRegisterBeforeCheckout.cy.js
```

---

## 📊 Visualizando os Relatórios de Teste (Mochawesome)

Após rodar os testes via terminal, o relatório HTML interativo é gerado automaticamente na pasta `cypress/reports/index.html`.

Para abri-lo diretamente no navegador:

```bash
npm run report:open
```

O relatório inclui:
- Gráficos com percentual de sucesso/falha.
- Tempo de execução total e por cenário.
- Passos e asserções executados em cada teste.
- Screenshots anexados automaticamente em caso de falhas.

---

## 🔄 Pipeline CI/CD (GitHub Actions)

O projeto possui integração contínua configurada no arquivo [`.github/workflows/cypress.yml`](.github/workflows/cypress.yml):

* **Disparos Automáticos:** A cada `push` ou `pull_request` nas branches `main` e `master`.
* **Gatilho Manual (*Workflow Dispatch*):** Permite disparar os testes sob demanda diretamente pela interface do GitHub:
  1. Vá até a aba **Actions** no GitHub.
  2. Clique em **Cypress E2E Tests Pipeline**.
  3. Clique em **Run workflow**.
  4. Escolha o navegador (*chrome*, *electron* ou *firefox*) e, opcionalmente, informe o caminho de um teste específico.
* **Artefatos Salvos:**
  - O relatório HTML do Mochawesome é salvo como artefato para download (`mochawesome-report`).
  - Screenshots capturados em caso de falha são salvos automaticamente (`cypress-screenshots`).

