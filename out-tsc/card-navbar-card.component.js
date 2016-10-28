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
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/takeUntil');
var state_manager_service_1 = require('./state-manager.service');
var CardNavbarCardComponent = (function () {
    function CardNavbarCardComponent(stateManagerService) {
        this.stateManagerService = stateManagerService;
        this.defaultCardForTab = false;
        this.defaultCardForAllTabs = false;
        this.statusSource = new Subject_1.Subject();
        this.status$ = this.statusSource.asObservable();
    }
    CardNavbarCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cid = state_manager_service_1.StateManagerService.getUniqueId();
        this.status$
            .filter(function (state) { return state === 'selected'; })
            .mapTo({ forTab: this.forTab, cid: this.cid })
            .subscribe(function (_a) {
            var forTab = _a.forTab, cid = _a.cid;
            return _this.stateManagerService.updateModel(function (currentState) {
                var newState = Object.assign({}, currentState);
                newState.selectedTab = forTab;
                newState.selectedCard = cid;
                return newState;
            });
        });
        this.isSelectedCard$ = this.stateManagerService.getModel
            .distinctUntilChanged()
            .map(function (_a) {
            var selectedTab = _a.selectedTab, selectedCard = _a.selectedCard;
            return (selectedTab === _this.forTab && selectedCard === _this.cid)
                || (selectedTab === _this.forTab && !selectedCard && _this.defaultCardForTab)
                || (!selectedTab && !selectedCard && _this.defaultCardForAllTabs);
        });
        this.state$ = this.status$
            .merge(this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter(function (_a) {
            var selectedCard = _a.selectedCard, selectedTab = _a.selectedTab;
            return selectedTab !== _this.forTab && selectedCard !== _this.cid;
        })
            .mapTo('notActive'))
            .combineLatest(this.isSelectedCard$)
            .map(function (_a) {
            var state = _a[0], selected = _a[1];
            return selected ? 'selected' : state;
        });
    };
    __decorate([
        core_1.Input('supreStyle'), 
        __metadata('design:type', String)
    ], CardNavbarCardComponent.prototype, "style", void 0);
    __decorate([
        core_1.Input('supreForTab'), 
        __metadata('design:type', String)
    ], CardNavbarCardComponent.prototype, "forTab", void 0);
    __decorate([
        core_1.Input('supreDefault'), 
        __metadata('design:type', Boolean)
    ], CardNavbarCardComponent.prototype, "defaultCardForTab", void 0);
    __decorate([
        core_1.Input('supreUltimateDefault'), 
        __metadata('design:type', Boolean)
    ], CardNavbarCardComponent.prototype, "defaultCardForAllTabs", void 0);
    CardNavbarCardComponent = __decorate([
        core_1.Component({
            selector: 'supre-card-navbar-card',
            template: require('./card-navbar-card.component.html'),
            styles: [require('./card-navbar-card.component.css')]
        }), 
        __metadata('design:paramtypes', [state_manager_service_1.StateManagerService])
    ], CardNavbarCardComponent);
    return CardNavbarCardComponent;
}());
exports.CardNavbarCardComponent = CardNavbarCardComponent;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-card-navbar/src/card-navbar-card.component.js.map