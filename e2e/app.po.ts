import { browser, element, by } from 'protractor';

export class SuprematismCardNavbarPage {

  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('supre-root h1')).getText();
  }
}
