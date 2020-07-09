(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reviews-reviews-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/review-list/review-list.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/review-list/review-list.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header mode=\"ios\">\n  <ion-toolbar [ngClass]=\"{'ion-toolbar-absolute': !utils.isMobile()}\">\n    <ion-title class=\"ion-text-center\">Reviews</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\" color=\"light\" [ngClass]=\"{\n  'ion-content-absolute': !utils.isMobile(),\n  'ion-content-mobile': utils.isMobile()\n}\">\n  <div class=\"btn-filter ion-text-center\">\n    <ion-button\n      class=\"btn-left-half\"\n      [ngClass]=\"{'btn-activated': !showDone}\"\n      (click)=\"clickToDo()\"\n      >\n      <ion-ripple-effect type=\"unbounded\"></ion-ripple-effect>\n      To do\n    </ion-button>\n    <ion-button\n      class=\"btn-right-half\"\n      [ngClass]=\"{'btn-activated': showDone}\"\n      (click)=\"clickDone()\">\n      <ion-ripple-effect type=\"unbounded\"></ion-ripple-effect>\n      Done\n    </ion-button>\n  </div>\n  <ion-card *ngIf=\"loadingReviews; else reviewsTmpl\" class=\"practera-card\">\n    <ion-list>\n      <app-list-item loading=\"true\"></app-list-item>\n      <app-list-item loading=\"true\" lines=\"none\"></app-list-item>\n    </ion-list>\n  </ion-card>\n  <ng-template #reviewsTmpl>\n\n    <ion-card *ngIf=\"noReviewsToDo()\" class=\"practera-card list-empty-message\">\n      <p class=\"subtitle-1 gray-3\">You have no new submissions to review.</p>\n      <span class=\"body-2 gray-1\">To do reviews show up here, so you can easily view them here later.</span>\n    </ion-card>\n    <ion-card *ngIf=\"noReviewsDone()\" class=\"practera-card list-empty-message\">\n      <p class=\"subtitle-1 gray-3\">You have not reviewed any submissions.</p>\n      <span class=\"body-2 gray-1\">Done reviews show up here, so you can easily view them here later.</span>\n    </ion-card>\n\n    <ng-container *ngIf=\"!noReviewsToDo() && !noReviewsDone()\">\n      <ion-card class=\"practera-card\">\n        <ion-list>\n          <ng-container *ngFor=\"let review of reviews; let i = index\">\n            <app-list-item\n              *ngIf=\"review.isDone == showDone\"\n              leadingIcon=\"clipboard-outline\"\n              [title]=\"review.name\"\n              [subtitle1]=\"'submitted by ' + review.submitterName\"\n              [subtitle2]=\"review.teamName\"\n              [endingText]=\"review.date\"\n              [active]=\"submissionId === review.submissionId\"\n              [lines]=\"i == reviews.length - 1 ? 'none' : ''\"\n              (click)=\"gotoReview(review.contextId, review.assessmentId, review.submissionId)\"\n            ></app-list-item>\n          </ng-container>\n        </ion-list>\n      </ion-card>\n    </ng-container>\n\n  </ng-template>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/reviews/reviews.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/reviews/reviews.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-split-pane *ngIf=\"!utils.isMobile()\" contentId=\"main-reviews\" when=\"xs\">\n  <app-review-list\n    #reviewList\n    style=\"display: flex\"\n    [submissionId]=\"submissionId\"\n    (navigate)=\"goto($event)\"\n    ></app-review-list>\n  <ion-content color=\"light\" id=\"main-reviews\">\n    <app-assessment\n      #assessment\n      *ngIf=\"submissionId\"\n      [inputId]=\"assessmentId\"\n      [inputSubmissionId]=\"submissionId\"\n      [inputContextId]=\"contextId\"\n      inputAction=\"review\"\n      fromPage=\"reviews\"\n      (navigate)=\"submissionId = null; reviewList.onEnter()\"\n      ></app-assessment>\n      <ng-container *ngIf=\"!submissionId\">\n        <ion-header mode=\"ios\">\n          <ion-toolbar class=\"ion-toolbar-absolute\">\n            <ion-title class=\"ion-text-center title-small\"></ion-title>\n          </ion-toolbar>\n        </ion-header>\n        <ion-content color=\"light\" class=\"ion-text-center ion-content-absolute\">\n          <ion-icon class=\"empty-icon\" name=\"clipboard-outline\" color=\"medium\"></ion-icon>\n        </ion-content>\n      </ng-container>\n  </ion-content>\n</ion-split-pane>\n\n<ion-content *ngIf=\"utils.isMobile()\">\n  <app-review-list #reviewList></app-review-list>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/review-list/review-list.component.scss":
/*!********************************************************!*\
  !*** ./src/app/review-list/review-list.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Jldmlldy1saXN0L3Jldmlldy1saXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/review-list/review-list.component.ts":
/*!******************************************************!*\
  !*** ./src/app/review-list/review-list.component.ts ***!
  \******************************************************/
/*! exports provided: ReviewListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewListComponent", function() { return ReviewListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _review_list_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./review-list.service */ "./src/app/review-list/review-list.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/notification/notification.service */ "./src/app/shared/notification/notification.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/new-relic/new-relic.service */ "./src/app/shared/new-relic/new-relic.service.ts");
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







var ReviewListComponent = /** @class */ (function () {
    function ReviewListComponent(reviewsService, router, utils, storage, newRelic, notificationService) {
        this.reviewsService = reviewsService;
        this.router = router;
        this.utils = utils;
        this.storage = storage;
        this.newRelic = newRelic;
        this.notificationService = notificationService;
        this.reviews = [];
        this.showDone = false;
        this.loadingReviews = true;
        this.navigate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ReviewListComponent.prototype.onEnter = function () {
        var _this = this;
        this.loadingReviews = true;
        this.showDone = false;
        this.reviewsService.getReviews()
            .subscribe(function (reviews) {
            _this.reviews = reviews;
            _this.loadingReviews = false;
            _this.gotoFirstReview();
        }, function (err) {
            _this.newRelic.noticeError('get reviews fail', JSON.stringify(err));
            var toasted = _this.notificationService.alert({
                header: 'Error retrieving latest reviews',
                message: err.msg || JSON.stringify(err)
            });
            throw new Error(err);
        });
    };
    /**
     * Go to the first review of the review list for desktop
     */
    ReviewListComponent.prototype.gotoFirstReview = function () {
        var _this = this;
        if (this.utils.isMobile()) {
            return;
        }
        var review;
        if (this.submissionId) {
            // go to the review if submission id is passed in
            review = this.reviews.find(function (re) { return re.submissionId === _this.submissionId; });
        }
        else {
            // go to the first review if submission id is not passed in
            review = this.reviews.find(function (re) { return re.isDone === _this.showDone; });
        }
        if (!review) {
            return this.navigate.emit();
        }
        this.gotoReview(review.contextId, review.assessmentId, review.submissionId);
    };
    /**
     * Go to a review
     * @param contextId
     * @param assessmentId
     * @param submissionId
     */
    ReviewListComponent.prototype.gotoReview = function (contextId, assessmentId, submissionId) {
        if (this.utils.isMobile()) {
            // navigate to the assessment page for mobile
            return this.router.navigate(['assessment', 'review', contextId, assessmentId, submissionId, { from: 'reviews' }]);
        }
        // emit the navigate event to the parent event for desktop
        return this.navigate.emit({
            assessmentId: assessmentId,
            submissionId: submissionId,
            contextId: contextId
        });
    };
    /**
     * Click the To Do tab
     */
    ReviewListComponent.prototype.clickToDo = function () {
        if (!this.showDone) {
            return;
        }
        this.showDone = false;
        this.submissionId = null;
        this.gotoFirstReview();
    };
    /**
     * Click the Done tab
     */
    ReviewListComponent.prototype.clickDone = function () {
        if (this.showDone) {
            return;
        }
        this.showDone = true;
        this.submissionId = null;
        this.gotoFirstReview();
    };
    ReviewListComponent.prototype.noReviewsToDo = function () {
        var reviewTodo = this.reviews.find(function (review) {
            return review.isDone === false;
        });
        return !reviewTodo && !this.showDone;
    };
    ReviewListComponent.prototype.noReviewsDone = function () {
        var reviewDone = this.reviews.find(function (review) {
            return review.isDone === true;
        });
        return !reviewDone && this.showDone;
    };
    ReviewListComponent.ctorParameters = function () { return [
        { type: _review_list_service__WEBPACK_IMPORTED_MODULE_1__["ReviewListService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_5__["BrowserStorageService"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_6__["NewRelicService"] },
        { type: _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ReviewListComponent.prototype, "submissionId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ReviewListComponent.prototype, "navigate", void 0);
    ReviewListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-review-list',
            template: __importDefault(__webpack_require__(/*! raw-loader!./review-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/review-list/review-list.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./review-list.component.scss */ "./src/app/review-list/review-list.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_review_list_service__WEBPACK_IMPORTED_MODULE_1__["ReviewListService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_5__["BrowserStorageService"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_6__["NewRelicService"],
            _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"]])
    ], ReviewListComponent);
    return ReviewListComponent;
}());



/***/ }),

/***/ "./src/app/review-list/review-list.module.ts":
/*!***************************************************!*\
  !*** ./src/app/review-list/review-list.module.ts ***!
  \***************************************************/
/*! exports provided: ReviewListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewListModule", function() { return ReviewListModule; });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _review_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./review-list.component */ "./src/app/review-list/review-list.component.ts");
/* harmony import */ var _review_list_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./review-list.service */ "./src/app/review-list/review-list.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var ReviewListModule = /** @class */ (function () {
    function ReviewListModule() {
    }
    ReviewListModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__["SharedModule"]
            ],
            declarations: [
                _review_list_component__WEBPACK_IMPORTED_MODULE_2__["ReviewListComponent"]
            ],
            providers: [_review_list_service__WEBPACK_IMPORTED_MODULE_3__["ReviewListService"]],
            exports: [
                _review_list_component__WEBPACK_IMPORTED_MODULE_2__["ReviewListComponent"]
            ],
        })
    ], ReviewListModule);
    return ReviewListModule;
}());



/***/ }),

/***/ "./src/app/reviews/reviews-routing.component.ts":
/*!******************************************************!*\
  !*** ./src/app/reviews/reviews-routing.component.ts ***!
  \******************************************************/
/*! exports provided: ReviewsRoutingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewsRoutingComponent", function() { return ReviewsRoutingComponent; });
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

var ReviewsRoutingComponent = /** @class */ (function () {
    function ReviewsRoutingComponent() {
    }
    ReviewsRoutingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: '<ion-router-outlet></ion-router-outlet>'
        })
    ], ReviewsRoutingComponent);
    return ReviewsRoutingComponent;
}());



/***/ }),

/***/ "./src/app/reviews/reviews-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/reviews/reviews-routing.module.ts ***!
  \***************************************************/
/*! exports provided: ReviewsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewsRoutingModule", function() { return ReviewsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _reviews_routing_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reviews-routing.component */ "./src/app/reviews/reviews-routing.component.ts");
/* harmony import */ var _reviews_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reviews.component */ "./src/app/reviews/reviews.component.ts");
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
        component: _reviews_routing_component__WEBPACK_IMPORTED_MODULE_2__["ReviewsRoutingComponent"],
        children: [
            {
                path: '',
                component: _reviews_component__WEBPACK_IMPORTED_MODULE_3__["ReviewsComponent"]
            },
            {
                path: ':submissionId',
                component: _reviews_component__WEBPACK_IMPORTED_MODULE_3__["ReviewsComponent"]
            }
        ]
    }
];
var ReviewsRoutingModule = /** @class */ (function () {
    function ReviewsRoutingModule() {
    }
    ReviewsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ReviewsRoutingModule);
    return ReviewsRoutingModule;
}());



/***/ }),

/***/ "./src/app/reviews/reviews.component.scss":
/*!************************************************!*\
  !*** ./src/app/reviews/reviews.component.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".empty-icon {\n  font-size: 200px;\n  margin-top: 20%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9yZXZpZXdzL3Jldmlld3MuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3Jldmlld3MvcmV2aWV3cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvcmV2aWV3cy9yZXZpZXdzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVtcHR5LWljb24ge1xuICBmb250LXNpemU6IDIwMHB4O1xuICBtYXJnaW4tdG9wOiAyMCU7XG59XG4iLCIuZW1wdHktaWNvbiB7XG4gIGZvbnQtc2l6ZTogMjAwcHg7XG4gIG1hcmdpbi10b3A6IDIwJTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/reviews/reviews.component.ts":
/*!**********************************************!*\
  !*** ./src/app/reviews/reviews.component.ts ***!
  \**********************************************/
/*! exports provided: ReviewsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewsComponent", function() { return ReviewsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _services_router_enter_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/router-enter.service */ "./src/app/services/router-enter.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
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





var ReviewsComponent = /** @class */ (function (_super) {
    __extends(ReviewsComponent, _super);
    function ReviewsComponent(router, route, storage, utils) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.route = route;
        _this.storage = storage;
        _this.utils = utils;
        _this.routeUrl = '/app/reviews';
        return _this;
    }
    ReviewsComponent.prototype.onEnter = function () {
        var _this = this;
        this.submissionId = +this.route.snapshot.paramMap.get('submissionId');
        // trigger onEnter after the element get generated
        setTimeout(function () {
            _this.reviewList.onEnter();
        });
    };
    // display the review content in the right pane, and highlight on the left pane
    ReviewsComponent.prototype.goto = function (event) {
        var _this = this;
        if (!event) {
            this.submissionId = null;
            return;
        }
        this.assessmentId = +event.assessmentId;
        this.submissionId = +event.submissionId;
        this.contextId = +event.contextId;
        // trigger onEnter after the element get generated
        setTimeout(function () {
            _this.assessment.onEnter();
        });
    };
    ReviewsComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('reviewList'),
        __metadata("design:type", Object)
    ], ReviewsComponent.prototype, "reviewList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('assessment'),
        __metadata("design:type", Object)
    ], ReviewsComponent.prototype, "assessment", void 0);
    ReviewsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reviews',
            template: __importDefault(__webpack_require__(/*! raw-loader!./reviews.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/reviews/reviews.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./reviews.component.scss */ "./src/app/reviews/reviews.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"]])
    ], ReviewsComponent);
    return ReviewsComponent;
}(_services_router_enter_service__WEBPACK_IMPORTED_MODULE_3__["RouterEnter"]));



/***/ }),

/***/ "./src/app/reviews/reviews.module.ts":
/*!*******************************************!*\
  !*** ./src/app/reviews/reviews.module.ts ***!
  \*******************************************/
/*! exports provided: ReviewsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewsModule", function() { return ReviewsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _reviews_routing_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reviews-routing.component */ "./src/app/reviews/reviews-routing.component.ts");
/* harmony import */ var _reviews_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reviews-routing.module */ "./src/app/reviews/reviews-routing.module.ts");
/* harmony import */ var _reviews_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reviews.component */ "./src/app/reviews/reviews.component.ts");
/* harmony import */ var _review_list_review_list_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../review-list/review-list.module */ "./src/app/review-list/review-list.module.ts");
/* harmony import */ var _assessment_assessment_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assessment/assessment.module */ "./src/app/assessment/assessment.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var ReviewsModule = /** @class */ (function () {
    function ReviewsModule() {
    }
    ReviewsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _reviews_component__WEBPACK_IMPORTED_MODULE_4__["ReviewsComponent"],
                _reviews_routing_component__WEBPACK_IMPORTED_MODULE_2__["ReviewsRoutingComponent"]
            ],
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"],
                _reviews_routing_module__WEBPACK_IMPORTED_MODULE_3__["ReviewsRoutingModule"],
                _review_list_review_list_module__WEBPACK_IMPORTED_MODULE_5__["ReviewListModule"],
                _assessment_assessment_module__WEBPACK_IMPORTED_MODULE_6__["AssessmentModule"]
            ]
        })
    ], ReviewsModule);
    return ReviewsModule;
}());



/***/ })

}]);
//# sourceMappingURL=reviews-reviews-module.js.map