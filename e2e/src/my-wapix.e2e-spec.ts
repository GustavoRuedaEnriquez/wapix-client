import { AppPage } from './app.po';
import { browser, logging, element, by, ExpectedConditions } from 'protractor';

describe('Report component test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should display my-wapix page', () => {
    browser.get(browser.baseUrl + "/my-wapix");

    browser.wait(function() {
      return element(by.tagName('h1'));
  }, 4000 );

  expect(element(by.tagName('h1')).getText()).toEqual('Mis Wapix | Iniciar Sesión');
  });

  it('Should show wapixes', () => {
    let title = element(by.id('title'));
    page.navigateTo();
    const emailInput = element(by.type('text'));
    const passwordInput = element(by.type('password'));
    const submitBtn = element(by.id('login-btn'));

    emailInput.sendKeys('stompercito@hotmail.com');
    passwordInput.sendKeys('Luis123');
    submitBtn.click();

    browser.wait(function() {
        return title.getText();
    }, 3000 );

    expect(element(by.id('wapixDis')).getText()).toEqual('¡Si tienes wapixes!');

  });


  afterEach(async () => { });

});
