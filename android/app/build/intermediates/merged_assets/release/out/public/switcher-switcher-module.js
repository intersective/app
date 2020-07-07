(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["switcher-switcher-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/switcher/switcher-program/switcher-program.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/switcher/switcher-program/switcher-program.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header mode=\"ios\">\n  <ion-toolbar>\n    <ion-title>Select an experience</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\" color=\"light\" appFloat>\n  <ion-grid>\n    <ion-row>\n      <ion-col size=\"12\" size-sm=\"12\" size-md=\"6\" size-lg=\"4\" size-xl=\"3\" *ngFor=\"let program of programs; let i = index\">\n        <ion-card class=\"practera-card experience-card\" (click)=\"switch(i)\">\n          <div class=\"image-container\">\n            <img [src]=\"program.project.lead_image ? program.project.lead_image : '../../../assets/default-experience-image.svg'\" alt=\"{{ program.program.name }}\"/>\n          </div>\n          <ion-card-content>\n            <clickable-item color=\"light\" [lines]=\"'none'\" [backgroundColor]=\"program.program.config.theme_color\" [isSwitcherCard]=\"true\">\n              <ion-label class=\"subtitle-1\">\n                {{ program.program.name }}\n                <ion-progress-bar *ngIf=\"program.progress !== undefined\" [value]=\"program.progress\"></ion-progress-bar>\n              </ion-label>\n              <ion-badge *ngIf=\"program.todoItems !== undefined\" slot=\"end\">{{ program.todoItems }}</ion-badge>\n              <ion-icon name=\"chevron-forward\" slot=\"end\"></ion-icon>\n            </clickable-item>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/switcher/switcher-program/switcher-program.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/switcher/switcher-program/switcher-program.component.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-header ion-toolbar > ion-title {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\nion-grid {\n  --ion-grid-padding: 0;\n  --ion-grid-padding-lg: 0;\n  --ion-grid-padding-md: 0;\n  --ion-grid-padding-sm: 0;\n  --ion-grid-padding-xl: 0;\n  --ion-grid-padding-xs: 0;\n}\n\nion-col {\n  --ion-grid-column-padding: 8px;\n  --ion-grid-column-padding-lg: 8px;\n  --ion-grid-column-padding-md: 8px;\n  --ion-grid-column-padding-sm: 8px;\n  --ion-grid-column-padding-xl: 8px;\n  --ion-grid-column-padding-xs: 8px;\n}\n\nion-progress-bar {\n  margin-top: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9zd2l0Y2hlci9zd2l0Y2hlci1wcm9ncmFtL3N3aXRjaGVyLXByb2dyYW0uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3N3aXRjaGVyL3N3aXRjaGVyLXByb2dyYW0vc3dpdGNoZXItcHJvZ3JhbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7QUNESjs7QURJQTtFQUNFLHFCQUFBO0VBQ0Esd0JBQUE7RUFDQSx3QkFBQTtFQUNBLHdCQUFBO0VBQ0Esd0JBQUE7RUFDQSx3QkFBQTtBQ0RGOztBREdBO0VBQ0UsOEJBQUE7RUFDQSxpQ0FBQTtFQUNBLGlDQUFBO0VBQ0EsaUNBQUE7RUFDQSxpQ0FBQTtFQUNBLGlDQUFBO0FDQUY7O0FERUE7RUFDRSxlQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9zd2l0Y2hlci9zd2l0Y2hlci1wcm9ncmFtL3N3aXRjaGVyLXByb2dyYW0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taGVhZGVyIHtcbiAgLy8gcHJvZ3JhbSBzd2l0Y2hlciB0aXRsZSBubyBtZW51IGJ1dHRvbnMgcmVxdWlyZWRcbiAgaW9uLXRvb2xiYXIgPiBpb24tdGl0bGUge1xuICAgIHBhZGRpbmctbGVmdDogMjBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xuICB9XG59XG5pb24tZ3JpZCB7XG4gIC0taW9uLWdyaWQtcGFkZGluZzogMDtcbiAgLS1pb24tZ3JpZC1wYWRkaW5nLWxnOiAwO1xuICAtLWlvbi1ncmlkLXBhZGRpbmctbWQ6IDA7XG4gIC0taW9uLWdyaWQtcGFkZGluZy1zbTogMDtcbiAgLS1pb24tZ3JpZC1wYWRkaW5nLXhsOiAwO1xuICAtLWlvbi1ncmlkLXBhZGRpbmcteHM6IDA7XG59XG5pb24tY29sIHtcbiAgLS1pb24tZ3JpZC1jb2x1bW4tcGFkZGluZzogOHB4O1xuICAtLWlvbi1ncmlkLWNvbHVtbi1wYWRkaW5nLWxnOiA4cHg7XG4gIC0taW9uLWdyaWQtY29sdW1uLXBhZGRpbmctbWQ6IDhweDtcbiAgLS1pb24tZ3JpZC1jb2x1bW4tcGFkZGluZy1zbTogOHB4O1xuICAtLWlvbi1ncmlkLWNvbHVtbi1wYWRkaW5nLXhsOiA4cHg7XG4gIC0taW9uLWdyaWQtY29sdW1uLXBhZGRpbmcteHM6IDhweDtcbn1cbmlvbi1wcm9ncmVzcy1iYXIge1xuICBtYXJnaW4tdG9wOiA1cHg7XG59XG4iLCJpb24taGVhZGVyIGlvbi10b29sYmFyID4gaW9uLXRpdGxlIHtcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xufVxuXG5pb24tZ3JpZCB7XG4gIC0taW9uLWdyaWQtcGFkZGluZzogMDtcbiAgLS1pb24tZ3JpZC1wYWRkaW5nLWxnOiAwO1xuICAtLWlvbi1ncmlkLXBhZGRpbmctbWQ6IDA7XG4gIC0taW9uLWdyaWQtcGFkZGluZy1zbTogMDtcbiAgLS1pb24tZ3JpZC1wYWRkaW5nLXhsOiAwO1xuICAtLWlvbi1ncmlkLXBhZGRpbmcteHM6IDA7XG59XG5cbmlvbi1jb2wge1xuICAtLWlvbi1ncmlkLWNvbHVtbi1wYWRkaW5nOiA4cHg7XG4gIC0taW9uLWdyaWQtY29sdW1uLXBhZGRpbmctbGc6IDhweDtcbiAgLS1pb24tZ3JpZC1jb2x1bW4tcGFkZGluZy1tZDogOHB4O1xuICAtLWlvbi1ncmlkLWNvbHVtbi1wYWRkaW5nLXNtOiA4cHg7XG4gIC0taW9uLWdyaWQtY29sdW1uLXBhZGRpbmcteGw6IDhweDtcbiAgLS1pb24tZ3JpZC1jb2x1bW4tcGFkZGluZy14czogOHB4O1xufVxuXG5pb24tcHJvZ3Jlc3MtYmFyIHtcbiAgbWFyZ2luLXRvcDogNXB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/switcher/switcher-program/switcher-program.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/switcher/switcher-program/switcher-program.component.ts ***!
  \*************************************************************************/
/*! exports provided: SwitcherProgramComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitcherProgramComponent", function() { return SwitcherProgramComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _services_router_enter_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/router-enter.service */ "./src/app/services/router-enter.service.ts");
/* harmony import */ var _switcher_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../switcher.service */ "./src/app/switcher/switcher.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm5/ionic-angular.js");
/* harmony import */ var _shared_pusher_pusher_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/pusher/pusher.service */ "./src/app/shared/pusher/pusher.service.ts");
/* harmony import */ var _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/new-relic/new-relic.service */ "./src/app/shared/new-relic/new-relic.service.ts");
/* harmony import */ var _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/notification/notification.service */ "./src/app/shared/notification/notification.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










var SwitcherProgramComponent = /** @class */ (function (_super) {
    __extends(SwitcherProgramComponent, _super);
    function SwitcherProgramComponent(loadingController, router, pusherService, switcherService, newRelic, notificationService, utils) {
        var _this = _super.call(this, router) || this;
        _this.loadingController = loadingController;
        _this.router = router;
        _this.pusherService = pusherService;
        _this.switcherService = switcherService;
        _this.newRelic = newRelic;
        _this.notificationService = notificationService;
        _this.utils = utils;
        _this.routeUrl = '/switcher/switcher-program';
        return _this;
    }
    SwitcherProgramComponent.prototype.onEnter = function () {
        var _this = this;
        this.newRelic.setPageViewName('program switcher');
        this.switcherService.getPrograms()
            .subscribe(function (programs) {
            _this.programs = programs;
            _this._getProgresses(programs);
        });
    };
    SwitcherProgramComponent.prototype._getProgresses = function (programs) {
        var _this = this;
        var projectIds = programs.map(function (v) { return v.project.id; });
        this.switcherService.getProgresses(projectIds).subscribe(function (res) {
            res.forEach(function (progress) {
                var i = _this.programs.findIndex(function (program) { return program.project.id === progress.id; });
                _this.programs[i].progress = progress.progress;
                _this.programs[i].todoItems = progress.todoItems;
            });
        });
    };
    SwitcherProgramComponent.prototype.switch = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var nrSwitchedProgramTracer, loading, route_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nrSwitchedProgramTracer = this.newRelic.createTracer('switching program');
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'loading...'
                            })];
                    case 1:
                        loading = _a.sent();
                        this.newRelic.actionText("selected " + this.programs[index].program.name);
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, this.switcherService.switchProgramAndNavigate(this.programs[index])];
                    case 4:
                        route_1 = _a.sent();
                        loading.dismiss().then(function () {
                            nrSwitchedProgramTracer();
                            _this.router.navigate(route_1);
                        });
                        return [3 /*break*/, 7];
                    case 5:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.notificationService.alert({
                                header: 'Error switching program',
                                message: err_1.msg || JSON.stringify(err_1)
                            })];
                    case 6:
                        _a.sent();
                        nrSwitchedProgramTracer();
                        this.newRelic.noticeError('switch program failed', JSON.stringify(err_1));
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SwitcherProgramComponent.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _shared_pusher_pusher_service__WEBPACK_IMPORTED_MODULE_5__["PusherService"] },
        { type: _switcher_service__WEBPACK_IMPORTED_MODULE_3__["SwitcherService"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_6__["NewRelicService"] },
        { type: _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__["NotificationService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_8__["UtilsService"] }
    ]; };
    SwitcherProgramComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-switcher-program',
            template: __importDefault(__webpack_require__(/*! raw-loader!./switcher-program.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/switcher/switcher-program/switcher-program.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./switcher-program.component.scss */ "./src/app/switcher/switcher-program/switcher-program.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _shared_pusher_pusher_service__WEBPACK_IMPORTED_MODULE_5__["PusherService"],
            _switcher_service__WEBPACK_IMPORTED_MODULE_3__["SwitcherService"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_6__["NewRelicService"],
            _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__["NotificationService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_8__["UtilsService"]])
    ], SwitcherProgramComponent);
    return SwitcherProgramComponent;
}(_services_router_enter_service__WEBPACK_IMPORTED_MODULE_2__["RouterEnter"]));



/***/ }),

/***/ "./src/app/switcher/switcher-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/switcher/switcher-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: SwitcherRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitcherRoutingModule", function() { return SwitcherRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _switcher_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./switcher.component */ "./src/app/switcher/switcher.component.ts");
/* harmony import */ var _switcher_program_switcher_program_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./switcher-program/switcher-program.component */ "./src/app/switcher/switcher-program/switcher-program.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var routes = [
    {
        path: '',
        component: _switcher_component__WEBPACK_IMPORTED_MODULE_2__["SwitcherComponent"],
        children: [
            {
                path: '',
                redirectTo: '/switcher/switcher-program'
            },
            {
                path: 'switcher-program',
                component: _switcher_program_switcher_program_component__WEBPACK_IMPORTED_MODULE_3__["SwitcherProgramComponent"]
            }
        ]
    }
];
var SwitcherRoutingModule = /** @class */ (function () {
    function SwitcherRoutingModule() {
    }
    SwitcherRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], SwitcherRoutingModule);
    return SwitcherRoutingModule;
}());



/***/ }),

/***/ "./src/app/switcher/switcher.component.ts":
/*!************************************************!*\
  !*** ./src/app/switcher/switcher.component.ts ***!
  \************************************************/
/*! exports provided: SwitcherComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitcherComponent", function() { return SwitcherComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var SwitcherComponent = /** @class */ (function () {
    function SwitcherComponent() {
    }
    SwitcherComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-switcher',
            template: '<ion-router-outlet></ion-router-outlet>'
        })
    ], SwitcherComponent);
    return SwitcherComponent;
}());



/***/ }),

/***/ "./src/app/switcher/switcher.module.ts":
/*!*********************************************!*\
  !*** ./src/app/switcher/switcher.module.ts ***!
  \*********************************************/
/*! exports provided: SwitcherModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitcherModule", function() { return SwitcherModule; });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _switcher_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./switcher-routing.module */ "./src/app/switcher/switcher-routing.module.ts");
/* harmony import */ var _switcher_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./switcher.component */ "./src/app/switcher/switcher.component.ts");
/* harmony import */ var _switcher_program_switcher_program_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./switcher-program/switcher-program.component */ "./src/app/switcher/switcher-program/switcher-program.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var SwitcherModule = /** @class */ (function () {
    function SwitcherModule() {
    }
    SwitcherModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__["SharedModule"],
                _switcher_routing_module__WEBPACK_IMPORTED_MODULE_2__["SwitcherRoutingModule"],
            ],
            declarations: [
                _switcher_component__WEBPACK_IMPORTED_MODULE_3__["SwitcherComponent"],
                _switcher_program_switcher_program_component__WEBPACK_IMPORTED_MODULE_4__["SwitcherProgramComponent"]
            ]
        })
    ], SwitcherModule);
    return SwitcherModule;
}());



/***/ })

}]);
//# sourceMappingURL=switcher-switcher-module.js.map