import { SuprematismCardNavbarPage } from './app.po';

describe('suprematism-card-navbar App', function() {
  let page: SuprematismCardNavbarPage;

  beforeEach(() => {
    page = new SuprematismCardNavbarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
