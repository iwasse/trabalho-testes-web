// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-mochawesome-reporter/register';

// Trata erros não capturados disparados por scripts de anúncios de terceiros no site
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
