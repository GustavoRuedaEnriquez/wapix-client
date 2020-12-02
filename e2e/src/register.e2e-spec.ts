import { AppPage } from './app.po';
import { browser, logging, element, by, ExpectedConditions } from 'protractor';

describe('Register component test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should display register page', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Wapix | Perfil');
  });
  
  it('Should register incorrectly', () => {
    browser.waitForAngularEnabled(false);
    let submitted = false;
    page.navigateTo();
    const nameInput = element(by.id('nameInput'));
    const emailInput = element(by.id('email'));
    const passInput = element(by.id('pass'));
    const pass2Input = element(by.id('pass2'));
    const submitBtn = element(by.className('btn wapix-btn-yellow'));

    nameInput.sendKeys('dummy');
    emailInput.sendKeys('dummy@user.com');
    passInput.sendKeys('dummypass');
    pass2Input.sendKeys('dummypass');
    submitBtn.click();

    browser.wait(function() {
        return browser.switchTo().alert().then(
            function() { submitted = false; return true; }, 
            function() { return false; }
        );
    }, 6000 );

    expect(submitted).toEqual(false);
  });

  it('Should register correctly', () => {
    let title = element(by.id('title'));
    page.navigateTo();
    const nameInput = element(by.id('nameInput'));
    const emailInput = element(by.id('email'));
    const passInput = element(by.id('pass'));
    const pass2Input = element(by.id('pass2'));
    const submitBtn = element(by.className('btn wapix-btn-yellow'));

    nameInput.sendKeys('dummy');
    emailInput.sendKeys('dummy@user.com');
    passInput.sendKeys('dummypass');
    pass2Input.sendKeys('dummypass');
    submitBtn.click();

    browser.wait(function() {
        return title.getText();
    }, 3000 );

    expect(page.getTitleText()).toEqual('Wapix | Perfil');

  });


  afterEach(async () => { });

});
