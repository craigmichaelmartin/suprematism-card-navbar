"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var common_1 = require('@angular/common');
var state_manager_service_1 = require('./state-manager.service');
var card_navbar_component_1 = require('./card-navbar.component');
var card_navbar_top_menu_item_component_1 = require('./card-navbar-top-menu-item.component');
var card_navbar_user_menu_item_component_1 = require('./card-navbar-user-menu-item.component');
var card_navbar_cards_component_1 = require('./card-navbar-cards.component');
var card_navbar_card_component_1 = require('./card-navbar-card.component');
var card_navbar_card_title_component_1 = require('./card-navbar-card-title.component');
var card_navbar_card_icon_component_1 = require('./card-navbar-card-icon.component');
var core_1 = require('@angular/core');
__export(require('./state-manager.service'));
__export(require('./card-navbar.component'));
__export(require('./card-navbar-top-menu-item.component'));
__export(require('./card-navbar-user-menu-item.component'));
__export(require('./card-navbar-cards.component'));
__export(require('./card-navbar-card.component'));
__export(require('./card-navbar-card-title.component'));
__export(require('./card-navbar-card-icon.component'));
var CardNavbarModule = (function () {
    function CardNavbarModule() {
    }
    CardNavbarModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
            ],
            providers: [
                state_manager_service_1.StateManagerService
            ],
            declarations: [
                card_navbar_component_1.CardNavbarComponent,
                card_navbar_top_menu_item_component_1.CardNavbarTopMenuItemComponent,
                card_navbar_user_menu_item_component_1.CardNavbarUserMenuItemComponent,
                card_navbar_cards_component_1.CardNavbarCardsComponent,
                card_navbar_card_component_1.CardNavbarCardComponent,
                card_navbar_card_title_component_1.CardNavbarCardTitleComponent,
                card_navbar_card_icon_component_1.CardNavbarCardIconComponent,
            ],
            exports: [
                card_navbar_component_1.CardNavbarComponent,
                card_navbar_top_menu_item_component_1.CardNavbarTopMenuItemComponent,
                card_navbar_user_menu_item_component_1.CardNavbarUserMenuItemComponent,
                card_navbar_cards_component_1.CardNavbarCardsComponent,
                card_navbar_card_component_1.CardNavbarCardComponent,
                card_navbar_card_title_component_1.CardNavbarCardTitleComponent,
                card_navbar_card_icon_component_1.CardNavbarCardIconComponent,
            ],
            entryComponents: [
                card_navbar_component_1.CardNavbarComponent,
                card_navbar_top_menu_item_component_1.CardNavbarTopMenuItemComponent,
                card_navbar_user_menu_item_component_1.CardNavbarUserMenuItemComponent,
                card_navbar_cards_component_1.CardNavbarCardsComponent,
                card_navbar_card_component_1.CardNavbarCardComponent,
                card_navbar_card_title_component_1.CardNavbarCardTitleComponent,
                card_navbar_card_icon_component_1.CardNavbarCardIconComponent,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CardNavbarModule);
    return CardNavbarModule;
}());
exports.CardNavbarModule = CardNavbarModule;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-card-navbar/src/index.js.map