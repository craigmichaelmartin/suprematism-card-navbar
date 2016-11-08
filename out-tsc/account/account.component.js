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
var ReplaySubject_1 = require('rxjs/ReplaySubject');
require('rxjs/add/operator/takeUntil');
var AccountComponent = (function () {
    // ------ Constructor -------------------------------------------------------
    function AccountComponent() {
        this.noItem = { name: '', image: '' };
    }
    // ------ Lifecycle Hooks ---------------------------------------------------
    AccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedSource = new ReplaySubject_1.ReplaySubject();
        this.showItemsSource = new ReplaySubject_1.ReplaySubject();
        this.activeItemSource = new ReplaySubject_1.ReplaySubject();
        var defaultItem = this.defaultItemName
            ? this.items.find(function (item) { return item.name === _this.defaultItemName; })
            : this.items[0];
        this.selected$ = this.selectedSource.startWith(defaultItem);
        this.showItems$ = this.showItemsSource
            .scan(function (current_state) { return !current_state; }, false)
            .startWith(false);
        this.activeItem$ = this.activeItemSource.startWith(this.noItem);
    };
    __decorate([
        core_1.Input('supreDefault'), 
        __metadata('design:type', String)
    ], AccountComponent.prototype, "defaultItemName", void 0);
    __decorate([
        core_1.Input('supreItems'), 
        __metadata('design:type', Array)
    ], AccountComponent.prototype, "items", void 0);
    AccountComponent = __decorate([
        core_1.Component({
            selector: 'supre-account',
            template: require('./account.component.html'),
            styles: [require('./account.component.css')]
        }), 
        __metadata('design:paramtypes', [])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-card-navbar/src/account/account.component.js.map