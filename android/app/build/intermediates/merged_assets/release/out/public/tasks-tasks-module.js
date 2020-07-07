(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tasks-tasks-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/tasks/tasks.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tasks/tasks.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-split-pane *ngIf=\"!utils.isMobile()\" contentId=\"main-tasks\" when=\"xs\">\n  <app-activity\n    #activity\n    style=\"display: flex\"\n    [id]=\"activityId\"\n    [currentTask]=\"currentTask()\"\n    (navigate)=\"goto($event)\"\n    (tasksReady)=\"goToFirstTask($event)\"\n  ></app-activity>\n  <ion-content color=\"light\" id=\"main-tasks\">\n    <app-topic\n      #topic\n      *ngIf=\"topicId\"\n      [inputId]=\"topicId\"\n      [inputActivityId]=\"activityId\"\n      (navigate)=\"goto($event);activity.onEnter()\"\n      (changeStatus)=\"activity.changeTaskStatus('Topic', $event, 'done')\"\n    ></app-topic>\n    <app-assessment\n      #assessment\n      *ngIf=\"assessmentId\"\n      [inputId]=\"assessmentId\"\n      [inputActivityId]=\"activityId\"\n      [inputContextId]=\"contextId\"\n      [inputAction]=\"'assessment'\"\n      (navigate)=\"goto($event);activity.onEnter()\"\n      (changeStatus)=\"activity.changeTaskStatus('Assessment', $event.id, $event.status)\"\n      ></app-assessment>\n  </ion-content>\n</ion-split-pane>\n\n<ion-content *ngIf=\"utils.isMobile()\">\n  <app-activity #activity [id]=\"activityId\"></app-activity>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/tasks/tasks-routing.component.ts":
/*!**************************************************!*\
  !*** ./src/app/tasks/tasks-routing.component.ts ***!
  \**************************************************/
/*! exports provided: TasksRoutingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasksRoutingComponent", function() { return TasksRoutingComponent; });
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

var TasksRoutingComponent = /** @class */ (function () {
    function TasksRoutingComponent() {
    }
    TasksRoutingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: '<ion-router-outlet></ion-router-outlet>'
        })
    ], TasksRoutingComponent);
    return TasksRoutingComponent;
}());



/***/ }),

/***/ "./src/app/tasks/tasks-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/tasks/tasks-routing.module.ts ***!
  \***********************************************/
/*! exports provided: TasksRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasksRoutingModule", function() { return TasksRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _tasks_routing_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks-routing.component */ "./src/app/tasks/tasks-routing.component.ts");
/* harmony import */ var _tasks_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tasks.component */ "./src/app/tasks/tasks.component.ts");
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
        component: _tasks_routing_component__WEBPACK_IMPORTED_MODULE_2__["TasksRoutingComponent"],
        children: [
            {
                path: ':id',
                component: _tasks_component__WEBPACK_IMPORTED_MODULE_3__["TasksComponent"]
            }
        ]
    }
];
var TasksRoutingModule = /** @class */ (function () {
    function TasksRoutingModule() {
    }
    TasksRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], TasksRoutingModule);
    return TasksRoutingModule;
}());



/***/ }),

/***/ "./src/app/tasks/tasks.component.scss":
/*!********************************************!*\
  !*** ./src/app/tasks/tasks.component.scss ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Rhc2tzL3Rhc2tzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/tasks/tasks.component.ts":
/*!******************************************!*\
  !*** ./src/app/tasks/tasks.component.ts ***!
  \******************************************/
/*! exports provided: TasksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasksComponent", function() { return TasksComponent; });
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





var TasksComponent = /** @class */ (function (_super) {
    __extends(TasksComponent, _super);
    function TasksComponent(router, route, storage, utils) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.route = route;
        _this.storage = storage;
        _this.utils = utils;
        _this.routeUrl = '/app/activity';
        return _this;
    }
    TasksComponent.prototype.onEnter = function () {
        var _this = this;
        this.activityId = +this.route.snapshot.paramMap.get('id');
        this.topicId = null;
        this.assessmentId = null;
        // trigger onEnter after the element get generated
        setTimeout(function () {
            _this.activity.onEnter();
        });
    };
    /**
     * Go to the specific task based on parameters
     * Or go to the first unfinished task inside this activity
     */
    TasksComponent.prototype.goToFirstTask = function (tasks) {
        var _this = this;
        // only go to a task if we don't have a current task yet
        if (this.topicId || this.assessmentId) {
            return;
        }
        // check if we need to go to a specific task
        if (this._goToTask()) {
            return;
        }
        // find the first task that is not done or pending review
        // and is allowed to access for this user
        var firstTask = tasks.find(function (task) {
            return !['done', 'pending review'].includes(task.status) &&
                task.type !== 'Locked' &&
                !(task.isForTeam && !_this.storage.getUser().teamId) &&
                !task.isLocked;
        });
        if (!firstTask) {
            firstTask = tasks[0];
        }
        // goto the first task
        switch (firstTask.type) {
            case 'Topic':
                this.goto({
                    type: 'topic',
                    topicId: firstTask.id
                });
                break;
            case 'Assessment':
                this.goto({
                    type: 'assessment',
                    contextId: firstTask.contextId,
                    assessmentId: firstTask.id
                });
                break;
        }
    };
    /**
     * If parameters are passed in, go to the specific task
     */
    TasksComponent.prototype._goToTask = function () {
        // go to a task directly if parameters passed in
        var task = this.route.snapshot.paramMap.get('task');
        if (!task) {
            return false;
        }
        var taskId = +this.route.snapshot.paramMap.get('task_id');
        if (!taskId) {
            return false;
        }
        switch (task) {
            case 'topic':
                this.goto({
                    type: 'topic',
                    topicId: taskId
                });
                break;
            case 'assessment':
                var contextId = +this.route.snapshot.paramMap.get('context_id');
                if (!contextId) {
                    return false;
                }
                this.goto({
                    type: 'assessment',
                    assessmentId: taskId,
                    contextId: contextId
                });
                break;
            default:
                return false;
        }
        return true;
    };
    // display the task content in the right pane, and highlight on the left pane
    TasksComponent.prototype.goto = function (event) {
        var _this = this;
        switch (event.type) {
            case 'topic':
                this.topicId = event.topicId;
                // hide the assessment component
                this.assessmentId = null;
                // trigger onEnter after the element get generated
                setTimeout(function () {
                    _this.topic.onEnter();
                });
                break;
            case 'assessment':
                this.assessmentId = event.assessmentId;
                this.contextId = event.contextId;
                // hide the topic component
                this.topicId = null;
                // trigger onEnter after the element get generated
                setTimeout(function () {
                    _this.assessment.onEnter();
                });
                break;
        }
    };
    // get the currently selected task
    TasksComponent.prototype.currentTask = function () {
        if (this.topicId) {
            return {
                id: this.topicId,
                type: 'Topic'
            };
        }
        if (this.assessmentId) {
            return {
                id: this.assessmentId,
                type: 'Assessment'
            };
        }
        return null;
    };
    TasksComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('activity'),
        __metadata("design:type", Object)
    ], TasksComponent.prototype, "activity", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('topic'),
        __metadata("design:type", Object)
    ], TasksComponent.prototype, "topic", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('assessment'),
        __metadata("design:type", Object)
    ], TasksComponent.prototype, "assessment", void 0);
    TasksComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tasks',
            template: __importDefault(__webpack_require__(/*! raw-loader!./tasks.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/tasks/tasks.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./tasks.component.scss */ "./src/app/tasks/tasks.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"]])
    ], TasksComponent);
    return TasksComponent;
}(_services_router_enter_service__WEBPACK_IMPORTED_MODULE_3__["RouterEnter"]));



/***/ }),

/***/ "./src/app/tasks/tasks.module.ts":
/*!***************************************!*\
  !*** ./src/app/tasks/tasks.module.ts ***!
  \***************************************/
/*! exports provided: TasksModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasksModule", function() { return TasksModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _tasks_routing_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks-routing.component */ "./src/app/tasks/tasks-routing.component.ts");
/* harmony import */ var _tasks_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tasks-routing.module */ "./src/app/tasks/tasks-routing.module.ts");
/* harmony import */ var _tasks_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tasks.component */ "./src/app/tasks/tasks.component.ts");
/* harmony import */ var _activity_activity_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../activity/activity.module */ "./src/app/activity/activity.module.ts");
/* harmony import */ var _topic_topic_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../topic/topic.module */ "./src/app/topic/topic.module.ts");
/* harmony import */ var _assessment_assessment_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assessment/assessment.module */ "./src/app/assessment/assessment.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








var TasksModule = /** @class */ (function () {
    function TasksModule() {
    }
    TasksModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _tasks_component__WEBPACK_IMPORTED_MODULE_4__["TasksComponent"],
                _tasks_routing_component__WEBPACK_IMPORTED_MODULE_2__["TasksRoutingComponent"]
            ],
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"],
                _tasks_routing_module__WEBPACK_IMPORTED_MODULE_3__["TasksRoutingModule"],
                _activity_activity_module__WEBPACK_IMPORTED_MODULE_5__["ActivityModule"],
                _topic_topic_module__WEBPACK_IMPORTED_MODULE_6__["TopicModule"],
                _assessment_assessment_module__WEBPACK_IMPORTED_MODULE_7__["AssessmentModule"]
            ]
        })
    ], TasksModule);
    return TasksModule;
}());



/***/ })

}]);
//# sourceMappingURL=tasks-tasks-module.js.map