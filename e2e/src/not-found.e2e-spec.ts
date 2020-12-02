import { AppPage } from './app.po';
import { browser, logging, element, by, ExpectedConditions } from 'protractor';

describe('Not found component test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should display 404 page', () => {
    browser.get(browser.baseUrl + "/lksdrhgkedjf")

    browser.wait(function() {
      return element(by.tagName('h2'));
  }, 4000 );

  expect(element(by.tagName('h2')).getText()).toEqual('¡Oops! No encontramos lo que buscas.');
  });
});
