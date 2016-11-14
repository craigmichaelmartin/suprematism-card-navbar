import { browser, element, by } from 'protractor';

const strip = str => str.replace(/['" ]+/g, '');
const hasClass = (klass) => (arg) => arg && arg.split(' ').indexOf(klass) > -1;

export class SuprematismCardNavbarPage {

  navigateTo(route = '/') {
    return browser.get(route);
  }

  getCurrentUrl() {
    return browser.getCurrentUrl();
  }

  $(path) {
    return element(by.css(path));
  }

  getPageHeaderText() {
    return element(by.css('supre-root h1')).getText();
  }

  getTab(which) {
    return this.$(`supre-card-navbar-menu-item[supretabid="${which}"] .CardNavbar-topMenuItem`);
  }

  getCard(which) {
    return this.$(`supre-card-navbar-card[suprecardid="${which}"] .CardNavbar-card`);
  }

  getCards() {
    return this.$('.js-cards');
  }

  getCardTitle(which) {
    return this.$(`supre-card-navbar-card[suprecardid="${which}"] .CardNavbar-cardTitle`);
  }

  getCardIcon(which) {
    return this.$(`supre-card-navbar-card[suprecardid="${which}"] .CardNavbar-cardIcon`);
  }

  tabHasClass(which, klass) {
    return this.getTab(which).getAttribute('class').then(hasClass(klass));
  }

  cardHasClass(which, klass) {
    return this.getCard(which).getAttribute('class').then(hasClass(klass));
  }

  isCardsShown() {
    return this.getCards().getCssValue('height').then((height) => !!parseInt(height, 10));
  }

  isAnyCardsShown() {
    return element.all(by.css('.js-cards supre-card-navbar-card .CardNavbar-card')).count();
  }

  getTabStyles(which, property) {
    return this.getTab(which).getCssValue(property).then(strip);
  }

  getCardStyles(which, property) {
    return this.getCard(which).getCssValue(property).then(strip);
  }

  getCardTitleStyles(which, property) {
    return this.getCardTitle(which).getCssValue(property).then(strip);
  }

  getCardIconStyles(which, property) {
    return this.getCardIcon(which).getCssValue(property).then(strip);
  }

  getBrowserTab(which) {
    return browser.findElement(by.css(`supre-card-navbar-menu-item[supretabid="${which}"] .CardNavbar-topMenuItem`));
  }

  getBrowserCard(which) {
    return browser.findElement(by.css(`supre-card-navbar-card[suprecardid="${which}"] .CardNavbar-card`));
  }

  getBrowserPageHeader() {
    return browser.findElement(by.css('supre-root h1'));
  }

  hoverOnTab(which) {
    return browser.actions().mouseMove(this.getBrowserTab(which)).perform();
  }

  clickOnTab(which) {
    return browser.actions().click(this.getBrowserTab(which)).perform();
  }

  clickOnCard(which) {
    return browser.actions().click(this.getBrowserCard(which)).perform();
  }

  hoverOnPageHeader() {
    return browser.actions().mouseMove(this.getBrowserPageHeader()).perform();
  }

  hoverOnCard(which) {
    return browser.actions().mouseMove(this.getBrowserCard(which)).perform();
  }

  getSelectedCardsCount() {
    return element.all(by.css('.js-cards supre-card-navbar-card .CardNavbar-card.is-selected')).count();
  }

  getActiveCardsCount() {
    return element.all(by.css('.js-cards supre-card-navbar-card .CardNavbar-card.is-active')).count();
  }

  getSelectedTabsCount() {
    return element.all(by.css('supre-card-navbar-menu-item .CardNavbar-topMenuItem.is-selected')).count();
  }

  getSelectedBackgroundedTabsCount() {
    return element.all(by.css('supre-card-navbar-menu-item .CardNavbar-topMenuItem.is-selectedBackgrounded')).count();
  }

  getActiveTabsCount() {
    return element.all(by.css('supre-card-navbar-menu-item .CardNavbar-topMenuItem.is-active')).count();
  }
}
