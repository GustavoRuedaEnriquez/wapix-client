import { AppPage } from './app.po';
import { browser, logging, element, by, ExpectedConditions } from 'protractor';

describe('Login component test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should display login page', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Wapix | Iniciar Sesión');
  });
  
  it('Should login incorrectly', () => {
    browser.waitForAngularEnabled(false);
    let loginSuccessful = true;
    page.navigateTo();
    const emailInput = element(by.type('text'));
    const passwordInput = element(by.type('password'));
    const submitBtn = element(by.id('login-btn'));

    emailInput.sendKeys('dummy@user.com');
    passwordInput.sendKeys('dummypass');
    submitBtn.click();

    browser.wait(function() {
        return browser.switchTo().alert().then(
            function() { loginSuccessful = false; return true; }, 
            function() { return false; }
        );
    }, 6000 );

    expect(loginSuccessful).toEqual(false);
  });

  it('Should login correctly', () => {
    let title = element(by.id('title'));
    page.navigateTo();
    const emailInput = element(by.type('text'));
    const passwordInput = element(by.type('password'));
    const submitBtn = element(by.id('login-btn'));

    emailInput.sendKeys('gare_98@hotmail.com');
    passwordInput.sendKeys('Holaguso22');
    submitBtn.click();

    browser.wait(function() {
        return title.getText();
    }, 3000 );

    expect(page.getTitleText()).toEqual('Mis Wapix');

  });


  afterEach(async () => { });

});
