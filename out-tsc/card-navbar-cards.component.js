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
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var state_manager_service_1 = require('./state-manager.service');
var CardNavbarCardsComponent = (function () {
    function CardNavbarCardsComponent(stateManagerService) {
        this.stateManagerService = stateManagerService;
        this.mouseInSource = new Subject_1.Subject();
        this.mouseIn$ = this.mouseInSource.startWith(false);
    }
    CardNavbarCardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var isActiveTab$ = this.stateManagerService.getModel
            .map(function (currentState) { return _this.forTab === currentState.activeTab; });
        this.show$ = Observable_1.Observable.merge(isActiveTab$, this.mouseIn$);
        this.mouseIn$.subscribe(function (mouseIn) {
            _this.stateManagerService.updateModel(function (currentState) {
                var newState = Object.assign({}, currentState);
                newState.activeTab = void 0;
                return newState;
            });
        });
    };
    __decorate([
        core_1.Input('supreForTab'), 
        __metadata('design:type', String)
    ], CardNavbarCardsComponent.prototype, "forTab", void 0);
    CardNavbarCardsComponent = __decorate([
        core_1.Component({
            selector: 'supre-card-navbar-cards',
            template: require('./card-navbar-cards.component.html'),
            styles: [require('./card-navbar-cards.component.css')]
        }), 
        __metadata('design:paramtypes', [state_manager_service_1.StateManagerService])
    ], CardNavbarCardsComponent);
    return CardNavbarCardsComponent;
}());
exports.CardNavbarCardsComponent = CardNavbarCardsComponent;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-card-navbar/src/card-navbar-cards.component.js.map