(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["overview-overview-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/overview/home/home.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/overview/home/home.component.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"app-home\" [ngStyle]=\"utils.isMobile() ? {} : {padding: '1em'}\">\n  <div class=\"leading-image-container ion-text-center\">\n    <ion-grid>\n      <ion-row>\n        <ion-col *ngIf=\"!utils.isMobile() && programInfo.image\" class=\"image-col ion-justify-content-center ion-align-items-center\">\n          <ion-card class=\"practera-card experience-card\">\n            <div class=\"image-container\">\n              <img [src]=\"programInfo.image\" alt=\"{{ programInfo.name }}\"/>\n            </div>\n          </ion-card>\n        </ion-col>\n        <ion-col class=\"ion-justify-content-center ion-align-items-center\">\n          <app-circle-progress [data]=\"progressConfig\" [type]=\"'large'\" [loading]=\"loadingProgress\"></app-circle-progress>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n\n  <ng-container *ngTemplateOutlet=\"badges\"></ng-container>\n\n  <ng-container *ngIf=\"utils.isMobile(); else notificationsDesktop\">\n    <ion-item lines=\"none\" color=\"transparent\" class=\"ion-no-padding\">\n      <ion-label class=\"subtitle-2 gray-2 ion-padding-start ion-padding-end\">Notifications</ion-label>\n    </ion-item>\n\n    <ng-container *ngIf=\"loadingTodoItems; else doneLoading\">\n      <div class=\"margin-left-right ion-padding-bottom\">\n        <app-todo-card [loading]=\"true\" [todoItem]=\"false\"></app-todo-card>\n      </div>\n    </ng-container>\n\n    <ng-template #doneLoading>\n      <ng-container @newLoaded *ngIf=\"(eventReminders || []).concat(todoItems) as notices\">\n        <app-slidable\n          *ngIf=\"notices.length > 0; else noNotices\"\n          [notifications]=\"notices\"\n          (goto)=\"clickTodoItem($event)\"\n        ></app-slidable>\n\n        <ng-template #noNotices>\n          <div class=\"margin-left-right ion-padding-bottom\">\n            <ng-container *ngTemplateOutlet=\"noItemsTpl\"></ng-container>\n          </div>\n        </ng-template>\n      </ng-container>\n    </ng-template>\n  </ng-container>\n</div>\n\n<ng-template #badges>\n  <ng-container @newLoaded *ngIf=\"achievements && achievements.length > 0\">\n\n    <ion-label class=\"subtitle-2 gray-2 achievement ion-padding-start\">My Badges</ion-label>\n    <ion-label class=\"float-right\" *ngIf=\"achievements.length > 1\">\n      <a color=\"primary\" class=\"button ion-padding-end\" (click)='goTo([\"achievements\"])'>VIEW ALL</a>\n    </ion-label>\n\n    <ion-grid class=\"ion-no-padding\">\n      <ion-row class=\"ion-text-center ion-margin-bottom\">\n        <ion-col *ngFor=\"let achievement of achievements; let i = index;\" size=\"4\" @newLoaded>\n          <achievement-badge [achievement]=\"achievement\"></achievement-badge>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ng-container>\n</ng-template>\n\n<ng-template #notificationsDesktop>\n  <ion-label class=\"subtitle-2 gray-2 ion-padding-start ion-padding-end\">Notifications</ion-label>\n  <ion-list class=\"todo-list\" lines=\"none\">\n    <ng-container *ngIf=\"loadingTodoItems; else todoItemsTpl\">\n      <app-todo-card class=\"ion-padding-bottom\" [loading]=\"true\" [todoItem]=\"false\"></app-todo-card>\n    </ng-container>\n  </ion-list>\n</ng-template>\n\n<ng-template #todoItemsTpl>\n  <ng-container *ngFor=\"let event of eventReminders\" @newLoaded>\n    <app-todo-card\n      [todoItem]=\"{\n        name: event.name,\n        description: '',\n        type: 'event',\n        time: utils.timeFormatter(event.startTime)\n      }\"\n      (click)=\"showEventDetail(event)\"\n    ></app-todo-card>\n  </ng-container>\n\n  <ng-container *ngIf=\"todoItems.length; else noItemsTpl\">\n    <div *ngFor=\"let todoItem of todoItems\" @newLoaded>\n      <app-todo-card\n        [todoItem]=\"todoItem\"\n        (click)=\"clickTodoItem(todoItem)\"\n      ></app-todo-card>\n    </div>\n  </ng-container>\n\n</ng-template>\n\n<ng-template #noItemsTpl>\n  <app-todo-card *ngIf=\"!eventReminders.length\" [todoItem]=\"false\"></app-todo-card>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/overview/home/slidable/slidable.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/overview/home/slidable/slidable.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-slides pager=\"true\" [options]=\"slideOpts\">\n  <ion-slide *ngFor=\"let notice of notifications\">\n    <app-todo-card [todoItem]=\"notice\" [ngStyle]=\"{width: '100%'}\" (click)=\"navigate(notice)\"></app-todo-card>\n  </ion-slide>\n</ion-slides>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/overview/home/todo-card/todo-card.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/overview/home/todo-card/todo-card.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-card color=\"primary-contrast\" class=\"todo-card practera-card\">\n  <app-list-item\n    *ngIf=\"todoItem.type\"\n    [leadingIcon]=\"icons[todoItem.type] || 'information-circle-outline'\"\n    [title]=\"todoItem.name\"\n    [subtitle1]=\"todoItem.description\"\n    [endingText]=\"todoItem.time\"\n    lines=\"none\"\n  ></app-list-item>\n\n  <app-list-item *ngIf=\"loading\" loading=\"true\" lines=\"none\"></app-list-item>\n\n  <clickable-item *ngIf=\"!todoItem.type && !loading\" lines=\"none\">\n    <ion-icon name=\"notifications-outline\" slot=\"start\" color=\"primary\"></ion-icon>\n    <div>\n      <ion-text color=\"medium\">You have no new notifications.</ion-text>\n    </div>\n  </clickable-item>\n\n</ion-card>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/overview/overview.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/overview/overview.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title class=\"ion-text-center ion-padding-horizontal\">{{programName}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"!isMobile; else singlePage\">\n  <ng-container>\n    <ion-grid class=\"desktop-view\">\n      <ion-row>\n        <ion-col size=\"6\" class=\"ion-padding home-component\" appFloat>\n          <app-home [refresh]=\"initiator$\"></app-home>\n        </ion-col>\n        <ion-col class=\"ion-no-padding\" appFloat isActivityCard=\"true\">\n          <app-project [refresh]=\"initiator$\"></app-project>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ng-container>\n</ion-content>\n<ng-template #singlePage>\n  <ion-content appFloat isActivityCard=\"true\">\n    <app-home [refresh]=\"initiator$\"></app-home>\n    <app-project [refresh]=\"initiator$\"></app-project>\n  </ion-content>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/overview/project/project.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/overview/project/project.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-grid class=\"project-list ion-padding\" [ngClass]=\"{'desktop': !isMobile}\">\n  <ng-container *ngIf=\"!loadingMilestone\">\n    <ion-item class=\"project-item\" [ngClass]=\"{'mobile': isMobile}\" lines=\"none\" *ngFor=\"let milestone of milestones\" color=\"light\" #milestoneRef @newLoad>\n      <div color=\"light\" class=\"project-card\" id=\"milestone-{{milestone.id}}\">\n        <div class=\"milestone\" [ngClass]=\"{'lock': milestone.isLocked}\">\n          <div class=\"expandable\">\n            <ion-item lines=\"none\" color=\"light\" (click)=\"toggleGroup(milestone)\">\n              <ion-icon\n                *ngIf=\"milestone.isLocked\"\n                name=\"lock-closed\"\n                color=\"medium\"\n                class=\"milestone-lock\"\n                slot=\"start\"></ion-icon>\n\n              <ion-label\n                class=\"milestone-title headline-6\"\n                [ngClass]=\"{'locked': milestone.isLocked}\">{{ milestone.name }}</ion-label>\n\n              <ion-icon *ngIf=\"!milestone.isLocked && (milestone.Activity && milestone.Activity.length > 0)\"\n                slot=\"end\"\n                [name]=\"isCollapsed(milestone) ? 'chevron-down' : 'chevron-up'\"\n                class=\"collapsible-icon\"\n              ></ion-icon>\n            </ion-item>\n\n            <ion-card-content\n              class=\"milestone-description\"\n              *ngIf=\"milestone.description && !isCollapsed(milestone)\">\n              <app-description [content]=\"milestone.description\" class=\"body-2\"></app-description>\n            </ion-card-content>\n          </div>\n\n          <div *ngIf=\"milestone.Activity && !milestone.isLocked\" class=\"milestone-activities\">\n            <ion-list class=\"activity-list\" color=\"light\">\n\n              <ion-row *ngIf=\"!isCollapsed(milestone)\" [@slide]>\n                <ion-col size-sm=\"9\" size-xs=\"12\"\n                  *ngFor=\"let activity of milestone.Activity\">\n                  <ion-item class=\"activity-item\" [ngClass]=\"{'mobile': isMobile}\" color=\"light\">\n                    <ng-container *ngIf=\"!activity.isLocked; else activityLocked\">\n                      <div class=\"row-cards\">\n                        <ion-icon *ngIf=\"activity.progress >= 1; else activityCircleProgress\" name=\"checkmark-circle\" class=\"icon-done\" color=\"primary\"></ion-icon>\n                        <ng-template #activityCircleProgress>\n                          <app-circle-progress class=\"progress-icon\" [data]='{ percent: activity.progress * 100 }' (click)=\"!activity.isLocked && goToActivity(activity.id)\"></app-circle-progress>\n                        </ng-template>\n                      </div>\n                    </ng-container>\n                    <ng-template #activityLocked>\n                      <div class=\"row-cards\">\n                        <ion-icon name=\"lock-closed\" color=\"medium\" class=\"icon-lock\"></ion-icon>\n                      </div>\n                    </ng-template>\n                    <app-activity-card id=\"activity-card-{{activity.id}}\" [activity]=\"activity\"\n                      (click)=\"!activity.isLocked && goToActivity(activity.id)\"\n                      class=\"activity-card\"\n                    ></app-activity-card>\n                  </ion-item>\n                </ion-col>\n              </ion-row>\n            </ion-list>\n          </div>\n        </div>\n      </div>\n    </ion-item>\n  </ng-container>\n\n  <ng-container *ngIf=\"loadingMilestone\">\n    <ion-item *ngFor=\"let milestone of [1, 1]\" class=\"project-item\" [ngClass]=\"{'mobile': isMobile}\" lines=\"none\" color=\"light\">\n      <div color=\"light\" class=\"project-card\">\n        <div class=\"milestone\">\n          <div class=\"expandable\">\n            <ion-item>\n              <ion-label class=\"milestone-title headline-6\">\n                <ion-skeleton-text animated style=\"width: 40%;\"></ion-skeleton-text>\n              </ion-label>\n            </ion-item>\n          </div>\n          <div class=\"milestone-activities\">\n            <ion-list class=\"activity-list\" color=\"light\">\n              <ion-row>\n                <ion-col *ngFor=\"let activity of [1, 1]\" size-sm=\"9\" size-xs=\"12\">\n                  <ion-item class=\"activity-item\" [ngClass]=\"{'mobile': isMobile}\" color=\"light\">\n                    <div class=\"row-cards\">\n                      <ion-avatar class=\"skeleton-progress\">\n                        <ion-skeleton-text animated></ion-skeleton-text>\n                      </ion-avatar>\n                    </div>\n                    <app-activity-card loading=\"true\" activity=\"false\" class=\"activity-card\"></app-activity-card>\n                  </ion-item>\n                </ion-col>\n              </ion-row>\n            </ion-list>\n          </div>\n        </div>\n      </div>\n    </ion-item>\n  </ng-container>\n\n</ion-grid>\n\n");

/***/ }),

/***/ "./src/app/animations.ts":
/*!*******************************!*\
  !*** ./src/app/animations.ts ***!
  \*******************************/
/*! exports provided: fadeIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fadeIn", function() { return fadeIn; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm5/animations.js");
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var fadeIn = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animation"])([
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ opacity: 0 }),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('{{time}}', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ opacity: 1 })),
]);


/***/ }),

/***/ "./src/app/native/native.module.ts":
/*!*****************************************!*\
  !*** ./src/app/native/native.module.ts ***!
  \*****************************************/
/*! exports provided: NativeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeModule", function() { return NativeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _native_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./native.service */ "./src/app/native/native.service.ts");
/* harmony import */ var _push_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./push-notification.service */ "./src/app/native/push-notification.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var NativeModule = /** @class */ (function () {
    function NativeModule() {
    }
    NativeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"],
            ],
            declarations: [],
            providers: [
                _native_service__WEBPACK_IMPORTED_MODULE_2__["NativeService"],
                _push_notification_service__WEBPACK_IMPORTED_MODULE_3__["PushNotificationService"]
            ],
            exports: [
                _native_service__WEBPACK_IMPORTED_MODULE_2__["NativeService"],
                _push_notification_service__WEBPACK_IMPORTED_MODULE_3__["PushNotificationService"]
            ]
        })
    ], NativeModule);
    return NativeModule;
}());



/***/ }),

/***/ "./src/app/native/native.service.ts":
/*!******************************************!*\
  !*** ./src/app/native/native.service.ts ***!
  \******************************************/
/*! exports provided: NativeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeService", function() { return NativeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _services_shared_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/shared.service */ "./src/app/services/shared.service.ts");
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


var NativeService = /** @class */ (function () {
    function NativeService(sharedService) {
        this.sharedService = sharedService;
    }
    NativeService.prototype.submit = function (profile) {
        return this.sharedService.updateProfile(profile);
    };
    NativeService.ctorParameters = function () { return [
        { type: _services_shared_service__WEBPACK_IMPORTED_MODULE_1__["SharedService"] }
    ]; };
    NativeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_shared_service__WEBPACK_IMPORTED_MODULE_1__["SharedService"]])
    ], NativeService);
    return NativeService;
}());



/***/ }),

/***/ "./src/app/native/push-notification.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/native/push-notification.service.ts ***!
  \*****************************************************/
/*! exports provided: PushNotificationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PushNotificationService", function() { return PushNotificationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
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


var PushNotifications = _capacitor_core__WEBPACK_IMPORTED_MODULE_1__["Plugins"].PushNotifications, LocalNotifications = _capacitor_core__WEBPACK_IMPORTED_MODULE_1__["Plugins"].LocalNotifications;
var PushNotificationService = /** @class */ (function () {
    function PushNotificationService() {
    }
    PushNotificationService.prototype.areEnabled = function () {
        return LocalNotifications.areEnabled();
    };
    PushNotificationService.prototype.schedule = function (_a) {
        var title = _a.title, content = _a.content;
        return __awaiter(this, void 0, void 0, function () {
            var noti;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, LocalNotifications.schedule({
                            notifications: [
                                {
                                    title: title,
                                    body: content,
                                    id: 1,
                                    schedule: { at: new Date(Date.now() + 1000 * 5) },
                                }
                            ]
                        })];
                    case 1:
                        noti = _b.sent();
                        return [2 /*return*/, noti];
                }
            });
        });
    };
    PushNotificationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], PushNotificationService);
    return PushNotificationService;
}());



/***/ }),

/***/ "./src/app/overview/home/home.component.scss":
/*!***************************************************!*\
  !*** ./src/app/overview/home/home.component.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".app-home {\n  overflow-y: visible;\n  margin: 0;\n  background: var(--ion-color-light) !important;\n}\n\n.margin-left-right {\n  margin: 0 2em;\n}\n\n.todo-list {\n  background: transparent !important;\n}\n\n.achievement {\n  margin-bottom: 10px;\n}\n\n.achievement a {\n  float: right;\n  padding-right: 10px;\n}\n\n.leading-image-container {\n  margin-bottom: 24px;\n  --ion-grid-padding: 0;\n  --ion-grid-column-padding: 0;\n}\n\n.leading-image-container .image-col ion-card {\n  border-radius: 12px;\n  width: 100%;\n  margin: 0px;\n  background: transparent !important;\n}\n\n.leading-image-container .image-col ion-card .image-container img {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.leading-image-container ion-col {\n  display: -webkit-box !important;\n  display: flex !important;\n  align-content: center !important;\n  -webkit-box-align: center !important;\n          align-items: center !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9vdmVydmlldy9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL292ZXJ2aWV3L2hvbWUvaG9tZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLDZDQUFBO0FDQ0Y7O0FERUE7RUFDRSxhQUFBO0FDQ0Y7O0FERUE7RUFDRSxrQ0FBQTtBQ0NGOztBRENBO0VBQ0UsbUJBQUE7QUNFRjs7QURERTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQ0dKOztBRENBO0VBQ0UsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLDRCQUFBO0FDRUY7O0FERUk7RUFDRSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0Esa0NBQUE7QUNBTjs7QURFUTtFQUNFLE1BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7QUNBVjs7QURNRTtFQUNFLCtCQUFBO0VBQUEsd0JBQUE7RUFDQSxnQ0FBQTtFQUNBLG9DQUFBO1VBQUEsOEJBQUE7QUNKSiIsImZpbGUiOiJzcmMvYXBwL292ZXJ2aWV3L2hvbWUvaG9tZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hcHAtaG9tZSB7XG4gIG92ZXJmbG93LXk6IHZpc2libGU7XG4gIG1hcmdpbjogMDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KSAhaW1wb3J0YW50O1xufVxuXG4ubWFyZ2luLWxlZnQtcmlnaHQge1xuICBtYXJnaW46IDAgMmVtO1xufVxuXG4udG9kby1saXN0IHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbn1cbi5hY2hpZXZlbWVudCB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIGEge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuICB9XG59XG5cbi5sZWFkaW5nLWltYWdlLWNvbnRhaW5lciB7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIC0taW9uLWdyaWQtcGFkZGluZzogMDtcbiAgLS1pb24tZ3JpZC1jb2x1bW4tcGFkZGluZzogMDtcblxuICAuaW1hZ2UtY29sIHtcblxuICAgIGlvbi1jYXJkIHtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbjogMHB4O1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICAgIC5pbWFnZS1jb250YWluZXIge1xuICAgICAgICBpbWcge1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlvbi1jb2wge1xuICAgIGRpc3BsYXk6IGZsZXghaW1wb3J0YW50O1xuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlciFpbXBvcnRhbnQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlciFpbXBvcnRhbnQ7XG4gIH1cbn1cbiIsIi5hcHAtaG9tZSB7XG4gIG92ZXJmbG93LXk6IHZpc2libGU7XG4gIG1hcmdpbjogMDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KSAhaW1wb3J0YW50O1xufVxuXG4ubWFyZ2luLWxlZnQtcmlnaHQge1xuICBtYXJnaW46IDAgMmVtO1xufVxuXG4udG9kby1saXN0IHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbn1cblxuLmFjaGlldmVtZW50IHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbi5hY2hpZXZlbWVudCBhIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xufVxuXG4ubGVhZGluZy1pbWFnZS1jb250YWluZXIge1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAtLWlvbi1ncmlkLXBhZGRpbmc6IDA7XG4gIC0taW9uLWdyaWQtY29sdW1uLXBhZGRpbmc6IDA7XG59XG4ubGVhZGluZy1pbWFnZS1jb250YWluZXIgLmltYWdlLWNvbCBpb24tY2FyZCB7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDBweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbn1cbi5sZWFkaW5nLWltYWdlLWNvbnRhaW5lciAuaW1hZ2UtY29sIGlvbi1jYXJkIC5pbWFnZS1jb250YWluZXIgaW1nIHtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xufVxuLmxlYWRpbmctaW1hZ2UtY29udGFpbmVyIGlvbi1jb2wge1xuICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlciAhaW1wb3J0YW50O1xuICBhbGlnbi1pdGVtczogY2VudGVyICFpbXBvcnRhbnQ7XG59Il19 */");

/***/ }),

/***/ "./src/app/overview/home/home.component.ts":
/*!*************************************************!*\
  !*** ./src/app/overview/home/home.component.ts ***!
  \*************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _home_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.service */ "./src/app/overview/home/home.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _app_achievements_achievements_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/achievements/achievements.service */ "./src/app/achievements/achievements.service.ts");
/* harmony import */ var _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/event-list/event-list.service */ "./src/app/event-list/event-list.service.ts");
/* harmony import */ var ng_intercom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-intercom */ "./node_modules/ng-intercom/__ivy_ngcc__/fesm5/ng-intercom.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shared/new-relic/new-relic.service */ "./src/app/shared/new-relic/new-relic.service.ts");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm5/animations.js");
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../animations */ "./src/app/animations.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _native_push_notification_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../native/push-notification.service */ "./src/app/native/push-notification.service.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
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














// simple testing for custom plugin

// import { CapacitorPusherBeamsAuthWeb } from 'capacitor-pusher-beams-auth';
// import { CapacitorPusherBeamsAuth } from 'capacitor-pusher-beams-auth';
var CapacitorPusherBeamsAuth = _capacitor_core__WEBPACK_IMPORTED_MODULE_14__["Plugins"].CapacitorPusherBeamsAuth, PusherBeams = _capacitor_core__WEBPACK_IMPORTED_MODULE_14__["Plugins"].PusherBeams;
var HomeComponent = /** @class */ (function () {
    function HomeComponent(intercom, router, homeService, utils, storage, achievementService, eventsService, newRelic, pushNotification) {
        var _this = this;
        this.intercom = intercom;
        this.router = router;
        this.homeService = homeService;
        this.utils = utils;
        this.storage = storage;
        this.achievementService = achievementService;
        this.eventsService = eventsService;
        this.newRelic = newRelic;
        this.pushNotification = pushNotification;
        this.progress = 0;
        this.loadingProgress = true;
        this.todoItems = [];
        this.eventReminders = [];
        this.loadingTodoItems = true;
        this.subscriptions = [];
        this.programInfo = {
            image: '',
            name: ''
        };
        this.loadingAchievements = true;
        var role = this.storage.getUser().role;
        this.utils.getEvent('notification').subscribe(function (event) {
            var todoItem = _this.homeService.getTodoItemFromEvent(event);
            if (!_this.utils.isEmpty(todoItem)) {
                // add todo item to the list if it is not empty
                _this.todoItems.push(todoItem);
                _this.fireNotification({
                    title: todoItem.name,
                    content: todoItem.description
                });
            }
        });
        this.utils.getEvent('team-message').subscribe(function (event) {
            _this.homeService.getChatMessage().subscribe(function (chatMessage) {
                if (!_this.utils.isEmpty(chatMessage)) {
                    _this._addChatTodoItem(chatMessage);
                    _this.fireNotification({
                        title: 'chatMessage',
                        content: 'chatMessage',
                    });
                }
            });
        });
        this.utils.getEvent('event-reminder').subscribe(function (event) {
            _this.homeService.getReminderEvent(event).subscribe(function (session) {
                if (!_this.utils.isEmpty(session)) {
                    _this.eventReminders.push(session);
                    _this.fireNotification({
                        title: 'session',
                        content: 'session',
                    });
                }
            });
        });
        if (role !== 'mentor') {
            var noMentorMsgEvent = this.utils.getEvent('team-no-mentor-message');
            if (noMentorMsgEvent) {
                noMentorMsgEvent.subscribe(function (event) {
                    _this.homeService.getChatMessage().subscribe(function (chatMessage) {
                        if (!_this.utils.isEmpty(chatMessage)) {
                            _this._addChatTodoItem(chatMessage);
                            _this.fireNotification({
                                title: 'chatMessage',
                                content: 'chatMessage',
                            });
                        }
                    });
                });
            }
        }
    }
    HomeComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var s, android, openMap;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CapacitorPusherBeamsAuth.openWebVersion({ anything: 'anything here!!!' })];
                    case 1:
                        s = _a.sent();
                        console.log('s::', s);
                        return [4 /*yield*/, CapacitorPusherBeamsAuth.onlyAndroid({ value: 'testing for android!' })];
                    case 2:
                        android = _a.sent();
                        console.log('android::::', android);
                        return [4 /*yield*/, CapacitorPusherBeamsAuth.openMap({
                                latitude: 123123,
                                longitude: 321321,
                            })];
                    case 3:
                        openMap = _a.sent();
                        console.log(openMap);
                        this.refresh.subscribe(function (params) {
                            _this.onEnter();
                        });
                        this.fireNotification({
                            title: 'Hello from Practera',
                            content: 'Please enjoy our native app made especially for you!'
                        });
                        // programmatiically subscribe to new device interest
                        // PusherBeams.addDeviceInterest('testing-interest');
                        PusherBeams.echo({ value: 'testing-interest' });
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.fireNotification = function (_a) {
        var title = _a.title, content = _a.content;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.pushNotification.schedule({ title: title, content: content })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype._initialise = function () {
        this.todoItems = [];
        this.eventReminders = [];
        this.loadingTodoItems = true;
        this.loadingProgress = true;
        this.achievements = [];
        this.loadingAchievements = true;
        this.programInfo = {
            image: '',
            name: ''
        };
    };
    HomeComponent.prototype.onEnter = function () {
        var _this = this;
        this._initialise();
        this.programInfo = {
            image: this.storage.getUser().programImage,
            name: this.storage.getUser().programName
        };
        this.subscriptions.push(this.homeService.getTodoItems().subscribe(function (todoItems) {
            _this.todoItems = _this.todoItems.concat(todoItems);
            _this.loadingTodoItems = false;
        }));
        // only get the number of chats if user is in team
        if (this.storage.getUser().teamId) {
            this.subscriptions.push(this.homeService.getChatMessage().subscribe(function (chatMessage) {
                if (!_this.utils.isEmpty(chatMessage)) {
                    _this._addChatTodoItem(chatMessage);
                }
                _this.loadingTodoItems = false;
            }));
        }
        this.subscriptions.push(this.homeService.getProgress().subscribe(function (progress) {
            _this.progress = progress;
            _this.progressConfig = { percent: progress };
            _this.loadingProgress = false;
        }));
        this.subscriptions.push(this.achievementService.getAchievements('desc').subscribe(function (achievements) {
            var earned = [];
            var unEarned = [];
            achievements.forEach(function (item) {
                if (item.isEarned === false) {
                    unEarned.push(item);
                }
                else {
                    earned.push(item);
                }
            });
            // retrict quantity of achievements to max 3
            if (achievements.length <= 3) {
                _this.achievements = achievements;
            }
            else if (!earned.length || earned.length === achievements.length) {
                _this.achievements = achievements;
                _this.achievements.length = 3;
            }
            else if (earned.length === 1 && unEarned.length > 1) {
                _this.achievements[0] = earned[0];
                _this.achievements[1] = unEarned[0];
                _this.achievements[2] = unEarned[1];
            }
            else if (earned.length > 1 && unEarned.length > 0) {
                _this.achievements[0] = earned[0];
                _this.achievements[1] = earned[1];
                _this.achievements[2] = unEarned[0];
            }
            _this.loadingAchievements = false;
        }));
        if (typeof _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].intercom !== 'undefined' && _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].intercom === true) {
            this.intercom.boot({
                app_id: _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].intercomAppId,
                name: this.storage.getUser().name,
                email: this.storage.getUser().email,
                user_id: this.storage.getUser().id,
                // Supports all optional configuration.
                widget: {
                    'activator': '#intercom'
                }
            });
        }
    };
    HomeComponent.prototype.goTo = function (destination) {
        this.router.navigate(destination);
    };
    HomeComponent.prototype.clickTodoItem = function (eventOrTodoItem) {
        switch (eventOrTodoItem.type) {
            case 'feedback_available':
                return this.goToAssessment(eventOrTodoItem.meta.activity_id, eventOrTodoItem.meta.context_id, eventOrTodoItem.meta.assessment_id);
            case 'review_submission':
                return this.goToReview(eventOrTodoItem.meta.context_id, eventOrTodoItem.meta.assessment_id, eventOrTodoItem.meta.assessment_submission_id);
            case 'chat':
                return this.goToChat(eventOrTodoItem);
            case 'assessment_submission_reminder':
                return this.goToAssessment(eventOrTodoItem.meta.activity_id, eventOrTodoItem.meta.context_id, eventOrTodoItem.meta.assessment_id);
            default: // event doesnt has type
                this.showEventDetail(eventOrTodoItem);
                break;
        }
    };
    HomeComponent.prototype.goToAssessment = function (activityId, contextId, assessmentId) {
        this.newRelic.actionText('goToAssessment');
        if (this.utils.isMobile()) {
            this.router.navigate([
                'assessment',
                'assessment',
                activityId,
                contextId,
                assessmentId
            ]);
        }
        else {
            this.router.navigate([
                'app',
                'activity',
                activityId,
                {
                    task: 'assessment',
                    task_id: assessmentId,
                    context_id: contextId
                }
            ]);
        }
    };
    HomeComponent.prototype.goToReview = function (contextId, assessmentId, submissionId) {
        this.newRelic.actionText('goToReview');
        if (this.utils.isMobile()) {
            this.router.navigate([
                'assessment',
                'review',
                contextId,
                assessmentId,
                submissionId
            ]);
        }
        else {
            this.router.navigate([
                'app',
                'reviews',
                submissionId
            ]);
        }
    };
    HomeComponent.prototype.goToChat = function (todoItem) {
        this.newRelic.actionText('goToChat');
        if (!this.utils.isMobile()) {
            return this.router.navigate(['app', 'chat']);
        }
        if (this.utils.isEmpty(todoItem.meta)) {
            return this.router.navigate(['app', 'chat']);
        }
        if (todoItem.meta.team_member_id) {
            return this.router.navigate(['chat', 'chat-room', todoItem.meta.team_id, todoItem.meta.team_member_id]);
        }
        return this.router.navigate(['chat', 'chat-room', 'team', todoItem.meta.team_id, todoItem.meta.participants_only]);
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    HomeComponent.prototype._addChatTodoItem = function (chatTodoItem) {
        var currentChatTodoIndex = -1;
        var currentChatTodo = this.todoItems.find(function (todoItem, index) {
            if (todoItem.type === 'chat') {
                currentChatTodoIndex = index;
                return true;
            }
        });
        if (currentChatTodo) {
            this.todoItems.splice(currentChatTodoIndex, 1);
        }
        this.todoItems.push(chatTodoItem);
    };
    HomeComponent.prototype.showEventDetail = function (event) {
        this.newRelic.actionText('showEventDetail');
        if (this.utils.isMobile()) {
            this.eventsService.eventDetailPopUp(event);
        }
        else {
            // go to the events page with the event selected
            this.router.navigate(['app', 'events', { event_id: event.id }]);
        }
    };
    HomeComponent.ctorParameters = function () { return [
        { type: ng_intercom__WEBPACK_IMPORTED_MODULE_7__["Intercom"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _home_service__WEBPACK_IMPORTED_MODULE_1__["HomeService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"] },
        { type: _app_achievements_achievements_service__WEBPACK_IMPORTED_MODULE_5__["AchievementsService"] },
        { type: _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_6__["EventListService"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_9__["NewRelicService"] },
        { type: _native_push_notification_service__WEBPACK_IMPORTED_MODULE_13__["PushNotificationService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_12__["Observable"])
    ], HomeComponent.prototype, "refresh", void 0);
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __importDefault(__webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/overview/home/home.component.html")).default,
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_10__["trigger"])('newLoaded', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_10__["transition"])(':enter, * => 0, * => -1', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_10__["useAnimation"])(_animations__WEBPACK_IMPORTED_MODULE_11__["fadeIn"], {
                            params: { time: '250ms' }
                        })
                    ]),
                ]),
            ],
            styles: [__importDefault(__webpack_require__(/*! ./home.component.scss */ "./src/app/overview/home/home.component.scss")).default]
        }),
        __metadata("design:paramtypes", [ng_intercom__WEBPACK_IMPORTED_MODULE_7__["Intercom"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _home_service__WEBPACK_IMPORTED_MODULE_1__["HomeService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"],
            _app_achievements_achievements_service__WEBPACK_IMPORTED_MODULE_5__["AchievementsService"],
            _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_6__["EventListService"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_9__["NewRelicService"],
            _native_push_notification_service__WEBPACK_IMPORTED_MODULE_13__["PushNotificationService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/overview/home/home.service.ts":
/*!***********************************************!*\
  !*** ./src/app/overview/home/home.service.ts ***!
  \***********************************************/
/*! exports provided: HomeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeService", function() { return HomeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _shared_request_request_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/request/request.service */ "./src/app/shared/request/request.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/notification/notification.service */ "./src/app/shared/notification/notification.service.ts");
/* harmony import */ var _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @app/event-list/event-list.service */ "./src/app/event-list/event-list.service.ts");
/* harmony import */ var _services_shared_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @services/shared.service */ "./src/app/services/shared.service.ts");
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









/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
var api = {
    get: {
        activity: 'api/activities.json',
        todoItem: 'api/v2/motivations/todo_item/list.json',
        chat: 'api/v2/message/chat/list.json',
        progress: 'api/v2/motivations/progress/list.json',
        events: 'api/v2/act/event/list.json',
    },
    post: {
        todoItem: 'api/v2/motivations/todo_item/edit.json'
    }
};
var HomeService = /** @class */ (function () {
    function HomeService(storage, request, utils, notification, eventsService, sharedService) {
        this.storage = storage;
        this.request = request;
        this.utils = utils;
        this.notification = notification;
        this.eventsService = eventsService;
        this.sharedService = sharedService;
        this.currentActivityId = 0;
    }
    HomeService.prototype.getTodoItems = function () {
        var _this = this;
        return this.request.get(api.get.todoItem, {
            params: {
                project_id: this.storage.getUser().projectId
            }
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            if (response.success && response.data) {
                return _this._normaliseTodoItems(response.data);
            }
        }));
    };
    HomeService.prototype._normaliseTodoItems = function (data) {
        var _this = this;
        var todoItems = [];
        if (!Array.isArray(data)) {
            this.request.apiResponseFormatError('TodoItem array format error');
            return [];
        }
        data.forEach(function (todoItem) {
            if (!_this.utils.has(todoItem, 'identifier') ||
                !_this.utils.has(todoItem, 'is_done') ||
                !_this.utils.has(todoItem, 'meta')) {
                return _this.request.apiResponseFormatError('TodoItem format error');
            }
            if (todoItem.is_done) {
                return;
            }
            // todo item for user to see the feedback
            if (todoItem.identifier.includes('AssessmentSubmission-')) {
                todoItems = _this._addTodoItemForFeedbackAvailable(todoItem, todoItems);
            }
            // todo item for user to do the review
            if (todoItem.identifier.includes('AssessmentReview-')) {
                todoItems = _this._addTodoItemForReview(todoItem, todoItems);
            }
            // todo item for user to see the achievement earned message
            if (todoItem.identifier.includes('Achievement-')) {
                _this.notification.achievementPopUp('notification', {
                    id: todoItem.meta.id,
                    name: todoItem.meta.name,
                    description: todoItem.meta.description,
                    points: todoItem.meta.points,
                    image: todoItem.meta.badge
                });
            }
            if (todoItem.identifier.includes('EventReminder-')) {
                // when we get a Event Reminder todo item,
                // fire an 'event-reminder' event, same as when we get this from Pusher
                _this.utils.broadcastEvent('event-reminder', {
                    meta: todoItem.meta
                });
            }
            // todo item for user to submit the assessment
            if (todoItem.identifier.includes('AssessmentSubmissionReminder-')) {
                todoItems = _this._addTodoItemSubmissionReminder(todoItem, todoItems);
            }
        });
        return todoItems;
    };
    HomeService.prototype._addTodoItemForFeedbackAvailable = function (todoItem, todoItems) {
        var item = {
            type: '',
            name: '',
            description: '',
            time: '',
            meta: {}
        };
        item.type = 'feedback_available';
        if (!this.utils.has(todoItem, 'meta.assessment_name') ||
            !this.utils.has(todoItem, 'meta.reviewer_name') ||
            !this.utils.has(todoItem, 'created')) {
            this.request.apiResponseFormatError('TodoItem meta format error');
            return todoItems;
        }
        item.name = todoItem.meta.assessment_name;
        item.description = todoItem.meta.reviewer_name + ' has provided feedback';
        item.time = this.utils.timeFormatter(todoItem.created);
        item.meta = todoItem.meta;
        todoItems.push(item);
        return todoItems;
    };
    HomeService.prototype._addTodoItemForReview = function (todoItem, todoItems) {
        var item = {
            type: '',
            name: '',
            description: '',
            time: '',
            meta: {}
        };
        item.type = 'review_submission';
        if (!this.utils.has(todoItem, 'meta.assessment_name') ||
            !this.utils.has(todoItem, 'created')) {
            this.request.apiResponseFormatError('TodoItem meta format error');
            return todoItems;
        }
        item.name = todoItem.meta.assessment_name;
        item.description = 'Please review the assessment';
        item.time = this.utils.timeFormatter(todoItem.created);
        item.meta = todoItem.meta;
        todoItems.push(item);
        return todoItems;
    };
    HomeService.prototype._addTodoItemSubmissionReminder = function (todoItem, todoItems) {
        var item = {
            type: '',
            name: '',
            description: '',
            time: '',
            meta: {}
        };
        item.type = 'assessment_submission_reminder';
        if (!this.utils.has(todoItem, 'meta.assessment_name') ||
            !this.utils.has(todoItem, 'meta.context_id') ||
            !this.utils.has(todoItem, 'meta.activity_id') ||
            !this.utils.has(todoItem, 'meta.assessment_id') ||
            !this.utils.has(todoItem, 'meta.due_date')) {
            this.request.apiResponseFormatError('TodoItem meta format error');
            return todoItems;
        }
        item.name = todoItem.meta.assessment_name;
        item.description = this.sharedService.dueDateFormatter(todoItem.meta.due_date);
        item.time = this.utils.timeFormatter(todoItem.created);
        item.meta = todoItem.meta;
        todoItems.push(item);
        return todoItems;
    };
    HomeService.prototype.getChatMessage = function () {
        var _this = this;
        return this.request.get(api.get.chat)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            if (response.success && response.data) {
                return _this._normaliseChatMessage(response.data);
            }
        }));
    };
    HomeService.prototype._normaliseChatMessage = function (chatMessages) {
        var _this = this;
        if (!Array.isArray(chatMessages)) {
            this.request.apiResponseFormatError('Chat array format error');
            return {};
        }
        var unreadMessages = 0;
        var noOfChats = 0;
        var todoItem;
        chatMessages.forEach(function (data) {
            if (!_this.utils.has(data, 'unread_messages') ||
                !_this.utils.has(data, 'name') ||
                !_this.utils.has(data, 'last_message') ||
                !_this.utils.has(data, 'last_message_created')) {
                return _this.request.apiResponseFormatError('Chat object format error');
            }
            if (data.unread_messages > 0) {
                todoItem = {
                    type: 'chat',
                    name: '',
                    description: '',
                    time: '',
                    meta: {}
                };
                unreadMessages += data.unread_messages;
                noOfChats++;
                todoItem.name = data.name;
                todoItem.description = data.last_message;
                todoItem.time = _this.utils.timeFormatter(data.last_message_created);
                todoItem.meta = {
                    team_id: data.team_id,
                    team_member_id: data.team_member_id,
                    participants_only: data.participants_only
                };
            }
        });
        if (unreadMessages > 1) {
            // group the chat notifiations
            todoItem.name = unreadMessages + ' messages from ' + noOfChats + ' chats';
            todoItem.meta = {};
        }
        return todoItem;
    };
    HomeService.prototype.getProgress = function () {
        var _this = this;
        return this.request.get(api.get.progress, {
            params: {
                model: 'project',
                model_id: this.storage.getUser().projectId,
                scope: 'activity'
            }
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            if (response.success && response.data) {
                return _this._normaliseProgress(response.data);
            }
        }));
    };
    HomeService.prototype._normaliseProgress = function (data) {
        if (!this.utils.has(data, 'Project.progress') ||
            !this.utils.has(data, 'Project.Milestone') ||
            !Array.isArray(data.Project.Milestone)) {
            this.request.apiResponseFormatError('Progress format error');
            return 0;
        }
        this._getCurrentActivityId(data);
        if (data.Project.progress > 1) {
            data.Project.progress = 1;
        }
        return Math.round(data.Project.progress * 100);
    };
    HomeService.prototype._getCurrentActivityId = function (data) {
        // initialise current activity id
        this.currentActivityId = 0;
        data.Project.Milestone.forEach(this._loopThroughMilestones, this);
        // regard last activity as the current activity if all activities are finished
        if (this.currentActivityId === 0) {
            var milestones = data.Project.Milestone;
            var activities = milestones[milestones.length - 1].Activity;
            this.currentActivityId = activities[activities.length - 1].id;
        }
    };
    HomeService.prototype._loopThroughMilestones = function (milestone) {
        if (this.currentActivityId > 0) {
            return;
        }
        if (!this.utils.has(milestone, 'Activity') ||
            !Array.isArray(milestone.Activity)) {
            this.request.apiResponseFormatError('Progress.Milestone format error');
            return;
        }
        milestone.Activity.forEach(this._loopThroughActivities, this);
    };
    HomeService.prototype._loopThroughActivities = function (activity) {
        if (this.currentActivityId > 0) {
            return;
        }
        if (!this.utils.has(activity, 'progress') ||
            !this.utils.has(activity, 'id')) {
            this.request.apiResponseFormatError('Progress.Milestone.Activity format error');
            return;
        }
        if (activity.progress < 1) {
            this.currentActivityId = activity.id;
        }
    };
    HomeService.prototype._normaliseActivity = function (data) {
        if (!Array.isArray(data) ||
            !this.utils.has(data[0], 'Activity.name') ||
            !this.utils.has(data[0], 'Activity.is_locked')) {
            this.request.apiResponseFormatError('Activity format error');
            return {
                id: null,
                name: '',
                isLocked: false,
                leadImage: ''
            };
        }
        var thisActivity = data[0];
        return {
            id: this.currentActivityId,
            name: thisActivity.Activity.name,
            isLocked: thisActivity.Activity.is_locked,
            leadImage: (thisActivity.Activity.lead_image ? thisActivity.Activity.lead_image : '')
        };
    };
    /**
     * When we get a notification event from Pusher, normalise the data to todo item and return it.
     * @param  {Obj}   event [The event data get from Pusher]
     * @return {TodoItem}       [Normalised todo item]
     */
    HomeService.prototype.getTodoItemFromEvent = function (event) {
        if (!this.utils.has(event, 'type')) {
            this.request.apiResponseFormatError('Pusher notification event format error');
            return {};
        }
        switch (event.type) {
            // This is a feedback available event
            case 'assessment_review_published':
                if (!this.utils.has(event, 'meta.AssessmentReview.assessment_name') ||
                    !this.utils.has(event, 'meta.AssessmentReview.reviewer_name') ||
                    !this.utils.has(event, 'meta.AssessmentReview.published_date') ||
                    !this.utils.has(event, 'meta.AssessmentReview.assessment_id') ||
                    !this.utils.has(event, 'meta.AssessmentReview.activity_id') ||
                    !this.utils.has(event, 'meta.AssessmentReview.context_id')) {
                    this.request.apiResponseFormatError('Pusher notification event meta format error');
                    return {};
                }
                return {
                    type: 'feedback_available',
                    name: event.meta.AssessmentReview.assessment_name,
                    description: event.meta.AssessmentReview.reviewer_name + ' has provided feedback',
                    time: this.utils.timeFormatter(event.meta.AssessmentReview.published_date),
                    meta: {
                        activity_id: event.meta.AssessmentReview.activity_id,
                        context_id: event.meta.AssessmentReview.context_id,
                        assessment_id: event.meta.AssessmentReview.assessment_id,
                        assessment_name: event.meta.AssessmentReview.assessment_name,
                        reviewer_name: event.meta.AssessmentReview.reviewer_name,
                    }
                };
            // This is a submission ready for review event
            case 'assessment_review_assigned':
                if (!this.utils.has(event, 'meta.AssessmentReview.assessment_name') ||
                    !this.utils.has(event, 'meta.AssessmentReview.assigned_date') ||
                    !this.utils.has(event, 'meta.AssessmentReview.assessment_id') ||
                    !this.utils.has(event, 'meta.AssessmentReview.context_id') ||
                    !this.utils.has(event, 'meta.AssessmentReview.assessment_submission_id')) {
                    this.request.apiResponseFormatError('Pusher notification event meta format error');
                    return {};
                }
                return {
                    type: 'review_submission',
                    name: event.meta.AssessmentReview.assessment_name,
                    description: 'Please review the assessment',
                    time: this.utils.timeFormatter(event.meta.AssessmentReview.assigned_date),
                    meta: {
                        context_id: event.meta.AssessmentReview.context_id,
                        assessment_id: event.meta.AssessmentReview.assessment_id,
                        assessment_name: event.meta.AssessmentReview.assessment_name,
                        assessment_submission_id: event.meta.AssessmentReview.assessment_submission_id,
                    }
                };
            case 'assessment_submission_reminder':
                if (!this.utils.has(event, 'meta.AssessmentSubmissionReminder.assessment_name') ||
                    !this.utils.has(event, 'meta.AssessmentSubmissionReminder.context_id') ||
                    !this.utils.has(event, 'meta.AssessmentSubmissionReminder.activity_id') ||
                    !this.utils.has(event, 'meta.AssessmentSubmissionReminder.assessment_id') ||
                    !this.utils.has(event, 'meta.AssessmentSubmissionReminder.due_date') ||
                    !this.utils.has(event, 'meta.AssessmentSubmissionReminder.reminded_date')) {
                    this.request.apiResponseFormatError('TodoItem meta format error');
                    return {};
                }
                return {
                    type: 'assessment_submission_reminder',
                    name: event.meta.AssessmentSubmissionReminder.assessment_name,
                    description: this.sharedService.dueDateFormatter(event.meta.AssessmentSubmissionReminder.due_date),
                    time: this.utils.timeFormatter(event.meta.AssessmentSubmissionReminder.reminded_date),
                    meta: {
                        context_id: event.meta.AssessmentSubmissionReminder.context_id,
                        assessment_id: event.meta.AssessmentSubmissionReminder.assessment_id,
                        assessment_name: event.meta.AssessmentSubmissionReminder.assessment_name,
                        activity_id: event.meta.AssessmentSubmissionReminder.activity_id,
                        due_date: event.meta.AssessmentSubmissionReminder.due_date
                    }
                };
        }
    };
    /**
     * When we get a notification event from Pusher about event reminder, we are querying API to get the event detail and normalise it
     * @param {Obj} data [The event data from Pusher notification]
     */
    HomeService.prototype.getReminderEvent = function (data) {
        var _this = this;
        if (!this.utils.has(data, 'meta.id')) {
            this.request.apiResponseFormatError('Pusher notification event format error');
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(null);
        }
        return this.request.get(api.get.events, {
            params: {
                type: 'activity_session',
                id: data.meta.id
            }
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            if (_this.utils.isEmpty(response.data)) {
                return null;
            }
            var event = _this.eventsService.normaliseEvents(response.data)[0];
            if (event.isPast) {
                // mark the todo item as done if event starts
                _this.postEventReminder(event);
                return null;
            }
            return event;
        }));
    };
    HomeService.prototype.postEventReminder = function (event) {
        return this.request.post(api.post.todoItem, {
            project_id: this.storage.getUser().projectId,
            identifier: 'EventReminder-' + event.id,
            is_done: true
        }).subscribe();
    };
    HomeService.ctorParameters = function () { return [
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_5__["BrowserStorageService"] },
        { type: _shared_request_request_service__WEBPACK_IMPORTED_MODULE_3__["RequestService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_4__["UtilsService"] },
        { type: _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"] },
        { type: _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_7__["EventListService"] },
        { type: _services_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"] }
    ]; };
    HomeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_storage_service__WEBPACK_IMPORTED_MODULE_5__["BrowserStorageService"],
            _shared_request_request_service__WEBPACK_IMPORTED_MODULE_3__["RequestService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_4__["UtilsService"],
            _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"],
            _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_7__["EventListService"],
            _services_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"]])
    ], HomeService);
    return HomeService;
}());



/***/ }),

/***/ "./src/app/overview/home/slidable/slidable.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/overview/home/slidable/slidable.component.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".swiper-container {\n  --bullet-background: black;\n  padding-bottom: 1em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9vdmVydmlldy9ob21lL3NsaWRhYmxlL3NsaWRhYmxlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9vdmVydmlldy9ob21lL3NsaWRhYmxlL3NsaWRhYmxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsMEJBQUE7RUFDQSxtQkFBQTtBQ0FGIiwiZmlsZSI6InNyYy9hcHAvb3ZlcnZpZXcvaG9tZS9zbGlkYWJsZS9zbGlkYWJsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHN3aXBlci1jb250YWluZXIgaXMgYXV0byBpbmplY3RlZCBpbnRvIDxpb24tc2xpZGU+IGR1cmluZyBodG1sIGNvZGUgcmVuZGVyaW5nXG4uc3dpcGVyLWNvbnRhaW5lciB7XG4gIC0tYnVsbGV0LWJhY2tncm91bmQ6IGJsYWNrO1xuICBwYWRkaW5nLWJvdHRvbTogMWVtO1xufVxuIiwiLnN3aXBlci1jb250YWluZXIge1xuICAtLWJ1bGxldC1iYWNrZ3JvdW5kOiBibGFjaztcbiAgcGFkZGluZy1ib3R0b206IDFlbTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/overview/home/slidable/slidable.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/overview/home/slidable/slidable.component.ts ***!
  \**************************************************************/
/*! exports provided: SlidableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlidableComponent", function() { return SlidableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
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



var SlidableComponent = /** @class */ (function () {
    function SlidableComponent(utils) {
        this.utils = utils;
        this.goto = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    SlidableComponent.prototype.ngOnInit = function () {
        // Optional parameters to pass to the swiper instance.
        // See http://idangero.us/swiper/api/ for valid options.
        this.slideOpts = {
            centeredSlides: true,
            initialSlide: 0,
            slidesPerView: 1.18,
            spaceBetween: 10,
            speed: 400,
        };
        this.notifications = this.reorder(this.notifications);
    };
    SlidableComponent.prototype.ngOnChanges = function (changes) {
        this.notifications = this.reorder(changes.notifications.currentValue);
        // this.notifications = this.reorder(this.findAndNormaliseEvent(changes.notifications.currentValue));
    };
    // sort notifications list by datetime
    SlidableComponent.prototype.reorder = function (raw) {
        var ordered = (raw || []).sort(function (a, b) {
            if (a.meta && a.meta.published_date && b.meta && b.meta.published_date) {
                return moment__WEBPACK_IMPORTED_MODULE_2__(a.meta.published_date).isAfter(b.meta.published_date);
            }
            return false;
        });
        return ordered;
    };
    // restructure eventReminder data to adopt todoItem object format
    SlidableComponent.prototype.findAndNormaliseEvent = function (items) {
        var _this = this;
        return items.map(function (item) {
            if (!item.type) {
                return {
                    name: item.name,
                    description: '',
                    type: 'event',
                    time: _this.utils.timeFormatter(item.startTime)
                };
            }
            return item;
        });
    };
    SlidableComponent.prototype.navigate = function (item) {
        return this.goto.emit(item);
    };
    SlidableComponent.ctorParameters = function () { return [
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_1__["UtilsService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SlidableComponent.prototype, "notifications", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], SlidableComponent.prototype, "goto", void 0);
    SlidableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-slidable',
            template: __importDefault(__webpack_require__(/*! raw-loader!./slidable.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/overview/home/slidable/slidable.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./slidable.component.scss */ "./src/app/overview/home/slidable/slidable.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_services_utils_service__WEBPACK_IMPORTED_MODULE_1__["UtilsService"]])
    ], SlidableComponent);
    return SlidableComponent;
}());



/***/ }),

/***/ "./src/app/overview/home/todo-card/todo-card.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/overview/home/todo-card/todo-card.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".todo-card {\n  border: 0.5px solid #d8dbeb;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  background: #fff;\n  min-height: 58px;\n}\n.todo-card ion-icon {\n  margin-right: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9vdmVydmlldy9ob21lL3RvZG8tY2FyZC90b2RvLWNhcmQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL292ZXJ2aWV3L2hvbWUvdG9kby1jYXJkL3RvZG8tY2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUlFLDJCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQ0ZGO0FETkU7RUFDRSxrQkFBQTtBQ1FKIiwiZmlsZSI6InNyYy9hcHAvb3ZlcnZpZXcvaG9tZS90b2RvLWNhcmQvdG9kby1jYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRvZG8tY2FyZCB7XG4gIGlvbi1pY29uIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDE2cHg7XG4gIH1cbiAgYm9yZGVyOiAuNXB4IHNvbGlkICNkOGRiZWI7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBtaW4taGVpZ2h0OiA1OHB4O1xufVxuXG4iLCIudG9kby1jYXJkIHtcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCAjZDhkYmViO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgbWluLWhlaWdodDogNThweDtcbn1cbi50b2RvLWNhcmQgaW9uLWljb24ge1xuICBtYXJnaW4tcmlnaHQ6IDE2cHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/overview/home/todo-card/todo-card.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/overview/home/todo-card/todo-card.component.ts ***!
  \****************************************************************/
/*! exports provided: TodoCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoCardComponent", function() { return TodoCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
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

var TodoCardComponent = /** @class */ (function () {
    function TodoCardComponent() {
        this.icons = {
            feedback_available: 'information-circle-outline',
            review_submission: 'information-circle-outline',
            chat: 'chatbubbles-outline',
            event: 'calendar',
            assessment_submission_reminder: 'clipboard-outline'
        };
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], TodoCardComponent.prototype, "loading", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TodoCardComponent.prototype, "todoItem", void 0);
    TodoCardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-todo-card',
            template: __importDefault(__webpack_require__(/*! raw-loader!./todo-card.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/overview/home/todo-card/todo-card.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./todo-card.component.scss */ "./src/app/overview/home/todo-card/todo-card.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], TodoCardComponent);
    return TodoCardComponent;
}());



/***/ }),

/***/ "./src/app/overview/overview-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/overview/overview-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: OverviewRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverviewRoutingModule", function() { return OverviewRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _overview_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overview.component */ "./src/app/overview/overview.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/overview/home/home.component.ts");
/* harmony import */ var _project_project_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project/project.component */ "./src/app/overview/project/project.component.ts");
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
        component: _overview_component__WEBPACK_IMPORTED_MODULE_2__["OverviewComponent"],
        children: [
            {
                path: '',
                component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"],
                outlet: 'home',
            },
            {
                path: '',
                component: _project_project_component__WEBPACK_IMPORTED_MODULE_4__["ProjectComponent"],
                outlet: 'project',
            },
        ]
    },
];
var OverviewRoutingModule = /** @class */ (function () {
    function OverviewRoutingModule() {
    }
    OverviewRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], OverviewRoutingModule);
    return OverviewRoutingModule;
}());



/***/ }),

/***/ "./src/app/overview/overview.component.scss":
/*!**************************************************!*\
  !*** ./src/app/overview/overview.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-grid.desktop-view {\n  padding: 0px;\n  overflow: hidden;\n  height: 100%;\n}\nion-grid.desktop-view ion-row {\n  height: 100%;\n}\nion-grid.desktop-view ion-row ion-col {\n  overflow-y: auto;\n  height: 100%;\n}\nion-col, ion-row, ion-grid, ion-content {\n  background: var(--ion-color-light) !important;\n}\n.home-component {\n  margin-left: calc(calc(1 / var(--ion-grid-columns, 12)) * 100%);\n  max-width: 720px !important;\n}\n@media screen and (max-width: 1440px) {\n  .home-component {\n    margin-left: 0 !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9vdmVydmlldy9vdmVydmlldy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvb3ZlcnZpZXcvb3ZlcnZpZXcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FDQ0Y7QURBRTtFQUNFLFlBQUE7QUNFSjtBRERJO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDR047QURDQTtFQUNFLDZDQUFBO0FDRUY7QURDQTtFQUNFLCtEQUFBO0VBQ0EsMkJBQUE7QUNFRjtBRENBO0VBQ0U7SUFDRSx5QkFBQTtFQ0VGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9vdmVydmlldy9vdmVydmlldy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1ncmlkLmRlc2t0b3AtdmlldyB7XG4gIHBhZGRpbmc6IDBweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiAxMDAlO1xuICBpb24tcm93IHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgaW9uLWNvbCB7XG4gICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgfVxufVxuaW9uLWNvbCwgaW9uLXJvdywgaW9uLWdyaWQsIGlvbi1jb250ZW50IHtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KSAhaW1wb3J0YW50O1xufVxuXG4uaG9tZS1jb21wb25lbnQge1xuICBtYXJnaW4tbGVmdDogY2FsYyhjYWxjKDEgLyB2YXIoLS1pb24tZ3JpZC1jb2x1bW5zLCAxMikpICogMTAwJSk7XG4gIG1heC13aWR0aDogNzIwcHggIWltcG9ydGFudDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTQ0MHB4KSB7XG4gIC5ob21lLWNvbXBvbmVudCB7XG4gICAgbWFyZ2luLWxlZnQ6IDAgIWltcG9ydGFudDtcbiAgfVxufVxuIiwiaW9uLWdyaWQuZGVza3RvcC12aWV3IHtcbiAgcGFkZGluZzogMHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5pb24tZ3JpZC5kZXNrdG9wLXZpZXcgaW9uLXJvdyB7XG4gIGhlaWdodDogMTAwJTtcbn1cbmlvbi1ncmlkLmRlc2t0b3AtdmlldyBpb24tcm93IGlvbi1jb2wge1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbmlvbi1jb2wsIGlvbi1yb3csIGlvbi1ncmlkLCBpb24tY29udGVudCB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCkgIWltcG9ydGFudDtcbn1cblxuLmhvbWUtY29tcG9uZW50IHtcbiAgbWFyZ2luLWxlZnQ6IGNhbGMoY2FsYygxIC8gdmFyKC0taW9uLWdyaWQtY29sdW1ucywgMTIpKSAqIDEwMCUpO1xuICBtYXgtd2lkdGg6IDcyMHB4ICFpbXBvcnRhbnQ7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE0NDBweCkge1xuICAuaG9tZS1jb21wb25lbnQge1xuICAgIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XG4gIH1cbn0iXX0= */");

/***/ }),

/***/ "./src/app/overview/overview.component.ts":
/*!************************************************!*\
  !*** ./src/app/overview/overview.component.ts ***!
  \************************************************/
/*! exports provided: OverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverviewComponent", function() { return OverviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fast-feedback/fast-feedback.service */ "./src/app/fast-feedback/fast-feedback.service.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
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






var PushNotifications = _capacitor_core__WEBPACK_IMPORTED_MODULE_5__["Plugins"].PushNotifications;
var OverviewComponent = /** @class */ (function () {
    function OverviewComponent(storage, utils, route, fastFeedbackService) {
        this.storage = storage;
        this.utils = utils;
        this.route = route;
        this.fastFeedbackService = fastFeedbackService;
        this.initiator$ = this.route.params;
        this.isMobile = this.utils.isMobile();
    }
    OverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initiator$.subscribe(function () {
            _this.programName = _this.storage.getUser().programName;
            _this.fastFeedbackService.pullFastFeedback().subscribe();
        });
        console.log('Initializing HomePage');
        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermission().then(function (result) {
            if (result.granted) {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
            }
            else {
                // Show some error
            }
        });
        PushNotifications.addListener('registration', function (token) {
            console.log('Token:', token.value);
        });
        PushNotifications.addListener('registrationError', function (error) {
            console.log('Error on registration: ' + JSON.stringify(error));
        });
        PushNotifications.addListener('pushNotificationReceived', function (notification) {
            console.log('Push received: ' + JSON.stringify(notification));
        });
        PushNotifications.addListener('pushNotificationActionPerformed', function (notification) {
            console.log('Push action performed: ' + JSON.stringify(notification));
        });
    };
    OverviewComponent.ctorParameters = function () { return [
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_2__["BrowserStorageService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_4__["FastFeedbackService"] }
    ]; };
    OverviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-overview',
            template: __importDefault(__webpack_require__(/*! raw-loader!./overview.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/overview/overview.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./overview.component.scss */ "./src/app/overview/overview.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_services_storage_service__WEBPACK_IMPORTED_MODULE_2__["BrowserStorageService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_4__["FastFeedbackService"]])
    ], OverviewComponent);
    return OverviewComponent;
}());



/***/ }),

/***/ "./src/app/overview/overview.module.ts":
/*!*********************************************!*\
  !*** ./src/app/overview/overview.module.ts ***!
  \*********************************************/
/*! exports provided: OverviewModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverviewModule", function() { return OverviewModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _overview_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overview-routing.module */ "./src/app/overview/overview-routing.module.ts");
/* harmony import */ var _overview_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overview.component */ "./src/app/overview/overview.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home/home.component */ "./src/app/overview/home/home.component.ts");
/* harmony import */ var _home_home_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home/home.service */ "./src/app/overview/home/home.service.ts");
/* harmony import */ var _home_todo_card_todo_card_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home/todo-card/todo-card.component */ "./src/app/overview/home/todo-card/todo-card.component.ts");
/* harmony import */ var _home_slidable_slidable_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./home/slidable/slidable.component */ "./src/app/overview/home/slidable/slidable.component.ts");
/* harmony import */ var _project_project_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./project/project.component */ "./src/app/overview/project/project.component.ts");
/* harmony import */ var _fast_feedback_fast_feedback_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../fast-feedback/fast-feedback.module */ "./src/app/fast-feedback/fast-feedback.module.ts");
/* harmony import */ var _project_project_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./project/project.service */ "./src/app/overview/project/project.service.ts");
/* harmony import */ var _native_native_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../native/native.module */ "./src/app/native/native.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};













var OverviewModule = /** @class */ (function () {
    function OverviewModule() {
    }
    OverviewModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"],
                _overview_routing_module__WEBPACK_IMPORTED_MODULE_3__["OverviewRoutingModule"],
                _fast_feedback_fast_feedback_module__WEBPACK_IMPORTED_MODULE_10__["FastFeedbackModule"],
                _native_native_module__WEBPACK_IMPORTED_MODULE_12__["NativeModule"],
            ],
            declarations: [
                _home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"],
                _home_todo_card_todo_card_component__WEBPACK_IMPORTED_MODULE_7__["TodoCardComponent"],
                _home_slidable_slidable_component__WEBPACK_IMPORTED_MODULE_8__["SlidableComponent"],
                _project_project_component__WEBPACK_IMPORTED_MODULE_9__["ProjectComponent"],
                _overview_component__WEBPACK_IMPORTED_MODULE_4__["OverviewComponent"]
            ],
            providers: [
                _project_project_service__WEBPACK_IMPORTED_MODULE_11__["ProjectService"],
                _home_home_service__WEBPACK_IMPORTED_MODULE_6__["HomeService"],
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"],
                _fast_feedback_fast_feedback_module__WEBPACK_IMPORTED_MODULE_10__["FastFeedbackModule"],
                _overview_component__WEBPACK_IMPORTED_MODULE_4__["OverviewComponent"],
                _native_native_module__WEBPACK_IMPORTED_MODULE_12__["NativeModule"],
            ],
        })
    ], OverviewModule);
    return OverviewModule;
}());



/***/ }),

/***/ "./src/app/overview/project/project.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/overview/project/project.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".expandable {\n  --color: inherit;\n  --background: transparent;\n  box-shadow: none;\n  border: none;\n}\n.expandable ion-item {\n  --padding-start: 0px;\n  --background: transparent;\n  --background-color: transparent;\n  border: none;\n}\n.expandable ion-item ion-label.milestone-title {\n  font-weight: bold;\n  color: inherit;\n}\n.expandable ion-card-content {\n  --padding-start: 0px;\n  --practera-label-color: #000;\n  color: inherit;\n  padding-top: 0;\n  padding-left: var(--padding-start);\n}\n.expandable .collapsible-icon {\n  font-size: 18px;\n}\n.project-toolbar {\n  --border-width: 0px !important;\n}\n.milestone-bar {\n  list-style: none;\n  margin: 0px;\n  background: var(--ion-color-light);\n  border-bottom: 0.5px solid var(--ion-color-light-shade);\n  top: 44px;\n  height: 54px;\n  max-height: 54px;\n}\n.milestone-bar .bubbles-top {\n  padding-top: 3px;\n  text-align: center;\n}\n.milestone-bar .bubbles-top ion-icon {\n  padding-top: 5px;\n}\n.milestone-bar .bubbles-top .icon-lock, .milestone-bar .bubbles-top .icon-done {\n  font-size: 32px;\n}\n.milestone-bar .active {\n  background-color: lightgrey;\n  border-radius: 50%;\n  width: 42px;\n  height: 2.6em;\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  line-height: 0.5em;\n  padding-top: 2px;\n}\n.milestone-bar .active .icon-lock, .milestone-bar .active .icon-done {\n  margin-top: -2px;\n}\n.project-list {\n  margin: 0;\n  background: var(--ion-color-light) !important;\n}\n.project-list.desktop {\n  margin-right: calc(calc(1 / var(--ion-grid-columns, 12)) * 100%);\n  max-width: 720px !important;\n}\n.project-list .project-item {\n  --padding-start: 0px;\n  --padding-end: 0px;\n  --inner-padding-start:0px;\n  --inner-padding-end: 0px;\n}\n.project-list .project-card {\n  width: 100%;\n  -webkit-transition: border 0.5s, border-radius 0.5s;\n  transition: border 0.5s, border-radius 0.5s;\n  transition: border 0.5s, border-radius 0.5s;\n}\n.project-list .project-card .milestone .milestone-title {\n  text-transform: capitalize;\n  width: 308px;\n}\n.project-list .project-card .milestone .milestone-title.locked {\n  height: inherit;\n}\n.project-list .project-card .milestone .milestone-lock {\n  font-size: 24px;\n  margin-right: 12px;\n}\n.project-list .project-card .milestone.lock {\n  padding-bottom: 16px;\n}\n.project-list .project-card .milestone-description {\n  color: var(--practera-label-color);\n  line-height: 20px;\n  font-size: 14px;\n  padding: 0px;\n}\n.project-list .project-card .milestone-description p {\n  overflow: hidden;\n  background-color: black;\n}\n.project-list .project-card.highlighted {\n  border: 1px solid var(--ion-color-primary);\n  border-radius: 1em;\n}\n.project-list .project-card.highlighted {\n  border: 1px solid var(--ion-color-primary);\n  border-radius: 1em;\n}\n.project-list :last-child {\n  --inner-border-width: 0px !important;\n}\n@media screen and (max-width: 1440px) {\n  .project-list.desktop {\n    margin-right: 0 !important;\n  }\n}\n.activity-list {\n  background: transparent;\n  margin-bottom: 0px;\n}\n.activity-list .icon-done {\n  margin-right: 18px;\n  font-size: 32px;\n}\n.activity-list .icon-lock {\n  margin-right: 18px;\n  font-size: 32px;\n}\n.activity-list .progress-icon {\n  margin-left: -3px;\n}\n.activity-list ion-col {\n  padding-top: 0px;\n  padding-bottom: 0px;\n}\n.activity-list ion-col .row-cards {\n  margin-top: -18px;\n  min-width: 53px !important;\n}\n.activity-list ion-col .row-cards .skeleton-progress {\n  width: 30px;\n  height: 30px;\n}\n.activity-item {\n  --border-width: 0px !important;\n  --inner-border-width: 0px !important;\n  --padding-start: 0px;\n  --ion-safe-area-left: 0px;\n  --padding-end:0px;\n  --inner-padding-start:0px;\n  --ion-safe-area-right: 0px;\n  --inner-padding-end: 0px;\n}\n.activity-item.mobile {\n  --inner-padding-start: 12px;\n  --inner-padding-end: 23px;\n}\n.icon-done {\n  font-size: 33px;\n  margin-left: 0px;\n}\n.activity-card {\n  width: 100%;\n}\nion-spinner {\n  display: block;\n  margin: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9vdmVydmlldy9wcm9qZWN0L3Byb2plY3QuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL292ZXJ2aWV3L3Byb2plY3QvcHJvamVjdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EseUJBQUE7RUFFQSxnQkFBQTtFQUNBLFlBQUE7QUNBRjtBRENFO0VBQ0Usb0JBQUE7RUFDQSx5QkFBQTtFQUNBLCtCQUFBO0VBQ0EsWUFBQTtBQ0NKO0FEQ0k7RUFDRSxpQkFBQTtFQUNBLGNBQUE7QUNDTjtBREdFO0VBQ0Usb0JBQUE7RUFDQSw0QkFBQTtFQUNBLGNBQUE7RUFDQSxjQUFBO0VBQ0Esa0NBQUE7QUNESjtBRElFO0VBQ0UsZUFBQTtBQ0ZKO0FETUE7RUFDRSw4QkFBQTtBQ0hGO0FETUE7RUFDRSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxrQ0FBQTtFQUNBLHVEQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0hGO0FES0U7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0FDSEo7QURJSTtFQUNFLGdCQUFBO0FDRk47QURJSTtFQUNFLGVBQUE7QUNGTjtBRE1FO0VBQ0UsMkJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQ0pKO0FES0k7RUFDRSxnQkFBQTtBQ0hOO0FEUUE7RUFDRSxTQUFBO0VBNERBLDZDQUFBO0FDaEVGO0FETUU7RUFDRSxnRUFBQTtFQUNBLDJCQUFBO0FDSko7QURPRTtFQUNFLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLHdCQUFBO0FDTEo7QURRRTtFQUNFLFdBQUE7RUErQkEsbURBQUE7RUFBQSwyQ0FBQTtFQUtBLDJDQUFBO0FDeENKO0FETU07RUFDRSwwQkFBQTtFQUNBLFlBQUE7QUNKUjtBRE1RO0VBQ0UsZUFBQTtBQ0pWO0FEUU07RUFDRSxlQUFBO0VBQ0Esa0JBQUE7QUNOUjtBRFNNO0VBQ0Usb0JBQUE7QUNQUjtBRFVJO0VBQ0Usa0NBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FDUk47QURVTTtFQUNFLGdCQUFBO0VBQ0EsdUJBQUE7QUNSUjtBRFlJO0VBQ0UsMENBQUE7RUFDQSxrQkFBQTtBQ1ZOO0FEYUk7RUFDRSwwQ0FBQTtFQUNBLGtCQUFBO0FDWE47QURjRTtFQUNFLG9DQUFBO0FDWko7QURpQkE7RUFFSTtJQUNFLDBCQUFBO0VDZko7QUFDRjtBRG1CQTtFQUNFLHVCQUFBO0VBQ0Esa0JBQUE7QUNqQkY7QURtQkU7RUFDRSxrQkFBQTtFQUNBLGVBQUE7QUNqQko7QURtQkU7RUFDRSxrQkFBQTtFQUNBLGVBQUE7QUNqQko7QURtQkU7RUFDRSxpQkFBQTtBQ2pCSjtBRG1CRTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7QUNqQko7QURrQkk7RUFDRSxpQkFBQTtFQUNBLDBCQUFBO0FDaEJOO0FEaUJNO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUNmUjtBRG9CQTtFQUNFLDhCQUFBO0VBQ0Esb0NBQUE7RUFDQSxvQkFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLDBCQUFBO0VBQ0Esd0JBQUE7QUNqQkY7QURtQkU7RUFDRSwyQkFBQTtFQUNBLHlCQUFBO0FDakJKO0FEb0JBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FDakJGO0FEb0JBO0VBQ0UsV0FBQTtBQ2pCRjtBRG9CQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0FDakJGIiwiZmlsZSI6InNyYy9hcHAvb3ZlcnZpZXcvcHJvamVjdC9wcm9qZWN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4cGFuZGFibGUge1xuICAtLWNvbG9yOiBpbmhlcml0O1xuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuXG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgaW9uLWl0ZW0ge1xuICAgIC0tcGFkZGluZy1zdGFydDogMHB4O1xuICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgLS1iYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IG5vbmU7XG5cbiAgICBpb24tbGFiZWwubWlsZXN0b25lLXRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgfVxuICB9XG5cbiAgaW9uLWNhcmQtY29udGVudCB7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAwcHg7XG4gICAgLS1wcmFjdGVyYS1sYWJlbC1jb2xvcjogIzAwMDtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICBwYWRkaW5nLXRvcDogMDtcbiAgICBwYWRkaW5nLWxlZnQ6IHZhcigtLXBhZGRpbmctc3RhcnQpO1xuICB9XG5cbiAgLmNvbGxhcHNpYmxlLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgfVxufVxuXG4ucHJvamVjdC10b29sYmFyIHtcbiAgLS1ib3JkZXItd2lkdGg6IDBweCAhaW1wb3J0YW50O1xufVxuXG4ubWlsZXN0b25lLWJhciB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG1hcmdpbjogMHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICBib3JkZXItYm90dG9tOiAwLjVweCBzb2xpZCB2YXIoIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgdG9wOiA0NHB4O1xuICBoZWlnaHQ6IDU0cHg7XG4gIG1heC1oZWlnaHQ6IDU0cHg7XG5cbiAgLmJ1YmJsZXMtdG9wIHtcbiAgICBwYWRkaW5nLXRvcDogM3B4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBpb24taWNvbiB7XG4gICAgICBwYWRkaW5nLXRvcDogNXB4O1xuICAgIH1cbiAgICAuaWNvbi1sb2NrLCAuaWNvbi1kb25lIHtcbiAgICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICB9XG4gIH1cblxuICAuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHdpZHRoOiA0MnB4O1xuICAgIGhlaWdodDogMi42ZW07XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBsaW5lLWhlaWdodDogMC41ZW07XG4gICAgcGFkZGluZy10b3A6IDJweDtcbiAgICAuaWNvbi1sb2NrLCAuaWNvbi1kb25lIHtcbiAgICAgIG1hcmdpbi10b3A6IC0ycHg7XG4gICAgfVxuICB9XG59XG5cbi5wcm9qZWN0LWxpc3Qge1xuICBtYXJnaW46IDA7XG5cbiAgJi5kZXNrdG9wIHtcbiAgICBtYXJnaW4tcmlnaHQ6IGNhbGMoY2FsYygxIC8gdmFyKC0taW9uLWdyaWQtY29sdW1ucywgMTIpKSAqIDEwMCUpO1xuICAgIG1heC13aWR0aDogNzIwcHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC5wcm9qZWN0LWl0ZW0ge1xuICAgIC0tcGFkZGluZy1zdGFydDogMHB4O1xuICAgIC0tcGFkZGluZy1lbmQ6IDBweDtcbiAgICAtLWlubmVyLXBhZGRpbmctc3RhcnQ6MHB4O1xuICAgIC0taW5uZXItcGFkZGluZy1lbmQ6IDBweDtcbiAgfVxuXG4gIC5wcm9qZWN0LWNhcmQge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIC5taWxlc3RvbmUge1xuICAgICAgLm1pbGVzdG9uZS10aXRsZSB7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICAgICAgICB3aWR0aDogMzA4cHg7XG5cbiAgICAgICAgJi5sb2NrZWQge1xuICAgICAgICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAubWlsZXN0b25lLWxvY2sge1xuICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgICAgIH1cblxuICAgICAgJi5sb2NrIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDE2cHg7XG4gICAgICB9XG4gICAgfVxuICAgIC5taWxlc3RvbmUtZGVzY3JpcHRpb24ge1xuICAgICAgY29sb3I6IHZhcigtLXByYWN0ZXJhLWxhYmVsLWNvbG9yKTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgcGFkZGluZzogMHB4O1xuXG4gICAgICBwIHtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gICAgICB9XG4gICAgfVxuICAgIHRyYW5zaXRpb246IGJvcmRlciAwLjVzLCBib3JkZXItcmFkaXVzIDAuNXM7XG4gICAgJi5oaWdobGlnaHRlZCB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBib3JkZXItcmFkaXVzOiAxZW07XG4gICAgfVxuICAgIHRyYW5zaXRpb246IGJvcmRlciAwLjVzLCBib3JkZXItcmFkaXVzIDAuNXM7XG4gICAgJi5oaWdobGlnaHRlZCB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBib3JkZXItcmFkaXVzOiAxZW07XG4gICAgfVxuICB9XG4gIDpsYXN0LWNoaWxkIHtcbiAgICAtLWlubmVyLWJvcmRlci13aWR0aDogMHB4ICFpbXBvcnRhbnQ7XG4gIH1cbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KSAhaW1wb3J0YW50O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxNDQwcHgpIHtcbiAgLnByb2plY3QtbGlzdCB7XG4gICAgJi5kZXNrdG9wIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxufVxuXG4uYWN0aXZpdHktbGlzdCB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBtYXJnaW4tYm90dG9tOiAwcHg7XG5cbiAgLmljb24tZG9uZSB7XG4gICAgbWFyZ2luLXJpZ2h0OiAxOHB4O1xuICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgfVxuICAuaWNvbi1sb2NrIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDE4cHg7XG4gICAgZm9udC1zaXplOiAzMnB4O1xuICB9XG4gIC5wcm9ncmVzcy1pY29uIHtcbiAgICBtYXJnaW4tbGVmdDogLTNweDtcbiAgfVxuICBpb24tY29sIHtcbiAgICBwYWRkaW5nLXRvcDogMHB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAwcHg7XG4gICAgLnJvdy1jYXJkcyB7XG4gICAgICBtYXJnaW4tdG9wOiAtMThweDtcbiAgICAgIG1pbi13aWR0aDogNTNweCAhaW1wb3J0YW50O1xuICAgICAgLnNrZWxldG9uLXByb2dyZXNzIHtcbiAgICAgICAgd2lkdGg6IDMwcHg7XG4gICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi5hY3Rpdml0eS1pdGVtIHtcbiAgLS1ib3JkZXItd2lkdGg6IDBweCAhaW1wb3J0YW50O1xuICAtLWlubmVyLWJvcmRlci13aWR0aDogMHB4ICFpbXBvcnRhbnQ7XG4gIC0tcGFkZGluZy1zdGFydDogMHB4O1xuICAtLWlvbi1zYWZlLWFyZWEtbGVmdDogMHB4O1xuICAtLXBhZGRpbmctZW5kOjBweDtcbiAgLS1pbm5lci1wYWRkaW5nLXN0YXJ0OjBweDtcbiAgLS1pb24tc2FmZS1hcmVhLXJpZ2h0OiAwcHg7XG4gIC0taW5uZXItcGFkZGluZy1lbmQ6IDBweDtcblxuICAmLm1vYmlsZSB7XG4gICAgLS1pbm5lci1wYWRkaW5nLXN0YXJ0OiAxMnB4O1xuICAgIC0taW5uZXItcGFkZGluZy1lbmQ6IDIzcHg7XG4gIH1cbn1cbi5pY29uLWRvbmUge1xuICBmb250LXNpemU6IDMzcHg7XG4gIG1hcmdpbi1sZWZ0OiAwcHg7XG59XG5cbi5hY3Rpdml0eS1jYXJkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbmlvbi1zcGlubmVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuIiwiLmV4cGFuZGFibGUge1xuICAtLWNvbG9yOiBpbmhlcml0O1xuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3gtc2hhZG93OiBub25lO1xuICBib3JkZXI6IG5vbmU7XG59XG4uZXhwYW5kYWJsZSBpb24taXRlbSB7XG4gIC0tcGFkZGluZy1zdGFydDogMHB4O1xuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAtLWJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG59XG4uZXhwYW5kYWJsZSBpb24taXRlbSBpb24tbGFiZWwubWlsZXN0b25lLXRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuLmV4cGFuZGFibGUgaW9uLWNhcmQtY29udGVudCB7XG4gIC0tcGFkZGluZy1zdGFydDogMHB4O1xuICAtLXByYWN0ZXJhLWxhYmVsLWNvbG9yOiAjMDAwO1xuICBjb2xvcjogaW5oZXJpdDtcbiAgcGFkZGluZy10b3A6IDA7XG4gIHBhZGRpbmctbGVmdDogdmFyKC0tcGFkZGluZy1zdGFydCk7XG59XG4uZXhwYW5kYWJsZSAuY29sbGFwc2libGUtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLnByb2plY3QtdG9vbGJhciB7XG4gIC0tYm9yZGVyLXdpZHRoOiAwcHggIWltcG9ydGFudDtcbn1cblxuLm1pbGVzdG9uZS1iYXIge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBtYXJnaW46IDBweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLWJvdHRvbTogMC41cHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgdG9wOiA0NHB4O1xuICBoZWlnaHQ6IDU0cHg7XG4gIG1heC1oZWlnaHQ6IDU0cHg7XG59XG4ubWlsZXN0b25lLWJhciAuYnViYmxlcy10b3Age1xuICBwYWRkaW5nLXRvcDogM3B4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ubWlsZXN0b25lLWJhciAuYnViYmxlcy10b3AgaW9uLWljb24ge1xuICBwYWRkaW5nLXRvcDogNXB4O1xufVxuLm1pbGVzdG9uZS1iYXIgLmJ1YmJsZXMtdG9wIC5pY29uLWxvY2ssIC5taWxlc3RvbmUtYmFyIC5idWJibGVzLXRvcCAuaWNvbi1kb25lIHtcbiAgZm9udC1zaXplOiAzMnB4O1xufVxuLm1pbGVzdG9uZS1iYXIgLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JleTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogNDJweDtcbiAgaGVpZ2h0OiAyLjZlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBsaW5lLWhlaWdodDogMC41ZW07XG4gIHBhZGRpbmctdG9wOiAycHg7XG59XG4ubWlsZXN0b25lLWJhciAuYWN0aXZlIC5pY29uLWxvY2ssIC5taWxlc3RvbmUtYmFyIC5hY3RpdmUgLmljb24tZG9uZSB7XG4gIG1hcmdpbi10b3A6IC0ycHg7XG59XG5cbi5wcm9qZWN0LWxpc3Qge1xuICBtYXJnaW46IDA7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCkgIWltcG9ydGFudDtcbn1cbi5wcm9qZWN0LWxpc3QuZGVza3RvcCB7XG4gIG1hcmdpbi1yaWdodDogY2FsYyhjYWxjKDEgLyB2YXIoLS1pb24tZ3JpZC1jb2x1bW5zLCAxMikpICogMTAwJSk7XG4gIG1heC13aWR0aDogNzIwcHggIWltcG9ydGFudDtcbn1cbi5wcm9qZWN0LWxpc3QgLnByb2plY3QtaXRlbSB7XG4gIC0tcGFkZGluZy1zdGFydDogMHB4O1xuICAtLXBhZGRpbmctZW5kOiAwcHg7XG4gIC0taW5uZXItcGFkZGluZy1zdGFydDowcHg7XG4gIC0taW5uZXItcGFkZGluZy1lbmQ6IDBweDtcbn1cbi5wcm9qZWN0LWxpc3QgLnByb2plY3QtY2FyZCB7XG4gIHdpZHRoOiAxMDAlO1xuICB0cmFuc2l0aW9uOiBib3JkZXIgMC41cywgYm9yZGVyLXJhZGl1cyAwLjVzO1xuICB0cmFuc2l0aW9uOiBib3JkZXIgMC41cywgYm9yZGVyLXJhZGl1cyAwLjVzO1xufVxuLnByb2plY3QtbGlzdCAucHJvamVjdC1jYXJkIC5taWxlc3RvbmUgLm1pbGVzdG9uZS10aXRsZSB7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICB3aWR0aDogMzA4cHg7XG59XG4ucHJvamVjdC1saXN0IC5wcm9qZWN0LWNhcmQgLm1pbGVzdG9uZSAubWlsZXN0b25lLXRpdGxlLmxvY2tlZCB7XG4gIGhlaWdodDogaW5oZXJpdDtcbn1cbi5wcm9qZWN0LWxpc3QgLnByb2plY3QtY2FyZCAubWlsZXN0b25lIC5taWxlc3RvbmUtbG9jayB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMnB4O1xufVxuLnByb2plY3QtbGlzdCAucHJvamVjdC1jYXJkIC5taWxlc3RvbmUubG9jayB7XG4gIHBhZGRpbmctYm90dG9tOiAxNnB4O1xufVxuLnByb2plY3QtbGlzdCAucHJvamVjdC1jYXJkIC5taWxlc3RvbmUtZGVzY3JpcHRpb24ge1xuICBjb2xvcjogdmFyKC0tcHJhY3RlcmEtbGFiZWwtY29sb3IpO1xuICBsaW5lLWhlaWdodDogMjBweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBwYWRkaW5nOiAwcHg7XG59XG4ucHJvamVjdC1saXN0IC5wcm9qZWN0LWNhcmQgLm1pbGVzdG9uZS1kZXNjcmlwdGlvbiBwIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG59XG4ucHJvamVjdC1saXN0IC5wcm9qZWN0LWNhcmQuaGlnaGxpZ2h0ZWQge1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcbn1cbi5wcm9qZWN0LWxpc3QgLnByb2plY3QtY2FyZC5oaWdobGlnaHRlZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xufVxuLnByb2plY3QtbGlzdCA6bGFzdC1jaGlsZCB7XG4gIC0taW5uZXItYm9yZGVyLXdpZHRoOiAwcHggIWltcG9ydGFudDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTQ0MHB4KSB7XG4gIC5wcm9qZWN0LWxpc3QuZGVza3RvcCB7XG4gICAgbWFyZ2luLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XG4gIH1cbn1cbi5hY3Rpdml0eS1saXN0IHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIG1hcmdpbi1ib3R0b206IDBweDtcbn1cbi5hY3Rpdml0eS1saXN0IC5pY29uLWRvbmUge1xuICBtYXJnaW4tcmlnaHQ6IDE4cHg7XG4gIGZvbnQtc2l6ZTogMzJweDtcbn1cbi5hY3Rpdml0eS1saXN0IC5pY29uLWxvY2sge1xuICBtYXJnaW4tcmlnaHQ6IDE4cHg7XG4gIGZvbnQtc2l6ZTogMzJweDtcbn1cbi5hY3Rpdml0eS1saXN0IC5wcm9ncmVzcy1pY29uIHtcbiAgbWFyZ2luLWxlZnQ6IC0zcHg7XG59XG4uYWN0aXZpdHktbGlzdCBpb24tY29sIHtcbiAgcGFkZGluZy10b3A6IDBweDtcbiAgcGFkZGluZy1ib3R0b206IDBweDtcbn1cbi5hY3Rpdml0eS1saXN0IGlvbi1jb2wgLnJvdy1jYXJkcyB7XG4gIG1hcmdpbi10b3A6IC0xOHB4O1xuICBtaW4td2lkdGg6IDUzcHggIWltcG9ydGFudDtcbn1cbi5hY3Rpdml0eS1saXN0IGlvbi1jb2wgLnJvdy1jYXJkcyAuc2tlbGV0b24tcHJvZ3Jlc3Mge1xuICB3aWR0aDogMzBweDtcbiAgaGVpZ2h0OiAzMHB4O1xufVxuXG4uYWN0aXZpdHktaXRlbSB7XG4gIC0tYm9yZGVyLXdpZHRoOiAwcHggIWltcG9ydGFudDtcbiAgLS1pbm5lci1ib3JkZXItd2lkdGg6IDBweCAhaW1wb3J0YW50O1xuICAtLXBhZGRpbmctc3RhcnQ6IDBweDtcbiAgLS1pb24tc2FmZS1hcmVhLWxlZnQ6IDBweDtcbiAgLS1wYWRkaW5nLWVuZDowcHg7XG4gIC0taW5uZXItcGFkZGluZy1zdGFydDowcHg7XG4gIC0taW9uLXNhZmUtYXJlYS1yaWdodDogMHB4O1xuICAtLWlubmVyLXBhZGRpbmctZW5kOiAwcHg7XG59XG4uYWN0aXZpdHktaXRlbS5tb2JpbGUge1xuICAtLWlubmVyLXBhZGRpbmctc3RhcnQ6IDEycHg7XG4gIC0taW5uZXItcGFkZGluZy1lbmQ6IDIzcHg7XG59XG5cbi5pY29uLWRvbmUge1xuICBmb250LXNpemU6IDMzcHg7XG4gIG1hcmdpbi1sZWZ0OiAwcHg7XG59XG5cbi5hY3Rpdml0eS1jYXJkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbmlvbi1zcGlubmVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogYXV0bztcbn0iXX0= */");

/***/ }),

/***/ "./src/app/overview/project/project.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/overview/project/project.component.ts ***!
  \*******************************************************/
/*! exports provided: ProjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectComponent", function() { return ProjectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _project_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project.service */ "./src/app/overview/project/project.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm5/ionic-angular.js");
/* harmony import */ var _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/new-relic/new-relic.service */ "./src/app/shared/new-relic/new-relic.service.ts");
/* harmony import */ var _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/notification/notification.service */ "./src/app/shared/notification/notification.service.ts");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm5/animations.js");
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../animations */ "./src/app/animations.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(router, route, utils, projectService, platform, newRelic, notificationService, document) {
        this.router = router;
        this.route = route;
        this.utils = utils;
        this.projectService = projectService;
        this.platform = platform;
        this.newRelic = newRelic;
        this.notificationService = notificationService;
        this.document = document;
        this.milestones = [];
        this.loadingMilestone = true;
        // the milestone index that is currently on.
        // used to indicate the milestone progress bar at top
        this.activeMilestoneIndex = 0;
        this.subscriptions = [];
        this.showingMilestones = [];
        this.isMobile = this.utils.isMobile();
    }
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refresh.subscribe(function (params) {
            _this.onEnter();
        });
    };
    ProjectComponent.prototype._initialise = function () {
        this.loadingMilestone = true;
    };
    ProjectComponent.prototype.onEnter = function () {
        var _this = this;
        this._initialise();
        this.newRelic.setPageViewName('Project View');
        this.route.queryParamMap.subscribe(function (params) {
            _this.highlightedActivityId = +params.get('activityId') || undefined;
            _this.activityCompleted = !!params.get('activityCompleted') || false;
        });
        this.subscriptions.push(this.projectService.getProject().subscribe(function (milestones) {
            if (!milestones) {
                return;
            }
            // don't need to do anything if data not changed
            if (JSON.parse(JSON.stringify(milestones)) === JSON.parse(JSON.stringify(_this.milestones))) {
                return;
            }
            _this.milestones = milestones;
            milestones.forEach(function (m) {
                if (m.progress !== 1) {
                    _this.showingMilestones.push(m);
                }
            });
            _this.loadingMilestone = false;
            // scroll to highlighted activity if has one
            if (_this.highlightedActivityId) {
                setTimeout(function () { return _this.scrollTo("activity-card-" + _this.highlightedActivityId); }, 1000);
            }
            // show activity complete toast message
            if (_this.activityCompleted) {
                _this.notificationService.presentToast("&#127881; Congratulations. You've completed this activity.", {
                    position: 'bottom',
                    color: 'primary',
                    duration: 5000
                });
            }
        }, function (error) {
            _this.newRelic.noticeError(error);
        }));
    };
    ProjectComponent.prototype.scrollTo = function (domId, index) {
        // update active milestone status (mark whatever user select)
        if (index > -1) {
            this.activeMilestoneIndex = index;
        }
        var el = this.document.getElementById(domId);
        if (el) {
            el.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'nearest' });
            el.classList.add('highlighted');
            setTimeout(function () { return el.classList.remove('highlighted'); }, 1000);
        }
    };
    ProjectComponent.prototype.toggleGroup = function (milestone) {
        if (milestone.isLocked || (milestone.Activity && milestone.Activity.length === 0)) {
            return;
        }
        var indexFound = this.utils.findIndex(this.showingMilestones, ['id', milestone.id]);
        if (indexFound !== -1) {
            this.showingMilestones.splice(indexFound, 1);
        }
        else {
            this.showingMilestones.push(milestone);
        }
    };
    /**
     * @name isCollapsed
     * @description show and hide milestone in project view pane
     * @param {Milestone}
     */
    ProjectComponent.prototype.isCollapsed = function (milestone) {
        if (this.showingMilestones.length > 0) {
            var finding = this.showingMilestones.find(function (m) { return m.id === milestone.id; });
            return finding === undefined;
        }
        return true;
    };
    ProjectComponent.prototype.goToActivity = function (id) {
        this.router.navigate(['app', 'activity', id]);
        this.newRelic.addPageAction('Navigate activity', id);
    };
    ProjectComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_4__["UtilsService"] },
        { type: _project_service__WEBPACK_IMPORTED_MODULE_3__["ProjectService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_6__["NewRelicService"] },
        { type: _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__["NotificationService"] },
        { type: Document, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] }] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_10__["Observable"])
    ], ProjectComponent.prototype, "refresh", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('contentRef', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }),
        __metadata("design:type", Object)
    ], ProjectComponent.prototype, "contentRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])('milestoneRef', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
    ], ProjectComponent.prototype, "milestoneRefs", void 0);
    ProjectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-project',
            template: __importDefault(__webpack_require__(/*! raw-loader!./project.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/overview/project/project.component.html")).default,
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_8__["trigger"])('slide', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_8__["transition"])(':enter', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_8__["style"])({ transform: 'translateY(-100%)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_8__["animate"])('200ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_8__["style"])({ transform: 'translateY(0%)' }))
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_8__["transition"])(':leave', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_8__["animate"])('200ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_8__["style"])({ transform: 'translateY(-100%)' }))
                    ])
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_8__["trigger"])('newLoad', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_8__["transition"])(':enter, * => 0, * => -1', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_8__["useAnimation"])(_animations__WEBPACK_IMPORTED_MODULE_9__["fadeIn"], {
                            params: { time: '250ms' }
                        })
                    ]),
                ])
            ],
            styles: [__importDefault(__webpack_require__(/*! ./project.component.scss */ "./src/app/overview/project/project.component.scss")).default]
        }),
        __param(7, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"])),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_4__["UtilsService"],
            _project_service__WEBPACK_IMPORTED_MODULE_3__["ProjectService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_6__["NewRelicService"],
            _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__["NotificationService"],
            Document])
    ], ProjectComponent);
    return ProjectComponent;
}());



/***/ }),

/***/ "./src/app/overview/project/project.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/overview/project/project.service.ts ***!
  \*****************************************************/
/*! exports provided: ProjectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectService", function() { return ProjectService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _shared_request_request_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/request/request.service */ "./src/app/shared/request/request.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
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





/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
var api = {};
var ProjectService = /** @class */ (function () {
    function ProjectService(request, storage, utils) {
        this.request = request;
        this.storage = storage;
        this.utils = utils;
        this.activities = [];
    }
    // request for the latest data, and return the previously saved data at the same time
    ProjectService.prototype.getProject = function () {
        var _this = this;
        this._getProjectData().subscribe(function (res) { return _this.utils.projectSubject.next(res); });
        return this.utils.projectSubject;
    };
    // request for the latest project data
    ProjectService.prototype._getProjectData = function () {
        var _this = this;
        return this.request.postGraphQL("\"{" +
            "milestones{" +
            "id name progress description isLocked activities{" +
            "id name progress isLocked leadImage " +
            "}" +
            "}" +
            "}\"")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) { return _this._normaliseProject(res.data); }));
    };
    ProjectService.prototype._normaliseProject = function (data) {
        return (data.milestones || []).map(function (m) {
            return {
                id: m.id,
                name: m.name,
                description: m.description,
                progress: m.progress,
                isLocked: m.isLocked,
                Activity: (m.activities === null ? [] : m.activities).map(function (a) {
                    return {
                        id: a.id,
                        name: a.name,
                        progress: a.progress,
                        isLocked: a.isLocked,
                        leadImage: a.leadImage
                    };
                })
            };
        });
    };
    ProjectService.ctorParameters = function () { return [
        { type: _shared_request_request_service__WEBPACK_IMPORTED_MODULE_2__["RequestService"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] }
    ]; };
    ProjectService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_shared_request_request_service__WEBPACK_IMPORTED_MODULE_2__["RequestService"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"]])
    ], ProjectService);
    return ProjectService;
}());



/***/ })

}]);
//# sourceMappingURL=overview-overview-module.js.map