(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["events-events-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/event-list/event-list.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/event-list/event-list.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header mode=\"ios\">\n  <ion-toolbar [ngClass]=\"{'ion-toolbar-absolute': !utils.isMobile()}\">\n    <ion-title class=\"ion-text-center\">Events</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content color=\"light\" class=\"ion-text-center ion-padding\" [ngClass]=\"{\n  'ion-content-absolute': !utils.isMobile(),\n  'ion-content-mobile': utils.isMobile()\n}\" appFloat>\n\n  <div class=\"btn-filter\">\n    <ion-button\n      class=\"btn-left-half\"\n      [ngClass]=\"{'btn-activated': activated == 'browse'}\"\n      (click)=\"showBrowse()\">\n      <ion-ripple-effect type=\"unbounded\"></ion-ripple-effect>\n      Browse\n    </ion-button>\n    <ion-button\n      class=\"btn-middle\"\n      [ngClass]=\"{'btn-activated': activated == 'booked'}\"\n      (click)=\"showBooked()\">\n      <ion-ripple-effect type=\"unbounded\"></ion-ripple-effect>\n      Booked\n    </ion-button>\n    <ion-button\n      class=\"btn-right-half\"\n      [ngClass]=\"{'btn-activated': activated == 'attended'}\"\n      (click)=\"showAttended()\">\n      <ion-ripple-effect type=\"unbounded\"></ion-ripple-effect>\n      Attended\n    </ion-button>\n  </div>\n\n  <ion-item lines=\"none\" color=\"light\" class=\"ion-margin-top item-filter\">\n    <ion-label id=\"activity-filter\" class=\"subtitle-1\" [ngClass]=\"!events.length ? 'gray-0' : 'gray-2'\">Filter by Activity</ion-label>\n    <ion-select\n      multiple=\"true\"\n      aria-labelledby=\"activity-filter\"\n      [value]=\"selectedActivities\"\n      (ionChange)=\"onSelect(filterEle.value)\"\n      #filterEle>\n      <ion-select-option *ngFor=\"let activity of activities\" [value]=\"activity.id\" selected>{{ activity.name }}</ion-select-option>\n    </ion-select>\n  </ion-item>\n\n  <ng-container *ngIf=\"loadingEvents\">\n    <p><ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text></p>\n    <ion-card class=\"practera-card\">\n      <ion-list>\n        <app-list-item loading=\"true\"></app-list-item>\n        <app-list-item loading=\"true\" lines=\"none\"></app-list-item>\n      </ion-list>\n    </ion-card>\n  </ng-container>\n\n  <ng-container *ngFor=\"let eventObj of events\">\n    <p class=\"sutitle-2 gray-2 ion-text-left\">{{ eventObj.date }}</p>\n    <ion-card class=\"practera-card\">\n      <ion-list>\n        <!-- @TODO add isVideoConference by checking event zoom object -->\n        <app-list-item\n          *ngFor=\"let event of eventObj.events; let i = index\"\n          leadingIcon=\"calendar-outline\"\n          [leadingIconColor]=\"eventListService.isNotActionable(event) ? 'medium' : 'primary'\"\n          [title]=\"event.name\"\n          [titleColor]=\"eventListService.isNotActionable(event) ? 'gray-2' : ''\"\n          [subtitle1]=\"event.activityName\"\n          [subtitle2]=\"eventListService.timeDisplayed(event)\"\n          [eventVideoConference]=\"event.videoConference\"\n          [eventExpired]=\"event.isPast && !event.isBooked\"\n          [active]=\"eventId === event.id\"\n          [lines]=\"i == eventObj.events.length - 1 ? 'none' : ''\"\n          (click)=\"goto(event)\"\n        ></app-list-item>\n      </ion-list>\n    </ion-card>\n  </ng-container>\n\n  <ion-infinite-scroll threshold=\"50px\" (ionInfinite)=\"loadMoreEvents($event)\">\n    <ion-infinite-scroll-content\n      loadingSpinner=\"bubbles\"\n      loadingText=\"Loading more events...\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n  <div *ngIf=\"!events.length && !loadingEvents\">\n    <ion-card class=\"practera-card list-empty-message\">\n      <ng-container [ngSwitch]=\"activated\">\n        <ng-container *ngSwitchCase=\"'browse'\">\n          <p class=\"subtitle-1 gray-3\">There's no new events.</p>\n          <span class=\"gray-1 body-2\">Go to the booked tab to see the events you've booked.</span>\n        </ng-container>\n        <ng-container *ngSwitchCase=\"'booked'\">\n          <p class=\"subtitle-1 gray-3\">You have no booked events.</p>\n          <span class=\"gray-1 body-2\">Go to the browse tab and book an event to see it here.</span>\n        </ng-container>\n        <ng-container *ngSwitchCase=\"'attended'\">\n          <p class=\"subtitle-1 gray-3\">You have not attended any events.</p>\n          <span class=\"gray-1 body-2\">You can see all your past events in this tab.</span>\n        </ng-container>\n      </ng-container>\n    </ion-card>\n  </div>\n\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/events/events.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/events/events.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-split-pane *ngIf=\"!utils.isMobile()\" contentId=\"main-events\" when=\"xs\">\n  <app-event-list\n    #eventList\n    style=\"display: flex\"\n    [activityId]=\"activityId\"\n    [eventId]=\"eventId\"\n    (navigate)=\"goto($event)\"\n  ></app-event-list>\n  <ion-content color=\"light\" id=\"main-events\">\n    <app-event-detail\n      #eventDetail\n      *ngIf=\"!assessmentId && currentEvent\"\n      [event]=\"currentEvent\"\n      (checkin)=\"checkin($event)\"\n    ></app-event-detail>\n    <app-assessment\n      #assessment\n      *ngIf=\"assessmentId\"\n      [inputId]=\"assessmentId\"\n      [inputContextId]=\"contextId\"\n      [inputAction]=\"'assessment'\"\n      [fromPage]=\"'events'\"\n      (navigate)=\"assessmentId = null;eventList.onEnter()\"\n    ></app-assessment>\n    <ng-container *ngIf=\"!currentEvent\">\n      <ion-header mode=\"ios\">\n        <ion-toolbar class=\"ion-toolbar-absolute\">\n          <ion-title class=\"ion-text-center title-small\">Event</ion-title>\n        </ion-toolbar>\n      </ion-header>\n      <ion-content color=\"light\" class=\"ion-text-center ion-content-absolute\">\n        <ion-icon id=\"calendar-icon\" name=\"calendar-outline\" color=\"medium\"></ion-icon>\n      </ion-content>\n    </ng-container>\n  </ion-content>\n</ion-split-pane>\n\n<ion-content *ngIf=\"utils.isMobile()\">\n  <app-event-list #eventList [activityId]=\"activityId\"></app-event-list>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/event-list/event-list.component.scss":
/*!******************************************************!*\
  !*** ./src/app/event-list/event-list.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".item-filter {\n  --padding-start: 0;\n  --inner-padding-end: 0;\n}\n\n.btn-filter ion-button {\n  width: 32%;\n}\n\n.btn-filter .btn-middle {\n  width: calc(36% - 4px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9ldmVudC1saXN0L2V2ZW50LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2V2ZW50LWxpc3QvZXZlbnQtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7QUNDRjs7QURFRTtFQUNFLFVBQUE7QUNDSjs7QURDRTtFQUNFLHNCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9ldmVudC1saXN0L2V2ZW50LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaXRlbS1maWx0ZXIge1xuICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gIC0taW5uZXItcGFkZGluZy1lbmQ6IDA7XG59XG4uYnRuLWZpbHRlciB7XG4gIGlvbi1idXR0b24ge1xuICAgIHdpZHRoOiAzMiU7XG4gIH1cbiAgLmJ0bi1taWRkbGUge1xuICAgIHdpZHRoOiBjYWxjKDM2JSAtIDRweCk7XG4gIH1cbn1cblxuIiwiLml0ZW0tZmlsdGVyIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xufVxuXG4uYnRuLWZpbHRlciBpb24tYnV0dG9uIHtcbiAgd2lkdGg6IDMyJTtcbn1cbi5idG4tZmlsdGVyIC5idG4tbWlkZGxlIHtcbiAgd2lkdGg6IGNhbGMoMzYlIC0gNHB4KTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/event-list/event-list.component.ts":
/*!****************************************************!*\
  !*** ./src/app/event-list/event-list.component.ts ***!
  \****************************************************/
/*! exports provided: EventListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventListComponent", function() { return EventListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _event_list_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-list.service */ "./src/app/event-list/event-list.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/new-relic/new-relic.service */ "./src/app/shared/new-relic/new-relic.service.ts");
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





var EventListComponent = /** @class */ (function () {
    function EventListComponent(router, route, eventListService, utils, ngZone, newRelic) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.eventListService = eventListService;
        this.utils = utils;
        this.ngZone = ngZone;
        this.newRelic = newRelic;
        this.navigate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // the current active tab
        this.activated = 'browse';
        this.events = [];
        this.remainingEvents = [];
        this.loadingEvents = true;
        this.goToFirstEvent = true;
        // update event list after book/cancel an event
        this.utils.getEvent('update-event').subscribe(function (event) {
            _this.onEnter();
        });
    }
    EventListComponent.prototype._initialise = function () {
        this.events = [];
        this.remainingEvents = [];
        this.eventsCategorised = {
            browse: [],
            booked: [],
            attended: []
        };
        this.activities = [];
        this.selectedActivities = [];
        this.loadingEvents = true;
        this.activated = 'browse';
    };
    EventListComponent.prototype.onEnter = function () {
        var _this = this;
        this.newRelic.setPageViewName('event-list');
        this._initialise();
        this.eventListService.getEvents().subscribe(function (events) {
            if (_this.utils.isEmpty(events)) {
                _this.loadingEvents = false;
                return;
            }
            // initialise the date to compare with
            var compareDateBrowse = '';
            var compareDateBooked = '';
            var compareDateAttended = '';
            // initialise the event object
            var eventGroupBrowse = {
                date: compareDateBrowse,
                events: []
            };
            var eventGroupBooked = {
                date: compareDateBooked,
                events: []
            };
            var eventGroupAttended = {
                date: compareDateAttended,
                events: []
            };
            var activityIdsWithEvent = [];
            events.forEach(function (event) {
                var _a, _b, _c;
                // record the id of activity that has event, so that we can filter the activity list later
                if (!activityIdsWithEvent.includes(event.activityId)) {
                    activityIdsWithEvent.push(event.activityId);
                }
                if (!event.isBooked) {
                    // group event for 'browse' type
                    _a = _this._groupEvents(event, _this.eventsCategorised.browse, eventGroupBrowse, compareDateBrowse, true), _this.eventsCategorised.browse = _a[0], eventGroupBrowse = _a[1], compareDateBrowse = _a[2];
                    // if eventId is passed in, go to the tab that contains this event and highlight it
                    if (_this.eventId === event.id) {
                        _this.activated = 'browse';
                        _this.goto(event);
                    }
                }
                else if (_this.utils.timeComparer(event.startTime) >= 0) {
                    // group event for 'booked' type
                    _b = _this._groupEvents(event, _this.eventsCategorised.booked, eventGroupBooked, compareDateBooked), _this.eventsCategorised.booked = _b[0], eventGroupBooked = _b[1], compareDateBooked = _b[2];
                    // if eventId is passed in, go to the tab that contains this event and highlight it
                    if (_this.eventId === event.id) {
                        _this.activated = 'booked';
                        _this.goto(event);
                    }
                }
                else {
                    // group event for 'attended' type
                    _c = _this._groupEvents(event, _this.eventsCategorised.attended, eventGroupAttended, compareDateAttended), _this.eventsCategorised.attended = _c[0], eventGroupAttended = _c[1], compareDateAttended = _c[2];
                    // if eventId is passed in, go to the tab that contains this event and highlight it
                    if (_this.eventId === event.id) {
                        _this.activated = 'attended';
                        _this.goto(event);
                    }
                }
            });
            if (eventGroupBrowse.events.length) {
                _this.eventsCategorised.browse.push(eventGroupBrowse);
            }
            if (eventGroupBooked.events.length) {
                _this.eventsCategorised.booked.push(eventGroupBooked);
            }
            if (eventGroupAttended.events.length) {
                _this.eventsCategorised.attended.push(eventGroupAttended);
            }
            _this.renderEvents(_this.eventsCategorised[_this.activated]);
            // if activity id is passed in, filter by that activity
            var activityId = _this.activityId;
            if (!activityId) {
                activityId = +_this.route.snapshot.paramMap.get('activity_id');
            }
            // don't need to go to first event if event id passed in
            if (_this.eventId) {
                _this.goToFirstEvent = false;
            }
            if (activityId) {
                _this.onSelect([activityId]);
            }
            else {
                _this._rearrangeEvents();
            }
            _this.loadingEvents = false;
            // get activity list
            _this.eventListService.getActivities().subscribe(function (activities) {
                // only display activity that has event
                _this.activities = activities.filter(function (activity) { return activityIdsWithEvent.includes(activity.id); });
            });
        });
    };
    // render more events from remainingEvents
    EventListComponent.prototype.loadMoreEvents = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.renderEvents();
            event.target.complete();
        }, 500);
    };
    /**
     * Render 7 events at one time.
     * If one event group doesn't have 7 events, will render the next event group until 7 events or all rendered
     *
     * @param remainingEvents Pass the remaining event groups if we need to reset the event list
     */
    EventListComponent.prototype.renderEvents = function (remainingEvents) {
        if (!this.events) {
            this.events = [];
        }
        // re-assign remainingEvents if passed in
        if (remainingEvents) {
            this.remainingEvents = JSON.parse(JSON.stringify(remainingEvents));
            this.events = [];
        }
        // don't need to do anything if no remaining events
        if (!this.remainingEvents) {
            return;
        }
        var eventsCount = 0, eventGroup;
        var maxEvents = 7;
        while (eventsCount < maxEvents) {
            // stop if there's no remaining events
            if (!this.remainingEvents.length) {
                break;
            }
            eventGroup = this.remainingEvents[0];
            if (eventsCount + eventGroup.events.length <= maxEvents) {
                // render the whole event group if no more than max events yet
                this.remainingEvents.shift();
                eventsCount += eventGroup.events.length;
            }
            else {
                eventGroup = {
                    date: this.remainingEvents[0].date,
                    events: this.remainingEvents[0].events.splice(0, maxEvents - eventsCount)
                };
                eventsCount = maxEvents;
            }
            if (this.events.length && this.events[this.events.length - 1].date === eventGroup.date) {
                // concat the new event group to the last one
                this.events[this.events.length - 1].events = this.events[this.events.length - 1].events.concat(eventGroup.events);
            }
            else {
                // push the new event group
                this.events.push(eventGroup);
            }
        }
    };
    // tell parent component that user is going to an event
    EventListComponent.prototype.goto = function (event) {
        // pop up event detail for mobile
        if (this.utils.isMobile()) {
            return this.eventListService.eventDetailPopUp(event);
        }
        // goto an event for desktop view
        return this.navigate.emit(event);
    };
    /**
     * This function is used to put events into the proper group
     *
     * @param {Event} event          The event data
     * @param {Array} events         The events array to push group data to
     * @param {Array} eventGroup     The event group array
     * @param {String} compareDate   The compare date string
     * @param {Boolean} isBrowse     If this is for browse (will group all past events in "Expired")
     */
    EventListComponent.prototype._groupEvents = function (event, events, eventGroup, compareDate, isBrowse) {
        if (isBrowse === void 0) { isBrowse = false; }
        var date = this.utils.utcToLocal(event.startTime, 'date');
        // initialise compareDate & eventGroup
        if (!compareDate) {
            compareDate = date;
            eventGroup = {
                date: compareDate,
                events: []
            };
        }
        /**
         * Frontend Expiry status is recalculated from event.start date
         * (API doesn't return explicit conditions to FE to evaluate booking timeframe)
         * - we are checking against the event start time to check if it is expired
         * - if event started and user haven't booked, it is expired
         * - if event started and user has booked, it is in attended
         * - if event haven't started, it's bookable
         */
        if (isBrowse && this.utils.timeComparer(event.startTime) < 0) {
            // group all past events as one group named "Expired"
            if (compareDate !== 'Expired') {
                compareDate = 'Expired';
                if (!this.utils.isEmpty(eventGroup.events)) {
                    events.push(eventGroup);
                }
                eventGroup = {
                    date: compareDate,
                    events: []
                };
            }
            eventGroup.events.push(event);
        }
        else if (date === compareDate) {
            // this event belongs to the same group as previous one
            eventGroup.events.push(event);
        }
        else {
            // create a new group for this date
            if (!this.utils.isEmpty(eventGroup.events)) {
                events.push(eventGroup);
            }
            compareDate = this.utils.utcToLocal(event.startTime, 'date');
            eventGroup = {
                date: compareDate,
                events: [event]
            };
        }
        return [events, eventGroup, compareDate];
    };
    EventListComponent.prototype.showBrowse = function () {
        this.newRelic.addPageAction('show browse');
        this.activated = 'browse';
        this.goToFirstEvent = true;
        this._rearrangeEvents();
    };
    EventListComponent.prototype.showBooked = function () {
        this.newRelic.addPageAction('show booked');
        this.activated = 'booked';
        this.goToFirstEvent = true;
        this._rearrangeEvents();
    };
    EventListComponent.prototype.showAttended = function () {
        this.newRelic.addPageAction('show attended');
        this.activated = 'attended';
        this.goToFirstEvent = true;
        this._rearrangeEvents();
    };
    EventListComponent.prototype.onSelect = function (value) {
        this.selectedActivities = value;
        this._rearrangeEvents();
    };
    /**
     * Rearrange current events.
     * Including:
     * 1. filter the events by selected activities
     * 2. go to the first event after filter
     */
    EventListComponent.prototype._rearrangeEvents = function () {
        this._filterByActivities();
        // don't need to go to first event if it is the inital loading and event id is passed in or it is on mobile mode
        if (!this.goToFirstEvent || this.utils.isMobile()) {
            return;
        }
        // Go to the first event.
        // Highlight the event in event list and display the content in event detail
        if (this.events.length) {
            this.goto(this.events[0].events[0]);
        }
        else {
            this.goto(null);
        }
    };
    /**
     * Filter the current events with selected activities
     */
    EventListComponent.prototype._filterByActivities = function () {
        var _this = this;
        // no need to filter any activity if not selected
        if (this.utils.isEmpty(this.selectedActivities)) {
            this.renderEvents(this.eventsCategorised[this.activated]);
            return;
        }
        var events = [];
        this.eventsCategorised[this.activated].forEach(function (eventGroup) {
            var group = {
                date: eventGroup.date,
                events: []
            };
            eventGroup.events.forEach(function (event) {
                if (_this.selectedActivities.includes(event.activityId)) {
                    group.events.push(event);
                }
            });
            if (!_this.utils.isEmpty(group.events)) {
                events.push(group);
            }
        });
        this.renderEvents(events);
    };
    EventListComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _event_list_service__WEBPACK_IMPORTED_MODULE_2__["EventListService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_4__["NewRelicService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EventListComponent.prototype, "navigate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EventListComponent.prototype, "activityId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EventListComponent.prototype, "eventId", void 0);
    EventListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-event-list',
            template: __importDefault(__webpack_require__(/*! raw-loader!./event-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/event-list/event-list.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./event-list.component.scss */ "./src/app/event-list/event-list.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _event_list_service__WEBPACK_IMPORTED_MODULE_2__["EventListService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_4__["NewRelicService"]])
    ], EventListComponent);
    return EventListComponent;
}());



/***/ }),

/***/ "./src/app/event-list/event-list.module.ts":
/*!*************************************************!*\
  !*** ./src/app/event-list/event-list.module.ts ***!
  \*************************************************/
/*! exports provided: EventListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventListModule", function() { return EventListModule; });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _event_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-list.component */ "./src/app/event-list/event-list.component.ts");
/* harmony import */ var _event_list_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event-list.service */ "./src/app/event-list/event-list.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var EventListModule = /** @class */ (function () {
    function EventListModule() {
    }
    EventListModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__["SharedModule"],
            ],
            declarations: [
                _event_list_component__WEBPACK_IMPORTED_MODULE_2__["EventListComponent"]
            ],
            providers: [
                _event_list_service__WEBPACK_IMPORTED_MODULE_3__["EventListService"]
            ],
            exports: [
                _event_list_component__WEBPACK_IMPORTED_MODULE_2__["EventListComponent"]
            ]
        })
    ], EventListModule);
    return EventListModule;
}());



/***/ }),

/***/ "./src/app/events/events-routing.component.ts":
/*!****************************************************!*\
  !*** ./src/app/events/events-routing.component.ts ***!
  \****************************************************/
/*! exports provided: EventsRoutingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsRoutingComponent", function() { return EventsRoutingComponent; });
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

var EventsRoutingComponent = /** @class */ (function () {
    function EventsRoutingComponent() {
    }
    EventsRoutingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: '<ion-router-outlet></ion-router-outlet>'
        })
    ], EventsRoutingComponent);
    return EventsRoutingComponent;
}());



/***/ }),

/***/ "./src/app/events/events-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/events/events-routing.module.ts ***!
  \*************************************************/
/*! exports provided: EventsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsRoutingModule", function() { return EventsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _events_routing_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events-routing.component */ "./src/app/events/events-routing.component.ts");
/* harmony import */ var _events_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./events.component */ "./src/app/events/events.component.ts");
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
        component: _events_routing_component__WEBPACK_IMPORTED_MODULE_2__["EventsRoutingComponent"],
        children: [
            {
                path: '',
                component: _events_component__WEBPACK_IMPORTED_MODULE_3__["EventsComponent"]
            }
        ]
    }
];
var EventsRoutingModule = /** @class */ (function () {
    function EventsRoutingModule() {
    }
    EventsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], EventsRoutingModule);
    return EventsRoutingModule;
}());



/***/ }),

/***/ "./src/app/events/events.component.scss":
/*!**********************************************!*\
  !*** ./src/app/events/events.component.scss ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#calendar-icon {\n  font-size: 200px;\n  margin-top: 20%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9ldmVudHMvZXZlbnRzLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9ldmVudHMvZXZlbnRzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7RUFDQSxlQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9ldmVudHMvZXZlbnRzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2NhbGVuZGFyLWljb24ge1xuICBmb250LXNpemU6IDIwMHB4O1xuICBtYXJnaW4tdG9wOiAyMCU7XG59XG4iLCIjY2FsZW5kYXItaWNvbiB7XG4gIGZvbnQtc2l6ZTogMjAwcHg7XG4gIG1hcmdpbi10b3A6IDIwJTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/events/events.component.ts":
/*!********************************************!*\
  !*** ./src/app/events/events.component.ts ***!
  \********************************************/
/*! exports provided: EventsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsComponent", function() { return EventsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _services_router_enter_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/router-enter.service */ "./src/app/services/router-enter.service.ts");
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




var EventsComponent = /** @class */ (function (_super) {
    __extends(EventsComponent, _super);
    function EventsComponent(router, route, utils) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.route = route;
        _this.utils = utils;
        // used in RouteEnter to trigger onEnter() of this component
        _this.routeUrl = '/app/events';
        return _this;
    }
    EventsComponent.prototype.onEnter = function () {
        var _this = this;
        // get activity and event id from route
        this.activityId = +this.route.snapshot.paramMap.get('activity_id');
        this.eventId = +this.route.snapshot.paramMap.get('event_id');
        // don't display assessment component by default
        this.assessmentId = null;
        this.currentEvent = null;
        // trigger eventList onEnter() after the element gets generated
        setTimeout(function () {
            _this.eventList.onEnter();
        });
    };
    // display the event content in the right pane, and highlight it on the left pane
    EventsComponent.prototype.goto = function (event) {
        this.currentEvent = event;
        this.eventId = event ? event.id : 0;
        // not displaying the check-in assessment
        this.assessmentId = null;
        this.contextId = null;
    };
    EventsComponent.prototype.checkin = function (params) {
        var _this = this;
        if (!params.assessmentId || !params.contextId) {
            return;
        }
        this.assessmentId = params.assessmentId;
        this.contextId = params.contextId;
        // trigger assessment onEnter() after the element gets generated
        setTimeout(function () {
            _this.assessment.onEnter();
        });
    };
    EventsComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('eventList'),
        __metadata("design:type", Object)
    ], EventsComponent.prototype, "eventList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('eventDetail'),
        __metadata("design:type", Object)
    ], EventsComponent.prototype, "eventDetail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('assessment'),
        __metadata("design:type", Object)
    ], EventsComponent.prototype, "assessment", void 0);
    EventsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-events',
            template: __importDefault(__webpack_require__(/*! raw-loader!./events.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/events/events.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./events.component.scss */ "./src/app/events/events.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"]])
    ], EventsComponent);
    return EventsComponent;
}(_services_router_enter_service__WEBPACK_IMPORTED_MODULE_3__["RouterEnter"]));



/***/ }),

/***/ "./src/app/events/events.module.ts":
/*!*****************************************!*\
  !*** ./src/app/events/events.module.ts ***!
  \*****************************************/
/*! exports provided: EventsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsModule", function() { return EventsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _events_routing_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events-routing.component */ "./src/app/events/events-routing.component.ts");
/* harmony import */ var _events_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./events-routing.module */ "./src/app/events/events-routing.module.ts");
/* harmony import */ var _events_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./events.component */ "./src/app/events/events.component.ts");
/* harmony import */ var _event_list_event_list_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../event-list/event-list.module */ "./src/app/event-list/event-list.module.ts");
/* harmony import */ var _event_detail_event_detail_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../event-detail/event-detail.module */ "./src/app/event-detail/event-detail.module.ts");
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








var EventsModule = /** @class */ (function () {
    function EventsModule() {
    }
    EventsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _events_component__WEBPACK_IMPORTED_MODULE_4__["EventsComponent"],
                _events_routing_component__WEBPACK_IMPORTED_MODULE_2__["EventsRoutingComponent"]
            ],
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"],
                _events_routing_module__WEBPACK_IMPORTED_MODULE_3__["EventsRoutingModule"],
                _event_list_event_list_module__WEBPACK_IMPORTED_MODULE_5__["EventListModule"],
                _event_detail_event_detail_module__WEBPACK_IMPORTED_MODULE_6__["EventDetailModule"],
                _assessment_assessment_module__WEBPACK_IMPORTED_MODULE_7__["AssessmentModule"]
            ]
        })
    ], EventsModule);
    return EventsModule;
}());



/***/ })

}]);
//# sourceMappingURL=events-events-module.js.map