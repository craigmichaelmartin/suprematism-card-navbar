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
var Rx = require('rxjs');
var cid = 0;
var StateManagerService = (function () {
    function StateManagerService() {
        this.model = new Rx.Subject();
        this.currentModel = new Rx.ReplaySubject(1);
    }
    StateManagerService.getUniqueId = function (prefix) {
        if (prefix === void 0) { prefix = 'cid'; }
        cid += 1;
        return prefix + "_" + cid;
    };
    Object.defineProperty(StateManagerService.prototype, "getModel", {
        get: function () {
            return this.currentModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateManagerService.prototype, "setModel", {
        set: function (Model) {
            var _this = this;
            this.model
                .startWith(Model)
                .scan(function (currentState, actionMethod) { return actionMethod(currentState); })
                .share()
                .subscribe(function (currentState) {
                _this.currentModel.next(currentState);
            });
        },
        enumerable: true,
        configurable: true
    });
    StateManagerService.prototype.updateModel = function (action) {
        this.model.next(action);
    };
    StateManagerService.prototype.updateModelFromObservable = function (stream) {
        var _this = this;
        stream.subscribe(function (model) {
            return _this.model.next(function (currentState) {
                return Object.assign({}, currentState, model);
            });
        });
    };
    StateManagerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StateManagerService);
    return StateManagerService;
}());
exports.StateManagerService = StateManagerService;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-card-navbar/src/state-manager.service.js.map