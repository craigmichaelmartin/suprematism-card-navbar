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
var state_manager_service_1 = require('../../../state-manager.service');
var CardNavbarCardComponent = (function () {
    // ------ Constructor -------------------------------------------------------
    function CardNavbarCardComponent(stateManagerService) {
        var _this = this;
        this.stateManagerService = stateManagerService;
        this.defaultCardForTab = false;
        this.defaultCardForAllTabs = false;
        // ------ Properties -------------------------------------------------------
        // A unique indentifier for the component
        this.cid = state_manager_service_1.StateManagerService.getUniqueId();
        // Emits events of raw data from the template
        this.rawStateSource = new Subject_1.Subject();
        // The stream of state kept locally
        this.localState$ = this.rawStateSource
            .filter(function (state) {
            return ['notActive', 'active', 'preSelected'].indexOf(state) > -1;
        });
        // The stream of state kept in a service
        this.stateManagerProxy$ = this.rawStateSource
            .filter(function (state) { return ['selected'].indexOf(state) > -1; })
            .map(function (state) { return ({ selectedTab: _this.forTab, selectedCard: _this.cid }); });
    }
    // ------ Lifecycle Hooks ---------------------------------------------------
    CardNavbarCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Update the service with the events from the local proxy stream
        this.stateManagerService.updateModelFromObservable(this.stateManagerProxy$);
        // A stream with the latest value of whether the card is selected
        var isSelectedCard$ = this.stateManagerService.getModel
            .distinctUntilChanged()
            .map(function (_a) {
            var selectedTab = _a.selectedTab, selectedCard = _a.selectedCard;
            return !!((selectedTab === _this.forTab && selectedCard === _this.cid)
                || (selectedTab === _this.forTab && !selectedCard
                    && _this.defaultCardForTab)
                || (!selectedTab && !selectedCard && _this.defaultCardForAllTabs));
        });
        // A stream derived from the service specific for notActive events
        var notActive$ = this.stateManagerService.getModel
            .filter(function (_a) {
            var selectedTab = _a.selectedTab, selectedCard = _a.selectedCard;
            return (selectedTab !== _this.forTab)
                || (selectedTab === _this.forTab && selectedCard !== _this.cid);
        })
            .mapTo('notActive');
        // A stream derived from the service specific for selected events
        var selected$ = this.stateManagerService.getModel
            .filter(function (_a) {
            var selectedTab = _a.selectedTab, selectedCard = _a.selectedCard;
            return selectedTab === _this.forTab && selectedCard === _this.cid;
        })
            .mapTo('selected');
        // The state stream to which template listens
        this.state$ = this.localState$.merge(notActive$, selected$)
            .combineLatest(isSelectedCard$)
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
        core_1.Input('supreDefaultCardForTab'), 
        __metadata('design:type', Boolean)
    ], CardNavbarCardComponent.prototype, "defaultCardForTab", void 0);
    __decorate([
        core_1.Input('supreDefaultCard'), 
        __metadata('design:type', Boolean)
    ], CardNavbarCardComponent.prototype, "defaultCardForAllTabs", void 0);
    CardNavbarCardComponent = __decorate([
        core_1.Component({
            selector: 'supre-card-navbar-card',
            template: require('./card.component.html'),
            styles: [require('./card.component.css')]
        }), 
        __metadata('design:paramtypes', [state_manager_service_1.StateManagerService])
    ], CardNavbarCardComponent);
    return CardNavbarCardComponent;
}());
exports.CardNavbarCardComponent = CardNavbarCardComponent;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-card-navbar/src/card-navbar/cards/card/card.component.js.map