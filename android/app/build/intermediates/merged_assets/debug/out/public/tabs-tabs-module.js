(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tabs-tabs-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/tabs/tabs.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tabs/tabs.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-tabs>\n\n  <ion-tab-bar *ngIf=\"utils.isMobile()\" slot=\"bottom\">\n\n    <ion-tab-button layout=\"icon-top\" tab=\"home\" [class.selected]=\"selectedTab == 'overview'\">\n      <ion-icon class=\"gray-2\" name=\"home-outline\"></ion-icon>\n      <ion-badge color=\"danger\" *ngIf=\"noOfTodoItems > 0\">{{ noOfTodoItems }}</ion-badge>\n      <ion-label class=\"gray-2\">Home</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button layout=\"icon-top\" *ngIf=\"showEvents\" tab=\"events\" [class.selected]=\"selectedTab == 'events'\">\n      <ion-icon class=\"gray-2\" name=\"calendar-outline\"></ion-icon>\n      <ion-label class=\"gray-2\">Events</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button layout=\"icon-top\" *ngIf=\"showReview\" tab=\"reviews\" [class.selected]=\"selectedTab == 'reviews'\">\n      <ion-icon  class=\"gray-2\" name=\"clipboard-outline\"></ion-icon>\n      <ion-label class=\"gray-2\">Review</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button layout=\"icon-top\" *ngIf=\"showChat\" tab=\"chat\" [class.selected]=\"selectedTab == 'chat'\">\n      <ion-icon class=\"gray-2\" name=\"chatbubbles-outline\"></ion-icon>\n      <ion-badge color=\"danger\" *ngIf=\"noOfChats > 0\">{{ noOfChats }}</ion-badge>\n      <ion-label class=\"gray-2\">Chat</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button layout=\"icon-top\" tab=\"settings\" [class.selected]=\"selectedTab == 'settings'\">\n      <ion-icon class=\"gray-2\" name=\"settings-outline\"></ion-icon>\n      <ion-label class=\"gray-2\">Settings</ion-label>\n    </ion-tab-button>\n\n  </ion-tab-bar>\n\n  <ion-tab-bar *ngIf=\"!utils.isMobile()\" slot=\"top\">\n\n    <ion-tab-button layout=\"icon-top\" tab=\"home\" [class.selected]=\"selectedTab == 'overview'\">\n      <ion-icon class=\"gray-2\" name=\"home-outline\"></ion-icon>\n      <ion-badge color=\"danger\" *ngIf=\"noOfTodoItems > 0\">{{ noOfTodoItems }}</ion-badge>\n      <ion-label class=\"gray-2\">Home</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button layout=\"icon-top\" *ngIf=\"showEvents\" tab=\"events\" [class.selected]=\"selectedTab == 'events'\">\n      <ion-icon class=\"gray-2\" name=\"calendar-outline\"></ion-icon>\n      <ion-label class=\"gray-2\">Events</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button layout=\"icon-top\" *ngIf=\"showReview\" tab=\"reviews\" [class.selected]=\"selectedTab == 'reviews'\">\n      <ion-icon class=\"gray-2\" name=\"clipboard-outline\"></ion-icon>\n      <ion-label class=\"gray-2\">Review</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button layout=\"icon-top\" *ngIf=\"showChat\" tab=\"chat\" [class.selected]=\"selectedTab == 'chat'\">\n      <ion-icon class=\"gray-2\" name=\"chatbubbles-outline\"></ion-icon>\n      <ion-badge color=\"danger\" *ngIf=\"noOfChats > 0\">{{ noOfChats }}</ion-badge>\n      <ion-label class=\"gray-2\">Chat</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button layout=\"icon-top\" tab=\"settings\" [class.selected]=\"selectedTab == 'settings'\">\n      <ion-icon class=\"gray-2\" name=\"settings-outline\"></ion-icon>\n      <ion-label class=\"gray-2\">Settings</ion-label>\n    </ion-tab-button>\n\n  </ion-tab-bar>\n\n</ion-tabs>\n");

/***/ }),

/***/ "./src/app/tabs/tabs-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/tabs/tabs-routing.module.ts ***!
  \*********************************************/
/*! exports provided: TabsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsRoutingModule", function() { return TabsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth/auth.guard */ "./src/app/auth/auth.guard.ts");
/* harmony import */ var _tabs_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs.component */ "./src/app/tabs/tabs.component.ts");
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
        path: 'app',
        component: _tabs_component__WEBPACK_IMPORTED_MODULE_3__["TabsComponent"],
        canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../overview/overview.module#OverviewModule',
                    }
                ]
            },
            {
                path: 'events',
                children: [
                    {
                        path: '',
                        loadChildren: '../events/events.module#EventsModule',
                    }
                ]
            },
            {
                path: 'activity',
                children: [
                    {
                        path: '',
                        loadChildren: '../tasks/tasks.module#TasksModule'
                    }
                ]
            },
            {
                path: 'reviews',
                children: [
                    {
                        path: '',
                        loadChildren: '../reviews/reviews.module#ReviewsModule'
                    }
                ]
            },
            {
                path: 'chat',
                children: [
                    {
                        path: '',
                        loadChildren: '../chat/chat.module#ChatModule',
                    }
                ]
            },
            {
                path: 'settings',
                children: [
                    {
                        path: '',
                        loadChildren: '../settings/settings.module#SettingsModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full'
    },
];
var TabsRoutingModule = /** @class */ (function () {
    function TabsRoutingModule() {
    }
    TabsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], TabsRoutingModule);
    return TabsRoutingModule;
}());



/***/ }),

/***/ "./src/app/tabs/tabs.component.scss":
/*!******************************************!*\
  !*** ./src/app/tabs/tabs.component.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".selected ion-icon, .selected ion-label {\n  color: var(--ion-color-primary) !important;\n}\n\nion-tab-bar {\n  --border: 1px solid var(--practera-color-card-text-light);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC90YWJzL3RhYnMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3RhYnMvdGFicy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLDBDQUFBO0FDQUo7O0FER0E7RUFDRSx5REFBQTtBQ0FGIiwiZmlsZSI6InNyYy9hcHAvdGFicy90YWJzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlbGVjdGVkIHtcbiAgaW9uLWljb24sIGlvbi1sYWJlbCB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAhaW1wb3J0YW50OyAgXG4gIH1cbn1cbmlvbi10YWItYmFyIHtcbiAgLS1ib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1wcmFjdGVyYS1jb2xvci1jYXJkLXRleHQtbGlnaHQpO1xufVxuIiwiLnNlbGVjdGVkIGlvbi1pY29uLCAuc2VsZWN0ZWQgaW9uLWxhYmVsIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAhaW1wb3J0YW50O1xufVxuXG5pb24tdGFiLWJhciB7XG4gIC0tYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJhY3RlcmEtY29sb3ItY2FyZC10ZXh0LWxpZ2h0KTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/tabs/tabs.component.ts":
/*!****************************************!*\
  !*** ./src/app/tabs/tabs.component.ts ***!
  \****************************************/
/*! exports provided: TabsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsComponent", function() { return TabsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _tabs_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs.service */ "./src/app/tabs/tabs.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _services_router_enter_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/router-enter.service */ "./src/app/services/router-enter.service.ts");
/* harmony import */ var _switcher_switcher_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../switcher/switcher.service */ "./src/app/switcher/switcher.service.ts");
/* harmony import */ var _app_review_list_review_list_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/review-list/review-list.service */ "./src/app/review-list/review-list.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _services_shared_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @services/shared.service */ "./src/app/services/shared.service.ts");
/* harmony import */ var _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @app/event-list/event-list.service */ "./src/app/event-list/event-list.service.ts");
/* harmony import */ var _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shared/new-relic/new-relic.service */ "./src/app/shared/new-relic/new-relic.service.ts");
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











var TabsComponent = /** @class */ (function (_super) {
    __extends(TabsComponent, _super);
    function TabsComponent(router, tabsService, storage, utils, switcherService, reviewsService, sharedService, eventsService, newRelic) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.tabsService = tabsService;
        _this.storage = storage;
        _this.utils = utils;
        _this.switcherService = switcherService;
        _this.reviewsService = reviewsService;
        _this.sharedService = sharedService;
        _this.eventsService = eventsService;
        _this.newRelic = newRelic;
        _this.routeUrl = '/app';
        _this.showReview = false;
        _this.showChat = false;
        _this.showEvents = false;
        _this.noOfTodoItems = 0;
        _this.noOfChats = 0;
        _this.selectedTab = '';
        _this.newRelic.setPageViewName('tab');
        var role = _this.storage.getUser().role;
        _this.utils.getEvent('notification').subscribe(function (event) {
            _this.noOfTodoItems++;
        });
        _this.utils.getEvent('event-reminder').subscribe(function (event) {
            _this.noOfTodoItems++;
        });
        _this.utils.getEvent('team-message').subscribe(function (event) {
            _this.tabsService.getNoOfChats().subscribe(function (noOfChats) {
                _this.noOfChats = noOfChats;
            });
        });
        if (role !== 'mentor') {
            _this.utils.getEvent('team-no-mentor-message').subscribe(function (event) {
                _this.tabsService.getNoOfChats().subscribe(function (noOfChats) {
                    _this.noOfChats = noOfChats;
                });
            });
        }
        if (!_this.utils.isMobile()) {
            _this.utils.getEvent('chat-badge-update').subscribe(function (event) {
                _this.tabsService.getNoOfChats().subscribe(function (noOfChats) {
                    _this.noOfChats = noOfChats;
                });
            });
        }
        return _this;
    }
    TabsComponent.prototype._initialise = function () {
        this.showChat = false;
        this.showReview = false;
        this.showEvents = false;
    };
    TabsComponent.prototype.onEnter = function () {
        var _this = this;
        this._initialise();
        this._checkRoute();
        this._stopPlayingVideos();
        this.tabsService.getNoOfTodoItems().subscribe(function (noOfTodoItems) {
            _this.noOfTodoItems = noOfTodoItems;
        });
        // only get the number of chats if user is in team
        if (this.storage.getUser().teamId) {
            this.tabsService.getNoOfChats().subscribe(function (noOfChats) {
                _this.noOfChats = noOfChats;
            });
        }
        // display the chat tab if the user is in team
        if (this.storage.getUser().teamId) {
            this.showChat = true;
        }
        else {
            this.showChat = false;
            this.switcherService.getTeamInfo().subscribe(function (data) {
                if (_this.storage.getUser().teamId) {
                    _this.showChat = true;
                }
            });
        }
        if (this.storage.getUser().hasReviews) {
            this.showReview = true;
        }
        else {
            this.showReview = false;
            this.reviewsService.getReviews().subscribe(function (data) {
                if (data.length) {
                    _this.showReview = true;
                }
            });
        }
        if (this.storage.getUser().hasEvents) {
            this.showEvents = true;
        }
        else {
            this.showEvents = false;
            this.eventsService.getEvents().subscribe(function (events) {
                _this.showEvents = !_this.utils.isEmpty(events);
            });
        }
    };
    TabsComponent.prototype._checkRoute = function () {
        this.newRelic.actionText("selected " + this.router.url);
        switch (this.router.url) {
            case '/app/home':
                this.selectedTab = 'overview';
                break;
            case '/app/events':
                this.selectedTab = 'events';
                break;
            case '/app/settings':
                this.selectedTab = 'settings';
                break;
            case '/app/chat':
                this.selectedTab = 'chat';
                break;
            default:
                if (this.router.url.includes('/app/home')) {
                    this.selectedTab = 'overview';
                }
                else if (this.router.url.includes('/app/reviews')) {
                    this.selectedTab = 'reviews';
                }
                else {
                    this.selectedTab = '';
                }
                break;
        }
    };
    TabsComponent.prototype._stopPlayingVideos = function () {
        this.sharedService.stopPlayingVideos();
    };
    TabsComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: _tabs_service__WEBPACK_IMPORTED_MODULE_1__["TabsService"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_3__["BrowserStorageService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"] },
        { type: _switcher_switcher_service__WEBPACK_IMPORTED_MODULE_5__["SwitcherService"] },
        { type: _app_review_list_review_list_service__WEBPACK_IMPORTED_MODULE_6__["ReviewListService"] },
        { type: _services_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"] },
        { type: _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_9__["EventListService"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_10__["NewRelicService"] }
    ]; };
    TabsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tabs',
            template: __importDefault(__webpack_require__(/*! raw-loader!./tabs.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/tabs/tabs.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./tabs.component.scss */ "./src/app/tabs/tabs.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _tabs_service__WEBPACK_IMPORTED_MODULE_1__["TabsService"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_3__["BrowserStorageService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"],
            _switcher_switcher_service__WEBPACK_IMPORTED_MODULE_5__["SwitcherService"],
            _app_review_list_review_list_service__WEBPACK_IMPORTED_MODULE_6__["ReviewListService"],
            _services_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"],
            _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_9__["EventListService"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_10__["NewRelicService"]])
    ], TabsComponent);
    return TabsComponent;
}(_services_router_enter_service__WEBPACK_IMPORTED_MODULE_4__["RouterEnter"]));



/***/ }),

/***/ "./src/app/tabs/tabs.module.ts":
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.module.ts ***!
  \*************************************/
/*! exports provided: TabsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsModule", function() { return TabsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _tabs_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tabs-routing.module */ "./src/app/tabs/tabs-routing.module.ts");
/* harmony import */ var _tabs_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs.component */ "./src/app/tabs/tabs.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    TabsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _tabs_routing_module__WEBPACK_IMPORTED_MODULE_2__["TabsRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"]
            ],
            declarations: [
                _tabs_component__WEBPACK_IMPORTED_MODULE_3__["TabsComponent"],
            ]
        })
    ], TabsModule);
    return TabsModule;
}());



/***/ }),

/***/ "./src/app/tabs/tabs.service.ts":
/*!**************************************!*\
  !*** ./src/app/tabs/tabs.service.ts ***!
  \**************************************/
/*! exports provided: TabsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsService", function() { return TabsService; });
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
var api = {
    todoItem: 'api/v2/motivations/todo_item/list.json',
    unreadMessages: 'api/v2/message/chat/list_messages.json',
};
var TabsService = /** @class */ (function () {
    function TabsService(storage, request, utils) {
        this.storage = storage;
        this.request = request;
        this.utils = utils;
    }
    TabsService.prototype.getNoOfTodoItems = function () {
        var _this = this;
        return this.request.get(api.todoItem, {
            params: {
                project_id: this.storage.getUser().projectId
            }
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (response) {
            if (response.success && response.data) {
                return _this._normaliseNoOfTodoItems(response.data);
            }
        }));
    };
    TabsService.prototype._normaliseNoOfTodoItems = function (data) {
        var _this = this;
        var noOfTodoItems = 0;
        if (!Array.isArray(data)) {
            this.request.apiResponseFormatError('TodoItem array format error');
            return 0;
        }
        data.forEach(function (todoItem) {
            if (!_this.utils.has(todoItem, 'is_done')) {
                return _this.request.apiResponseFormatError('TodoItem format error');
            }
            if (todoItem.is_done) {
                return;
            }
            // only count following todo items
            if (todoItem.identifier.includes('AssessmentReview') ||
                todoItem.identifier.includes('AssessmentSubmission')) {
                noOfTodoItems++;
            }
        });
        return noOfTodoItems;
    };
    TabsService.prototype.getNoOfChats = function () {
        var _this = this;
        return this.request.get(api.unreadMessages, {
            params: {
                unread_count_for: 'all',
                team_id: this.storage.getUser().teamId
            }
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (response) {
            if (response.success && response.data) {
                return _this._normaliseNoOfChats(response.data);
            }
        }));
    };
    TabsService.prototype._normaliseNoOfChats = function (data) {
        if (!this.utils.has(data, 'unread_message_count')) {
            this.request.apiResponseFormatError('Chat unread count format error');
            return 0;
        }
        return data.unread_message_count;
    };
    TabsService.ctorParameters = function () { return [
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"] },
        { type: _shared_request_request_service__WEBPACK_IMPORTED_MODULE_2__["RequestService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] }
    ]; };
    TabsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"],
            _shared_request_request_service__WEBPACK_IMPORTED_MODULE_2__["RequestService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"]])
    ], TabsService);
    return TabsService;
}());



/***/ })

}]);
//# sourceMappingURL=tabs-tabs-module.js.map