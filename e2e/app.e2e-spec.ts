import { SuprematismCardNavbarPage } from './app.po';


// ------ Constants -----------------------------------------------------------

const ACTIVE = 'active';
const NOTACTIVE = 'notActive';
const PRESELECTED = 'preSelected';
const SELECTED = 'selected';
const SELECTED_BACKGROUNDED = 'selectedBackgrounded';


// ------ Color References ----------------------------------------------------

const purpleA = 'rgba(100,96,170,1)';
const purple = 'rgb(100,96,170)';
const grayA = 'rgba(204,204,204,1)';
const gray = 'rgb(204,204,204)';
const whiteA = 'rgba(255,255,255,1)';
const whiteTransparentBase = 'rgba(255,255,255,0.7';


// ------ Helper Functions: Menu Items (Tabs) ---------------------------------

const assertTabHasCorrectStateClass = function(page, tab, state) {
  expect(page.tabHasClass(tab, 'is-active')).toEqual(state === ACTIVE);
  expect(page.tabHasClass(tab, 'is-notActive')).toEqual(state === NOTACTIVE);
  expect(page.tabHasClass(tab, 'is-selected')).toEqual(state === SELECTED);
  expect(page.tabHasClass(tab, 'is-preSelected')).toEqual(state === PRESELECTED);
  expect(page.tabHasClass(tab, 'is-selectedBackgrounded')).toEqual(state === SELECTED_BACKGROUNDED);
};

const assertTabIsSelected = function(page, tab) {
  assertTabHasCorrectStateClass(page, tab, SELECTED);
  expect(page.getSelectedTabsCount()).toEqual(1);
  expect(page.getTabStyles(tab, 'color')).toEqual(purpleA);
  expect(page.getTabStyles(tab, 'background-color')).toEqual(whiteA);
};

const assertTabIsSelectedBackgrounded = function(page, tab) {
  assertTabHasCorrectStateClass(page, tab, SELECTED_BACKGROUNDED);
  expect(page.getSelectedBackgroundedTabsCount()).toEqual(1);
  expect(page.getTabStyles(tab, 'color')).toEqual(purpleA);
  expect(page.getTabStyles(tab, 'background-color')).toContain(whiteTransparentBase);
};

const assertTabIsActive = function(page, tab) {
  assertTabHasCorrectStateClass(page, tab, ACTIVE);
  expect(page.getTabStyles(tab, 'color')).toEqual(purpleA);
  expect(page.getTabStyles(tab, 'background-color')).toEqual(whiteA);
};

const assertTabIsNotActive = function(page, tab) {
  assertTabHasCorrectStateClass(page, tab, NOTACTIVE);
  expect(page.getTabStyles(tab, 'color')).toEqual(whiteA);
  expect(page.getTabStyles(tab, 'background-color')).toEqual(purpleA);
};


// ------ Helper Functions: Cards ---------------------------------------------

const assertCardHasCorrectStateClass = function(page, card, state) {
  expect(page.cardHasClass(card, 'is-selected')).toEqual(state === SELECTED);
  expect(page.cardHasClass(card, 'is-notActive')).toEqual(state === NOTACTIVE);
};

const assertCardIsSelected = function(page, card) {
  assertCardHasCorrectStateClass(page, card, SELECTED);
  expect(page.getSelectedCardsCount()).toEqual(1);
  expect(page.getCardStyles(card, 'background-color')).toEqual(purpleA);
  expect(page.getCardStyles(card, 'border-color')).toEqual(purple);
  expect(page.getCardTitleStyles(card, 'color')).toEqual(whiteA);
  expect(page.getCardIconStyles(card, 'color')).toEqual(whiteA);
};

const assertCardIsNotActive = function(page, card) {
  assertCardHasCorrectStateClass(page, card, NOTACTIVE);
  expect(page.getCardStyles(card, 'background-color')).toEqual(whiteA);
  expect(page.getCardStyles(card, 'border-color')).toEqual(gray);
  expect(page.getCardIconStyles(card, 'color')).toEqual(grayA);
  expect(page.getCardTitleStyles(card, 'color')).toEqual(grayA);
};

const assertCardIsActive = function(page, card) {
  assertCardHasCorrectStateClass(page, card, ACTIVE);
  expect(page.getCardStyles(card, 'background-color')).toEqual(whiteA);
  expect(page.getCardStyles(card, 'border-color')).toEqual(purple);
  expect(page.getCardIconStyles(card, 'color')).toEqual(purpleA);
  expect(page.getCardTitleStyles(card, 'color')).toEqual(purpleA);
};

const assertNoCardsShown = function(page) {
  expect(page.isCardsShown()).toEqual(false);
  expect(page.isAnyCardsShown()).toEqual(0);
};

const assertCardsShown = function(page, cards) {
  return page.isAnyCardsShown().then((val) => {
    expect(cards).toEqual(val);
  });
};


// ------ Tests ---------------------------------------------------------------

describe('suprematism-card-navbar', function() {
  let page: SuprematismCardNavbarPage;

  beforeEach(() => {
    page = new SuprematismCardNavbarPage();
  });

  describe('basic resting state', function() {
    beforeEach(() => {
      page.navigateTo('segments/create');
    });
    it('one tab is selected', function() {
      assertTabIsSelected(page, 'segments');
    });
    it('other tabs are not selected', function() {
      expect(page.getActiveTabsCount()).toEqual(0);
      assertTabIsNotActive(page, 'campaigns');
      assertTabIsNotActive(page, 'inventory');
      assertTabIsNotActive(page, 'user');
    });
    it('no cards are shown', function() {
      assertNoCardsShown(page);
    });
  });

  describe('handle hard routes', function() {
    beforeEach(() => {
      page.navigateTo('segments/create');
    });
    it('should display the correct page content', () => {
      expect(page.getPageHeaderText()).toEqual('segments: create');
    });
    it('should render the correct styling for the tab', () => {
      assertTabIsSelected(page, 'segments');
    });
    it('should render the correct styling for the card', () => {
      page.hoverOnTab('segments');
      assertCardIsSelected(page, 'create');
    });
  });

  describe('a top menu item', function() {
    describe('which is selected', function() {
      describe('before hovering', function() {
        beforeEach(() => {
          page.navigateTo('segments/create');
        });
        it('should be selected', function() {
          assertTabIsSelected(page, 'segments');
        });
        it('should not have cards displayed', function() {
          assertNoCardsShown(page);
        });
        it('no tabs should be active', function() {
          expect(page.getActiveTabsCount()).toEqual(0);
        });
      });
      describe('when hovered', function() {
        beforeEach(() => {
          page.navigateTo('segments/create');
          page.hoverOnTab('segments');
        });
        it('should remain in the selected state', () => {
          assertTabIsSelected(page, 'segments');
        });
        it('should have cards displayed', function() {
          assertCardsShown(page, 4);
        });
        it('no tab should be active (because the hovered is selected)', function() {
          expect(page.getActiveTabsCount()).toEqual(0);
        });
      });
      describe('after hovered', function() {
        beforeEach(() => {
          page.navigateTo('segments/create');
          page.hoverOnTab('segments');
          page.hoverOnPageHeader();
        });
        it('should remain in the selected state', () => {
          assertTabIsSelected(page, 'segments');
        });
        it('should not have cards displayed', function() {
          assertNoCardsShown(page);
        });
        it('no tabs should be active', function() {
          expect(page.getActiveTabsCount()).toEqual(0);
        });
      });
    });
    describe('which is not selected', function() {
      describe('before hovering', function() {
        beforeEach(() => {
          page.navigateTo('segments/create');
        });
        it('should not be active', function() {
          assertTabIsNotActive(page, 'campaigns');
        });
        it('should not have cards displayed', function() {
          assertNoCardsShown(page);
        });
        it('no tabs should be active', function() {
          expect(page.getActiveTabsCount()).toEqual(0);
        });
      });
      describe('when hovered', function() {
        beforeEach(() => {
          page.navigateTo('segments/create');
          page.hoverOnTab('campaigns');
        });
        it('should cause the currently selected tab to become backgrounded', () => {
          assertTabIsSelectedBackgrounded(page, 'segments');
        });
        it('should render the correct styling for active', () => {
          assertTabIsActive(page, 'campaigns');
        });
        it('should have cards displayed', function() {
          assertCardsShown(page, 3);
        });
        it('only one tab should be active', function() {
          expect(page.getActiveTabsCount()).toEqual(1);
        });
      });
      describe('after hovered', function() {
        beforeEach(() => {
          page.navigateTo('segments/create');
          page.hoverOnTab('campaigns');
          page.hoverOnPageHeader();
        });
        it('should render no longer active', function() {
          assertTabIsNotActive(page, 'campaigns');
        });
        it('should not have cards displayed', function() {
          assertNoCardsShown(page);
        });
        it('no tabs should be active', function() {
          expect(page.getActiveTabsCount()).toEqual(0);
        });
      });
    });

    describe('when clicked', function() {
      beforeEach(() => {
        page.navigateTo('segments/create');
        page.clickOnTab('campaigns');
      });
      it('should render new tab as selected', () => {
        assertTabIsSelected(page, 'campaigns');
      });
      it('should render old selected tab as no longer selected', () => {
          assertTabIsNotActive(page, 'segments');
      });
      it('should route to new url', function() {
        expect(page.getCurrentUrl()).toContain('campaigns/option');
      });
      it('no tabs should be active', function() {
        expect(page.getActiveTabsCount()).toEqual(0);
      });
      it('should not have cards displayed', function() {
        assertNoCardsShown(page);
      });
    });
  });

  describe('a card', function() {
    describe('through selection from menu item click', function() {
      beforeEach(function() {
        page.navigateTo('segments/create');
        page.hoverOnTab('segments');
        page.clickOnCard('library');
        page.hoverOnTab('segments');
      });
      it('should become selected if it is the default card for menu item and the menu item is clicked', function() {
        assertCardIsSelected(page, 'library');
      });
      it('previous card should not be selected', function() {
        assertCardIsNotActive(page, 'create');
      });
      it('no cards should be active', function() {
        expect(page.getActiveCardsCount()).toEqual(0);
      });
    });
    describe('resting', function() {
      beforeEach(function() {
        page.navigateTo('segments/create');
        page.hoverOnTab('segments');
      });
      it('should be notActive if appropriate', function() {
        assertCardIsNotActive(page, 'library');
      });
      it('should be selected if appropriate', function() {
        assertCardIsSelected(page, 'create');
      });
    });
    describe('hover', function() {
      beforeEach(function() {
        page.navigateTo('segments/create');
        page.hoverOnTab('segments');
      });
      it('should transition from notActive to active', function() {
        page.hoverOnCard('library');
        assertCardIsActive(page, 'library');
      });
      it('should transition from active to notActive', function() {
        page.hoverOnCard('library');
        page.hoverOnCard('compare');
        assertCardIsNotActive(page, 'library');
      });
      it('should preserve selected-ness', function() {
        page.hoverOnCard('create');
        page.hoverOnCard('library');
        assertCardIsSelected(page, 'create');
      });
      it('should be active in isolation', function() {
        page.hoverOnCard('create');
        page.hoverOnCard('library');
        page.hoverOnCard('compare');
        page.hoverOnCard('forecast');
        expect(page.getActiveCardsCount()).toEqual(1);
      });
      it('should act properly for multiple hovers', function() {
        page.hoverOnCard('create');
        page.hoverOnCard('library');
        page.hoverOnCard('compare');
        page.hoverOnCard('forecast');
        assertCardIsSelected(page, 'create');
        assertCardIsNotActive(page, 'library');
        assertCardIsNotActive(page, 'compare');
        assertCardIsActive(page, 'forecast');
        expect(page.getActiveCardsCount()).toEqual(1);
      });
    });
    describe('clicking', function() {
      beforeEach(function() {
        page.navigateTo('segments/create');
        page.hoverOnTab('segments');
        page.clickOnCard('library');
      });
      it('should close the dropdown menu on selection', function() {
        assertNoCardsShown(page);
      });
      it('should route to new url', function() {
        expect(page.getCurrentUrl()).toContain('segments/library');
      });
      it('should make the card selected', function() {
        page.hoverOnTab('segments');
        assertCardIsSelected(page, 'library');
      });
    });
  });
});
