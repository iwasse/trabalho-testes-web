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
    homePage.visit();
    homePage.verifyHomePageVisible();

    footerPage.scrollToFooter();
    footerPage.verifySubscriptionTextVisible();
    footerPage.subscribeEmail(subscriberEmail);
    footerPage.verifySuccessMessage('You have been successfully subscribed!');
  });
});
