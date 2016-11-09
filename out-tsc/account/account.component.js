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
var AccountComponent = (function () {
    function AccountComponent() {
        this.accountSelected = new core_1.EventEmitter();
        this.noItem = { name: '', image: '' };
    }
    // ------ Lifecycle Hooks ---------------------------------------------------
    AccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedSource = new Subject_1.Subject();
        this.showItemsSource = new Subject_1.Subject();
        this.activeItemSource = new Subject_1.Subject();
        var defaultItem = this.supreDefault
            ? this.supreItems.find(function (item) { return item.name === _this.supreDefault; })
            : this.supreItems[0];
        this.selected$ = this.selectedSource
            .startWith(defaultItem);
        this.showItems$ = this.showItemsSource
            .scan(function (current_state) { return !current_state; }, false)
            .startWith(false);
        this.activeItem$ = this.activeItemSource.startWith(this.noItem);
        this.selected$.distinctUntilChanged().subscribe(function (item) { return _this.accountSelected.emit(item.name); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AccountComponent.prototype, "supreDefault", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AccountComponent.prototype, "supreItems", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AccountComponent.prototype, "accountSelected", void 0);
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