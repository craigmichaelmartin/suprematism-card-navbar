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
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var state_manager_service_1 = require('../state-manager.service');
var CardNavbarComponent = (function () {
    function CardNavbarComponent(stateManagerService) {
        this.stateManagerService = stateManagerService;
    }
    CardNavbarComponent.prototype.ngOnInit = function () {
        this.stateManagerService.setModel = {
            selectedTab: this.supreSelectedTab,
            selectedCard: this.supreSelectedCard
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CardNavbarComponent.prototype, "supreSelectedTab", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CardNavbarComponent.prototype, "supreSelectedCard", void 0);
    CardNavbarComponent = __decorate([
        core_1.Component({
            selector: 'supre-card-navbar',
            template: require('./card-navbar.component.html'),
            styles: [require('./card-navbar.component.css')]
        }), 
        __metadata('design:paramtypes', [state_manager_service_1.StateManagerService])
    ], CardNavbarComponent);
    return CardNavbarComponent;
}());
exports.CardNavbarComponent = CardNavbarComponent;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-card-navbar/src/card-navbar/card-navbar.component.js.map