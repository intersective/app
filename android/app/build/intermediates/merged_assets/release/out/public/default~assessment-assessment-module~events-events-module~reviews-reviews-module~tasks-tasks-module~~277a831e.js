(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~assessment-assessment-module~events-events-module~reviews-reviews-module~tasks-tasks-module~~277a831e"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/activity/activity.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/activity/activity.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header mode=\"ios\">\n  <ion-toolbar [ngClass]=\"{'ion-toolbar-absolute': !utils.isMobile()}\">\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"back()\">\n        <ion-icon class=\"icon-backward ion-margin-start\" name=\"arrow-back\" color=\"primary\" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-center\">Activity</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding ion-text-center\" color=\"light\" [ngClass]=\"{\n  'ion-content-absolute': !utils.isMobile(),\n  'ion-content-mobile': utils.isMobile()\n}\">\n\n  <ng-container *ngIf=\"loadingActivity\">\n    <p><ion-skeleton-text animated style=\"width: 40%; margin-left: 30%; height: 20px\"></ion-skeleton-text></p>\n    <p><ion-skeleton-text animated style=\"width: 80%\"></ion-skeleton-text></p>\n    <div class=\"ion-text-left ion-margin-top\">\n      <ion-label color=\"medium\" class=\"subtitle-2 gray-2\">Tasks</ion-label>\n    </div>\n    <ion-card class=\"practera-card\">\n      <ion-list>\n        <app-list-item loading=\"true\"></app-list-item>\n        <app-list-item loading=\"true\" lines=\"none\"></app-list-item>\n      </ion-list>\n    </ion-card>\n  </ng-container>\n\n  <ng-container *ngIf=\"!loadingActivity\">\n    <h1 class=\"headline-4\">{{ activity.name }}</h1>\n    <div class=\"ion-text-left\">\n      <app-description *ngIf=\"activity.description\" [content]=\"activity.description\" class=\"body-1\"></app-description>\n    </div>\n    <div class=\"ion-text-left ion-margin-top\">\n      <ion-label color=\"medium\" class=\"subtitle-2 gray-2\">Tasks</ion-label>\n      <ion-button style=\"display: none;\" (click)=\"getNextTask()\">Get Next</ion-button>\n    </div>\n\n    <ion-card class=\"practera-card\" id=\"tasks-card\">\n      <ion-list>\n        <app-list-item\n          *ngFor=\"let task of activity.tasks; let i = index\"\n          [leadingIcon]=\"taskLeadingIcon(task)\"\n          [leadingIconPulsing]=\"assessmentNotSubmitted(task) && task.isDueToday\"\n          [title]=\"task.name\"\n          [subtitle1]=\"assessmentNotSubmitted(task) ? sharedService.dueDateFormatter(task.dueDate) : ''\"\n          [subtitle1Color]=\"task.isOverdue ? 'danger' : ''\"\n          [subtitle2]=\"taskSubtitle2(task)\"\n          [endingIcon]=\"taskEndingIcon(task)\"\n          [active]=\"currentTask && currentTask.type == task.type && currentTask.id == task.id\"\n          [lines]=\"i == activity.tasks.length - 1 ? 'none' : ''\"\n          (click)=\"goto(task)\"\n        ></app-list-item>\n      </ion-list>\n    </ion-card>\n  </ng-container>\n\n  <ng-container *ngIf=\"loadingEvents\">\n    <ion-spinner></ion-spinner>\n  </ng-container>\n  <ng-container *ngIf=\"events && events.length > 0\">\n    <div class=\"ion-text-left ion-margin-top\">\n      <ion-label class=\"subtitle-2 gray-2\">Events</ion-label>\n    </div>\n    <ion-card class=\"practera-card\" id=\"events-card\">\n      <ion-list>\n        <ng-container *ngFor=\"let event of events; let i = index\">\n          <app-list-item\n            *ngIf=\"i < 2\"\n            leadingIcon=\"calendar-outline\"\n            [leadingIconColor]=\"eventListService.isNotActionable(event) ? 'medium' : 'primary'\"\n            [title]=\"event.name\"\n            [titleColor]=\"eventListService.isNotActionable(event) ? 'gray-2' : ''\"\n            [subtitle1]=\"event.activityName\"\n            [subtitle2]=\"eventListService.timeDisplayed(event)\"\n            [endingIcon]=\"!eventListService.isNotActionable(event) ? 'arrow-forward' : ''\"\n            [eventExpired]=\"event.isPast && !event.isBooked\"\n            [lines]=\"i == events.length - 1 ? 'none' : ''\"\n            (click)=\"gotoEvent(event)\"\n          ></app-list-item>\n        </ng-container>\n        <clickable-item\n          *ngIf=\"events.length > 2\"\n          lines=\"none\"\n          (click)=\"gotoEvent()\">\n          <ion-icon name=\"ellipsis-vertical\" color=\"primary\" class=\"ion-margin-end\"></ion-icon>\n          <p>Show More</p>\n        </clickable-item>\n      </ion-list>\n    </ion-card>\n  </ng-container>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/activity/activity-routing.component.ts":
/*!********************************************************!*\
  !*** ./src/app/activity/activity-routing.component.ts ***!
  \********************************************************/
/*! exports provided: ActivityRoutingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityRoutingComponent", function() { return ActivityRoutingComponent; });
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

var ActivityRoutingComponent = /** @class */ (function () {
    function ActivityRoutingComponent() {
    }
    ActivityRoutingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: '<ion-router-outlet></ion-router-outlet>'
        })
    ], ActivityRoutingComponent);
    return ActivityRoutingComponent;
}());



/***/ }),

/***/ "./src/app/activity/activity-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/activity/activity-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: ActivityRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityRoutingModule", function() { return ActivityRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _activity_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./activity.component */ "./src/app/activity/activity.component.ts");
/* harmony import */ var _activity_routing_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./activity-routing.component */ "./src/app/activity/activity-routing.component.ts");
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
        component: _activity_routing_component__WEBPACK_IMPORTED_MODULE_3__["ActivityRoutingComponent"],
        children: [
            {
                path: ':id',
                component: _activity_component__WEBPACK_IMPORTED_MODULE_2__["ActivityComponent"],
            }
        ]
    }
];
var ActivityRoutingModule = /** @class */ (function () {
    function ActivityRoutingModule() {
    }
    ActivityRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ActivityRoutingModule);
    return ActivityRoutingModule;
}());



/***/ }),

/***/ "./src/app/activity/activity.component.scss":
/*!**************************************************!*\
  !*** ./src/app/activity/activity.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".icon-check {\n  font-size: 30px;\n}\n\n.icon-backward, .icon-forward {\n  font-size: 20px !important;\n}\n\n.task-leading-icon {\n  margin-right: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9hY3Rpdml0eS9hY3Rpdml0eS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYWN0aXZpdHkvYWN0aXZpdHkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxlQUFBO0FDQUY7O0FERUE7RUFDRSwwQkFBQTtBQ0NGOztBRENBO0VBQ0Usa0JBQUE7QUNFRiIsImZpbGUiOiJzcmMvYXBwL2FjdGl2aXR5L2FjdGl2aXR5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uaWNvbi1jaGVjayB7XG4gIGZvbnQtc2l6ZTogMzBweDtcbn1cbi5pY29uLWJhY2t3YXJkLCAuaWNvbi1mb3J3YXJkIHtcbiAgZm9udC1zaXplOiAyMHB4ICFpbXBvcnRhbnQ7XG59XG4udGFzay1sZWFkaW5nLWljb24ge1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG59XG4iLCIuaWNvbi1jaGVjayB7XG4gIGZvbnQtc2l6ZTogMzBweDtcbn1cblxuLmljb24tYmFja3dhcmQsIC5pY29uLWZvcndhcmQge1xuICBmb250LXNpemU6IDIwcHggIWltcG9ydGFudDtcbn1cblxuLnRhc2stbGVhZGluZy1pY29uIHtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/activity/activity.component.ts":
/*!************************************************!*\
  !*** ./src/app/activity/activity.component.ts ***!
  \************************************************/
/*! exports provided: ActivityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityComponent", function() { return ActivityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _activity_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./activity.service */ "./src/app/activity/activity.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/notification/notification.service */ "./src/app/shared/notification/notification.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/event-list/event-list.service */ "./src/app/event-list/event-list.service.ts");
/* harmony import */ var _services_shared_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @services/shared.service */ "./src/app/services/shared.service.ts");
/* harmony import */ var _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../fast-feedback/fast-feedback.service */ "./src/app/fast-feedback/fast-feedback.service.ts");
/* harmony import */ var _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shared/new-relic/new-relic.service */ "./src/app/shared/new-relic/new-relic.service.ts");
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










var ActivityComponent = /** @class */ (function () {
    function ActivityComponent(router, activityService, utils, notificationService, storage, eventListService, sharedService, fastFeedbackService, newRelic, ngZone) {
        var _this = this;
        this.router = router;
        this.activityService = activityService;
        this.utils = utils;
        this.notificationService = notificationService;
        this.storage = storage;
        this.eventListService = eventListService;
        this.sharedService = sharedService;
        this.fastFeedbackService = fastFeedbackService;
        this.newRelic = newRelic;
        this.ngZone = ngZone;
        this.navigate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // when tasks are ready, emit tasks to the parent component so that the parent component can decide which task to display
        this.tasksReady = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.activity = {
            id: 0,
            name: '',
            description: '',
            tasks: []
        };
        this.loadingActivity = true;
        this.loadingEvents = true;
        // update event list after book/cancel an event
        this.getEventPusher = this.utils.getEvent('update-event').subscribe(function (event) {
            _this._getEvents();
        }, function (error) {
            _this.newRelic.noticeError(error);
        });
    }
    // force every navigation happen under radar of angular
    ActivityComponent.prototype._navigate = function (direction) {
        var _this = this;
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
    ActivityComponent.prototype.onEnter = function () {
        this.newRelic.setPageViewName('activity components');
        this.activity = {
            id: 0,
            name: '',
            description: '',
            tasks: []
        };
        this.loadingActivity = true;
        this._getActivity();
        this._getEvents();
        this.fastFeedbackService.pullFastFeedback().subscribe();
    };
    ActivityComponent.prototype._getActivity = function () {
        var _this = this;
        this.getActivity = this.activityService.getActivity(this.id)
            .subscribe(function (activity) {
            if (!activity) {
                // activity is null by default
                return;
            }
            _this.activity = activity;
            _this.loadingActivity = false;
            _this.newRelic.setPageViewName("Activity " + _this.activity.name + ", ID: " + _this.id);
            _this.tasksReady.emit(activity.tasks);
        }, function (error) {
            _this.newRelic.noticeError(error);
        });
    };
    ActivityComponent.prototype._getEvents = function (events) {
        var _this = this;
        this.events = events || [];
        if (events === undefined) {
            this.loadingEvents = true;
            this.getEvents = this.eventListService.getEvents(this.id).subscribe(function (res) {
                _this.events = res;
                _this.loadingEvents = false;
            }, function (error) {
                _this.newRelic.noticeError(error);
            });
        }
    };
    ActivityComponent.prototype.back = function () {
        this._navigate(['app', 'home']);
        this.newRelic.actionText('Back button pressed on Activities Page.');
    };
    ActivityComponent.prototype.goto = function (task) {
        var _this = this;
        this.newRelic.actionText("Selected Task (" + task.type + "): ID " + task.id);
        switch (task.type) {
            case 'Assessment':
                if (task.isForTeam && !this.storage.getUser().teamId) {
                    this.notificationService.popUp('shortMessage', { message: 'To do this assessment, you have to be in a team.' });
                    break;
                }
                // check if assessment is locked by other team members
                if (task.isLocked) {
                    this.notificationService.lockTeamAssessmentPopUp({
                        name: task.submitter.name,
                        image: task.submitter.image
                    }, function (data) {
                        if (data.data) {
                            _this._navigate(['assessment', 'assessment', _this.id, task.contextId, task.id]);
                        }
                    });
                    return;
                }
                this._navigate(['assessment', 'assessment', this.id, task.contextId, task.id]);
                break;
            case 'Topic':
                this._navigate(['topic', this.id, task.id]);
                break;
            case 'Locked':
                this.notificationService.popUp('shortMessage', { message: 'This part of the app is still locked. You can unlock the features by engaging with the app and completing all tasks.' });
                break;
        }
    };
    ActivityComponent.prototype.gotoEvent = function (event) {
        // go to the event page without choosing any event
        if (!event) {
            return this.router.navigate(['app', 'events', { activity_id: this.id }]);
        }
        // display the event pop up for mobile
        if (this.utils.isMobile()) {
            return this.eventListService.eventDetailPopUp(event);
        }
        // go to the event page with an event selected
        return this.router.navigate(['app', 'events', { activity_id: this.id, event_id: event.id }]);
    };
    /**
     * Manually change the status of a task
     * @param type   The type of the task('Assessment', 'Topic')
     * @param id     The id of the task
     * @param status The status
     */
    ActivityComponent.prototype.changeTaskStatus = function (type, id, status) {
        var index = this.activity.tasks.findIndex(function (t) { return t.id === +id && t.type === type; });
        if (index < 0) {
            return;
        }
        this.activity.tasks[index].status = status;
    };
    /******************
      Used for task layout
    ******************/
    ActivityComponent.prototype.taskLeadingIcon = function (task) {
        switch (task.type) {
            case 'Locked':
                return 'lock-closed-outline';
            case 'Topic':
                return 'reader-outline';
            case 'Assessment':
                return 'clipboard-outline';
        }
    };
    ActivityComponent.prototype.assessmentNotSubmitted = function (task) {
        return task.type === 'Assessment' && (!task.status || task.status === '' || task.status === 'in progress');
    };
    ActivityComponent.prototype.taskSubtitle2 = function (task) {
        if (task.type === 'Locked') {
            return '';
        }
        var title = task.type + ' ';
        title += task.isLocked ? '- Locked by ' + task.submitter.name : task.status;
        return title;
    };
    ActivityComponent.prototype.taskEndingIcon = function (task) {
        if (task.isLocked) {
            return 'lock-closed-outline';
        }
        switch (task.status) {
            case 'done':
                return 'checkmark';
            case 'pending review':
                return 'hourglass-outline';
            case 'feedback available':
            case 'in progress':
            default:
                return 'arrow-forward';
        }
    };
    ActivityComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _activity_service__WEBPACK_IMPORTED_MODULE_2__["ActivityService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
        { type: _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_5__["BrowserStorageService"] },
        { type: _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_6__["EventListService"] },
        { type: _services_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"] },
        { type: _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_8__["FastFeedbackService"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_9__["NewRelicService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ActivityComponent.prototype, "id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ActivityComponent.prototype, "currentTask", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ActivityComponent.prototype, "navigate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ActivityComponent.prototype, "tasksReady", void 0);
    ActivityComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-activity',
            template: __importDefault(__webpack_require__(/*! raw-loader!./activity.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/activity/activity.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./activity.component.scss */ "./src/app/activity/activity.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _activity_service__WEBPACK_IMPORTED_MODULE_2__["ActivityService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"],
            _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_5__["BrowserStorageService"],
            _app_event_list_event_list_service__WEBPACK_IMPORTED_MODULE_6__["EventListService"],
            _services_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"],
            _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_8__["FastFeedbackService"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_9__["NewRelicService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]])
    ], ActivityComponent);
    return ActivityComponent;
}());



/***/ }),

/***/ "./src/app/activity/activity.module.ts":
/*!*********************************************!*\
  !*** ./src/app/activity/activity.module.ts ***!
  \*********************************************/
/*! exports provided: ActivityModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityModule", function() { return ActivityModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _activity_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./activity-routing.module */ "./src/app/activity/activity-routing.module.ts");
/* harmony import */ var _activity_routing_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./activity-routing.component */ "./src/app/activity/activity-routing.component.ts");
/* harmony import */ var _activity_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./activity.component */ "./src/app/activity/activity.component.ts");
/* harmony import */ var _activity_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./activity.service */ "./src/app/activity/activity.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var ActivityModule = /** @class */ (function () {
    function ActivityModule() {
    }
    ActivityModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"],
                _activity_routing_module__WEBPACK_IMPORTED_MODULE_2__["ActivityRoutingModule"]
            ],
            declarations: [
                _activity_routing_component__WEBPACK_IMPORTED_MODULE_3__["ActivityRoutingComponent"],
                _activity_component__WEBPACK_IMPORTED_MODULE_4__["ActivityComponent"]
            ],
            providers: [
                _activity_service__WEBPACK_IMPORTED_MODULE_5__["ActivityService"]
            ],
            exports: [
                _activity_component__WEBPACK_IMPORTED_MODULE_4__["ActivityComponent"]
            ]
        })
    ], ActivityModule);
    return ActivityModule;
}());



/***/ }),

/***/ "./src/app/activity/activity.service.ts":
/*!**********************************************!*\
  !*** ./src/app/activity/activity.service.ts ***!
  \**********************************************/
/*! exports provided: ActivityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityService", function() { return ActivityService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _shared_request_request_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/request/request.service */ "./src/app/shared/request/request.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/notification/notification.service */ "./src/app/shared/notification/notification.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
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







/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
var api = {
    activity: 'api/activities.json',
    submissions: 'api/submissions.json',
    progress: 'api/v2/motivations/progress/list.json',
    nextTask: 'api/v2/plans/activity/next_task'
};
var ActivityService = /** @class */ (function () {
    function ActivityService(request, utils, storage, router, notification) {
        this.request = request;
        this.utils = utils;
        this.storage = storage;
        this.router = router;
        this.notification = notification;
    }
    // request for the latest data, and return the previously saved data at the same time
    ActivityService.prototype.getActivity = function (id) {
        var _this = this;
        this._getActivityData(id).subscribe(function (res) { return _this.utils.updateActivityCache(id, res); });
        return this.utils.getActivityCache(id);
    };
    // request for the latest project data
    ActivityService.prototype._getActivityData = function (id) {
        var _this = this;
        return this.request.postGraphQL("\"{" +
            ("activity(id:" + id + "){") +
            "id name description tasks{" +
            "id name type is_locked is_team deadline context_id status{" +
            "status is_locked submitter_name submitter_image" +
            "}" +
            "}" +
            "}" +
            "}\"")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) { return _this._normaliseActivity(res.data); }));
    };
    ActivityService.prototype._normaliseActivity = function (data) {
        var _this = this;
        data.activity.tasks = data.activity.tasks.map(function (task) {
            if (task.is_locked) {
                return {
                    id: 0,
                    type: 'Locked',
                    name: 'Locked'
                };
            }
            switch (task.type) {
                case 'topic':
                    return {
                        id: task.id,
                        name: task.name,
                        type: 'Topic',
                        status: task.status.status
                    };
                case 'assessment':
                    return {
                        id: task.id,
                        name: task.name,
                        type: 'Assessment',
                        contextId: task.context_id,
                        isForTeam: task.is_team,
                        dueDate: task.deadline,
                        isOverdue: task.deadline ? _this.utils.timeComparer(task.deadline) < 0 : false,
                        isDueToday: task.deadline ? _this.utils.timeComparer(task.deadline, { compareDate: true }) === 0 : false,
                        status: task.status.status === 'pending approval' ? 'pending review' : task.status.status,
                        isLocked: task.status.is_locked,
                        submitter: {
                            name: task.status.submitter_name,
                            image: task.status.submitter_image
                        }
                    };
                default:
                    console.warn("Unsupported model type " + task.type);
                    return {
                        id: task.id,
                        name: task.name,
                        type: task.type
                    };
            }
        });
        return data.activity;
    };
    /**
     * Go to the next task within the same activity, or go back to former layer
     * Logic:
     *  - If current task is not the last task in the activity, go to the next task
     *  - If current task is the last task in the activity and there's no unfinished task before the current task, go to the home page
     *  - If current task is the last task in the activity and there is unfinished task before the current task, show a pop up for user to choose whether go to the activity page or home page
     *
     * @param activityId Activity id
     * @param taskType   Current task type ('assessment'/'topic')
     * @param taskId     Current task id
     * @param justFinished Whether the current task is just finished or not
     */
    ActivityService.prototype.gotoNextTask = function (activityId, taskType, taskId, justFinished) {
        if (justFinished === void 0) { justFinished = true; }
        return __awaiter(this, void 0, void 0, function () {
            var res, route;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNextTask(activityId, taskType, taskId).toPromise()];
                    case 1:
                        res = _a.sent();
                        // go to next task
                        if (!res.isLast) {
                            route = ['app', 'home'];
                            switch (res.task.type) {
                                case 'assessment':
                                    route = ['assessment', 'assessment', activityId.toString(), res.task.contextId.toString(), res.task.id.toString()];
                                    break;
                                case 'topic':
                                    route = ['topic', activityId.toString(), res.task.id.toString()];
                                    break;
                            }
                            return [2 /*return*/, route];
                        }
                        if (res.task) {
                            // pop up activity completed modal
                            this.notification.activityCompletePopUp(activityId, justFinished);
                            return [2 /*return*/];
                        }
                        // go back to home page, and scroll to the activity
                        if (justFinished) {
                            // and display the toast
                            this.router.navigate(['app', 'home'], { queryParams: { activityId: activityId, activityCompleted: true } });
                        }
                        else {
                            // and don't display the toast
                            this.router.navigate(['app', 'home'], { queryParams: { activityId: activityId } });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the data needed to find next task
     * @param activityId      The id of current activity
     * @param currentTaskType The type of current task
     * @param currentTaskId   The id of current task
     */
    ActivityService.prototype.getNextTask = function (activityId, currentTaskType, currentTaskId) {
        var _this = this;
        return this.request.get(api.nextTask, {
            params: {
                activity_id: activityId,
                task_type: currentTaskType.toLowerCase(),
                task_id: currentTaskId
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) {
            return {
                isLast: res.data.is_last,
                task: !_this.utils.isEmpty(res.data.task) ? {
                    id: res.data.task.id,
                    name: res.data.task.name,
                    type: res.data.task.type,
                    contextId: res.data.task.context_id || null
                } : null
            };
        }));
    };
    ActivityService.ctorParameters = function () { return [
        { type: _shared_request_request_service__WEBPACK_IMPORTED_MODULE_2__["RequestService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"] }
    ]; };
    ActivityService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_shared_request_request_service__WEBPACK_IMPORTED_MODULE_2__["RequestService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"]])
    ], ActivityService);
    return ActivityService;
}());



/***/ })

}]);
//# sourceMappingURL=default~assessment-assessment-module~events-events-module~reviews-reviews-module~tasks-tasks-module~~277a831e.js.map