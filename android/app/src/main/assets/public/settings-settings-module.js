(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["settings-settings-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/settings/settings.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/settings/settings.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header mode=\"ios\">\n  <ion-toolbar>\n    <ion-title class=\"ion-text-center\">Settings</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content class=\"ion-padding\" color=\"light\">\n  <div class=\"ion-margin-top subtitle-1\">\n    <ion-label class=\"subtitle-2 gray-2\">Experimental Features</ion-label>\n    <ion-item class=\"no-bg\" (click)=\"goToNativeSetting()\" lines=\"none\">\n      <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"cog-outline\"></ion-icon>\n      Go to Settings (AppV2)\n    </ion-item>\n\n    <ion-item class=\"no-bg\" (click)=\"subscribeInterest('test-channel')\" lines=\"none\">\n      <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"mic-outline\"></ion-icon>\n      Subscribe to a PN Channel (test-channel)\n    </ion-item>\n\n    <ion-item class=\"no-bg\" (click)=\"unsubscribeInterest('test-channel')\" lines=\"none\">\n      <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"mic-off-outline\"></ion-icon>\n      Unsubscribe the PN Channel (test-channel)\n    </ion-item>\n  </div>\n\n  <ng-container *ngIf=\"utils.isMobile()\">\n    <ion-item class=\"profile-info no-bg\" lines=\"none\">\n      <ion-avatar class=\"profile-image\" slot=\"start\">\n        <img *ngIf=\"!imageUpdating\" [src]=\"profile.image\">\n        <p *ngIf=\"imageUpdating\" class=\"loading-icon\"><ion-spinner name=\"bubbles\"></ion-spinner></p>\n        <file-stack\n          [accept]=\"acceptFileTypes\"\n          [fileType]=\"'image'\"\n          [type]=\"'profileImage'\"\n          (complete)=\"uploadProfileImage($event)\"\n        ></file-stack>\n      </ion-avatar>\n      <ion-label>\n        <ion-label class=\"headline-6\" *ngIf=\"profile.name\">\n          {{profile.name}}\n        </ion-label>\n        <ion-label class=\"subtitle-1 gray-2\" *ngIf=\"profile.email\">\n          {{profile.email}}\n        </ion-label>\n      </ion-label>\n    </ion-item>\n    <app-contact-number-form [page]=\"'settings'\"></app-contact-number-form>\n\n    <ion-item *ngIf=\"isInMultiplePrograms()\" lines=\"none\" class=\"exp-switch\">\n      <ion-label class=\"subtitle-2 gray-2\">Switch to another experience</ion-label>\n      <ion-button class=\"practera-btn mobile-btn\" slot=\"end\" (click)=\"switchProgram()\">SWITCH</ion-button>\n    </ion-item>\n\n    <div class=\"ion-margin-top support-mobile subtitle-1\">\n      <ion-label class=\"subtitle-2 gray-2\">Experimental Features</ion-label>\n      <ion-item class=\"no-bg\" (click)=\"goToNativeSetting()\" lines=\"none\">\n        <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"cog-outline\"></ion-icon>\n        Go to Settings (AppV2)\n      </ion-item>\n\n      <ion-item class=\"no-bg\" (click)=\"subscribeInterest('test-channel')\" lines=\"none\">\n        <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"mic-outline\"></ion-icon>\n        Subscribe to a PN Channel (test-channel)\n      </ion-item>\n\n      <ion-item class=\"no-bg\" (click)=\"unsubscribeInterest('test-channel')\" lines=\"none\">\n        <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"mic-off-outline\"></ion-icon>\n        Unsubscribe the PN Channel (test-channel)\n      </ion-item>\n\n      <ion-label class=\"subtitle-2 gray-2\">Support</ion-label>\n      <ion-item class=\"no-bg\" (click)=\"mailTo()\" lines=\"none\">\n        <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"mail-outline\"></ion-icon>\n        Email Help\n        <ion-icon name=\"arrow-forward\" color=\"medium\" slot=\"end\"></ion-icon>\n      </ion-item>\n      <ion-item class=\"no-bg\" (click)=\"openLink()\" lines=\"none\">\n        <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"clipboard-outline\"></ion-icon>\n        Terms of Use\n        <ion-icon name=\"arrow-forward\" color=\"medium\" slot=\"end\"></ion-icon>\n      </ion-item>\n      <ion-item id=\"item-logout\" class=\"no-bg\" (click)=\"logout()\" lines=\"none\">\n        <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"log-out-outline\"></ion-icon>\n        Logout\n      </ion-item>\n    </div>\n  </ng-container>\n\n  <ng-container *ngIf=\"!utils.isMobile()\">\n    <ion-grid>\n      <ion-row>\n        <ion-col size=\"3\" class=\"support\">\n          <div class=\"profile-info\">\n            <ion-avatar class=\"profile-image\" slot=\"start\">\n              <img *ngIf=\"!imageUpdating\" [src]=\"profile.image\">\n              <p *ngIf=\"imageUpdating\" class=\"loading-icon\"><ion-spinner name=\"bubbles\"></ion-spinner></p>\n              <file-stack\n                [accept]=\"acceptFileTypes\"\n                [fileType]=\"'image'\"\n                [type]=\"'profileImage'\"\n                (complete)=\"uploadProfileImage($event)\"\n              ></file-stack>\n            </ion-avatar>\n            <ion-label class=\"headline-6\" *ngIf=\"profile.name\">\n              {{profile.name}}\n            </ion-label>\n            <ion-label class=\"subtitle-1 gray-2\" *ngIf=\"profile.email\">\n              {{profile.email}}\n            </ion-label>\n          </div>\n          <div class=\"ion-margin-top subtitle-1\">\n            <ion-item class=\"no-bg\" (click)=\"mailTo()\" lines=\"none\">\n              <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"mail-outline\"></ion-icon>\n              Email Help\n            </ion-item>\n            <ion-item class=\"no-bg\" (click)=\"openLink()\" lines=\"none\">\n              <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"clipboard-outline\"></ion-icon>\n              Terms of Use\n            </ion-item>\n            <ion-item id=\"item-logout\" class=\"no-bg\" (click)=\"logout()\" lines=\"none\">\n              <ion-icon class=\"ion-padding-end\" color=\"primary\" name=\"log-out-outline\"></ion-icon>\n              Logout\n            </ion-item>\n          </div>\n        </ion-col>\n        <ion-col class=\"content\">\n          <app-contact-number-form [page]=\"'settings'\"></app-contact-number-form>\n          <ion-item lines=\"none\" class=\"no-bg\">\n            <ion-label *ngIf=\"isInMultiplePrograms()\" class=\"subtitle-2 gray-2\">Switch to another experience</ion-label>\n            <ion-label *ngIf=\"!isInMultiplePrograms()\" class=\"subtitle-2 gray-2\">Your experience</ion-label>\n          </ion-item>\n          <ion-row class=\"experience-content\">\n            <ion-col size=\"7\" class=\"ion-no-padding experience-card-container\">\n              <ion-card class=\"practera-card experience-card no-box-shadow\">\n                <div class=\"image-container\">\n                  <img [src]=\"currentProgramImage ? currentProgramImage : '/assets/default-experience-image.svg'\" [alt]=\"currentProgramName\"/>\n                </div>\n                <ion-card-content>\n                  <ion-item lines=\"none\" class=\"switcher-card-item subtitle-1\">\n                    <ion-label>{{ currentProgramName }}</ion-label>\n                  </ion-item>\n                </ion-card-content>\n              </ion-card>\n            </ion-col>\n            <ion-col size=\"5\" *ngIf=\"isInMultiplePrograms() || returnLtiUrl\" class=\"ion-no-padding switch-card-container\">\n              <ion-card class=\"practera-card experience-card\" (click)=\"switchProgram()\">\n                <div class=\"div-icon-swap\">\n                  <ion-icon name=\"swap-horizontal\" color=\"primary\"></ion-icon>\n                </div>\n                <ion-card-content>\n                  <clickable-item color=\"light\" [lines]=\"'none'\" [isSwitcherCard]=\"true\">\n                    <ion-label class=\"subtitle-1\">Switch Experience</ion-label>\n                  </clickable-item>\n                </ion-card-content>\n              </ion-card>\n            </ion-col>\n          </ion-row>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ng-container>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/settings/settings-routing.component.ts":
/*!********************************************************!*\
  !*** ./src/app/settings/settings-routing.component.ts ***!
  \********************************************************/
/*! exports provided: SettingsRoutingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsRoutingComponent", function() { return SettingsRoutingComponent; });
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

var SettingsRoutingComponent = /** @class */ (function () {
    function SettingsRoutingComponent() {
    }
    SettingsRoutingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: '<ion-router-outlet></ion-router-outlet>'
        })
    ], SettingsRoutingComponent);
    return SettingsRoutingComponent;
}());



/***/ }),

/***/ "./src/app/settings/settings-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/settings/settings-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: SettingsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsRoutingModule", function() { return SettingsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _settings_routing_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings-routing.component */ "./src/app/settings/settings-routing.component.ts");
/* harmony import */ var _settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.component */ "./src/app/settings/settings.component.ts");
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
        component: _settings_routing_component__WEBPACK_IMPORTED_MODULE_2__["SettingsRoutingComponent"],
        children: [
            {
                path: '',
                component: _settings_component__WEBPACK_IMPORTED_MODULE_3__["SettingsComponent"]
            }
        ]
    }
];
var SettingsRoutingModule = /** @class */ (function () {
    function SettingsRoutingModule() {
    }
    SettingsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], SettingsRoutingModule);
    return SettingsRoutingModule;
}());



/***/ }),

/***/ "./src/app/settings/settings.component.scss":
/*!**************************************************!*\
  !*** ./src/app/settings/settings.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-item.no-bg {\n  --padding-start: 0;\n}\n\n.profile-info {\n  --padding-start: 0;\n}\n\n.profile-info .profile-image {\n  width: 90px;\n  height: 90px;\n  margin-bottom: 5px;\n  margin-top: 16px;\n}\n\n.profile-info .profile-image img {\n  width: 80px;\n  height: 80px;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n\n.profile-info .profile-image .loading-icon {\n  width: 80px;\n  margin: 0;\n  height: 80px;\n  text-align: center;\n}\n\n.profile-info .profile-image .loading-icon ion-spinner {\n  margin-top: 15%;\n}\n\n.profile-info .profile-image file-stack {\n  position: absolute;\n  top: 52px;\n  left: 52px;\n}\n\n.exp-switch {\n  --background: transparent;\n  --padding-start: 0;\n  --padding-end: 0;\n  --inner-padding-end: 0;\n}\n\n.exp-switch ion-label {\n  letter-spacing: 0.1px;\n  line-height: 24px;\n}\n\n.exp-switch ion-button {\n  height: 32px;\n  width: 90px;\n  margin: 0px;\n}\n\n.div-icon-swap {\n  background-color: white;\n  height: calc(100% - 67px);\n  margin-bottom: 3px;\n  text-align: center;\n}\n\n.div-icon-swap ion-icon {\n  font-size: 50px !important;\n  position: absolute;\n  top: 40%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.support {\n  max-width: 320px !important;\n  margin-left: calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);\n  margin-right: 16px;\n}\n\n.support-mobile ion-item {\n  --inner-padding-end: 0;\n}\n\n.support-mobile ion-item ion-icon {\n  margin-right: 0;\n}\n\n@media screen and (max-width: 1020px) {\n  .support {\n    margin-left: 47px !important;\n  }\n}\n\n.content {\n  max-width: 524px !important;\n  margin-right: 83px;\n  margin-left: 16px;\n}\n\n.content .experience-content .experience-card-container {\n  max-width: 280px !important;\n}\n\n.content .experience-content .experience-card-container ion-card {\n  max-width: 280px !important;\n  margin: 0;\n  margin-right: 15px;\n}\n\n.content .experience-content .switch-card-container ion-card {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  margin-left: 15px;\n}\n\n.content .experience-content .switch-card-container ion-card ion-label {\n  text-align: center !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2V0dGluZ3Mvc2V0dGluZ3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtBQ0NGOztBRENBO0VBQ0Usa0JBQUE7QUNFRjs7QURERTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQ0dKOztBREZJO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtLQUFBLGlCQUFBO0FDSU47O0FERkk7RUFDRSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0lOOztBREhNO0VBQ0UsZUFBQTtBQ0tSOztBREZJO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQ0lOOztBRENBO0VBQ0UseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7QUNFRjs7QURERTtFQUNFLHFCQUFBO0VBQ0EsaUJBQUE7QUNHSjs7QURERTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtBQ0dKOztBRENBO0VBQ0UsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUNFRjs7QURERTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLHdDQUFBO1VBQUEsZ0NBQUE7QUNHSjs7QURDQTtFQUNFLDJCQUFBO0VBQ0EsK0RBQUE7RUFDQSxrQkFBQTtBQ0VGOztBREVFO0VBQ0Usc0JBQUE7QUNDSjs7QURBSTtFQUNFLGVBQUE7QUNFTjs7QURHQTtFQUNFO0lBQ0UsNEJBQUE7RUNBRjtBQUNGOztBREVBO0VBQ0UsMkJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FDQUY7O0FERUk7RUFDRSwyQkFBQTtBQ0FOOztBRENNO0VBQ0UsMkJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUNDUjs7QURHTTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtFQUNBLGlCQUFBO0FDRFI7O0FERVE7RUFDRSw2QkFBQTtBQ0FWIiwiZmlsZSI6InNyYy9hcHAvc2V0dGluZ3Mvc2V0dGluZ3MuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taXRlbS5uby1iZyB7XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbn1cbi5wcm9maWxlLWluZm8ge1xuICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gIC5wcm9maWxlLWltYWdlIHtcbiAgICB3aWR0aDogOTBweDtcbiAgICBoZWlnaHQ6IDkwcHg7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgIG1hcmdpbi10b3A6IDE2cHg7XG4gICAgaW1nIHtcbiAgICAgIHdpZHRoOiA4MHB4O1xuICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgfVxuICAgIC5sb2FkaW5nLWljb24ge1xuICAgICAgd2lkdGg6IDgwcHg7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBoZWlnaHQ6IDgwcHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBpb24tc3Bpbm5lciB7XG4gICAgICAgIG1hcmdpbi10b3A6IDE1JTtcbiAgICAgIH1cbiAgICB9XG4gICAgZmlsZS1zdGFjayB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDUycHg7XG4gICAgICBsZWZ0OiA1MnB4O1xuICAgIH1cbiAgfVxufVxuXG4uZXhwLXN3aXRjaCB7XG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDogMDtcbiAgaW9uLWxhYmVsIHtcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xcHg7XG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIH1cbiAgaW9uLWJ1dHRvbiB7XG4gICAgaGVpZ2h0OiAzMnB4O1xuICAgIHdpZHRoOiA5MHB4O1xuICAgIG1hcmdpbjogMHB4O1xuICB9XG59XG5cbi5kaXYtaWNvbi1zd2FwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGhlaWdodDogY2FsYygxMDAlIC0gNjdweCk7XG4gIG1hcmdpbi1ib3R0b206IDNweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiA1MHB4ICFpbXBvcnRhbnQ7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNDAlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgfVxufVxuXG4uc3VwcG9ydCB7XG4gIG1heC13aWR0aDogMzIwcHggIWltcG9ydGFudDtcbiAgbWFyZ2luLWxlZnQ6IGNhbGMoY2FsYygyIC8gdmFyKC0taW9uLWdyaWQtY29sdW1ucywgMTIpKSAqIDEwMCUpO1xuICBtYXJnaW4tcmlnaHQ6IDE2cHg7XG59XG5cbi5zdXBwb3J0LW1vYmlsZSB7XG4gIGlvbi1pdGVtIHtcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xuICAgIGlvbi1pY29ue1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgIH1cbiAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMDIwcHgpIHtcbiAgLnN1cHBvcnQge1xuICAgIG1hcmdpbi1sZWZ0OiA0N3B4ICFpbXBvcnRhbnQ7XG4gIH1cbn1cbi5jb250ZW50IHtcbiAgbWF4LXdpZHRoOiA1MjRweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDgzcHg7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xuICAuZXhwZXJpZW5jZS1jb250ZW50IHtcbiAgICAuZXhwZXJpZW5jZS1jYXJkLWNvbnRhaW5lcntcbiAgICAgIG1heC13aWR0aDogMjgwcHggIWltcG9ydGFudDtcbiAgICAgIGlvbi1jYXJkIHtcbiAgICAgICAgbWF4LXdpZHRoOiAyODBweCAhaW1wb3J0YW50O1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcbiAgICAgIH1cbiAgICB9XG4gICAgLnN3aXRjaC1jYXJkLWNvbnRhaW5lciB7XG4gICAgICBpb24tY2FyZCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDE1cHg7XG4gICAgICAgIGlvbi1sYWJlbCB7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImlvbi1pdGVtLm5vLWJnIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xufVxuXG4ucHJvZmlsZS1pbmZvIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xufVxuLnByb2ZpbGUtaW5mbyAucHJvZmlsZS1pbWFnZSB7XG4gIHdpZHRoOiA5MHB4O1xuICBoZWlnaHQ6IDkwcHg7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cbi5wcm9maWxlLWluZm8gLnByb2ZpbGUtaW1hZ2UgaW1nIHtcbiAgd2lkdGg6IDgwcHg7XG4gIGhlaWdodDogODBweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG59XG4ucHJvZmlsZS1pbmZvIC5wcm9maWxlLWltYWdlIC5sb2FkaW5nLWljb24ge1xuICB3aWR0aDogODBweDtcbiAgbWFyZ2luOiAwO1xuICBoZWlnaHQ6IDgwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5wcm9maWxlLWluZm8gLnByb2ZpbGUtaW1hZ2UgLmxvYWRpbmctaWNvbiBpb24tc3Bpbm5lciB7XG4gIG1hcmdpbi10b3A6IDE1JTtcbn1cbi5wcm9maWxlLWluZm8gLnByb2ZpbGUtaW1hZ2UgZmlsZS1zdGFjayB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MnB4O1xuICBsZWZ0OiA1MnB4O1xufVxuXG4uZXhwLXN3aXRjaCB7XG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDogMDtcbn1cbi5leHAtc3dpdGNoIGlvbi1sYWJlbCB7XG4gIGxldHRlci1zcGFjaW5nOiAwLjFweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG59XG4uZXhwLXN3aXRjaCBpb24tYnV0dG9uIHtcbiAgaGVpZ2h0OiAzMnB4O1xuICB3aWR0aDogOTBweDtcbiAgbWFyZ2luOiAwcHg7XG59XG5cbi5kaXYtaWNvbi1zd2FwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGhlaWdodDogY2FsYygxMDAlIC0gNjdweCk7XG4gIG1hcmdpbi1ib3R0b206IDNweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmRpdi1pY29uLXN3YXAgaW9uLWljb24ge1xuICBmb250LXNpemU6IDUwcHggIWltcG9ydGFudDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDQwJTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbn1cblxuLnN1cHBvcnQge1xuICBtYXgtd2lkdGg6IDMyMHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1sZWZ0OiBjYWxjKGNhbGMoMiAvIHZhcigtLWlvbi1ncmlkLWNvbHVtbnMsIDEyKSkgKiAxMDAlKTtcbiAgbWFyZ2luLXJpZ2h0OiAxNnB4O1xufVxuXG4uc3VwcG9ydC1tb2JpbGUgaW9uLWl0ZW0ge1xuICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xufVxuLnN1cHBvcnQtbW9iaWxlIGlvbi1pdGVtIGlvbi1pY29uIHtcbiAgbWFyZ2luLXJpZ2h0OiAwO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMDIwcHgpIHtcbiAgLnN1cHBvcnQge1xuICAgIG1hcmdpbi1sZWZ0OiA0N3B4ICFpbXBvcnRhbnQ7XG4gIH1cbn1cbi5jb250ZW50IHtcbiAgbWF4LXdpZHRoOiA1MjRweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDgzcHg7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuLmNvbnRlbnQgLmV4cGVyaWVuY2UtY29udGVudCAuZXhwZXJpZW5jZS1jYXJkLWNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogMjgwcHggIWltcG9ydGFudDtcbn1cbi5jb250ZW50IC5leHBlcmllbmNlLWNvbnRlbnQgLmV4cGVyaWVuY2UtY2FyZC1jb250YWluZXIgaW9uLWNhcmQge1xuICBtYXgtd2lkdGg6IDI4MHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbjogMDtcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xufVxuLmNvbnRlbnQgLmV4cGVyaWVuY2UtY29udGVudCAuc3dpdGNoLWNhcmQtY29udGFpbmVyIGlvbi1jYXJkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgbWFyZ2luOiAwO1xuICBtYXJnaW4tbGVmdDogMTVweDtcbn1cbi5jb250ZW50IC5leHBlcmllbmNlLWNvbnRlbnQgLnN3aXRjaC1jYXJkLWNvbnRhaW5lciBpb24tY2FyZCBpb24tbGFiZWwge1xuICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/settings/settings.component.ts":
/*!************************************************!*\
  !*** ./src/app/settings/settings.component.ts ***!
  \************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _setting_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setting.service */ "./src/app/settings/setting.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/notification/notification.service */ "./src/app/shared/notification/notification.service.ts");
/* harmony import */ var _services_router_enter_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @services/router-enter.service */ "./src/app/services/router-enter.service.ts");
/* harmony import */ var _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../fast-feedback/fast-feedback.service */ "./src/app/fast-feedback/fast-feedback.service.ts");
/* harmony import */ var _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shared/filestack/filestack.service */ "./src/app/shared/filestack/filestack.service.ts");
/* harmony import */ var _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shared/new-relic/new-relic.service */ "./src/app/shared/new-relic/new-relic.service.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
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












var CapacitorPusherBeamsAuth = _capacitor_core__WEBPACK_IMPORTED_MODULE_11__["Plugins"].CapacitorPusherBeamsAuth, PusherBeams = _capacitor_core__WEBPACK_IMPORTED_MODULE_11__["Plugins"].PusherBeams;
var SettingsComponent = /** @class */ (function (_super) {
    __extends(SettingsComponent, _super);
    function SettingsComponent(router, authService, settingService, storage, utils, notificationService, filestackService, fastFeedbackService, newRelic) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.authService = authService;
        _this.settingService = settingService;
        _this.storage = storage;
        _this.utils = utils;
        _this.notificationService = notificationService;
        _this.filestackService = filestackService;
        _this.fastFeedbackService = fastFeedbackService;
        _this.newRelic = newRelic;
        _this.routeUrl = '/app/settings';
        _this.profile = {
            contactNumber: '',
            email: '',
            image: '',
            name: ''
        };
        _this.currentProgramName = '';
        _this.currentProgramImage = '';
        _this.returnLtiUrl = '';
        _this.helpline = 'help@practera.com';
        _this.termsUrl = 'https://images.practera.com/terms_and_conditions/practera_terms_conditions.pdf';
        // controll profile image updating
        _this.imageUpdating = false;
        // card image CDN
        _this.cdn = 'https://cdn.filestackcontent.com/resize=fit:crop,width:';
        return _this;
    }
    SettingsComponent.prototype.onEnter = function () {
        this.newRelic.setPageViewName('Setting');
        // get contact number and email from local storage
        this.profile.email = this.storage.getUser().email;
        this.profile.contactNumber = this.storage.getUser().contactNumber;
        this.profile.image = this.storage.getUser().image ? this.storage.getUser().image : 'https://my.practera.com/img/user-512.png';
        this.profile.name = this.storage.getUser().name;
        this.acceptFileTypes = this.filestackService.getFileTypes('image');
        // also get program name
        this.currentProgramName = this.storage.getUser().programName;
        this.currentProgramImage = this._getCurrentProgramImage();
        this.fastFeedbackService.pullFastFeedback().subscribe();
        this.returnLtiUrl = this.storage.getUser().LtiReturnUrl;
    };
    // loading pragram image to settings page by resizing it depend on device.
    // in mobile we are not showing card with image but in some mobile phones on landscape mode desktop view is loading.
    // because of that we load image also in mobile view.
    SettingsComponent.prototype._getCurrentProgramImage = function () {
        if (!this.utils.isEmpty(this.storage.getUser().programImage)) {
            var imagewidth = 600;
            var imageId = this.storage.getUser().programImage.split('/').pop();
            if (!this.utils.isMobile()) {
                imagewidth = 1024;
            }
            return "" + this.cdn + imagewidth + "/" + imageId;
        }
        return '';
    };
    SettingsComponent.prototype.openLink = function () {
        this.newRelic.actionText('Open T&C link');
        window.open(this.termsUrl, '_system');
    };
    SettingsComponent.prototype.switchProgram = function () {
        if (this.returnLtiUrl) {
            this.newRelic.actionText('browse to LTI return link');
            window.location.href = 'https://' + this.returnLtiUrl;
        }
        else {
            this.newRelic.actionText('browse to program switcher');
            this.router.navigate(['switcher', 'switcher-program']);
        }
    };
    SettingsComponent.prototype.isInMultiplePrograms = function () {
        return this.storage.get('programs').length > 1;
    };
    // send email to Help request
    SettingsComponent.prototype.mailTo = function () {
        this.newRelic.actionText('mail to helpline');
        var mailto = 'mailto:' + this.helpline + '?subject=' + this.currentProgramName;
        window.open(mailto, '_self');
    };
    // for Native only: go to setting app's setting page (android) or permission setting page (iOS)
    SettingsComponent.prototype.goToNativeSetting = function () {
        return CapacitorPusherBeamsAuth.goToAppSetting();
    };
    SettingsComponent.prototype.logout = function () {
        return this.authService.logout();
    };
    SettingsComponent.prototype.uploadProfileImage = function (file, type) {
        if (type === void 0) { type = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (file.success) {
                    this.newRelic.actionText('Upload profile image');
                    this.imageUpdating = true;
                    this.settingService.updateProfileImage({
                        image: file.data.url
                    }).subscribe(function (success) {
                        _this.imageUpdating = false;
                        _this.profile.image = file.data.url;
                        _this.storage.setUser({
                            image: file.data.url
                        });
                        return _this.notificationService.alert({
                            message: 'Profile picture successfully updated!',
                            buttons: [
                                {
                                    text: 'OK',
                                    role: 'cancel'
                                }
                            ]
                        });
                    }, function (err) {
                        _this.newRelic.noticeError("Image upload failed: " + JSON.stringify(err));
                        _this.imageUpdating = false;
                        return _this.notificationService.alert({
                            message: 'File upload failed, please try again later.',
                            buttons: [
                                {
                                    text: 'OK',
                                    role: 'cancel'
                                }
                            ]
                        });
                    });
                }
                else {
                    return [2 /*return*/, this.notificationService.alert({
                            message: 'File upload failed, please try again later.',
                            buttons: [
                                {
                                    text: 'OK',
                                    role: 'cancel'
                                }
                            ]
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    SettingsComponent.prototype.subscribeInterest = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var interests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        PusherBeams.echo({ value: text });
                        PusherBeams.addDeviceInterest({ interest: text });
                        return [4 /*yield*/, PusherBeams.getDeviceInterests()];
                    case 1:
                        interests = _a.sent();
                        console.log('interests::', interests);
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsComponent.prototype.unsubscribeInterest = function (text) {
        PusherBeams.removeDeviceInterest({ interest: text });
    };
    SettingsComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
        { type: _setting_service__WEBPACK_IMPORTED_MODULE_3__["SettingService"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_5__["UtilsService"] },
        { type: _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"] },
        { type: _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_9__["FilestackService"] },
        { type: _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_8__["FastFeedbackService"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_10__["NewRelicService"] }
    ]; };
    SettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-settings',
            template: __importDefault(__webpack_require__(/*! raw-loader!./settings.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/settings/settings.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./settings.component.scss */ "./src/app/settings/settings.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _setting_service__WEBPACK_IMPORTED_MODULE_3__["SettingService"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["BrowserStorageService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_5__["UtilsService"],
            _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"],
            _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_9__["FilestackService"],
            _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_8__["FastFeedbackService"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_10__["NewRelicService"]])
    ], SettingsComponent);
    return SettingsComponent;
}(_services_router_enter_service__WEBPACK_IMPORTED_MODULE_7__["RouterEnter"]));



/***/ }),

/***/ "./src/app/settings/settings.module.ts":
/*!*********************************************!*\
  !*** ./src/app/settings/settings.module.ts ***!
  \*********************************************/
/*! exports provided: SettingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _settings_routing_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings-routing.component */ "./src/app/settings/settings-routing.component.ts");
/* harmony import */ var _settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.component */ "./src/app/settings/settings.component.ts");
/* harmony import */ var _settings_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings-routing.module */ "./src/app/settings/settings-routing.module.ts");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular2-text-mask */ "./node_modules/angular2-text-mask/__ivy_ngcc__/dist/angular2TextMask.js");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angular2_text_mask__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_filestack_filestack_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/filestack/filestack.module */ "./src/app/shared/filestack/filestack.module.ts");
/* harmony import */ var _fast_feedback_fast_feedback_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../fast-feedback/fast-feedback.module */ "./src/app/fast-feedback/fast-feedback.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"],
                _settings_routing_module__WEBPACK_IMPORTED_MODULE_4__["SettingsRoutingModule"],
                angular2_text_mask__WEBPACK_IMPORTED_MODULE_5__["TextMaskModule"],
                _shared_filestack_filestack_module__WEBPACK_IMPORTED_MODULE_6__["FilestackModule"],
                _fast_feedback_fast_feedback_module__WEBPACK_IMPORTED_MODULE_7__["FastFeedbackModule"]
            ],
            declarations: [
                _settings_routing_component__WEBPACK_IMPORTED_MODULE_2__["SettingsRoutingComponent"],
                _settings_component__WEBPACK_IMPORTED_MODULE_3__["SettingsComponent"]
            ],
            exports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"],
                _shared_filestack_filestack_module__WEBPACK_IMPORTED_MODULE_6__["FilestackModule"],
                _fast_feedback_fast_feedback_module__WEBPACK_IMPORTED_MODULE_7__["FastFeedbackModule"]
            ]
        })
    ], SettingsModule);
    return SettingsModule;
}());



/***/ })

}]);
//# sourceMappingURL=settings-settings-module.js.map