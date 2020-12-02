import { AppPage } from './app.po';
import { browser, logging, element, by, ExpectedConditions } from 'protractor';

describe('Not found component test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should display report page', () => {
    browser.get(browser.baseUrl + "/report");

    browser.wait(function() {
      return element(by.tagName('h1'));
  }, 4000 );

  expect(element(by.tagName('h1')).getText()).toEqual('Generar Reporte | Iniciar Sesión');
  });

  it('Should not show results', () => {
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

    browser.get(browser.baseUrl + "/report");

    browser.wait(function() {
      return element(by.tagName('h1'));
  }, 3000 );

  const resultsSearchBtn = element(by.id('resultsSearchBtn'));
// find click the dropdown
  element(by.id("selectWapix")).click();
// add sleep to give a time for te options to reveal
  browser.sleep(1000)
// click the option which has value='Test 3'
  element(by.css("#selectWapix [value='Test 3']")).click();
//click to see if there are results
  resultsSearchBtn.click();

  expect(element(by.tagName('h2')).getText()).toEqual('¡No tienes resultados en este Wapix!');

  });

  it('Should show results', () => {
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

    browser.get(browser.baseUrl + "/report");

    browser.wait(function() {
      return element(by.tagName('h1'));
  }, 3000 );

  const resultsSearchBtn = element(by.id('resultsSearchBtn'));
// find click the dropdown
  element(by.id("selectWapix")).click();
// add sleep to give a time for te options to reveal
  browser.sleep(1000)
// click the option which has value='Test 1'
  element(by.css("#selectWapix [value='Test 1']")).click();
//click to see if there are results
  resultsSearchBtn.click();

  expect(element(by.id('resultsDis')).getText()).toEqual('¡Si tienes resultados en el wapix!');

  });

  it('Should download results', () => {
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

    browser.get(browser.baseUrl + "/report");

    browser.wait(function() {
      return element(by.tagName('h1'));
  }, 3000 );

  const resultsSearchBtn = element(by.id('resultsSearchBtn'));
// find click the dropdown
  element(by.id("selectWapix")).click();
// add sleep to give a time for te options to reveal
  browser.sleep(1000)
// click the option which has value='Test 1'
  element(by.css("#selectWapix [value='Test 1']")).click();
//click to see if there are results
  resultsSearchBtn.click();

  expect(element(by.id('resultsDis')).getText()).toEqual('¡Si tienes resultados en el wapix!');

  });

});
