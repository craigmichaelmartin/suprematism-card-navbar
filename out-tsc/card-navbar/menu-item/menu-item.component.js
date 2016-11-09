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
    // ------ Constructor ------------------------------------------------------
    function CardNavbarMenuItemComponent(stateManagerService) {
        var _this = this;
        this.stateManagerService = stateManagerService;
        // Emits events of raw data from the template
        this.rawStateSource = new Subject_1.Subject();
        // The stream of state kept locally
        this.localState$ = this.rawStateSource
            .filter(function (state) { return ['preSelected'].indexOf(state) > -1; });
        // The stream of state kept in a service
        this.stateManagerProxy$ = this.rawStateSource
            .filter(function (state) { return ['selected', 'active', 'notActive'].indexOf(state) > -1; })
            .map(function (state) {
            if (state === 'selected') {
                return { selectedTab: _this.supreTabId, selectedCard: void 0, activeTab: void 0 };
            }
            else if (state === 'active') {
                return { activeTab: _this.supreTabId };
            }
            else if (state === 'notActive') {
                return { activeTab: void 0 };
            }
        });
    }
    // ------ Lifecycle Hooks ---------------------------------------------------
    CardNavbarMenuItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Update the service with the events from the local proxy stream
        this.stateManagerService.updateModelFromObservable(this.stateManagerProxy$);
        // A stream with the latest value of whether the tab is selected
        var isSelectedTab$ = this.stateManagerService.getModel
            .map(function (_a) {
            var selectedTab = _a.selectedTab;
            return !!(selectedTab === _this.supreTabId);
        });
        // A stream derived from the service specific for notActive events
        var notActive$ = this.stateManagerService.getModel
            .filter(function (_a) {
            var selectedTab = _a.selectedTab;
            return selectedTab !== _this.supreTabId;
        })
            .mapTo('notActive');
        // A stream derived from the service specific for selected events
        var selected$ = this.stateManagerService.getModel
            .filter(function (currentState) { return currentState.selectedTab === _this.supreTabId; })
            .mapTo('selected');
        // A stream derived from the service specific for active events
        var active$ = this.stateManagerService.getModel
            .filter(function (currentState) { return currentState.activeTab === _this.supreTabId; })
            .mapTo('active');
        // The state stream to which template listens
        this.state$ = this.localState$.merge(notActive$, active$, selected$)
            .combineLatest(isSelectedTab$)
            .map(function (_a) {
            var state = _a[0], selected = _a[1];
            return selected ? 'selected' : state;
        });
    };
    // ------ Public Methods ---------------------------------------------------
    CardNavbarMenuItemComponent.prototype.isInCards = function ($event) {
        // Todo: using document.querySelector doesn't seem like the angular way
        var el = $event.toElement || $event.relatedTarget;
        return document.querySelector('.js-cards').contains(el);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CardNavbarMenuItemComponent.prototype, "supreTabId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CardNavbarMenuItemComponent.prototype, "supreRouterLink", void 0);
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