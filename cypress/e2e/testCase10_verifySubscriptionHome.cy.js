import {
  homePage,
  footerPage
} from '../support/pages';

describe('Test Case 10: Verify Subscription in home page', () => {
  let subscriberEmail;

  beforeEach(() => {
    const timestamp = Date.now();
    subscriberEmail = `subscriber_${timestamp}@automationexercise.com`;
  });

  it('Deve rolar até o rodapé da página inicial e realizar a inscrição na newsletter com sucesso', () => {
    // 1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    homePage.visit();

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Scroll down to footer
    footerPage.scrollToFooter();

    // 5. Verify text 'SUBSCRIPTION'
    footerPage.verifySubscriptionTextVisible();

    // 6. Enter email address in input and click arrow button
    footerPage.subscribeEmail(subscriberEmail);

    // 7. Verify success message 'You have been successfully subscribed!' is visible
    footerPage.verifySuccessMessage('You have been successfully subscribed!');
  });
});

