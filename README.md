# Suprematism Card Navbar

An Angular 2 card navbar component.


#### Installation
```bash
npm i -S CINBCUniversal/suprematism-card-navbar
```
Until it is published to npm, point to github. A consequence of this is that
built files must be checked-in. When we publish to npm with `npm publish`,
there is a prehook to build the files and a posthook to delete them
(so only source files are saved in git). For now, after doing development,
we must manually run the publish prehook and save the files.


#### View
- [Hosted on Github Pages](https://cinbcuniversal.github.io/suprematism-card-navbar/)
- Run the example locally with `npm run example`


## Components
- [`supre-card-navbar`](#supre-card-navbar)
- [`supre-card-navbar-logo`](#supre-card-navbar-logo)
- [`supre-card-navbar-menu-item`](#supre-card-navbar-menu-item)
- [`supre-card-navbar-cards`](#supre-card-navbar-cards)
- [`supre-card-navbar-card`](#supre-card-navbar-card)
- [`supre-card-navbar-card-title`](#supre-card-navbar-card-title)
- [`supre-card-navbar-card-icon`](#supre-card-navbar-card-icon)

#### <a id="supre-card-navbar"></a> `supre-card-navbar`
The parent component for a card navbar.

##### Directives
- `supreSelectedTab:string` - A string matching the `supreTabId` of a `supre-card-navbar-menu-item` specifing the default selected tab.
- `supreSelectedCard:string` - A string matching the `supreCardId` for a `supre-card-navbar-card` specifing the default selected card.

#### <a id="supre-card-navbar-logo"></a> `supre-card-navbar-logo`
An image that will be projected onto the navbar.

#### <a id="supre-card-navbar-menu-item"></a> `supre-card-navbar-menu-item`
The top level menu items of the card navbar.

##### Directives
- `supreTabId:string` - A string uniquely identifying the menu item.
- `supreRouterLink:string` - A string identifying the routerLink for the menu item.

##### States
- [default]
- `is-active` - Denotes menu item is being viewed.
- `is-notActive` - Denotes menu item is not being viewed.
- `is-selected` - Denotes the menu item is selected.
- `is-selectedBackgrounded` - Denotes the menu item is selected, and a different menu item is active.

#### <a id="supre-card-navbar-cards"></a> `supre-card-navbar-cards`
The container of a set of card options for a menu item.

##### Directives
- `supreForTab:string` - A string matching the `supreTabId` of a `supre-card-navbar-menu-item` identifying the menu item with which the cards are associated.

#### <a id="supre-card-navbar-card"></a> `supre-card-navbar-card`
A card option.

##### Directives
- `supreForTab:string` - A string matching the `supreTabId` of a `supre-card-navbar-menu-item` identifying the menu item with which the cards are associated.
- `supreCardId:string` - A string uniquely identifying the card.
- `supreRouterLink?:string` - A string identifying the routerlink for the card. If an empty attribute, it will be ${supreForTab}/${supreCardId}. If not present, card will not be a link anywhere.
- `supreRouterLink?:string` - A string identifying the routerlink for the card. If an empty attribute, it will be ${supreForTab}/${supreCardId}. If not present, card will not be a link anywhere.
- `supreDefaultCardForTab?:boolean` - Specifies a card to be the selected card when a menu item is clicked.

##### States
- [default]
- `is-active` - Denotes menu item is being viewed.
- `is-preSelected` - Denotes menu item is in the process of being selected.
- `is-selected` - Denotes the menu item is selected.

#### <a id="supre-card-navbar-card-title"></a> `supre-card-navbar-card-title`
The card title

#### <a id="supre-card-navbar-card-icon"></a> `supre-card-navbar-card-icon`
The card icon


## Example
```
<supre-card-navbar [supreSelectedTab]="selectedTab" [supreSelectedCard]="selectedCard">
  <supre-card-navbar-logo><img src="assets/images/the-G-raph.svg"></supre-card-navbar-logo>
  <supre-card-navbar-menu-item supreTabId="segments" supreRouterLink='segments/create'>Segments</supre-card-navbar-menu-item>
  <supre-card-navbar-cards supreForTab="segments">
    <supre-card-navbar-card supreForTab="segments" supreCardId="create" supreRouterLink [supreDefaultCardForTab]="true">
      <supre-card-navbar-card-title>Create</supre-card-navbar-card-title>
      <supre-card-navbar-card-icon><div class="icon ion-android-add-circle"></div></supre-card-navbar-card-icon>
    </supre-card-navbar-card>
    <supre-card-navbar-card supreForTab="segments" supreCardId="library" supreRouterLink>
      <supre-card-navbar-card-title>Library</supre-card-navbar-card-title>
      <supre-card-navbar-card-icon><div class="icon ion-ios-list-outline"></div></supre-card-navbar-card-icon>
    </supre-card-navbar-card>
    <supre-card-navbar-card supreForTab="segments" supreCardId="compare" supreRouterLink>
      <supre-card-navbar-card-title>Compare</supre-card-navbar-card-title>
      <supre-card-navbar-card-icon><div class="icon ion-ios-color-filter-outline"></div></supre-card-navbar-card-icon>
    </supre-card-navbar-card>
    <supre-card-navbar-card supreForTab="segments" supreCardId="forecast" supreRouterLink>
      <supre-card-navbar-card-title>Forecast</supre-card-navbar-card-title>
      <supre-card-navbar-card-icon><div class="icon ion-ios-glasses-outline"></div></supre-card-navbar-card-icon>
    </supre-card-navbar-card>
  </supre-card-navbar-cards>
  <supre-card-navbar-menu-item supreTabId="campaigns" supreRouterLink='campaigns/option'>Campaigns</supre-card-navbar-menu-item>
  <supre-card-navbar-cards supreForTab="campaigns">
    <supre-card-navbar-card supreForTab="campaigns" supreCardId="option" supreRouterLink [supreDefaultCardForTab]="true">
      <supre-card-navbar-card-title>Option</supre-card-navbar-card-title>
      <supre-card-navbar-card-icon><div class="icon ion-record"></div></supre-card-navbar-card-icon>
    </supre-card-navbar-card>
    <supre-card-navbar-card supreForTab="campaigns" supreCardId="another" supreRouterLink>
      <supre-card-navbar-card-title>Another</supre-card-navbar-card-title>
      <supre-card-navbar-card-icon><div class="icon ion-record"></div></supre-card-navbar-card-icon>
    </supre-card-navbar-card>
    <supre-card-navbar-card supreForTab="campaigns" supreCardId="last" supreRouterLink>
      <supre-card-navbar-card-title>Last</supre-card-navbar-card-title>
      <supre-card-navbar-card-icon><div class="icon ion-record"></div></supre-card-navbar-card-icon>
    </supre-card-navbar-card>
  </supre-card-navbar-cards>
</supre-card-navbar>
```

## Woes
I was really hoping to create a nice ng2 component api,
divorced from its actual implementation.

EG:
```html
<supre-card-navbar>
  <supre-card-navbar-item>
    <supre-card-navbar-title>Segments</supre-card-navbar-menu-item>
    <supre-card-navbar-cards>
      <supre-card-navbar-card>
        <supre-card-navbar-card-title>Library</supre-card-navbar-card-title>
        <supre-card-navbar-card-icon><div class="CardNavbar-cardIcon icon ion-android-add-circle"></div></supre-card-navbar-card-icon>
      </supre-card-navbar-card>
    </supre-card-navbar-cards>
  </supre-card-navbar-item>
  ...
</supre-card-navbar>
```

And then have the component split the titles into a `CardNavbar-menuItems` div,
and the cards into a `CardNavbar-subItems` div. This would allow the item
and cards to be intuitively coupled in the api, but distinct in the
markup (out of necessity)

Unfortanely, I was not able to accomplish this with ng2 due to limitations
with ng-content's selector only going one level deep.
