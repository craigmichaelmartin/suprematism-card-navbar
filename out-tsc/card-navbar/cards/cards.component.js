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
        // Emits events of raw data from the template
        this.rawStateSource = new Subject_1.Subject();
        // The stream of state kept in a service
        this.stateManagerProxy$ = this.rawStateSource
            .filter(function (state) { return ['notActive'].indexOf(state) > -1; })
            .map(function (state) {
            if (state === 'notActive') {
                return { activeTab: void 0 };
            }
        });
    }
    // ------ Lifecycle Hooks ---------------------------------------------------
    CardNavbarCardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Update the service with the events from the local proxy stream
        this.stateManagerService.updateModelFromObservable(this.stateManagerProxy$);
        // A stream derived from the service specific for active / notActive events
        var active$ = this.stateManagerService.getModel
            .map(function (_a) {
            var activeTab = _a.activeTab;
            return activeTab;
        })
            .distinctUntilChanged()
            .switchMap(function (activeTab) {
            return _this.supreForTab === activeTab
                ? activeTab === 'user'
                    ? Observable_1.Observable.interval(0).mapTo('active').take(1)
                    : Observable_1.Observable.interval(500).mapTo('active').take(1)
                : Observable_1.Observable.interval(0).mapTo('notActive').take(1);
        });
        // The state stream to which template listens
        this.state$ = Observable_1.Observable.merge(active$);
    };
    // ------ Public Methods ---------------------------------------------------
    CardNavbarCardsComponent.prototype.isInMenuItem = function ($event) {
        // Todo: using document.querySelector doesn't seem like the angular way
        var el = $event.toElement || $event.relatedTarget;
        return document.querySelector("supre-card-navbar-menu-item[supreTabId=\"" + this.supreForTab + "\"] a").contains(el);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CardNavbarCardsComponent.prototype, "supreForTab", void 0);
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