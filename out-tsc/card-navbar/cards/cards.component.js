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
var state_manager_service_1 = require('../../state-manager.service');
var CardNavbarCardsComponent = (function () {
    // ------ Constructor ------------------------------------------------------
    function CardNavbarCardsComponent(stateManagerService) {
        this.stateManagerService = stateManagerService;
        this.mouseInSource = new Subject_1.Subject();
        this.mouseIn$ = this.mouseInSource.startWith(false);
    }
    // ------ Lifecycle Hooks ---------------------------------------------------
    CardNavbarCardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var isActiveTab$ = this.stateManagerService.getModel
            .map(function (_a) {
            var activeTab = _a.activeTab;
            return activeTab;
        })
            .distinctUntilChanged()
            .switchMap(function (activeTab) {
            return _this.forTab === activeTab
                ? activeTab === 'user'
                    ? Observable_1.Observable.interval(0).mapTo(true).take(1)
                    : Observable_1.Observable.interval(500).mapTo(true).take(1)
                : Observable_1.Observable.interval(0).mapTo(false).take(1);
        });
        this.show$ = Observable_1.Observable.merge(isActiveTab$, this.mouseIn$);
        this.mouseIn$.subscribe(function (mouseIn) {
            _this.stateManagerService.updateModel(function (currentState) {
                var newState = Object.assign({}, currentState);
                newState.activeTab = void 0;
                return newState;
            });
        });
    };
    // ------ Public Methods ---------------------------------------------------
    CardNavbarCardsComponent.prototype.isInMenuItem = function ($event) {
        // Todo: using document.querySelector doesn't seem like the angular way
        var el = $event.toElement || $event.relatedTarget;
        return document.querySelector("supre-card-navbar-menu-item[supreTabId=\"" + this.forTab + "\"] a").contains(el);
    };
    __decorate([
        core_1.Input('supreForTab'), 
        __metadata('design:type', String)
    ], CardNavbarCardsComponent.prototype, "forTab", void 0);
    CardNavbarCardsComponent = __decorate([
        core_1.Component({
            selector: 'supre-card-navbar-cards',
            template: require('./cards.component.html'),
            styles: [require('./cards.component.css')]
        }), 
        __metadata('design:paramtypes', [state_manager_service_1.StateManagerService])
    ], CardNavbarCardsComponent);
    return CardNavbarCardsComponent;
}());
exports.CardNavbarCardsComponent = CardNavbarCardsComponent;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-card-navbar/src/card-navbar/cards/cards.component.js.map