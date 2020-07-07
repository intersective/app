(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~tasks-tasks-module~topic-topic-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/topic/topic.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/topic/topic.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header mode=\"ios\">\n  <ion-toolbar [ngClass]=\"{'ion-toolbar-absolute': !utils.isMobile()}\">\n    <ion-buttons slot=\"start\" *ngIf=\"utils.isMobile()\">\n      <ion-button (click)=\"back()\" id=\"btn-back\">\n        <ion-icon class=\"icon-backward ion-margin-start\" name=\"arrow-back\" (click)=\"back()\" color=\"primary\" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n\n    <ion-title class=\"ion-text-center\" [ngClass]=\"{\n      'subtitle-2': !utils.isMobile()\n    }\">Topic</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content class=\"ion-padding\" color=\"light\" [ngClass]=\"{'ion-content-absolute-with-footer': !utils.isMobile()}\">\n  <div class=\"ion-text-center ion-margin-top\" *ngIf=\"loadingTopic\">\n    <ion-spinner></ion-spinner>\n  </div>\n  <h3 class=\"headline-4 ion-text-center\">{{topic.title}}</h3>\n  <div *ngIf=\"topic.videolink && topic.videolink !=='magiclink'\" class=\"text-center\">\n    <label class=\"subtitle-2 gray-2\">Video</label>\n    <div [innerHtml]=\"iframeHtml\" class=\"video-container ion-text-center\" [ngClass]=\"{'desktop-view': !utils.isMobile()}\"></div>\n  </div>\n\n  <ng-container *ngIf=\"topic.content\">\n    <ion-card class=\"background-white practera-card\">\n      <ion-card-content class=\"body-1 black\" [innerHtml]=\"topic.content\"></ion-card-content>\n    </ion-card>\n  </ng-container>\n\n  <div *ngIf=\"topic.files && topic.files.length > 0\"  color=\"light\" >\n    <label class=\"subtitle-2 gray-2\">Supporting Downloads</label>\n\n    <div *ngFor=\"let file of topic.files\" class=\"supporting-files\">\n      <ion-card class=\"background-white practera-card\">\n        <ion-grid >\n          <ion-row>\n            <ion-col size=\"10\" class=\"file-name-view\">\n              <p class=\"vertical-middle black\"><ion-icon name=\"document\" class=\"vertical-middle\" color=\"primary\"></ion-icon>&nbsp;{{file.name}} </p>\n            </ion-col>\n            <ion-col size=\"2\">\n              <ion-icon class=\"vertical-middle hover-pointer\" *ngIf=\"file.url.length > 0\" name=\"search\" (click)=\"previewFile(file)\" color=\"primary\"></ion-icon>\n              <a *ngIf=\"file.url.length > 0\" [href]=\"file.url\" download class=\"text-right\" target=\"_blank\">\n                <ion-icon name=\"download-outline\" class=\"float-right\"></ion-icon>\n              </a>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card>\n    </div>\n  </div>\n</ion-content>\n\n<ion-footer color=\"light\" [ngClass]=\"{'ion-footer-absolute': !utils.isMobile()}\">\n  <ion-toolbar class=\"ion-text-center\" style=\"height: 100%\">\n    <ion-spinner *ngIf=\"loadingMarkedDone || loadingTopic\"\n      style=\"width: 100%;\"\n      name=\"dots\"\n      class=\"vertical-middle text-center\"\n    ></ion-spinner>\n\n    <img *ngIf=\"redirecting\" class=\"footer-action\" src=\"/assets/loading.gif\">\n\n    <ion-button *ngIf=\"!loadingMarkedDone && !loadingTopic && !redirecting\"\n      (click)=\"continue()\"\n      shape=\"round\"\n      fill=\"clear\">\n      <ion-icon *ngIf=\"btnToggleTopicIsDone\" color=\"primary\" slot=\"start\" name=\"checkmark\"></ion-icon>\n      <ion-text>CONTINUE</ion-text>\n    </ion-button>\n  </ion-toolbar>\n</ion-footer>\n");

/***/ }),

/***/ "./src/app/topic/topic-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/topic/topic-routing.module.ts ***!
  \***********************************************/
/*! exports provided: TopicRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopicRoutingModule", function() { return TopicRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _topic_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./topic.component */ "./src/app/topic/topic.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var TopicRoutes = [
    { path: ':activityId/:id', component: _topic_component__WEBPACK_IMPORTED_MODULE_2__["TopicComponent"] }
];
var TopicRoutingModule = /** @class */ (function () {
    function TopicRoutingModule() {
    }
    TopicRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(TopicRoutes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]
            ]
        })
    ], TopicRoutingModule);
    return TopicRoutingModule;
}());



/***/ }),

/***/ "./src/app/topic/topic.component.scss":
/*!********************************************!*\
  !*** ./src/app/topic/topic.component.scss ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".toggle-mark {\n  font-size: small;\n}\n\n.file-name-view p {\n  margin: 0;\n  font-size: 14px;\n}\n\n.icon-backward {\n  font-size: 20px !important;\n}\n\n.margin-right {\n  margin-right: 10px;\n}\n\n.supporting-files {\n  font-size: 14px;\n  line-height: 20px;\n}\n\n.supporting-files ion-icon {\n  font-size: 20px;\n}\n\n.practera-card {\n  margin: 18px 0;\n}\n\n.video-container {\n  position: relative;\n  padding-bottom: 56.25%;\n}\n\n.video-container.desktop-view {\n  padding-bottom: 40%;\n}\n\n.hover-pointer {\n  cursor: pointer;\n}\n\n.footer-action {\n  height: 40px;\n  margin: 10px 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC90b3BpYy90b3BpYy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvdG9waWMvdG9waWMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtBQ0NGOztBREVFO0VBQ0UsU0FBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNFLDBCQUFBO0FDQ0Y7O0FERUE7RUFDRSxrQkFBQTtBQ0NGOztBRENBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0FDRUY7O0FEREU7RUFDRSxlQUFBO0FDR0o7O0FEQUE7RUFDRSxjQUFBO0FDR0Y7O0FEQUE7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0FDR0Y7O0FERkU7RUFDRSxtQkFBQTtBQ0lKOztBRERBO0VBQ0UsZUFBQTtBQ0lGOztBREZBO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0FDS0YiLCJmaWxlIjoic3JjL2FwcC90b3BpYy90b3BpYy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi50b2dnbGUtbWFyayB7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG59XG4uZmlsZS1uYW1lLXZpZXcge1xuICBwIHtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICB9XG59XG4uaWNvbi1iYWNrd2FyZCB7XG4gIGZvbnQtc2l6ZTogMjBweCAhaW1wb3J0YW50O1xufVxuXG4ubWFyZ2luLXJpZ2h0IHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuLnN1cHBvcnRpbmctZmlsZXMge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICB9XG59XG4ucHJhY3RlcmEtY2FyZCB7XG4gIG1hcmdpbjogMThweCAwO1xufVxuXG4udmlkZW8tY29udGFpbmVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nLWJvdHRvbTogNTYuMjUlO1xuICAmLmRlc2t0b3AtdmlldyB7XG4gICAgcGFkZGluZy1ib3R0b206IDQwJTtcbiAgfVxufVxuLmhvdmVyLXBvaW50ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uZm9vdGVyLWFjdGlvbiB7XG4gIGhlaWdodDogNDBweDtcbiAgbWFyZ2luOiAxMHB4IDIwcHg7XG59XG4iLCIudG9nZ2xlLW1hcmsge1xuICBmb250LXNpemU6IHNtYWxsO1xufVxuXG4uZmlsZS1uYW1lLXZpZXcgcCB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uaWNvbi1iYWNrd2FyZCB7XG4gIGZvbnQtc2l6ZTogMjBweCAhaW1wb3J0YW50O1xufVxuXG4ubWFyZ2luLXJpZ2h0IHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4uc3VwcG9ydGluZy1maWxlcyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG59XG4uc3VwcG9ydGluZy1maWxlcyBpb24taWNvbiB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLnByYWN0ZXJhLWNhcmQge1xuICBtYXJnaW46IDE4cHggMDtcbn1cblxuLnZpZGVvLWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZy1ib3R0b206IDU2LjI1JTtcbn1cbi52aWRlby1jb250YWluZXIuZGVza3RvcC12aWV3IHtcbiAgcGFkZGluZy1ib3R0b206IDQwJTtcbn1cblxuLmhvdmVyLXBvaW50ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5mb290ZXItYWN0aW9uIHtcbiAgaGVpZ2h0OiA0MHB4O1xuICBtYXJnaW46IDEwcHggMjBweDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/topic/topic.component.ts":
/*!******************************************!*\
  !*** ./src/app/topic/topic.component.ts ***!
  \******************************************/
/*! exports provided: TopicComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopicComponent", function() { return TopicComponent; });
/* harmony import */ var _topic_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./topic.service */ "./src/app/topic/topic.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var ngx_embed_video__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-embed-video */ "./node_modules/ngx-embed-video/__ivy_ngcc__/dist/index.js");
/* harmony import */ var ngx_embed_video__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ngx_embed_video__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/filestack/filestack.service */ "./src/app/shared/filestack/filestack.service.ts");
/* harmony import */ var _services_router_enter_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @services/router-enter.service */ "./src/app/services/router-enter.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/notification/notification.service */ "./src/app/shared/notification/notification.service.ts");
/* harmony import */ var _activity_activity_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../activity/activity.service */ "./src/app/activity/activity.service.ts");
/* harmony import */ var _services_shared_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @services/shared.service */ "./src/app/services/shared.service.ts");
/* harmony import */ var _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @shared/new-relic/new-relic.service */ "./src/app/shared/new-relic/new-relic.service.ts");
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












var TopicComponent = /** @class */ (function (_super) {
    __extends(TopicComponent, _super);
    function TopicComponent(topicService, embedService, router, route, filestackService, storage, utils, notificationService, activityService, sharedService, ngZone, newRelic) {
        var _this = _super.call(this, router) || this;
        _this.topicService = topicService;
        _this.embedService = embedService;
        _this.router = router;
        _this.route = route;
        _this.filestackService = filestackService;
        _this.storage = storage;
        _this.utils = utils;
        _this.notificationService = notificationService;
        _this.activityService = activityService;
        _this.sharedService = sharedService;
        _this.ngZone = ngZone;
        _this.newRelic = newRelic;
        _this.navigate = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        _this.changeStatus = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        _this.routeUrl = '/topic/';
        _this.topic = {
            id: 0,
            title: '',
            content: '',
            videolink: '',
            files: [],
            hasComments: false
        };
        _this.iframeHtml = '';
        _this.btnToggleTopicIsDone = false;
        _this.loadingMarkedDone = true;
        _this.loadingTopic = true;
        _this.id = 0;
        _this.activityId = 0;
        _this.isLoadingPreview = false;
        _this.redirecting = false;
        return _this;
    }
    TopicComponent.prototype._initialise = function () {
        this.topic = {
            id: 0,
            title: '',
            content: '',
            videolink: '',
            files: [],
            hasComments: false
        };
        this.loadingMarkedDone = true;
        this.loadingTopic = true;
        this.redirecting = false;
        this.isLoadingPreview = false;
        this.btnToggleTopicIsDone = false;
        this.askForMarkAsDone = false;
    };
    TopicComponent.prototype.onEnter = function () {
        var _this = this;
        this._initialise();
        if (this.inputId) {
            this.id = +this.inputId;
        }
        else {
            this.id = +this.route.snapshot.paramMap.get('id');
        }
        if (this.inputActivityId) {
            this.activityId = +this.inputActivityId;
        }
        else {
            this.activityId = +this.route.snapshot.paramMap.get('activityId');
        }
        this._getTopic();
        this._getTopicProgress();
        setTimeout(function () { return _this.askForMarkAsDone = true; }, 15000);
    };
    TopicComponent.prototype.ionViewWillLeave = function () {
        this.sharedService.stopPlayingVideos();
    };
    TopicComponent.prototype._getTopic = function () {
        var _this = this;
        this.topicService.getTopic(this.id)
            .subscribe(function (topic) {
            _this.topic = topic;
            _this.loadingTopic = false;
            if (topic.videolink) {
                _this.iframeHtml = _this.embedService.embed(_this.topic.videolink, { attr: { class: !_this.utils.isMobile() ? 'topic-video desktop-view' : 'topic-video' } });
            }
            _this.newRelic.setPageViewName("Topic " + _this.topic.title + " ID: " + _this.topic.id);
        }, function (err) {
            _this.newRelic.noticeError("" + JSON.stringify(err));
        });
    };
    TopicComponent.prototype._getTopicProgress = function () {
        var _this = this;
        this.topicService.getTopicProgress(this.activityId, this.id)
            .subscribe(function (result) {
            _this.topicProgress = result;
            if (_this.topicProgress !== null && _this.topicProgress !== undefined) {
                if (_this.topicProgress === 1) {
                    _this.btnToggleTopicIsDone = true;
                }
            }
            _this.loadingMarkedDone = false;
        }, function (err) {
            _this.newRelic.noticeError("" + JSON.stringify(err));
        });
    };
    /**
     * @name markAsDone
     * @description set a topic as read by providing current id
     * @param {Function} callback optional callback function for further action after subcription is completed
     */
    TopicComponent.prototype.markAsDone = function (callback) {
        var _this = this;
        return this.topicService.updateTopicProgress(this.id).pipe(function (response) {
            // toggle event change should happen after subscription is completed
            _this.btnToggleTopicIsDone = true;
            _this.changeStatus.emit(_this.id);
            return response;
        });
    };
    /**
     * continue (mark as read) button
     * @description button action to trigger `gotoNextTask()`
     */
    TopicComponent.prototype.continue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markAsDone, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        markAsDone = !this.btnToggleTopicIsDone;
                        if (!!this.btnToggleTopicIsDone) return [3 /*break*/, 6];
                        this.loadingMarkedDone = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, this.markAsDone().toPromise()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.notificationService.alert({
                                header: 'Error marking topic as completed.',
                                message: err_1.msg || JSON.stringify(err_1)
                            })];
                    case 4:
                        _a.sent();
                        this.newRelic.noticeError("" + JSON.stringify(err_1));
                        return [3 /*break*/, 5];
                    case 5:
                        this.loadingMarkedDone = false;
                        _a.label = 6;
                    case 6:
                        this.redirecting = true;
                        this.activityService.gotoNextTask(this.activityId, 'topic', this.topic.id, markAsDone).then(function (redirect) {
                            _this.redirecting = false;
                            if (redirect) {
                                _this._navigate(redirect);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @name previewFile
     * @description open and preview file in a modal
     * @param {object} file filestack object
     */
    TopicComponent.prototype.previewFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var filestack, err_2, toasted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.isLoadingPreview === false)) return [3 /*break*/, 5];
                        this.isLoadingPreview = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, this.filestackService.previewFile(file)];
                    case 2:
                        filestack = _a.sent();
                        this.isLoadingPreview = false;
                        return [2 /*return*/, filestack];
                    case 3:
                        err_2 = _a.sent();
                        return [4 /*yield*/, this.notificationService.alert({
                                header: 'Error Previewing file',
                                message: err_2.msg || JSON.stringify(err_2)
                            })];
                    case 4:
                        toasted = _a.sent();
                        this.loadingTopic = false;
                        this.newRelic.noticeError("" + JSON.stringify(err_2));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // force every navigation happen under radar of angular
    TopicComponent.prototype._navigate = function (direction) {
        var _this = this;
        if (!direction) {
            return;
        }
        if (this.utils.isMobile()) {
            // redirect to topic/assessment page for mobile
            return this.ngZone.run(function () {
                return _this.router.navigate(direction);
            });
        }
        else {
            // emit event to parent component(task component)
            switch (direction[0]) {
                case 'topic':
                    this.navigate.emit({
                        type: 'topic',
                        topicId: direction[2]
                    });
                    break;
                case 'assessment':
                    this.navigate.emit({
                        type: 'assessment',
                        contextId: direction[3],
                        assessmentId: direction[4]
                    });
                    break;
                default:
                    return this.ngZone.run(function () {
                        return _this.router.navigate(direction);
                    });
            }
        }
    };
    TopicComponent.prototype.back = function () {
        var _this = this;
        if (this.btnToggleTopicIsDone || !this.askForMarkAsDone) {
            return this._navigate([
                'app',
                'activity',
                this.activityId
            ]);
        }
        var type = 'Topic';
        return this.notificationService.alert({
            header: "Complete " + type + "?",
            message: 'Would you like to mark this task as done?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        return _this._navigate(['app', 'activity', _this.activityId]);
                    },
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.newRelic.addPageAction('Mark as read before back');
                        return _this.markAsDone().subscribe(function () {
                            return _this.notificationService.presentToast('You\'ve completed the topic!').then(function () { return _this._navigate([
                                'app',
                                'activity',
                                _this.activityId,
                            ]); });
                        }, function (err) {
                            _this.newRelic.noticeError("" + JSON.stringify(err));
                        });
                    }
                }
            ]
        });
    };
    TopicComponent.ctorParameters = function () { return [
        { type: _topic_service__WEBPACK_IMPORTED_MODULE_0__["TopicService"] },
        { type: ngx_embed_video__WEBPACK_IMPORTED_MODULE_2__["EmbedVideoService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_4__["FilestackService"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_7__["BrowserStorageService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_6__["UtilsService"] },
        { type: _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_8__["NotificationService"] },
        { type: _activity_activity_service__WEBPACK_IMPORTED_MODULE_9__["ActivityService"] },
        { type: _services_shared_service__WEBPACK_IMPORTED_MODULE_10__["SharedService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_11__["NewRelicService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Number)
    ], TopicComponent.prototype, "inputActivityId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Number)
    ], TopicComponent.prototype, "inputId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        __metadata("design:type", Object)
    ], TopicComponent.prototype, "navigate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        __metadata("design:type", Object)
    ], TopicComponent.prototype, "changeStatus", void 0);
    TopicComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-topic',
            template: __importDefault(__webpack_require__(/*! raw-loader!./topic.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/topic/topic.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./topic.component.scss */ "./src/app/topic/topic.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_topic_service__WEBPACK_IMPORTED_MODULE_0__["TopicService"],
            ngx_embed_video__WEBPACK_IMPORTED_MODULE_2__["EmbedVideoService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_4__["FilestackService"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_7__["BrowserStorageService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_6__["UtilsService"],
            _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_8__["NotificationService"],
            _activity_activity_service__WEBPACK_IMPORTED_MODULE_9__["ActivityService"],
            _services_shared_service__WEBPACK_IMPORTED_MODULE_10__["SharedService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_11__["NewRelicService"]])
    ], TopicComponent);
    return TopicComponent;
}(_services_router_enter_service__WEBPACK_IMPORTED_MODULE_5__["RouterEnter"]));



/***/ }),

/***/ "./src/app/topic/topic.module.ts":
/*!***************************************!*\
  !*** ./src/app/topic/topic.module.ts ***!
  \***************************************/
/*! exports provided: TopicModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopicModule", function() { return TopicModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _topic_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./topic.component */ "./src/app/topic/topic.component.ts");
/* harmony import */ var _topic_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./topic.service */ "./src/app/topic/topic.service.ts");
/* harmony import */ var _topic_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./topic-routing.module */ "./src/app/topic/topic-routing.module.ts");
/* harmony import */ var _shared_filestack_filestack_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/filestack/filestack.module */ "./src/app/shared/filestack/filestack.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _activity_activity_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../activity/activity.module */ "./src/app/activity/activity.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var TopicModule = /** @class */ (function () {
    function TopicModule() {
    }
    TopicModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
                _topic_routing_module__WEBPACK_IMPORTED_MODULE_3__["TopicRoutingModule"],
                _shared_filestack_filestack_module__WEBPACK_IMPORTED_MODULE_4__["FilestackModule"],
                _activity_activity_module__WEBPACK_IMPORTED_MODULE_6__["ActivityModule"]
            ],
            declarations: [
                _topic_component__WEBPACK_IMPORTED_MODULE_1__["TopicComponent"],
            ],
            providers: [
                _topic_service__WEBPACK_IMPORTED_MODULE_2__["TopicService"]
            ],
            exports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
                _shared_filestack_filestack_module__WEBPACK_IMPORTED_MODULE_4__["FilestackModule"],
                _activity_activity_module__WEBPACK_IMPORTED_MODULE_6__["ActivityModule"],
                _topic_component__WEBPACK_IMPORTED_MODULE_1__["TopicComponent"],
            ]
        })
    ], TopicModule);
    return TopicModule;
}());



/***/ }),

/***/ "./src/app/topic/topic.service.ts":
/*!****************************************!*\
  !*** ./src/app/topic/topic.service.ts ***!
  \****************************************/
/*! exports provided: TopicService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopicService", function() { return TopicService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _shared_request_request_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/request/request.service */ "./src/app/shared/request/request.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/platform-browser.js");
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





var api = {
    get: {
        stories: 'api/stories.json',
        progress: 'api/v2/motivations/progress/list.json'
    },
    post: {
        updateProgress: 'api/v2/motivations/progress/create.json',
    }
};
var TopicService = /** @class */ (function () {
    function TopicService(request, utils, sanitizer) {
        this.request = request;
        this.utils = utils;
        this.sanitizer = sanitizer;
    }
    TopicService.prototype.getTopic = function (id) {
        var _this = this;
        return this.request.get(api.get.stories, { params: { model_id: id } })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (response) {
            if (response.success && response.data) {
                return _this._normaliseTopic(response.data);
            }
        }));
    };
    TopicService.prototype._normaliseTopic = function (data) {
        // In API response, 'data' is an array of topics
        // (since we passed topic id, it will return only one topic, but still in array format).
        // That's why we use data[0]
        if (!Array.isArray(data) || !this.utils.has(data[0], 'Story') || !this.utils.has(data[0], 'Filestore')) {
            return this.request.apiResponseFormatError('Story format error');
        }
        var topic = {
            id: 0,
            title: '',
            content: '',
            videolink: '',
            hasComments: false,
            files: []
        };
        var thisTopic = data[0];
        if (!this.utils.has(thisTopic.Story, 'id') ||
            !this.utils.has(thisTopic.Story, 'title')) {
            return this.request.apiResponseFormatError('Story.Story format error');
        }
        topic.id = thisTopic.Story.id;
        topic.title = thisTopic.Story.title;
        // if API return empty string ("") to content, utils.has (lodash) take it as a value and this if statement works and set json to content
        // to privent that we checking topic content is not equels to empty string.
        if (this.utils.has(thisTopic.Story, 'content') && !this.utils.isEmpty(thisTopic.Story.content)) {
            thisTopic.Story.content = thisTopic.Story.content.replace(/text-align: center;/gi, 'text-align: center; text-align: -webkit-center;');
            topic.content = this.sanitizer.bypassSecurityTrustHtml(thisTopic.Story.content);
        }
        if (this.utils.has(thisTopic.Story, 'videolink')) {
            topic.videolink = thisTopic.Story.videolink;
        }
        topic.hasComments = thisTopic.Story.has_comments;
        topic.files = thisTopic.Filestore.map(function (item) { return ({ url: item.slug, name: item.name }); });
        return topic;
    };
    TopicService.prototype.updateTopicProgress = function (id) {
        var postData = {
            model: 'topic',
            model_id: id,
            state: 'completed'
        };
        return this.request.post(api.post.updateProgress, postData);
    };
    TopicService.prototype.getTopicProgress = function (activityId, topicId) {
        var _this = this;
        return this.request.get(api.get.progress, { params: {
                model: 'Activity',
                model_id: activityId,
                scope: 'Task'
            } })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (response) {
            if (response.success && !_this.utils.isEmpty(response.data)) {
                var progress = response.data.Activity.Topic.find(function (topic) {
                    return topic.id === topicId;
                });
                return progress.progress;
            }
            else {
                return false;
            }
        }));
    };
    TopicService.ctorParameters = function () { return [
        { type: _shared_request_request_service__WEBPACK_IMPORTED_MODULE_2__["RequestService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"] }
    ]; };
    TopicService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_shared_request_request_service__WEBPACK_IMPORTED_MODULE_2__["RequestService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"]])
    ], TopicService);
    return TopicService;
}());



/***/ })

}]);
//# sourceMappingURL=default~tasks-tasks-module~topic-topic-module.js.map