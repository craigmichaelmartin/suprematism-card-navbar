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
var state_manager_service_1 = require('../../state-manager.service');
var CardNavbarMenuItemComponent = (function () {
    function CardNavbarMenuItemComponent(stateManagerService) {
        this.stateManagerService = stateManagerService;
        this.statusSource = new Subject_1.Subject();
        this.status$ = this.statusSource.startWith('active');
        this.defaultTab = false;
    }
    CardNavbarMenuItemComponent.prototype.isInCards = function ($event) {
        // Todo: using document.querySelector doesn't seem like the angular way
        return document.querySelector('.js-cards').contains(($event.toElement || $event.relatedTarget));
    };
    CardNavbarMenuItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.status$
            .distinctUntilChanged()
            .filter(function (state) { return state === 'selected'; })
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
            .filter(function (state) { return state === 'active'; })
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
            .filter(function (state) { return state === 'notActive'; })
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
        this.state$ = this.status$.merge(this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter(function (currentState) { return currentState.activeTab !== _this.tabId; })
            .mapTo('notActive'), this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter(function (currentState) { return currentState.selectedTab !== _this.tabId; })
            .mapTo('notActive'), this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter(function (currentState) { return currentState.selectedTab === _this.tabId; })
            .mapTo('selected'))
            .combineLatest(this.isSelectedTab$)
            .map(function (_a) {
            var state = _a[0], selected = _a[1];
            return selected ? 'selected' : state;
        });
        this.stateManagerService.getModel
            .distinctUntilChanged()
            .filter(function (currentState) { return currentState.activeTab !== _this.tabId; })
            .mapTo('notActive')
            .subscribe(function (state) {
            _this.statusSource.next(state);
        });
    };
    __decorate([
        core_1.Input('supreTabId'), 
        __metadata('design:type', String)
    ], CardNavbarMenuItemComponent.prototype, "tabId", void 0);
    __decorate([
        core_1.Input('supreDefaultTab'), 
        __metadata('design:type', Boolean)
    ], CardNavbarMenuItemComponent.prototype, "defaultTab", void 0);
    CardNavbarMenuItemComponent = __decorate([
        core_1.Component({
            selector: 'supre-card-navbar-menu-item',
            template: require('./menu-item.component.html'),
            styles: [require('./menu-item.component.css')]
        }), 
        __metadata('design:paramtypes', [state_manager_service_1.StateManagerService])
    ], CardNavbarMenuItemComponent);
    return CardNavbarMenuItemComponent;
}());
exports.CardNavbarMenuItemComponent = CardNavbarMenuItemComponent;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-card-navbar/src/card-navbar/menu-item/menu-item.component.js.map