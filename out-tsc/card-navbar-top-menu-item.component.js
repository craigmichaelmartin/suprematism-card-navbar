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
require('rxjs/add/operator/map');
var state_manager_service_1 = require('./state-manager.service');
var CardNavbarTopMenuItemComponent = (function () {
    function CardNavbarTopMenuItemComponent(stateManagerService) {
        this.stateManagerService = stateManagerService;
        this.statusSource = new Subject_1.Subject();
        this.status$ = this.statusSource
            .startWith('active');
        this.defaultTab = false;
    }
    CardNavbarTopMenuItemComponent.prototype.isInCards = function ($event) {
        // Todo: using document.querySelector doesn't seem like the angular way
        return document.querySelector('.js-cards').contains(($event.toElement || $event.relatedTarget));
    };
    CardNavbarTopMenuItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.status$
            .distinctUntilChanged()
            .filter(function (obj) { return obj.state === 'selected'; })
            .mapTo(this.tabId)
            .subscribe(function (tabId) {
            return _this.stateManagerService.updateModel(function (currentState) {
                var newState = Object.assign({}, currentState);
                newState.selectedTab = tabId;
                newState.selectedCard = void 0;
                return newState;
            });
        });
        this.status$
            .distinctUntilChanged()
            .filter(function (obj) { return obj.state === 'active'; })
            .mapTo(this.tabId)
            .subscribe(function (tabId) {
            return _this.stateManagerService.updateModel(function (currentState) {
                var newState = Object.assign({}, currentState);
                newState.activeTab = tabId;
                return newState;
            });
        });
        this.status$
            .distinctUntilChanged()
            .filter(function (obj) { return obj.state === 'notActive'; })
            .mapTo(this.tabId)
            .subscribe(function (tabId) {
            return _this.stateManagerService.updateModel(function (currentState) {
                var newState = Object.assign({}, currentState);
                newState.activeTab = void 0;
                return newState;
            });
        });
        this.isSelectedTab$ = this.stateManagerService.getModel
            .distinctUntilChanged()
            .map(function (_a) {
            var selectedTab = _a.selectedTab;
            return (selectedTab === _this.tabId) || (!selectedTab && _this.defaultTab);
        });
        // this.state$ = Observable.combineLatest(this.status$, this.isSelectedTab$)
        //   .map(([state, selected]) => selected ? 'selected' : state.state)
        this.state$ = this.status$.merge(this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter(function (currentState) { return currentState.activeTab !== _this.tabId; })
            .mapTo({ state: 'notActive' }), this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter(function (currentState) { return currentState.selectedTab !== _this.tabId; })
            .mapTo({ state: 'notActive' }), this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter(function (currentState) { return currentState.selectedTab === _this.tabId; })
            .mapTo({ state: 'selected' }))
            .combineLatest(this.isSelectedTab$)
            .map(function (_a) {
            var state = _a[0], selected = _a[1];
            return selected ? 'selected' : state.state;
        });
        // this.stateManagerService.getModel
        //   .distinctUntilChanged()
        //   .filter((currentState) => currentState.selectedTab !== this.tabId)
        //   .mapTo({state: 'notActive'})
        //   .subscribe((value) => {
        //     this.statusSource.next(value);
        //   });
        // this.stateManagerService.getModel
        //   .distinctUntilChanged()
        //   .filter((currentState) => currentState.selectedTab === this.tabId)
        //   .mapTo({state: 'selected'})
        //   .subscribe((value) => {
        //     this.statusSource.next(value);
        //   });
        this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter(function (currentState) { return currentState.activeTab !== _this.tabId; })
            .mapTo({ state: 'notActive' })
            .subscribe(function (value) {
            _this.statusSource.next(value);
        });
    };
    __decorate([
        core_1.Input('supreTabId'), 
        __metadata('design:type', String)
    ], CardNavbarTopMenuItemComponent.prototype, "tabId", void 0);
    __decorate([
        core_1.Input('supreDefault'), 
        __metadata('design:type', Boolean)
    ], CardNavbarTopMenuItemComponent.prototype, "defaultTab", void 0);
    CardNavbarTopMenuItemComponent = __decorate([
        core_1.Component({
            selector: 'supre-card-navbar-top-menu-item',
            template: require('./card-navbar-top-menu-item.component.html'),
            styles: [require('./card-navbar-top-menu-item.component.css')]
        }), 
        __metadata('design:paramtypes', [state_manager_service_1.StateManagerService])
    ], CardNavbarTopMenuItemComponent);
    return CardNavbarTopMenuItemComponent;
}());
exports.CardNavbarTopMenuItemComponent = CardNavbarTopMenuItemComponent;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-card-navbar/src/card-navbar-top-menu-item.component.js.map