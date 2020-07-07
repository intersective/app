(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["achievements-achievements-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/achievements/achievements.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/achievements/achievements.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header mode=\"ios\">\n  <ion-toolbar>\n    <ion-icon name=\"arrow-back\" (click)=\"back()\" color=\"primary\" slot=\"start\" class=\"ion-margin-start\"></ion-icon>\n    <ion-title class=\"ion-text-center\">Badges</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content color=\"light\" class=\"ion-text-center\">\n  <ng-container *ngIf=\"loadingAchievements\">\n    <ion-spinner></ion-spinner>\n  </ng-container>\n    <ion-grid class=\"ion-no-padding ion-padding-start ion-padding-end\" *ngIf=\"this.achievementService.getIsPointsConfigured() && !loadingAchievements\">\n      <ion-row class=\"total-points\" [ngClass]=\"{'desktop' : !utils.isMobile()}\">\n        <ion-col class=\"trophy\" size-xs=\"4\" size-sm=\"4\" size-md=\"4\" size-lg=\"12\" size-xl=\"12\">\n          <div>\n            <div class=\"circle-background\">\n              <ion-avatar>\n                <img [src]=\"userInfo.image\">\n              </ion-avatar>\n            </div>\n          </div>\n          <div *ngIf=\"!utils.isMobile()\" class=\"points\">\n              <p class=\"headline-5\">Total Points : {{ this.achievementService.getEarnedPoints() }}</p>\n              <p class=\"subtitle-2 gray-3\">{{userInfo.name}}</p>\n            </div>\n        </ion-col>\n        <ion-col size-xs=\"8\" *ngIf=\"utils.isMobile()\" class=\"points ion-align-items-start\">\n            <p class=\"headline-5\">Total Points : {{ this.achievementService.getEarnedPoints() }}</p>\n            <p class=\"subtitle-2 gray-3\">{{userInfo.name}}</p>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <hr *ngIf=\"utils.isMobile() && this.achievementService.getIsPointsConfigured()\">\n    <ion-grid class=\"ion-no-padding ion-padding-start ion-padding-end\">\n        <ion-row [ngClass]=\"{'badge-container' : !utils.isMobile()}\">\n          <ion-col class=\"title-container\" size-xs=\"9\" size-sm=\"9\" size-md=\"12\" size-lg=\"12\" size-xl=\"12\">\n            <p class=\"subtitle-2 gray-2\">My Badges</p>\n          </ion-col>\n        </ion-row>\n        <ion-row [ngClass]=\"{'badge-container' : !utils.isMobile()}\">\n          <ion-col class=\"badge-col ion-margin-bottom\" *ngFor=\"let achievement of achievements; let i = index;\"\n          size-xs=\"4\" size-sm=\"3\" size-md=\"3\" size-lg=\"3\" size-xl=\"3\">\n          <!-- need to add loading -->\n            <achievement-badge\n              [achievement]=\"achievement\"\n              [showName]=true\n            ></achievement-badge>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/achievements/achievements-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/achievements/achievements-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: AchievementsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AchievementsRoutingModule", function() { return AchievementsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _achievements_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./achievements.component */ "./src/app/achievements/achievements.component.ts");
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
        component: _achievements_component__WEBPACK_IMPORTED_MODULE_2__["AchievementsComponent"]
    }
];
var AchievementsRoutingModule = /** @class */ (function () {
    function AchievementsRoutingModule() {
    }
    AchievementsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AchievementsRoutingModule);
    return AchievementsRoutingModule;
}());



/***/ }),

/***/ "./src/app/achievements/achievements.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/achievements/achievements.component.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".total-points .trophy .circle-background {\n  width: 72px;\n  height: 72px;\n  margin: auto;\n}\n.total-points .trophy .circle-background ion-avatar {\n  width: 72px;\n  height: 72px;\n}\n.total-points .points {\n  text-align: left;\n  padding-left: 0 !important;\n}\n.total-points .points p:nth-child(1) {\n  margin-bottom: 0 !important;\n}\n.total-points .points p:nth-child(2) {\n  margin: 0 !important;\n}\n.total-points.desktop {\n  -webkit-box-pack: center !important;\n          justify-content: center !important;\n}\n.total-points.desktop .points {\n  text-align: center;\n}\n.badge-col {\n  padding: 3px;\n}\n.badge-container {\n  max-width: 992px;\n  margin: auto;\n}\n.badge-container .badge-col {\n  max-width: 224px !important;\n  margin-left: 12px;\n  margin-right: 12px;\n  padding: 0;\n}\n@media screen and (max-width: 1023px) {\n  .badge-container .badge-col {\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n    padding: 5px;\n  }\n}\nhr {\n  border: 0;\n  height: 1px;\n  background: #ABAEBB;\n}\n.title-container {\n  text-align: left;\n  max-width: 955px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9hY2hpZXZlbWVudHMvYWNoaWV2ZW1lbnRzLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hY2hpZXZlbWVudHMvYWNoaWV2ZW1lbnRzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVRO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDRFo7QURFWTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FDQWhCO0FESUk7RUFDSSxnQkFBQTtFQUNBLDBCQUFBO0FDRlI7QURHUTtFQUNJLDJCQUFBO0FDRFo7QURHUTtFQUNJLG9CQUFBO0FDRFo7QURLSTtFQUNJLG1DQUFBO1VBQUEsa0NBQUE7QUNIUjtBRElRO0VBQ0ksa0JBQUE7QUNGWjtBRE9BO0VBQ0ksWUFBQTtBQ0pKO0FET0E7RUFDSSxnQkFBQTtFQUNBLFlBQUE7QUNKSjtBREtJO0VBQ0ksMkJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtBQ0hSO0FET0E7RUFFUTtJQUNJLHlCQUFBO0lBQ0EsMEJBQUE7SUFDQSxZQUFBO0VDTFY7QUFDRjtBRFNBO0VBQ0ksU0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQ1BKO0FEU0E7RUFDSSxnQkFBQTtFQUNBLDJCQUFBO0FDTkoiLCJmaWxlIjoic3JjL2FwcC9hY2hpZXZlbWVudHMvYWNoaWV2ZW1lbnRzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRvdGFsLXBvaW50cyB7XG4gICAgLnRyb3BoeSB7XG4gICAgICAgIC5jaXJjbGUtYmFja2dyb3VuZCB7XG4gICAgICAgICAgICB3aWR0aDogNzJweDtcbiAgICAgICAgICAgIGhlaWdodDogNzJweDtcbiAgICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgICAgIGlvbi1hdmF0YXIge1xuICAgICAgICAgICAgICAgIHdpZHRoOiA3MnB4O1xuICAgICAgICAgICAgICAgIGhlaWdodDogNzJweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAucG9pbnRzIHtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwICFpbXBvcnRhbnQ7XG4gICAgICAgIHA6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICBwOm50aC1jaGlsZCgyKSB7XG4gICAgICAgICAgICBtYXJnaW46IDAgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICYuZGVza3RvcCB7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyICFpbXBvcnRhbnQ7XG4gICAgICAgIC5wb2ludHMge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4uYmFkZ2UtY29sIHtcbiAgICBwYWRkaW5nOiAzcHg7XG59XG5cbi5iYWRnZS1jb250YWluZXIge1xuICAgIG1heC13aWR0aDogOTkycHg7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIC5iYWRnZS1jb2wge1xuICAgICAgICBtYXgtd2lkdGg6IDIyNHB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMnB4O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMDIzcHgpIHtcbiAgICAuYmFkZ2UtY29udGFpbmVyIHtcbiAgICAgICAgLmJhZGdlLWNvbCB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmhyIHtcbiAgICBib3JkZXI6IDA7XG4gICAgaGVpZ2h0OiAxcHg7XG4gICAgYmFja2dyb3VuZDogI0FCQUVCQjtcbn1cbi50aXRsZS1jb250YWluZXIge1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgbWF4LXdpZHRoOiA5NTVweCAhaW1wb3J0YW50O1xufSIsIi50b3RhbC1wb2ludHMgLnRyb3BoeSAuY2lyY2xlLWJhY2tncm91bmQge1xuICB3aWR0aDogNzJweDtcbiAgaGVpZ2h0OiA3MnB4O1xuICBtYXJnaW46IGF1dG87XG59XG4udG90YWwtcG9pbnRzIC50cm9waHkgLmNpcmNsZS1iYWNrZ3JvdW5kIGlvbi1hdmF0YXIge1xuICB3aWR0aDogNzJweDtcbiAgaGVpZ2h0OiA3MnB4O1xufVxuLnRvdGFsLXBvaW50cyAucG9pbnRzIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZy1sZWZ0OiAwICFpbXBvcnRhbnQ7XG59XG4udG90YWwtcG9pbnRzIC5wb2ludHMgcDpudGgtY2hpbGQoMSkge1xuICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7XG59XG4udG90YWwtcG9pbnRzIC5wb2ludHMgcDpudGgtY2hpbGQoMikge1xuICBtYXJnaW46IDAgIWltcG9ydGFudDtcbn1cbi50b3RhbC1wb2ludHMuZGVza3RvcCB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyICFpbXBvcnRhbnQ7XG59XG4udG90YWwtcG9pbnRzLmRlc2t0b3AgLnBvaW50cyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmJhZGdlLWNvbCB7XG4gIHBhZGRpbmc6IDNweDtcbn1cblxuLmJhZGdlLWNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogOTkycHg7XG4gIG1hcmdpbjogYXV0bztcbn1cbi5iYWRnZS1jb250YWluZXIgLmJhZGdlLWNvbCB7XG4gIG1heC13aWR0aDogMjI0cHggIWltcG9ydGFudDtcbiAgbWFyZ2luLWxlZnQ6IDEycHg7XG4gIG1hcmdpbi1yaWdodDogMTJweDtcbiAgcGFkZGluZzogMDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyM3B4KSB7XG4gIC5iYWRnZS1jb250YWluZXIgLmJhZGdlLWNvbCB7XG4gICAgbWFyZ2luLWxlZnQ6IDAgIWltcG9ydGFudDtcbiAgICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDtcbiAgICBwYWRkaW5nOiA1cHg7XG4gIH1cbn1cbmhyIHtcbiAgYm9yZGVyOiAwO1xuICBoZWlnaHQ6IDFweDtcbiAgYmFja2dyb3VuZDogI0FCQUVCQjtcbn1cblxuLnRpdGxlLWNvbnRhaW5lciB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIG1heC13aWR0aDogOTU1cHggIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/achievements/achievements.component.ts":
/*!********************************************************!*\
  !*** ./src/app/achievements/achievements.component.ts ***!
  \********************************************************/
/*! exports provided: AchievementsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AchievementsComponent", function() { return AchievementsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _achievements_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./achievements.service */ "./src/app/achievements/achievements.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/new-relic/new-relic.service */ "./src/app/shared/new-relic/new-relic.service.ts");
/* harmony import */ var _services_router_enter_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @services/router-enter.service */ "./src/app/services/router-enter.service.ts");
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
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var AchievementsComponent = /** @class */ (function (_super) {
    __extends(AchievementsComponent, _super);
    function AchievementsComponent(router, achievementService, utils, ngZone, newRelic, storage) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.achievementService = achievementService;
        _this.utils = utils;
        _this.ngZone = ngZone;
        _this.newRelic = newRelic;
        _this.storage = storage;
        _this.routeUrl = '/achievements';
        _this.loadingAchievements = true;
        _this.userInfo = {
            image: '',
            name: ''
        };
        return _this;
    }
    AchievementsComponent.prototype.onEnter = function () {
        var _this = this;
        this.userInfo = {
            image: this.storage.get('me').image,
            name: this.storage.get('me').name
        };
        this.loadingAchievements = true;
        this.achievementService.getAchievements().subscribe(function (achievements) {
            _this.achievements = achievements;
            _this.loadingAchievements = false;
        }, function (err) {
            _this.newRelic.noticeError("" + JSON.stringify(err));
        });
    };
    AchievementsComponent.prototype.back = function () {
        var _this = this;
        return this.ngZone.run(function () { return _this.router.navigate(['app', 'home']); });
    };
    AchievementsComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _achievements_service__WEBPACK_IMPORTED_MODULE_2__["AchievementsService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_5__["NewRelicService"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"] }
    ]; };
    AchievementsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-achievements',
            template: __importDefault(__webpack_require__(/*! raw-loader!./achievements.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/achievements/achievements.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./achievements.component.scss */ "./src/app/achievements/achievements.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _achievements_service__WEBPACK_IMPORTED_MODULE_2__["AchievementsService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_5__["NewRelicService"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"]])
    ], AchievementsComponent);
    return AchievementsComponent;
}(_services_router_enter_service__WEBPACK_IMPORTED_MODULE_6__["RouterEnter"]));



/***/ }),

/***/ "./src/app/achievements/achievements.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/achievements/achievements.module.ts ***!
  \*****************************************************/
/*! exports provided: AchievementsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AchievementsModule", function() { return AchievementsModule; });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _achievements_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./achievements-routing.module */ "./src/app/achievements/achievements-routing.module.ts");
/* harmony import */ var _achievements_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./achievements.component */ "./src/app/achievements/achievements.component.ts");
/* harmony import */ var _achievements_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./achievements.service */ "./src/app/achievements/achievements.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var AchievementsModule = /** @class */ (function () {
    function AchievementsModule() {
    }
    AchievementsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__["SharedModule"],
                _achievements_routing_module__WEBPACK_IMPORTED_MODULE_2__["AchievementsRoutingModule"],
            ],
            declarations: [
                _achievements_component__WEBPACK_IMPORTED_MODULE_3__["AchievementsComponent"]
            ],
            providers: [
                _achievements_service__WEBPACK_IMPORTED_MODULE_4__["AchievementsService"]
            ]
        })
    ], AchievementsModule);
    return AchievementsModule;
}());



/***/ })

}]);
//# sourceMappingURL=achievements-achievements-module.js.map