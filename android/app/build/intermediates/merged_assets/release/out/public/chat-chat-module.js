(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chat-chat-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-list/chat-list.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-list/chat-list.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header mode=\"ios\">\n  <ion-toolbar [ngClass]=\"{'ion-toolbar-absolute': !utils.isMobile()}\">\n    <ion-title>Chat</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content color=\"light\" [ngClass]=\"{'ion-content-absolute': !utils.isMobile()}\">\n  <ng-container *ngIf=\"loadingChatList\">\n    <div class=\"ion-text-center\">\n      <ion-spinner></ion-spinner>\n    </div>\n  </ng-container>\n  <ion-list [ngClass]=\"{'desktop-view': !utils.isMobile()}\">\n    <clickable-item\n      *ngFor=\"let chat of chatList; let i = index\"\n      (click)=\"navigateToChatRoom(chat)\"\n      [active]=\"currentChat &&\n      (currentChat.teamId == chat.team_id) &&\n      (currentChat.teamMemberId == chat.team_member_id) &&\n      (currentChat.participantsOnly == chat.participants_only) &&\n      (currentChat.chatName == chat.name)\"\n      [ngClass]=\"{'unread': chat.unread_messages > 0}\"\n      [lines]=\"'none'\">\n      <ion-avatar [ngClass]=\"{'color-team': chat.is_team}\" slot=\"start\" text-center>\n        <ng-container *ngIf=\"chat.is_team; else avatarElseBlock\"><ion-icon name=\"people-outline\"></ion-icon></ng-container>\n        <ng-template #avatarElseBlock><img [src]=\"chat.team_member_image\"></ng-template>\n      </ion-avatar>\n      <ion-label>\n        <div class=\"chat-name-container caption\">\n          <p class=\"chat-name subtitle-1\" [ngClass]=\"{'team-channel': chat.is_team, 'bold': chat.unread_messages > 0}\">{{chat.name}}</p>\n          <ng-container *ngIf=\"(chat.role === 'mentor') && (haveMoreTeam)\">\n            <span>mentor - {{chat.team_name}}</span>\n          </ng-container>\n          <ng-container *ngIf=\"(chat.role === 'mentor') && (!haveMoreTeam)\">\n            <span>mentor</span>\n          </ng-container>\n          <ng-container *ngIf=\"(chat.role !== 'mentor') && (!chat.is_team) && (haveMoreTeam)\">\n            <span>{{chat.team_name}}</span>\n          </ng-container>\n        </div>\n        <ng-container *ngIf=\"chat.last_message; else messgeElseBlock\">\n          <p class=\"body-2\">{{chat.last_message}}</p>\n        </ng-container>\n        <ng-template #messgeElseBlock><p class=\"body-2 gray-2\">No messages.</p></ng-template>\n      </ion-label>\n      <div slot=\"end\" class=\"time-container\">\n        <div class=\"caption gray-2\">\n          <span>{{getChatDate(chat.last_message_created)}}</span>\n        </div>\n        <ng-container *ngIf=\"chat.unread_messages > 0\">\n          <ion-badge class=\"caption\">{{chat.unread_messages}}</ion-badge>\n        </ng-container>\n      </div>\n    </clickable-item>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-preview/chat-preview.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-preview/chat-preview.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header mode=\"ios\">\n  <ion-toolbar>\n    <ion-icon *ngIf=\"file.url\"\n      name=\"download\"\n      (click)=\"download()\"\n      color=\"primary\"\n      size=\"large\"\n      slot=\"end\"\n      margin-start\n    ></ion-icon>\n\n    <ion-icon name=\"close-circle-outline\"\n      (click)=\"close()\"\n      color=\"primary\"\n      size=\"large\"\n      slot=\"end\"\n      margin-start\n    ></ion-icon>\n  </ion-toolbar>\n</ion-header>\n<ion-content text-center>\n  <div class=\"wrapper\">\n    <ng-container *ngIf=\"file && file.mimetype.includes('image')\">\n      <img [src]=\"file.url\">\n    </ng-container>\n\n    <ng-container *ngIf=\"file && file.mimetype.includes('video')\">\n        <video controls>\n          <ng-container *ngIf=\"file.transcoded\">\n            <source [src]=\"file.transcoded + '.mp4#t=0.5'\" type=\"video/mp4\">\n            <source [src]=\"file.transcoded + '.webm'\" type=\"video/webm\">\n            <source [src]=\"file.transcoded + '.ts'\">\n          </ng-container>\n          <source [src]=\"file.url\" [type]=\"file.mimetype\">\n          {{ file.url }}\n        </video>\n    </ng-container>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-room/chat-room.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-room/chat-room.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header mode=\"ios\">\n  <ion-toolbar [ngClass]=\"{'ion-toolbar-absolute': !utils.isMobile()}\">\n    <ion-icon *ngIf=\"utils.isMobile()\" name=\"arrow-back\" (click)=\"back()\" color=\"primary\" slot=\"start\" margin-start></ion-icon>\n    <ion-title class=\"ion-text-center\" [ngClass]=\"{\n      'subtitle-2': !utils.isMobile()\n    }\">{{selectedChat.is_team ? selectedChat.team_name : selectedChat.name}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content [ngClass]=\"{'ion-content-absolute-with-footer': !utils.isMobile()}\" color=\"light\" [scrollEvents]=\"true\" (ionScroll)=\"loadMoreMessages($event)\">\n  <ng-container *ngIf=\"loadingChatMessages\">\n    <div class=\"ion-text-center\">\n      <ion-spinner></ion-spinner>\n    </div>\n  </ng-container>\n  <ion-list lines=\"none\" color=\"light\" class=\"chat-list\" [ngClass]=\"{'desktop-view': !utils.isMobile()}\">\n    <ng-container *ngFor=\"let message of messageList\">\n      <ion-item color=\"light\">\n        <ng-container *ngIf=\"checkIsLastMessage(message)\">\n          <ion-avatar [ngClass]=\"getAvatarClass(message)\" slot=\"start\">\n            <img [src]=\"message.sender_image\">\n          </ion-avatar>\n        </ng-container>\n\n        <ng-container *ngIf=\"!message.file; else attachment\">\n          <ion-label [ngClass]=\"getClassForMessageBubble(message)\">\n            <div *ngIf=\"checkToShowMessageTime(message)\" class=\"time caption gray-2\">\n              <p>{{getMessageDate(message.sent_time)}}</p>\n            </div>\n            <div class=\"message-body\">\n              <p class=\"message-text subtitle-1\" [innerHTML]=\"message.message\"></p>\n            </div>\n            <ng-container *ngIf=\"!message.noAvatar && selectedChat.is_team\">\n              <div class=\"seen-text caption gray-2\">\n                <p>{{message.sender_name}}</p>\n              </div>\n            </ng-container>\n          </ion-label>\n        </ng-container>\n\n        <ng-template #attachment>\n          <ion-label [ngClass]=\"getClassForMessageBubble(message)\" text-wrap>\n            <div *ngIf=\"checkToShowMessageTime(message)\" class=\"time\">\n              <p>{{getMessageDate(message.sent_time)}}</p>\n            </div>\n\n            <ng-container *ngIf=\"message.file && message.file.mimetype.includes('video')\">\n              <div  class=\"message-body video-attachment-container\">\n                <div id=\"inner-box\" (click)=\"preview(message.file)\">\n                  <p><ion-icon name=\"play-circle\"></ion-icon></p>\n                </div>\n                <div class=\"label\">\n                  <p>\n                    <ion-label color=\"primary\">\n                      {{ message.file.filename }}\n                    </ion-label>\n                  </p>\n                </div>\n              </div>\n            </ng-container>\n\n            <ng-container *ngIf=\"message.file && message.file.mimetype.includes('image')\">\n              <div class=\"message-body image\" (click)=\"preview(message.file)\">\n                <div [innerHTML]=\"message.preview\"></div>\n              </div>\n            </ng-container>\n\n            <ng-container *ngIf=\"message.file && (\n              !message.file.mimetype.includes('image') && !message.file.mimetype.includes('video')\n            )\">\n              <ion-item class=\"message-body general-attachment\" (click)=\"previewFile(message.file)\">\n                <ion-ripple-effect></ion-ripple-effect>\n                <ion-icon name=\"document-outline\" slot=\"start\"></ion-icon>\n                <ion-label color=\"primary\">\n                  {{ message.file.filename }}\n                </ion-label>\n                <ion-note *ngIf=\"getTypeByMime(message.file.mimetype)\">\n                  {{ getTypeByMime(message.file.mimetype) }}\n                </ion-note>\n              </ion-item>\n            </ng-container>\n\n            <ng-container *ngIf=\"!message.noAvatar && selectedChat.is_team\">\n              <div class=\"seen-text caption gray-2\">\n                <p>{{message.sender_name}}</p>\n              </div>\n            </ng-container>\n          </ion-label>\n        </ng-template>\n\n      </ion-item>\n    </ng-container>\n    <ng-container *ngIf=\"isTyping\">\n      <ion-item color=\"light\">\n        <ion-label class=\"received-messages no-avatar\" color=\"medium\">\n          <p class=\"message-typing\">\n            <i>{{typingMessage}}</i>\n            <ion-spinner name=\"dots\" class=\"vertical-middle\"></ion-spinner>\n          </p>\n        </ion-label>\n      </ion-item>\n    </ng-container>\n    <ng-container *ngIf=\"loadingMesageSend\">\n      <ion-item color=\"light\">\n        <div class=\"message-sending-loading\">\n            <ion-spinner name=\"bubbles\"></ion-spinner>\n        </div>\n      </ion-item>\n    </ng-container>\n  </ion-list>\n  <ng-container *ngIf=\"!messageList.length && !loadingChatMessages\">\n    <div class=\"ion-text-center not-started-empty-status\">\n      <img class=\"image\" [ngClass]=\"{'desktop': !utils.isMobile()}\" src=\"/assets/icon-epmty-chat.svg\">\n      <p class=\"head-text headline-5 gray-3\">Type your first message!</p>\n      <p class=\"sub-text subtitle-1 gray-1\">It's time to start a chat</p>\n    </div>\n  </ng-container>\n</ion-content>\n<ion-footer class=\"footer\" [ngClass]=\"{'ion-footer-absolute': !utils.isMobile(), 'focus': showBottomAttachmentButtons}\">\n  <ion-grid class=\"white-bg\">\n    <ion-row nowrap class=\"ion-no-padding\">\n      <ion-col [size]=\"!utils.isMobile() || showBottomAttachmentButtons ? '12' : '9'\" class=\"ion-align-self-center\">\n        <ion-textarea\n          placeholder=\"Enter your message\"\n          required=\"true\"\n          name=\"message\"\n          [(ngModel)]=\"message\"\n          (ngModelChange)=\"typing()\"\n          appAutoresize=\"100\"\n          rows=\"1\"\n          (ionFocus)=\"showBottomAttachmentButtons = true;\"\n        ></ion-textarea>\n      </ion-col>\n      <ng-container *ngIf=\"utils.isMobile() && !showBottomAttachmentButtons\">\n        <ng-container *ngTemplateOutlet=\"attachmentButtons; context: { offset: 0 }\"></ng-container>\n      </ng-container>\n    </ion-row>\n    <ion-row nowrap class=\"ion-no-padding ion-align-items-end\" *ngIf=\"!utils.isMobile() || showBottomAttachmentButtons\">\n      <ng-container *ngTemplateOutlet=\"attachmentButtons; context: { offset: 8 }\"></ng-container>\n      <ion-col class=\"ion-no-padding ion-text-center\">\n        <ion-button (click)=\"sendMessage()\" type=\"submit\" fill=\"clear\" class=\"ion-no-padding\">\n          <ion-icon name=\"send-outline\" slot=\"icon-only\"></ion-icon>\n        </ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-footer>\n\n<ng-template #attachmentButtons let-offset=\"offset\">\n  <ion-col [offset]=\"offset\" class=\"ion-no-padding ion-text-center\">\n    <ion-button (click)=\"attach('video')\" fill=\"clear\" class=\"ion-no-padding\">\n      <ion-icon name=\"film-outline\" slot=\"icon-only\"></ion-icon>\n    </ion-button>\n  </ion-col>\n  <ion-col class=\"ion-no-padding ion-text-center\">\n    <ion-button (click)=\"attach('image')\" fill=\"clear\" class=\"ion-no-padding\">\n      <ion-icon name=\"images-outline\" slot=\"icon-only\"></ion-icon>\n    </ion-button>\n  </ion-col>\n  <ion-col class=\"ion-no-padding ion-text-center\">\n    <ion-button (click)=\"attach('any')\" fill=\"clear\" class=\"ion-no-padding\">\n      <ion-icon name=\"attach-outline\" slot=\"icon-only\"></ion-icon>\n    </ion-button>\n  </ion-col>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-view/chat-view.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-view/chat-view.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-split-pane *ngIf=\"!utils.isMobile()\" contentId=\"main\" when=\"xs\">\n  <app-chat-list\n    #chatList\n    style=\"display: flex\"\n    [currentChat]=\"getCurrentChat()\"\n    (navigate)=\"goto($event)\"\n    (chatListReady)=\"selectFirstChat($event)\">\n  </app-chat-list>\n  <ion-content color=\"light\" id=\"main\">\n    <app-chat-room #chatRoom *ngIf=\"teamId\"\n      [teamId]=\"teamId\"\n      [teamMemberId]=\"teamMemberId\"\n      [participantsOnly]=\"participantsOnly\"\n      [chatName]=\"chatName\"></app-chat-room>\n  </ion-content>\n</ion-split-pane>\n\n<ion-content *ngIf=\"utils.isMobile()\">\n  <app-chat-list #chatList></app-chat-list>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/chat/chat-list/chat-list.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/chat/chat-list/chat-list.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".ion-toolbar-absolute {\n  text-align: center;\n}\n\nion-avatar {\n  text-align: center;\n}\n\nion-avatar ion-icon {\n  width: 32px;\n  height: 32px;\n  color: white;\n}\n\nion-avatar.color-team {\n  background-color: var(--ion-color-primary);\n}\n\nclickable-item .bold {\n  font-weight: bold;\n}\n\nclickable-item .item-inner {\n  border: none !important;\n}\n\nclickable-item ion-label {\n  margin: 10px 0 10px 0 !important;\n}\n\nclickable-item ion-label .chat-name-container {\n  display: -webkit-inline-box !important;\n  display: inline-flex !important;\n  flex-wrap: wrap;\n  text-overflow: inherit;\n  overflow: inherit;\n  width: 100% !important;\n}\n\nclickable-item ion-label .chat-name-container span {\n  border: 1px solid var(--ion-color-primary);\n  padding: 1px 5px 0 5px;\n  border-radius: 10px;\n  vertical-align: baseline;\n  text-align: center;\n  white-space: nowrap;\n  max-width: 70% !important;\n  text-overflow: inherit;\n  overflow: inherit;\n  color: var(--ion-color-primary);\n}\n\nclickable-item ion-label .chat-name-container .chat-name {\n  text-overflow: inherit;\n  overflow: inherit;\n  max-width: 90%;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n  margin-right: 3px;\n}\n\nclickable-item ion-label .chat-name-container .chat-name.team-channel {\n  margin-right: 3px;\n  max-width: -webkit-fill-available !important;\n  width: auto !important;\n}\n\nclickable-item ion-label .chat-name-container .chat-name.team-channel .chat-name-container {\n  display: block !important;\n}\n\nclickable-item .time-container {\n  width: 22% !important;\n  display: grid;\n  justify-items: end;\n  margin-left: 4px !important;\n}\n\nclickable-item .time-container ion-badge {\n  margin-top: 2px;\n  max-width: 43px !important;\n  max-height: 20px;\n  min-width: 20px;\n  min-height: 20px;\n  border-radius: 8px !important;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n\n.desktop-view .time-container {\n  width: auto !important;\n  height: 100%;\n  padding-bottom: 10px;\n  padding-top: 10px;\n}\n\n.desktop-view clickable-item ion-label .chat-name-container span {\n  max-width: none !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9jaGF0L2NoYXQtbGlzdC9jaGF0LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NoYXQvY2hhdC1saXN0L2NoYXQtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxrQkFBQTtBQ0VGOztBRERFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDR0o7O0FEQ0U7RUFDRSwwQ0FBQTtBQ0NKOztBREtFO0VBQ0UsaUJBQUE7QUNGSjs7QURJRTtFQUNFLHVCQUFBO0FDRko7O0FES0U7RUFDRSxnQ0FBQTtBQ0hKOztBREtJO0VBQ0Usc0NBQUE7RUFBQSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7QUNITjs7QURLTTtFQUNFLDBDQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtFQUNBLCtCQUFBO0FDSFI7O0FETU07RUFDRSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLDBCQUFBO0VBQUEsdUJBQUE7RUFBQSxrQkFBQTtFQUNBLGlCQUFBO0FDSlI7O0FETVE7RUFDRSxpQkFBQTtFQUNBLDRDQUFBO0VBQ0Esc0JBQUE7QUNKVjs7QURLVTtFQUNFLHlCQUFBO0FDSFo7O0FEV0U7RUFDRSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0FDVEo7O0FEV0k7RUFDRSxlQUFBO0VBQ0EsMEJBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDZCQUFBO0VBQ0EsMEJBQUE7RUFBQSx1QkFBQTtFQUFBLGtCQUFBO0FDVE47O0FEZUU7RUFDRSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0FDWko7O0FEaUJRO0VBQ0UsMEJBQUE7QUNmViIsImZpbGUiOiJzcmMvYXBwL2NoYXQvY2hhdC1saXN0L2NoYXQtbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pb24tdG9vbGJhci1hYnNvbHV0ZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmlvbi1hdmF0YXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGlvbi1pY29uIHtcbiAgICB3aWR0aDogMzJweDtcbiAgICBoZWlnaHQ6IDMycHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG5cbiAgLy8gY2hhdCBhdmF0YXIgY29sb3JzXG4gICYuY29sb3ItdGVhbSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICB9XG5cbn1cblxuY2xpY2thYmxlLWl0ZW0ge1xuICAuYm9sZCB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cbiAgLml0ZW0taW5uZXIge1xuICAgIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50O1xuICB9XG5cbiAgaW9uLWxhYmVsIHtcbiAgICBtYXJnaW46IDEwcHggMCAxMHB4IDAgIWltcG9ydGFudDtcblxuICAgIC5jaGF0LW5hbWUtY29udGFpbmVyIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4ICFpbXBvcnRhbnQ7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICB0ZXh0LW92ZXJmbG93OiBpbmhlcml0O1xuICAgICAgb3ZlcmZsb3c6IGluaGVyaXQ7XG4gICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuXG4gICAgICBzcGFuIHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBwYWRkaW5nOiAxcHggNXB4IDAgNXB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgbWF4LXdpZHRoOiA3MCUgIWltcG9ydGFudDtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogaW5oZXJpdDtcbiAgICAgICAgb3ZlcmZsb3c6IGluaGVyaXQ7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIC5jaGF0LW5hbWUge1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBpbmhlcml0O1xuICAgICAgICBvdmVyZmxvdzogaW5oZXJpdDtcbiAgICAgICAgbWF4LXdpZHRoOiA5MCU7XG4gICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAzcHg7XG5cbiAgICAgICAgJi50ZWFtLWNoYW5uZWwge1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogM3B4O1xuICAgICAgICAgIG1heC13aWR0aDogLXdlYmtpdC1maWxsLWF2YWlsYWJsZSAhaW1wb3J0YW50O1xuICAgICAgICAgIHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgICAgICAgLmNoYXQtbmFtZS1jb250YWluZXIge1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIC50aW1lLWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDIyJSAhaW1wb3J0YW50O1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAganVzdGlmeS1pdGVtczogZW5kO1xuICAgIG1hcmdpbi1sZWZ0OiA0cHggIWltcG9ydGFudDtcblxuICAgIGlvbi1iYWRnZSB7XG4gICAgICBtYXJnaW4tdG9wOiAycHg7XG4gICAgICBtYXgtd2lkdGg6IDQzcHggIWltcG9ydGFudDtcbiAgICAgIG1heC1oZWlnaHQ6IDIwcHg7XG4gICAgICBtaW4td2lkdGg6IDIwcHg7XG4gICAgICBtaW4taGVpZ2h0OiAyMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4ICFpbXBvcnRhbnQ7XG4gICAgICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gICAgfVxuXG4gIH1cbn1cbi5kZXNrdG9wLXZpZXcge1xuICAudGltZS1jb250YWluZXIge1xuICAgIHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xuICB9XG4gIGNsaWNrYWJsZS1pdGVtIHtcbiAgICBpb24tbGFiZWwge1xuICAgICAgLmNoYXQtbmFtZS1jb250YWluZXIge1xuICAgICAgICBzcGFuIHtcbiAgICAgICAgICBtYXgtd2lkdGg6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLmlvbi10b29sYmFyLWFic29sdXRlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5pb24tYXZhdGFyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuaW9uLWF2YXRhciBpb24taWNvbiB7XG4gIHdpZHRoOiAzMnB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbmlvbi1hdmF0YXIuY29sb3ItdGVhbSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuY2xpY2thYmxlLWl0ZW0gLmJvbGQge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbmNsaWNrYWJsZS1pdGVtIC5pdGVtLWlubmVyIHtcbiAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7XG59XG5jbGlja2FibGUtaXRlbSBpb24tbGFiZWwge1xuICBtYXJnaW46IDEwcHggMCAxMHB4IDAgIWltcG9ydGFudDtcbn1cbmNsaWNrYWJsZS1pdGVtIGlvbi1sYWJlbCAuY2hhdC1uYW1lLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4ICFpbXBvcnRhbnQ7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgdGV4dC1vdmVyZmxvdzogaW5oZXJpdDtcbiAgb3ZlcmZsb3c6IGluaGVyaXQ7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG59XG5jbGlja2FibGUtaXRlbSBpb24tbGFiZWwgLmNoYXQtbmFtZS1jb250YWluZXIgc3BhbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcGFkZGluZzogMXB4IDVweCAwIDVweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG1heC13aWR0aDogNzAlICFpbXBvcnRhbnQ7XG4gIHRleHQtb3ZlcmZsb3c6IGluaGVyaXQ7XG4gIG92ZXJmbG93OiBpbmhlcml0O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuY2xpY2thYmxlLWl0ZW0gaW9uLWxhYmVsIC5jaGF0LW5hbWUtY29udGFpbmVyIC5jaGF0LW5hbWUge1xuICB0ZXh0LW92ZXJmbG93OiBpbmhlcml0O1xuICBvdmVyZmxvdzogaW5oZXJpdDtcbiAgbWF4LXdpZHRoOiA5MCU7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgbWFyZ2luLXJpZ2h0OiAzcHg7XG59XG5jbGlja2FibGUtaXRlbSBpb24tbGFiZWwgLmNoYXQtbmFtZS1jb250YWluZXIgLmNoYXQtbmFtZS50ZWFtLWNoYW5uZWwge1xuICBtYXJnaW4tcmlnaHQ6IDNweDtcbiAgbWF4LXdpZHRoOiAtd2Via2l0LWZpbGwtYXZhaWxhYmxlICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7XG59XG5jbGlja2FibGUtaXRlbSBpb24tbGFiZWwgLmNoYXQtbmFtZS1jb250YWluZXIgLmNoYXQtbmFtZS50ZWFtLWNoYW5uZWwgLmNoYXQtbmFtZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xufVxuY2xpY2thYmxlLWl0ZW0gLnRpbWUtY29udGFpbmVyIHtcbiAgd2lkdGg6IDIyJSAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWl0ZW1zOiBlbmQ7XG4gIG1hcmdpbi1sZWZ0OiA0cHggIWltcG9ydGFudDtcbn1cbmNsaWNrYWJsZS1pdGVtIC50aW1lLWNvbnRhaW5lciBpb24tYmFkZ2Uge1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIG1heC13aWR0aDogNDNweCAhaW1wb3J0YW50O1xuICBtYXgtaGVpZ2h0OiAyMHB4O1xuICBtaW4td2lkdGg6IDIwcHg7XG4gIG1pbi1oZWlnaHQ6IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweCAhaW1wb3J0YW50O1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG59XG5cbi5kZXNrdG9wLXZpZXcgLnRpbWUtY29udGFpbmVyIHtcbiAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG59XG4uZGVza3RvcC12aWV3IGNsaWNrYWJsZS1pdGVtIGlvbi1sYWJlbCAuY2hhdC1uYW1lLWNvbnRhaW5lciBzcGFuIHtcbiAgbWF4LXdpZHRoOiBub25lICFpbXBvcnRhbnQ7XG59Il19 */");

/***/ }),

/***/ "./src/app/chat/chat-list/chat-list.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/chat/chat-list/chat-list.component.ts ***!
  \*******************************************************/
/*! exports provided: ChatListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatListComponent", function() { return ChatListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../fast-feedback/fast-feedback.service */ "./src/app/fast-feedback/fast-feedback.service.ts");
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../chat.service */ "./src/app/chat/chat.service.ts");
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







var ChatListComponent = /** @class */ (function () {
    function ChatListComponent(chatService, router, storage, utils, fastFeedbackService, newrelic, ngZone) {
        var _this = this;
        this.chatService = chatService;
        this.router = router;
        this.storage = storage;
        this.utils = utils;
        this.fastFeedbackService = fastFeedbackService;
        this.newrelic = newrelic;
        this.ngZone = ngZone;
        this.navigate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chatListReady = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.currentChat = {};
        this.loadingChatList = true;
        this.newrelic.setPageViewName('Chat list');
        var role = this.storage.getUser().role;
        this.utils.getEvent('team-message').subscribe(function (event) {
            _this._loadChatData();
        });
        if (role !== 'mentor') {
            this.utils.getEvent('team-no-mentor-message').subscribe(function (event) {
                _this._loadChatData();
            });
        }
        if (!this.utils.isMobile()) {
            this.utils.getEvent('chat-badge-update').subscribe(function (event) {
                var chatIndex = _this.chatList.findIndex(function (data, index) {
                    return (event.teamID === data.team_id) &&
                        (event.teamMemberId === data.team_member_id) &&
                        (event.chatName === data.name) &&
                        (event.participantsOnly === data.participants_only);
                });
                if (chatIndex > -1) {
                    // set time out because when this calling from pusher events it need a time out.
                    setTimeout(function () {
                        _this.chatList[chatIndex].unread_messages -= event.readcount;
                    });
                }
            });
        }
    }
    ChatListComponent.prototype.onEnter = function () {
        this._initialise();
        this._loadChatData();
        this.fastFeedbackService.pullFastFeedback().subscribe();
    };
    ChatListComponent.prototype._initialise = function () {
        this.haveMoreTeam = false;
        this.loadingChatList = true;
        this.chatList = new Array();
    };
    ChatListComponent.prototype._loadChatData = function () {
        var _this = this;
        this.chatService.getchatList().subscribe(function (chats) {
            _this.chatList = chats;
            _this._checkHaveMoreTeam();
            _this.chatListReady.emit(_this.chatList);
        });
    };
    /**
     * this method check is this user in multiple teams.
     */
    ChatListComponent.prototype._checkHaveMoreTeam = function () {
        if (this.chatList.length > 0) {
            var myRole = this.storage.getUser().role;
            var index = 0;
            var teamCount = 0;
            for (index = 0; index < this.chatList.length; index++) {
                if (this.chatList[index].is_team) {
                    if (myRole === 'mentor' || !this.chatList[index].participants_only) {
                        teamCount++;
                    }
                }
            }
            if (teamCount > 1) {
                this.haveMoreTeam = true;
            }
            else {
                this.haveMoreTeam = false;
            }
            this.loadingChatList = false;
        }
    };
    // force every navigation happen under radar of angular
    ChatListComponent.prototype._navigate = function (direction) {
        var _this = this;
        if (this.utils.isMobile()) {
            // redirect to chat room page for mobile
            return this.ngZone.run(function () {
                return _this.router.navigate(direction);
            });
        }
        else {
            // emit event to parent component(chat view component)
            if (direction[2] === 'team') {
                this.navigate.emit({
                    teamId: direction[3],
                    participantsOnly: direction[4],
                    chatName: direction[5] ? direction[5].name : null
                });
                return;
            }
            else {
                this.navigate.emit({
                    teamId: direction[2],
                    teamMemberId: direction[3],
                    chatName: direction[4] ? direction[4].name : null
                });
                return;
            }
        }
    };
    ChatListComponent.prototype.navigateToChatRoom = function (chat) {
        this.newrelic.addPageAction('selected chat room', {
            isTeam: chat.is_team,
            raw: chat,
        });
        if (chat.is_team) {
            this._navigate([
                'chat',
                'chat-room',
                'team',
                chat.team_id,
                chat.participants_only,
                {
                    name: chat.name
                }
            ]);
        }
        else {
            this._navigate([
                'chat',
                'chat-room',
                chat.team_id,
                chat.team_member_id,
                {
                    name: chat.name
                }
            ]);
        }
    };
    ChatListComponent.prototype.getChatDate = function (date) {
        return this.utils.timeFormatter(date);
    };
    ChatListComponent.ctorParameters = function () { return [
        { type: _chat_service__WEBPACK_IMPORTED_MODULE_5__["ChatService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_2__["BrowserStorageService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
        { type: _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_4__["FastFeedbackService"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_6__["NewRelicService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ChatListComponent.prototype, "navigate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ChatListComponent.prototype, "chatListReady", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ChatListComponent.prototype, "currentChat", void 0);
    ChatListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chat-list',
            template: __importDefault(__webpack_require__(/*! raw-loader!./chat-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-list/chat-list.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./chat-list.component.scss */ "./src/app/chat/chat-list/chat-list.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_chat_service__WEBPACK_IMPORTED_MODULE_5__["ChatService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_2__["BrowserStorageService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"],
            _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_4__["FastFeedbackService"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_6__["NewRelicService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]])
    ], ChatListComponent);
    return ChatListComponent;
}());



/***/ }),

/***/ "./src/app/chat/chat-preview/chat-preview.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/chat/chat-preview/chat-preview.component.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".wrapper {\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\nvideo {\n  max-width: 100%;\n  max-height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9jaGF0L2NoYXQtcHJldmlldy9jaGF0LXByZXZpZXcuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NoYXQvY2hhdC1wcmV2aWV3L2NoYXQtcHJldmlldy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9jaGF0L2NoYXQtcHJldmlldy9jaGF0LXByZXZpZXcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud3JhcHBlciB7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbnZpZGVvIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xufVxuIiwiLndyYXBwZXIge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG52aWRlbyB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMTAwJTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/chat/chat-preview/chat-preview.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/chat/chat-preview/chat-preview.component.ts ***!
  \*************************************************************/
/*! exports provided: ChatPreviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPreviewComponent", function() { return ChatPreviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm5/ionic-angular.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/platform-browser.js");
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



var ChatPreviewComponent = /** @class */ (function () {
    function ChatPreviewComponent(modalController, sanitizer) {
        this.modalController = modalController;
        this.sanitizer = sanitizer;
        this.file = {};
    }
    ChatPreviewComponent.prototype.download = function () {
        return window.open(this.file.url, '_system');
    };
    ChatPreviewComponent.prototype.close = function () {
        this.modalController.dismiss();
    };
    ChatPreviewComponent.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }
    ]; };
    ChatPreviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'chat-preview',
            template: __importDefault(__webpack_require__(/*! raw-loader!./chat-preview.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-preview/chat-preview.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./chat-preview.component.scss */ "./src/app/chat/chat-preview/chat-preview.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], ChatPreviewComponent);
    return ChatPreviewComponent;
}());



/***/ }),

/***/ "./src/app/chat/chat-room/chat-room.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/chat/chat-room/chat-room.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".not-started-empty-status {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n.not-started-empty-status .head-text {\n  margin-bottom: 0px;\n  margin-top: 0px;\n}\n.not-started-empty-status .head-text.desktop {\n  margin-top: 24px;\n}\n.not-started-empty-status .sub-text {\n  margin-top: 5px;\n}\n.not-started-empty-status .image {\n  min-width: 96px;\n  min-height: 96px;\n  max-width: 96px;\n  max-height: 96px;\n}\n.not-started-empty-status .image.desktop {\n  min-width: 120px;\n  min-height: 120px;\n  max-width: 120px;\n  max-height: 120px;\n}\n.chat-list {\n  background-color: transparent !important;\n}\n.chat-list ion-item ion-avatar {\n  width: 32px;\n  height: 32px;\n  margin: 0 12px 2px 0 !important;\n  margin-left: -8px !important;\n}\n.chat-list ion-item ion-avatar.no-time {\n  margin-top: 8% !important;\n}\n.chat-list ion-item ion-avatar.no-time-team {\n  margin-top: -8% !important;\n}\n.chat-list ion-item ion-label .time {\n  width: 100%;\n  text-align: center;\n  margin-bottom: 8px;\n}\n.chat-list ion-item ion-label .message-body {\n  padding: 8px 16px;\n  min-width: 48px;\n  max-width: 224px;\n  border-radius: 25px;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n.chat-list ion-item ion-label .message-body.image {\n  background: none !important;\n  line-height: 0;\n  padding: 0;\n  cursor: pointer;\n}\n.chat-list ion-item ion-label .message-body p, .chat-list ion-item ion-label .message-body .message-text {\n  color: black;\n  margin: 0;\n  text-align: left;\n  -webkit-user-select: all !important;\n     -moz-user-select: all !important;\n      -ms-user-select: all !important;\n          user-select: all !important;\n  white-space: pre-wrap !important;\n}\n.chat-list ion-item ion-label .message-body.video-attachment-container {\n  min-width: 224px;\n  min-height: 125px;\n  background: #eaeaea !important;\n  line-height: 0;\n  padding: 0;\n  display: block;\n  position: relative;\n  cursor: pointer;\n  border: 1px #bbbbbb solid;\n}\n.chat-list ion-item ion-label .message-body.video-attachment-container #inner-box {\n  border-radius: inherit;\n  min-width: inherit;\n  min-height: inherit;\n  position: absolute;\n  padding: 0;\n}\n.chat-list ion-item ion-label .message-body.video-attachment-container #inner-box p {\n  color: var(--ion-color-primary);\n  margin-top: 1.5em;\n  text-align: center;\n}\n.chat-list ion-item ion-label .message-body.video-attachment-container #inner-box p ion-icon {\n  font-size: 5em !important;\n}\n.chat-list ion-item ion-label .message-body.video-attachment-container .video {\n  padding: inherit;\n  min-width: 100%;\n  max-width: inherit;\n  min-height: 100%;\n  max-height: inherit;\n  border-radius: inherit;\n}\n.chat-list ion-item ion-label .message-body.video-attachment-container .label {\n  margin-left: 0.8em;\n  text-shadow: 1px 1px white;\n}\n.chat-list ion-item ion-label .message-body.video-attachment-container:hover {\n  background: #bbbbbb !important;\n  opacity: 0.9;\n  -webkit-transition: 0.5s opacity, 0.5s background;\n  transition: 0.5s opacity, 0.5s background;\n}\n.chat-list ion-item ion-label .seen-text {\n  padding: 8px 16px;\n}\n.chat-list ion-item ion-label.received-messages {\n  text-align: left;\n}\n.chat-list ion-item ion-label.received-messages .message-body {\n  background-color: white;\n}\n.chat-list ion-item ion-label.received-messages .time {\n  margin-left: -14% !important;\n  width: -webkit-fill-available !important;\n}\n.chat-list ion-item ion-label.received-messages.no-avatar {\n  margin-left: 12%;\n}\n.chat-list ion-item ion-label.send-messages {\n  text-align: right;\n  margin-right: 0;\n}\n.chat-list ion-item ion-label.send-messages .message-body {\n  background-color: var(--ion-color-primary);\n  float: right;\n}\n.chat-list ion-item ion-label.send-messages .message-body.general-attachment {\n  background: white;\n}\n.chat-list ion-item ion-label.send-messages .message-body .message-text {\n  color: white !important;\n}\n.chat-list.desktop-view ion-item ion-avatar {\n  margin-left: 0 !important;\n  margin-top: 3% !important;\n}\n.chat-list.desktop-view ion-item ion-avatar.no-time {\n  margin-top: 0 !important;\n}\n.chat-list.desktop-view ion-item ion-avatar.no-time-team {\n  margin-top: -3% !important;\n}\n.chat-list.desktop-view ion-item ion-avatar.with-time-team {\n  margin-top: 0 !important;\n}\n.chat-list.desktop-view ion-item ion-label .time {\n  margin-left: 2.5% !important;\n}\n.chat-list.desktop-view ion-item ion-label.received-messages .time {\n  margin-left: 0 !important;\n}\n.chat-list.desktop-view ion-item ion-label.received-messages.no-avatar {\n  margin-left: 44px !important;\n}\n.message-sending-loading {\n  width: 100% !important;\n  text-align: right !important;\n}\n.message-typing {\n  width: 100% !important;\n  text-align: left !important;\n}\n.ion-content-absolute-with-footer {\n  height: calc(100% - 155px);\n}\n.footer {\n  min-height: 48px;\n  padding: 0;\n}\n.footer.ion-footer-absolute {\n  height: 96px;\n}\n.footer.ion-footer-absolute ion-grid {\n  padding: 0;\n  min-height: 96px;\n}\n.footer.focus {\n  min-height: 96px;\n}\n.footer.focus ion-grid {\n  padding: 0;\n  min-height: 96px;\n}\n.footer ion-grid {\n  background-color: white;\n  min-height: 48px;\n}\n.footer ion-grid ion-row {\n  min-height: 48px;\n}\n.footer ion-grid ion-row ion-col {\n  min-height: 48px;\n}\n.footer ion-grid ion-row ion-col ion-button {\n  padding-top: 6px;\n  min-height: 24px;\n  max-height: 100px;\n  height: auto;\n}\n.footer ion-grid ion-row ion-col ion-button ion-icon {\n  font-size: 24px;\n}\n.footer ion-grid ion-row ion-col ion-textarea {\n  --padding-top: 0;\n  --padding-end: 0;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  margin-top: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9jaGF0L2NoYXQtcm9vbS9jaGF0LXJvb20uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NoYXQvY2hhdC1yb29tL2NoYXQtcm9vbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSx3Q0FBQTtVQUFBLGdDQUFBO0FDREY7QURFRTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtBQ0FKO0FEQ0k7RUFDRSxnQkFBQTtBQ0NOO0FERUU7RUFDRSxlQUFBO0FDQUo7QURFRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQ0FKO0FEQ0k7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBQ0NOO0FESUE7RUFDRSx3Q0FBQTtBQ0RGO0FER0k7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLCtCQUFBO0VBQ0EsNEJBQUE7QUNETjtBREVNO0VBQ0UseUJBQUE7QUNBUjtBREVNO0VBQ0UsMEJBQUE7QUNBUjtBREtNO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUNIUjtBRE1NO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBekRZO0VBMERaLG1CQUFBO0VBQ0EsMEJBQUE7RUFBQSx1QkFBQTtFQUFBLGtCQUFBO0FDSlI7QURNUTtFQUNFLDJCQUFBO0VBQ0EsY0FBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0FDSlY7QURPUTtFQUNFLFlBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQ0FBQTtLQUFBLGdDQUFBO01BQUEsK0JBQUE7VUFBQSwyQkFBQTtFQUNBLGdDQUFBO0FDTFY7QURRUTtFQUNFLGdCQTdFVTtFQThFVixpQkFBQTtFQUNBLDhCQUFBO0VBQ0EsY0FBQTtFQUNBLFVBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7QUNOVjtBRFFVO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0FDTlo7QURRWTtFQUNFLCtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQ05kO0FET2M7RUFDRSx5QkFBQTtBQ0xoQjtBRFVVO0VBQ0UsZ0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7QUNSWjtBRFdVO0VBQ0Usa0JBQUE7RUFDQSwwQkFBQTtBQ1RaO0FEWVU7RUFDRSw4QkFBQTtFQUNBLFlBQUE7RUFDQSxpREFBQTtFQUFBLHlDQUFBO0FDVlo7QURlTTtFQUNFLGlCQUFBO0FDYlI7QURnQk07RUFDRSxnQkFBQTtBQ2RSO0FEZ0JRO0VBQ0UsdUJBQUE7QUNkVjtBRGlCUTtFQUNFLDRCQUFBO0VBQ0Esd0NBQUE7QUNmVjtBRGtCUTtFQUNFLGdCQUFBO0FDaEJWO0FEb0JNO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0FDbEJSO0FEb0JRO0VBQ0UsMENBQUE7RUFRQSxZQUFBO0FDekJWO0FEb0JVO0VBQ0UsaUJBQUE7QUNsQlo7QUR3QlU7RUFDRSx1QkFBQTtBQ3RCWjtBRCtCTTtFQUNFLHlCQUFBO0VBQ0EseUJBQUE7QUM3QlI7QUQ4QlE7RUFDRSx3QkFBQTtBQzVCVjtBRDhCUTtFQUNFLDBCQUFBO0FDNUJWO0FEOEJRO0VBQ0Usd0JBQUE7QUM1QlY7QURnQ1E7RUFDRSw0QkFBQTtBQzlCVjtBRGlDVTtFQUNFLHlCQUFBO0FDL0JaO0FEaUNVO0VBQ0UsNEJBQUE7QUMvQlo7QUR1Q0E7RUFDRSxzQkFBQTtFQUNBLDRCQUFBO0FDcENGO0FEdUNBO0VBQ0Usc0JBQUE7RUFDQSwyQkFBQTtBQ3BDRjtBRHNDQTtFQUNFLDBCQUFBO0FDbkNGO0FEc0NBO0VBQ0UsZ0JBQUE7RUFDQSxVQUFBO0FDbkNGO0FEcUNFO0VBQ0UsWUFBQTtBQ25DSjtBRG9DSTtFQUNFLFVBQUE7RUFDQSxnQkFBQTtBQ2xDTjtBRHNDRTtFQUNFLGdCQUFBO0FDcENKO0FEcUNJO0VBQ0UsVUFBQTtFQUNBLGdCQUFBO0FDbkNOO0FEdUNFO0VBQ0UsdUJBQUE7RUFDQSxnQkFBQTtBQ3JDSjtBRHNDSTtFQUNFLGdCQUFBO0FDcENOO0FEcUNNO0VBQ0UsZ0JBQUE7QUNuQ1I7QURvQ1E7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0FDbENWO0FEbUNVO0VBQ0UsZUFBQTtBQ2pDWjtBRG9DUTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQ2xDViIsImZpbGUiOiJzcmMvYXBwL2NoYXQvY2hhdC1yb29tL2NoYXQtcm9vbS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRtZXNzYWdlLWJvZHktc2l6ZTogMjI0cHg7XG5cbi5ub3Qtc3RhcnRlZC1lbXB0eS1zdGF0dXMge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsLTUwJSk7XG4gIC5oZWFkLXRleHQge1xuICAgIG1hcmdpbi1ib3R0b206IDBweDtcbiAgICBtYXJnaW4tdG9wOiAwcHg7XG4gICAgJi5kZXNrdG9wIHtcbiAgICAgIG1hcmdpbi10b3A6IDI0cHg7XG4gICAgfVxuICB9XG4gIC5zdWItdGV4dCB7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xuICB9XG4gIC5pbWFnZSB7XG4gICAgbWluLXdpZHRoOiA5NnB4O1xuICAgIG1pbi1oZWlnaHQ6IDk2cHg7XG4gICAgbWF4LXdpZHRoOiA5NnB4O1xuICAgIG1heC1oZWlnaHQ6IDk2cHg7XG4gICAgJi5kZXNrdG9wIHtcbiAgICAgIG1pbi13aWR0aDogMTIwcHg7XG4gICAgICBtaW4taGVpZ2h0OiAxMjBweDtcbiAgICAgIG1heC13aWR0aDogMTIwcHg7XG4gICAgICBtYXgtaGVpZ2h0OiAxMjBweDtcbiAgICB9XG4gIH1cbn1cblxuLmNoYXQtbGlzdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIGlvbi1pdGVtIHtcbiAgICBpb24tYXZhdGFyIHtcbiAgICAgIHdpZHRoOiAzMnB4O1xuICAgICAgaGVpZ2h0OiAzMnB4O1xuICAgICAgbWFyZ2luOiAwIDEycHggMnB4IDAgIWltcG9ydGFudDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtOHB4ICFpbXBvcnRhbnQ7XG4gICAgICAmLm5vLXRpbWUge1xuICAgICAgICBtYXJnaW4tdG9wOiA4JSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgJi5uby10aW1lLXRlYW0ge1xuICAgICAgICBtYXJnaW4tdG9wOiAtOCUgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpb24tbGFiZWwge1xuICAgICAgLnRpbWUge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICB9XG5cbiAgICAgIC5tZXNzYWdlLWJvZHkge1xuICAgICAgICBwYWRkaW5nOiA4cHggMTZweDtcbiAgICAgICAgbWluLXdpZHRoOiA0OHB4O1xuICAgICAgICBtYXgtd2lkdGg6ICRtZXNzYWdlLWJvZHktc2l6ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgICAgICAgd2lkdGg6IGZpdC1jb250ZW50O1xuXG4gICAgICAgICYuaW1hZ2Uge1xuICAgICAgICAgIGJhY2tncm91bmQ6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMDtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHAsIC5tZXNzYWdlLXRleHQge1xuICAgICAgICAgIGNvbG9yOiBibGFjaztcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgICB1c2VyLXNlbGVjdDogYWxsICFpbXBvcnRhbnQ7XG4gICAgICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAmLnZpZGVvLWF0dGFjaG1lbnQtY29udGFpbmVyIHtcbiAgICAgICAgICBtaW4td2lkdGg6ICRtZXNzYWdlLWJvZHktc2l6ZTtcbiAgICAgICAgICBtaW4taGVpZ2h0OiAxMjVweDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZWFlYWVhICFpbXBvcnRhbnQ7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDA7XG4gICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xuICAgICAgICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICBib3JkZXI6IDFweCAjYmJiYmJiIHNvbGlkO1xuXG4gICAgICAgICAgI2lubmVyLWJveCB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xuICAgICAgICAgICAgbWluLXdpZHRoOiBpbmhlcml0O1xuICAgICAgICAgICAgbWluLWhlaWdodDogaW5oZXJpdDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG5cbiAgICAgICAgICAgIHAge1xuICAgICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAxLjVlbTtcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA1ZW0gIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC52aWRlbyB7XG4gICAgICAgICAgICBwYWRkaW5nOiBpbmhlcml0O1xuICAgICAgICAgICAgbWluLXdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgbWF4LXdpZHRoOiBpbmhlcml0O1xuICAgICAgICAgICAgbWluLWhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5sYWJlbCB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMC44ZW07XG4gICAgICAgICAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCB3aGl0ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNiYmJiYmIgIWltcG9ydGFudDtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuOTtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IDAuNXMgb3BhY2l0eSwgMC41cyBiYWNrZ3JvdW5kO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAuc2Vlbi10ZXh0IHtcbiAgICAgICAgcGFkZGluZzogOHB4IDE2cHg7XG4gICAgICB9XG5cbiAgICAgICYucmVjZWl2ZWQtbWVzc2FnZXMge1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuXG4gICAgICAgIC5tZXNzYWdlLWJvZHkge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpbWUge1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAtMTQlICFpbXBvcnRhbnQ7XG4gICAgICAgICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGUgIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgICYubm8tYXZhdGFyIHtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMTIlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYuc2VuZC1tZXNzYWdlcyB7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG5cbiAgICAgICAgLm1lc3NhZ2UtYm9keSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuXG4gICAgICAgICAgLy8gY29uc2lzdGVudCBjb2xvdXIgdG8gbWFrZSBhdHRhY2htZW50IHN0YW5kb3V0XG4gICAgICAgICAgJi5nZW5lcmFsLWF0dGFjaG1lbnQge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbWFyZ2luLWxlZnQ6IGNhbGMoMTAwJSAtIDE1MHB4KSAhaW1wb3J0YW50O1xuICAgICAgICAgIGZsb2F0OiByaWdodDtcblxuICAgICAgICAgIC5tZXNzYWdlLXRleHQge1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJi5kZXNrdG9wLXZpZXcge1xuICAgIGlvbi1pdGVtIHtcbiAgICAgIGlvbi1hdmF0YXIge1xuICAgICAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xuICAgICAgICBtYXJnaW4tdG9wOiAzJSAhaW1wb3J0YW50O1xuICAgICAgICAmLm5vLXRpbWUge1xuICAgICAgICAgIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAmLm5vLXRpbWUtdGVhbSB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogLTMlICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgICAgJi53aXRoLXRpbWUtdGVhbSB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpb24tbGFiZWwge1xuICAgICAgICAudGltZSB7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDIuNSUgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAmLnJlY2VpdmVkLW1lc3NhZ2VzIHtcbiAgICAgICAgICAudGltZSB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICAmLm5vLWF2YXRhciB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogNDRweCAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4ubWVzc2FnZS1zZW5kaW5nLWxvYWRpbmcge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiByaWdodCAhaW1wb3J0YW50O1xufVxuXG4ubWVzc2FnZS10eXBpbmcge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XG59XG4uaW9uLWNvbnRlbnQtYWJzb2x1dGUtd2l0aC1mb290ZXIge1xuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDE1NXB4KTtcbn1cblxuLmZvb3RlciB7XG4gIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gIHBhZGRpbmc6IDA7XG5cbiAgJi5pb24tZm9vdGVyLWFic29sdXRlIHtcbiAgICBoZWlnaHQ6IDk2cHg7XG4gICAgaW9uLWdyaWQge1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIG1pbi1oZWlnaHQ6IDk2cHg7XG4gICAgfVxuICB9XG5cbiAgJi5mb2N1cyB7XG4gICAgbWluLWhlaWdodDogOTZweDtcbiAgICBpb24tZ3JpZCB7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgbWluLWhlaWdodDogOTZweDtcbiAgICB9XG4gIH1cblxuICBpb24tZ3JpZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgbWluLWhlaWdodDogNDhweDtcbiAgICBpb24tcm93IHtcbiAgICAgIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gICAgICBpb24tY29sIHtcbiAgICAgICAgbWluLWhlaWdodDogNDhweDtcbiAgICAgICAgaW9uLWJ1dHRvbiB7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDZweDtcbiAgICAgICAgICBtaW4taGVpZ2h0OiAyNHB4O1xuICAgICAgICAgIG1heC1oZWlnaHQ6IDEwMHB4O1xuICAgICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlvbi10ZXh0YXJlYSB7XG4gICAgICAgICAgLS1wYWRkaW5nLXRvcDogMDtcbiAgICAgICAgICAtLXBhZGRpbmctZW5kOiAwO1xuICAgICAgICAgIC0tcGFkZGluZy1ib3R0b206IDA7XG4gICAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgICAgICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLm5vdC1zdGFydGVkLWVtcHR5LXN0YXR1cyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG4ubm90LXN0YXJ0ZWQtZW1wdHktc3RhdHVzIC5oZWFkLXRleHQge1xuICBtYXJnaW4tYm90dG9tOiAwcHg7XG4gIG1hcmdpbi10b3A6IDBweDtcbn1cbi5ub3Qtc3RhcnRlZC1lbXB0eS1zdGF0dXMgLmhlYWQtdGV4dC5kZXNrdG9wIHtcbiAgbWFyZ2luLXRvcDogMjRweDtcbn1cbi5ub3Qtc3RhcnRlZC1lbXB0eS1zdGF0dXMgLnN1Yi10ZXh0IHtcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuLm5vdC1zdGFydGVkLWVtcHR5LXN0YXR1cyAuaW1hZ2Uge1xuICBtaW4td2lkdGg6IDk2cHg7XG4gIG1pbi1oZWlnaHQ6IDk2cHg7XG4gIG1heC13aWR0aDogOTZweDtcbiAgbWF4LWhlaWdodDogOTZweDtcbn1cbi5ub3Qtc3RhcnRlZC1lbXB0eS1zdGF0dXMgLmltYWdlLmRlc2t0b3Age1xuICBtaW4td2lkdGg6IDEyMHB4O1xuICBtaW4taGVpZ2h0OiAxMjBweDtcbiAgbWF4LXdpZHRoOiAxMjBweDtcbiAgbWF4LWhlaWdodDogMTIwcHg7XG59XG5cbi5jaGF0LWxpc3Qge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xufVxuLmNoYXQtbGlzdCBpb24taXRlbSBpb24tYXZhdGFyIHtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgbWFyZ2luOiAwIDEycHggMnB4IDAgIWltcG9ydGFudDtcbiAgbWFyZ2luLWxlZnQ6IC04cHggIWltcG9ydGFudDtcbn1cbi5jaGF0LWxpc3QgaW9uLWl0ZW0gaW9uLWF2YXRhci5uby10aW1lIHtcbiAgbWFyZ2luLXRvcDogOCUgIWltcG9ydGFudDtcbn1cbi5jaGF0LWxpc3QgaW9uLWl0ZW0gaW9uLWF2YXRhci5uby10aW1lLXRlYW0ge1xuICBtYXJnaW4tdG9wOiAtOCUgIWltcG9ydGFudDtcbn1cbi5jaGF0LWxpc3QgaW9uLWl0ZW0gaW9uLWxhYmVsIC50aW1lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuLmNoYXQtbGlzdCBpb24taXRlbSBpb24tbGFiZWwgLm1lc3NhZ2UtYm9keSB7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBtaW4td2lkdGg6IDQ4cHg7XG4gIG1heC13aWR0aDogMjI0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbn1cbi5jaGF0LWxpc3QgaW9uLWl0ZW0gaW9uLWxhYmVsIC5tZXNzYWdlLWJvZHkuaW1hZ2Uge1xuICBiYWNrZ3JvdW5kOiBub25lICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBwYWRkaW5nOiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uY2hhdC1saXN0IGlvbi1pdGVtIGlvbi1sYWJlbCAubWVzc2FnZS1ib2R5IHAsIC5jaGF0LWxpc3QgaW9uLWl0ZW0gaW9uLWxhYmVsIC5tZXNzYWdlLWJvZHkgLm1lc3NhZ2UtdGV4dCB7XG4gIGNvbG9yOiBibGFjaztcbiAgbWFyZ2luOiAwO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB1c2VyLXNlbGVjdDogYWxsICFpbXBvcnRhbnQ7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcCAhaW1wb3J0YW50O1xufVxuLmNoYXQtbGlzdCBpb24taXRlbSBpb24tbGFiZWwgLm1lc3NhZ2UtYm9keS52aWRlby1hdHRhY2htZW50LWNvbnRhaW5lciB7XG4gIG1pbi13aWR0aDogMjI0cHg7XG4gIG1pbi1oZWlnaHQ6IDEyNXB4O1xuICBiYWNrZ3JvdW5kOiAjZWFlYWVhICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlcjogMXB4ICNiYmJiYmIgc29saWQ7XG59XG4uY2hhdC1saXN0IGlvbi1pdGVtIGlvbi1sYWJlbCAubWVzc2FnZS1ib2R5LnZpZGVvLWF0dGFjaG1lbnQtY29udGFpbmVyICNpbm5lci1ib3gge1xuICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xuICBtaW4td2lkdGg6IGluaGVyaXQ7XG4gIG1pbi1oZWlnaHQ6IGluaGVyaXQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcGFkZGluZzogMDtcbn1cbi5jaGF0LWxpc3QgaW9uLWl0ZW0gaW9uLWxhYmVsIC5tZXNzYWdlLWJvZHkudmlkZW8tYXR0YWNobWVudC1jb250YWluZXIgI2lubmVyLWJveCBwIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgbWFyZ2luLXRvcDogMS41ZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5jaGF0LWxpc3QgaW9uLWl0ZW0gaW9uLWxhYmVsIC5tZXNzYWdlLWJvZHkudmlkZW8tYXR0YWNobWVudC1jb250YWluZXIgI2lubmVyLWJveCBwIGlvbi1pY29uIHtcbiAgZm9udC1zaXplOiA1ZW0gIWltcG9ydGFudDtcbn1cbi5jaGF0LWxpc3QgaW9uLWl0ZW0gaW9uLWxhYmVsIC5tZXNzYWdlLWJvZHkudmlkZW8tYXR0YWNobWVudC1jb250YWluZXIgLnZpZGVvIHtcbiAgcGFkZGluZzogaW5oZXJpdDtcbiAgbWluLXdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IGluaGVyaXQ7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IGluaGVyaXQ7XG4gIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG59XG4uY2hhdC1saXN0IGlvbi1pdGVtIGlvbi1sYWJlbCAubWVzc2FnZS1ib2R5LnZpZGVvLWF0dGFjaG1lbnQtY29udGFpbmVyIC5sYWJlbCB7XG4gIG1hcmdpbi1sZWZ0OiAwLjhlbTtcbiAgdGV4dC1zaGFkb3c6IDFweCAxcHggd2hpdGU7XG59XG4uY2hhdC1saXN0IGlvbi1pdGVtIGlvbi1sYWJlbCAubWVzc2FnZS1ib2R5LnZpZGVvLWF0dGFjaG1lbnQtY29udGFpbmVyOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2JiYmJiYiAhaW1wb3J0YW50O1xuICBvcGFjaXR5OiAwLjk7XG4gIHRyYW5zaXRpb246IDAuNXMgb3BhY2l0eSwgMC41cyBiYWNrZ3JvdW5kO1xufVxuLmNoYXQtbGlzdCBpb24taXRlbSBpb24tbGFiZWwgLnNlZW4tdGV4dCB7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xufVxuLmNoYXQtbGlzdCBpb24taXRlbSBpb24tbGFiZWwucmVjZWl2ZWQtbWVzc2FnZXMge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuLmNoYXQtbGlzdCBpb24taXRlbSBpb24tbGFiZWwucmVjZWl2ZWQtbWVzc2FnZXMgLm1lc3NhZ2UtYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuLmNoYXQtbGlzdCBpb24taXRlbSBpb24tbGFiZWwucmVjZWl2ZWQtbWVzc2FnZXMgLnRpbWUge1xuICBtYXJnaW4tbGVmdDogLTE0JSAhaW1wb3J0YW50O1xuICB3aWR0aDogLXdlYmtpdC1maWxsLWF2YWlsYWJsZSAhaW1wb3J0YW50O1xufVxuLmNoYXQtbGlzdCBpb24taXRlbSBpb24tbGFiZWwucmVjZWl2ZWQtbWVzc2FnZXMubm8tYXZhdGFyIHtcbiAgbWFyZ2luLWxlZnQ6IDEyJTtcbn1cbi5jaGF0LWxpc3QgaW9uLWl0ZW0gaW9uLWxhYmVsLnNlbmQtbWVzc2FnZXMge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgbWFyZ2luLXJpZ2h0OiAwO1xufVxuLmNoYXQtbGlzdCBpb24taXRlbSBpb24tbGFiZWwuc2VuZC1tZXNzYWdlcyAubWVzc2FnZS1ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmbG9hdDogcmlnaHQ7XG59XG4uY2hhdC1saXN0IGlvbi1pdGVtIGlvbi1sYWJlbC5zZW5kLW1lc3NhZ2VzIC5tZXNzYWdlLWJvZHkuZ2VuZXJhbC1hdHRhY2htZW50IHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG59XG4uY2hhdC1saXN0IGlvbi1pdGVtIGlvbi1sYWJlbC5zZW5kLW1lc3NhZ2VzIC5tZXNzYWdlLWJvZHkgLm1lc3NhZ2UtdGV4dCB7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xufVxuLmNoYXQtbGlzdC5kZXNrdG9wLXZpZXcgaW9uLWl0ZW0gaW9uLWF2YXRhciB7XG4gIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi10b3A6IDMlICFpbXBvcnRhbnQ7XG59XG4uY2hhdC1saXN0LmRlc2t0b3AtdmlldyBpb24taXRlbSBpb24tYXZhdGFyLm5vLXRpbWUge1xuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7XG59XG4uY2hhdC1saXN0LmRlc2t0b3AtdmlldyBpb24taXRlbSBpb24tYXZhdGFyLm5vLXRpbWUtdGVhbSB7XG4gIG1hcmdpbi10b3A6IC0zJSAhaW1wb3J0YW50O1xufVxuLmNoYXQtbGlzdC5kZXNrdG9wLXZpZXcgaW9uLWl0ZW0gaW9uLWF2YXRhci53aXRoLXRpbWUtdGVhbSB7XG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcbn1cbi5jaGF0LWxpc3QuZGVza3RvcC12aWV3IGlvbi1pdGVtIGlvbi1sYWJlbCAudGltZSB7XG4gIG1hcmdpbi1sZWZ0OiAyLjUlICFpbXBvcnRhbnQ7XG59XG4uY2hhdC1saXN0LmRlc2t0b3AtdmlldyBpb24taXRlbSBpb24tbGFiZWwucmVjZWl2ZWQtbWVzc2FnZXMgLnRpbWUge1xuICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xufVxuLmNoYXQtbGlzdC5kZXNrdG9wLXZpZXcgaW9uLWl0ZW0gaW9uLWxhYmVsLnJlY2VpdmVkLW1lc3NhZ2VzLm5vLWF2YXRhciB7XG4gIG1hcmdpbi1sZWZ0OiA0NHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5tZXNzYWdlLXNlbmRpbmctbG9hZGluZyB7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gIHRleHQtYWxpZ246IHJpZ2h0ICFpbXBvcnRhbnQ7XG59XG5cbi5tZXNzYWdlLXR5cGluZyB7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcbn1cblxuLmlvbi1jb250ZW50LWFic29sdXRlLXdpdGgtZm9vdGVyIHtcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAxNTVweCk7XG59XG5cbi5mb290ZXIge1xuICBtaW4taGVpZ2h0OiA0OHB4O1xuICBwYWRkaW5nOiAwO1xufVxuLmZvb3Rlci5pb24tZm9vdGVyLWFic29sdXRlIHtcbiAgaGVpZ2h0OiA5NnB4O1xufVxuLmZvb3Rlci5pb24tZm9vdGVyLWFic29sdXRlIGlvbi1ncmlkIHtcbiAgcGFkZGluZzogMDtcbiAgbWluLWhlaWdodDogOTZweDtcbn1cbi5mb290ZXIuZm9jdXMge1xuICBtaW4taGVpZ2h0OiA5NnB4O1xufVxuLmZvb3Rlci5mb2N1cyBpb24tZ3JpZCB7XG4gIHBhZGRpbmc6IDA7XG4gIG1pbi1oZWlnaHQ6IDk2cHg7XG59XG4uZm9vdGVyIGlvbi1ncmlkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIG1pbi1oZWlnaHQ6IDQ4cHg7XG59XG4uZm9vdGVyIGlvbi1ncmlkIGlvbi1yb3cge1xuICBtaW4taGVpZ2h0OiA0OHB4O1xufVxuLmZvb3RlciBpb24tZ3JpZCBpb24tcm93IGlvbi1jb2wge1xuICBtaW4taGVpZ2h0OiA0OHB4O1xufVxuLmZvb3RlciBpb24tZ3JpZCBpb24tcm93IGlvbi1jb2wgaW9uLWJ1dHRvbiB7XG4gIHBhZGRpbmctdG9wOiA2cHg7XG4gIG1pbi1oZWlnaHQ6IDI0cHg7XG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xuICBoZWlnaHQ6IGF1dG87XG59XG4uZm9vdGVyIGlvbi1ncmlkIGlvbi1yb3cgaW9uLWNvbCBpb24tYnV0dG9uIGlvbi1pY29uIHtcbiAgZm9udC1zaXplOiAyNHB4O1xufVxuLmZvb3RlciBpb24tZ3JpZCBpb24tcm93IGlvbi1jb2wgaW9uLXRleHRhcmVhIHtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICBtYXJnaW4tdG9wOiA4cHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/chat/chat-room/chat-room.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/chat/chat-room/chat-room.component.ts ***!
  \*******************************************************/
/*! exports provided: ChatRoomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatRoomComponent", function() { return ChatRoomComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm5/ionic-angular.js");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _services_router_enter_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/router-enter.service */ "./src/app/services/router-enter.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _shared_pusher_pusher_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/pusher/pusher.service */ "./src/app/shared/pusher/pusher.service.ts");
/* harmony import */ var _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/filestack/filestack.service */ "./src/app/shared/filestack/filestack.service.ts");
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../chat.service */ "./src/app/chat/chat.service.ts");
/* harmony import */ var _chat_preview_chat_preview_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../chat-preview/chat-preview.component */ "./src/app/chat/chat-preview/chat-preview.component.ts");
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











var ChatRoomComponent = /** @class */ (function (_super) {
    __extends(ChatRoomComponent, _super);
    function ChatRoomComponent(chatService, router, storage, route, utils, pusherService, filestackService, modalController, ngZone, element, newrelic) {
        var _this = _super.call(this, router) || this;
        _this.chatService = chatService;
        _this.router = router;
        _this.storage = storage;
        _this.route = route;
        _this.utils = utils;
        _this.pusherService = pusherService;
        _this.filestackService = filestackService;
        _this.modalController = modalController;
        _this.ngZone = ngZone;
        _this.element = element;
        _this.newrelic = newrelic;
        _this.routeUrl = '/chat-room/';
        _this.messageList = new Array;
        _this.selectedChat = {
            name: '',
            is_team: false,
            team_id: null,
            team_member_id: null,
            participants_only: false
        };
        _this.messagePageNumber = 0;
        _this.messagePagesize = 20;
        _this.loadingChatMessages = true;
        _this.loadingMesageSend = false;
        _this.isTyping = false;
        // this use to show/hide bottom section of text field which have attachment buttons and send button,
        // when user typing text messages
        _this.showBottomAttachmentButtons = false;
        _this.newrelic.setPageViewName("Chat room: " + JSON.stringify(_this.selectedChat));
        var role = _this.storage.getUser().role;
        // message by team
        _this.utils.getEvent('team-message').subscribe(function (event) {
            var param = {
                event: event,
                isTeam: _this.selectedChat.is_team,
                chatName: _this.selectedChat.name,
                participants_only: _this.selectedChat.participants_only
            };
            var receivedMessage = _this.chatService.getMessageFromEvent(param);
            if (receivedMessage && receivedMessage.file) {
                receivedMessage.preview = _this.attachmentPreview(receivedMessage.file);
            }
            if (!_this.utils.isEmpty(receivedMessage)) {
                _this.messageList.push(receivedMessage);
                _this._markAsSeen();
                _this._scrollToBottom();
            }
        });
        // singal by team typing
        _this.utils.getEvent('team-typing').subscribe(function (event) {
            _this._showTyping(event);
        });
        // message by non-mentor
        if (role !== 'mentor') {
            _this.utils.getEvent('team-no-mentor-message').subscribe(function (event) {
                var param = {
                    event: event,
                    isTeam: _this.selectedChat.is_team,
                    chatName: _this.selectedChat.name,
                    participants_only: _this.selectedChat.participants_only
                };
                var receivedMessage = _this.chatService.getMessageFromEvent(param);
                if (receivedMessage && receivedMessage.file) {
                    receivedMessage.preview = _this.attachmentPreview(receivedMessage.file);
                }
                if (!_this.utils.isEmpty(receivedMessage)) {
                    _this._markAsSeen();
                    _this.messageList.push(receivedMessage);
                }
            });
            _this.utils.getEvent('team-no-mentor-typing').subscribe(function (event) {
                _this._showTyping(event);
            });
        }
        return _this;
    }
    ChatRoomComponent.prototype.onEnter = function () {
        this._initialise();
        this._validateRouteParams();
        this._loadMessages();
        this._scrollToBottom();
    };
    ChatRoomComponent.prototype._initialise = function () {
        this.message = '';
        this.messageList = [];
        this.loadingChatMessages = true;
        this.selectedChat = {
            name: '',
            is_team: false,
            team_id: null,
            team_member_id: null,
            participants_only: false
        };
        this.messagePageNumber = 0;
        this.messagePagesize = 20;
        this.loadingMesageSend = false;
        this.isTyping = false;
        this.typingMessage = '';
        this.showBottomAttachmentButtons = false;
    };
    ChatRoomComponent.prototype._validateRouteParams = function () {
        // if teamId pass as @Input parameter get team id from it
        // if not get it from route params.
        if (this.teamId) {
            this.selectedChat.team_id = this.teamId;
        }
        else {
            this.selectedChat.team_id = Number(this.route.snapshot.paramMap.get('teamId'));
        }
        // if teamMemberId pass as @Input parameter get team id from it
        // if not get it from route params.
        if (this.teamMemberId) {
            this.selectedChat.team_member_id = this.teamMemberId;
        }
        else {
            this.selectedChat.team_member_id = Number(this.route.snapshot.paramMap.get('teamMemberId'));
        }
        // if we didn't have team member id in selected chat object mark this chat as a team chat.
        if (!this.selectedChat.team_member_id) {
            this.selectedChat.is_team = true;
        }
        // if participantsOnly pass as @Input parameter get team id from it
        // if not get it from route params.
        if (this.participantsOnly) {
            this.selectedChat.participants_only = this.participantsOnly;
        }
        else {
            this.selectedChat.participants_only = JSON.parse(this.route.snapshot.paramMap.get('participantsOnly'));
        }
    };
    ChatRoomComponent.prototype._loadMessages = function () {
        var _this = this;
        this.loadingChatMessages = true;
        var data;
        this.messagePageNumber += 1;
        // creating params need to load messages.
        if (this.selectedChat.is_team) {
            data = {
                team_id: this.selectedChat.team_id,
                page: this.messagePageNumber,
                size: this.messagePagesize,
                participants_only: this.selectedChat.participants_only
            };
        }
        else {
            data = {
                team_id: this.selectedChat.team_id,
                page: this.messagePageNumber,
                size: this.messagePagesize,
                team_member_id: this.selectedChat.team_member_id
            };
        }
        this.chatService
            .getMessageList(data, this.selectedChat.is_team)
            .subscribe(function (messages) {
            if (messages) {
                if (messages.length > 0) {
                    messages.forEach(function (msg, i) {
                        if (msg.file) {
                            messages[i].preview = _this.attachmentPreview(msg.file);
                        }
                    });
                    messages = Object.assign([], messages);
                    messages.reverse();
                    if (_this.messageList.length > 0) {
                        _this.messageList = messages.concat(_this.messageList);
                    }
                    else {
                        _this.messageList = messages;
                        _this._scrollToBottom();
                    }
                    _this._markAsSeen();
                }
                else {
                    _this.messagePageNumber -= 1;
                }
                _this._getChatName();
            }
            _this.loadingChatMessages = false;
        }, function (error) {
            _this.loadingChatMessages = false;
        });
    };
    ChatRoomComponent.prototype.loadMoreMessages = function (event) {
        var scrollTopPosition = event.detail.scrollTop;
        if (scrollTopPosition === 0) {
            this._loadMessages();
        }
    };
    ChatRoomComponent.prototype._getChatName = function () {
        var _this = this;
        // if it is a team chat, use the team name as the chat title
        if (this.selectedChat.is_team) {
            this.chatService.getTeamName(this.selectedChat.team_id)
                .subscribe(function (teamName) {
                if (_this.selectedChat.participants_only) {
                    _this.selectedChat.team_name = teamName;
                }
                else {
                    // if it is not participant only, add "+ Mentor" as the chat title
                    _this.selectedChat.team_name = teamName + ' + Mentor';
                }
                _this.loadingChatMessages = false;
                return;
            });
        }
        // if the chat name is passed in as parameter, use it
        if (this.chatName) {
            this.selectedChat.name = this.chatName;
            this.loadingChatMessages = false;
            return;
        }
        if (this.route.snapshot.paramMap.get('name')) {
            this.selectedChat.name = this.route.snapshot.paramMap.get('name');
            this.loadingChatMessages = false;
            return;
        }
        // get the chat title from messge list
        var message = this.messageList[0];
        if (message) {
            if (message.is_sender) {
                // if the current user is sender, the chat name will be the receiver name
                this.selectedChat.name = message.receiver_name;
            }
            else {
                // if the current user is not the sender, the chat name will be the sender name
                this.selectedChat.name = message.sender_name;
            }
        }
        this.loadingChatMessages = false;
    };
    ChatRoomComponent.prototype.back = function () {
        var _this = this;
        return this.ngZone.run(function () { return _this.router.navigate(['app', 'chat']); });
    };
    ChatRoomComponent.prototype.sendMessage = function () {
        var _this = this;
        if (!this.message) {
            return;
        }
        this.loadingMesageSend = true;
        var message = this.message;
        // remove typed message from text area and shrink text area.
        this.message = '';
        this.element.nativeElement.querySelector('textarea').style.height = 'auto';
        // createing prams need to send message
        var data;
        if (this.selectedChat.is_team) {
            data = {
                message: message,
                team_id: this.selectedChat.team_id,
                to: 'team',
                participants_only: this.selectedChat.participants_only
            };
        }
        else {
            data = {
                message: message,
                team_id: this.selectedChat.team_id,
                to: this.selectedChat.team_member_id
            };
        }
        this.chatService.postNewMessage(data).subscribe(function (response) {
            _this.messageList.push(response.data);
            _this.loadingMesageSend = false;
            _this._scrollToBottom();
            _this.showBottomAttachmentButtons = false;
        }, function (error) {
            _this.loadingMesageSend = false;
            _this.showBottomAttachmentButtons = false;
        });
    };
    // call chat api to mark message as seen messages
    ChatRoomComponent.prototype._markAsSeen = function () {
        var _this = this;
        var messageIdList = [];
        var index = 0;
        // createing id array to mark as read.
        for (index = 0; index < this.messageList.length; index++) {
            messageIdList.push(this.messageList[index].id);
        }
        this.chatService
            .markMessagesAsSeen({
            id: JSON.stringify(messageIdList),
            team_id: this.selectedChat.team_id
        })
            .subscribe(function (response) {
            if (!_this.utils.isMobile()) {
                _this.utils.broadcastEvent('chat-badge-update', {
                    teamID: _this.selectedChat.team_id,
                    teamMemberId: _this.selectedChat.team_member_id ? _this.selectedChat.team_member_id : null,
                    chatName: _this.chatName,
                    participantsOnly: _this.selectedChat.participants_only ? _this.selectedChat.participants_only : false,
                    readcount: messageIdList.length
                });
            }
        }, function (err) { });
    };
    ChatRoomComponent.prototype.getMessageDate = function (date) {
        return this.utils.timeFormatter(date);
    };
    /**
     * this method will return correct css class for chat avatar to adjust view
     * @param message message object
     * - if selected chat is a team chat and we are not showing time with this message.
     *  - return 'no-time-team' css class. it will add 'margin-top: -8%' to avatar.
     * - if selected chat is not a team and we are not showing time with this message.
     *  - return 'no-time' css class. it will add 'margin-top: 8%' to avatar.
     * - if user not in mobile platform and selected chat is a team and we are showing time with this message.
     *  - return 'with-time-team' css class. it will add 'margin-top: 0' to avatar.
     * - if these conditions not complete
     *  - return empty srting.
     */
    ChatRoomComponent.prototype.getAvatarClass = function (message) {
        if (!this.checkToShowMessageTime(message) && this.selectedChat.is_team) {
            return 'no-time-team';
        }
        if (!this.checkToShowMessageTime(message) && !this.selectedChat.is_team) {
            return 'no-time';
        }
        if (!this.utils.isMobile() && (this.checkToShowMessageTime(message) && this.selectedChat.is_team)) {
            return 'with-time-team';
        }
        return '';
    };
    /**
     * check same user have messages inline
     * @param {int} message
     */
    ChatRoomComponent.prototype.checkIsLastMessage = function (message) {
        var index = this.messageList.indexOf(message);
        if (index === -1) {
            this.messageList[index].noAvatar = true;
            return false;
        }
        var currentMessage = this.messageList[index];
        var nextMessage = this.messageList[index + 1];
        if (currentMessage.is_sender) {
            this.messageList[index].noAvatar = true;
            return false;
        }
        if (!nextMessage) {
            this.messageList[index].noAvatar = false;
            return true;
        }
        var currentMessageTime = new Date(this.messageList[index].sent_time);
        var nextMessageTime = new Date(this.messageList[index + 1].sent_time);
        if (currentMessage.sender_name !== nextMessage.sender_name) {
            this.messageList[index].noAvatar = false;
            return true;
        }
        var timeDiff = (nextMessageTime.getTime() - currentMessageTime.getTime()) /
            (60 * 1000);
        if (timeDiff > 5) {
            this.messageList[index].noAvatar = false;
            return true;
        }
        else {
            this.messageList[index].noAvatar = true;
            return false;
        }
    };
    /**
     * check message sender and return related css class
     * @param {object} message
     */
    ChatRoomComponent.prototype.getClassForMessageBubble = function (message) {
        if (!message.is_sender && message.noAvatar) {
            return 'received-messages no-avatar';
        }
        else if (!message.is_sender && !message.noAvatar) {
            return 'received-messages';
        }
        else {
            return 'send-messages';
        }
    };
    /**
     * check date and time diffrance between current message(message object of index) old message.
     * @param {int} message
     */
    ChatRoomComponent.prototype.checkToShowMessageTime = function (message) {
        var index = this.messageList.indexOf(message);
        if (index <= -1) {
            return;
        }
        // show message time for the first message
        if (!this.messageList[index - 1]) {
            return true;
        }
        var currentMessageTime = new Date(this.messageList[index].sent_time);
        var oldMessageTime = new Date(this.messageList[index - 1].sent_time);
        if ((currentMessageTime.getDate() - oldMessageTime.getDate()) === 0) {
            return this._checkmessageOldThan5Min(currentMessageTime, oldMessageTime);
        }
        return true;
    };
    /**
     * check time diffrance larger than 5 min.
     * @param {object} currentMessageTime
     * @param {object} oldMessageTime
     */
    ChatRoomComponent.prototype._checkmessageOldThan5Min = function (currentMessageTime, oldMessageTime) {
        var timeDiff = (currentMessageTime.getTime() - oldMessageTime.getTime()) / (60 * 1000);
        if (timeDiff > 5) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Trigger typing event when user is typing
     */
    ChatRoomComponent.prototype.typing = function () {
        if (!this.utils.isEmpty(this.message)) {
            this.showBottomAttachmentButtons = true;
            this._scrollToBottom();
        }
        else {
            this.showBottomAttachmentButtons = false;
        }
        this.pusherService.triggerTyping({
            from: this.pusherService.getMyPresenceChannelId(),
            to: this.selectedChat.name,
            is_team: this.selectedChat.is_team,
            team_id: this.selectedChat.team_id,
            participants_only: this.selectedChat.participants_only,
            sender_name: this.storage.getUser().name
        }, this.selectedChat.participants_only);
    };
    ChatRoomComponent.prototype._showTyping = function (event) {
        var _this = this;
        var presenceChannelId = this.pusherService.getMyPresenceChannelId();
        // do not display typing message if it is yourself typing, or it is not for your team
        if (presenceChannelId === event.from || this.selectedChat.team_id !== event.team_id) {
            return;
        }
        // show the typing message if it is team message and the current page is the team message
        // or it is individual message and it is for the current user
        if ((event.is_team && this.selectedChat.is_team &&
            this.selectedChat.participants_only === event.participants_only) ||
            (!event.is_team && !this.selectedChat.is_team &&
                event.to === this.storage.getUser().name)) {
            this.typingMessage = event.sender_name + ' is typing';
            this._scrollToBottom();
            this.isTyping = true;
            setTimeout(function () {
                _this.typingMessage = '';
                _this.isTyping = false;
            }, 3000);
        }
    };
    ChatRoomComponent.prototype._scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 500);
    };
    ChatRoomComponent.prototype.attachmentPreview = function (filestackRes) {
        var preview = "Uploaded " + filestackRes.filename;
        var dimension = 224;
        if (filestackRes.mimetype.includes('image')) {
            var attachmentURL = "https://cdn.filestackcontent.com/quality=value:70/resize=w:" + dimension + ",h:" + dimension + ",fit:crop/" + filestackRes.handle;
            // preview = `<p>Uploaded ${filestackRes.filename}</p><img src=${attachmentURL}>`;
            preview = "<img src=" + attachmentURL + ">";
        }
        else if (filestackRes.mimetype.includes('video')) {
            // we'll need to identify filetype for 'any' type fileupload
            preview = "<app-file-display [file]=\"submission.answer\" [fileType]=\"question.fileType\"></app-file-display>";
        }
        return preview;
    };
    ChatRoomComponent.prototype.attach = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {};
                        if (this.filestackService.getFileTypes(type)) {
                            options.accept = this.filestackService.getFileTypes(type);
                            options.storeTo = this.filestackService.getS3Config(type);
                        }
                        return [4 /*yield*/, this.filestackService.open(options, function (res) {
                                return _this.postAttachment(res);
                            }, function (err) {
                                console.log(err);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatRoomComponent.prototype.previewFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.filestackService.previewFile(file)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatRoomComponent.prototype.postAttachment = function (file) {
        var _this = this;
        if (this.loadingMesageSend) {
            return;
        }
        this.loadingMesageSend = true;
        var data = {
            message: null,
            file: file,
            team_id: this.selectedChat.team_id,
            to: null,
            participants_only: this.selectedChat.participants_only,
        };
        if (this.selectedChat.is_team) {
            data.to = 'team';
        }
        else {
            data.to = this.selectedChat.team_member_id;
        }
        this.chatService.postAttachmentMessage(data).subscribe(function (response) {
            var message = response.data;
            message.preview = _this.attachmentPreview(file);
            _this.messageList.push(message);
            _this.loadingMesageSend = false;
            _this.showBottomAttachmentButtons = false;
            _this._scrollToBottom();
        }, function (error) {
            _this.loadingMesageSend = false;
            _this.showBottomAttachmentButtons = false;
            // error feedback to user for failed upload
        });
    };
    ChatRoomComponent.prototype.getTypeByMime = function (mimetype) {
        var zip = [
            'application/x-compressed',
            'application/x-zip-compressed',
            'application/zip',
            'multipart/x-zip',
        ];
        var result = '';
        if (zip.indexOf(mimetype) >= 0) {
            result = 'Zip';
            // set icon to different document type (excel, word, powerpoint, audio, video)
        }
        else if (mimetype.indexOf('audio/') >= 0) {
            result = 'Audio';
        }
        else if (mimetype.indexOf('image/') >= 0) {
            result = 'Image';
        }
        else if (mimetype.indexOf('text/') >= 0) {
            result = 'Text';
        }
        else if (mimetype.indexOf('video/') >= 0) {
            result = 'Video';
        }
        else {
            switch (mimetype) {
                case 'application/pdf':
                    result = 'PDF';
                    break;
                case 'application/msword':
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    result = 'Word';
                    break;
                case 'application/excel':
                case 'application/vnd.ms-excel':
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                case 'application/x-excel':
                case 'application/x-msexcel':
                    result = 'Excel';
                    break;
                case 'application/mspowerpoint':
                case 'application/vnd.ms-powerpoint':
                case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                case 'application/x-mspowerpoint':
                    result = 'Powerpoint';
                    break;
                default:
                    result = 'File';
                    break;
            }
        }
        return result;
    };
    ChatRoomComponent.prototype.getIconByMime = function (mimetype) {
        var zip = [
            'application/x-compressed',
            'application/x-zip-compressed',
            'application/zip',
            'multipart/x-zip',
        ];
        var result = '';
        if (zip.indexOf(mimetype) >= 0) {
            result = 'document';
        }
        else if (mimetype.includes('audio')) {
            result = 'volume-mute';
        }
        else if (mimetype.includes('image')) {
            result = 'photos';
        }
        else if (mimetype.includes('text')) {
            result = 'clipboard-outline';
        }
        else if (mimetype.includes('video')) {
            result = 'videocam';
        }
        else {
            switch (mimetype) {
                case 'application/pdf':
                    result = 'document'; // 'pdf';
                    break;
                case 'application/msword':
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    result = 'document'; // 'word';
                    break;
                case 'application/excel':
                case 'application/vnd.ms-excel':
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                case 'application/x-excel':
                case 'application/x-msexcel':
                    result = 'document'; // 'excel';
                    break;
                case 'application/mspowerpoint':
                case 'application/vnd.ms-powerpoint':
                case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                case 'application/x-mspowerpoint':
                    result = 'document'; // 'powerpoint';
                    break;
                default:
                    result = 'document'; // 'file';
                    break;
            }
        }
        return result;
    };
    ChatRoomComponent.prototype.preview = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _chat_preview_chat_preview_component__WEBPACK_IMPORTED_MODULE_9__["ChatPreviewComponent"],
                            componentProps: {
                                file: file,
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatRoomComponent.prototype.createThumb = function (video, w, h) {
        var c = document.createElement('canvas'), // create a canvas
        ctx = c.getContext('2d'); // get context
        c.width = w; // set size = thumb
        c.height = h;
        ctx.drawImage(video, 0, 0, w, h); // draw in frame
        return c; // return canvas
    };
    ChatRoomComponent.ctorParameters = function () { return [
        { type: _chat_service__WEBPACK_IMPORTED_MODULE_8__["ChatService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_3__["BrowserStorageService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_5__["UtilsService"] },
        { type: _shared_pusher_pusher_service__WEBPACK_IMPORTED_MODULE_6__["PusherService"] },
        { type: _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_7__["FilestackService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_10__["NewRelicService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"]),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
    ], ChatRoomComponent.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ChatRoomComponent.prototype, "teamId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ChatRoomComponent.prototype, "teamMemberId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], ChatRoomComponent.prototype, "participantsOnly", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ChatRoomComponent.prototype, "chatName", void 0);
    ChatRoomComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chat-room',
            template: __importDefault(__webpack_require__(/*! raw-loader!./chat-room.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-room/chat-room.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./chat-room.component.scss */ "./src/app/chat/chat-room/chat-room.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_chat_service__WEBPACK_IMPORTED_MODULE_8__["ChatService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_3__["BrowserStorageService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_5__["UtilsService"],
            _shared_pusher_pusher_service__WEBPACK_IMPORTED_MODULE_6__["PusherService"],
            _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_7__["FilestackService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_10__["NewRelicService"]])
    ], ChatRoomComponent);
    return ChatRoomComponent;
}(_services_router_enter_service__WEBPACK_IMPORTED_MODULE_4__["RouterEnter"]));



/***/ }),

/***/ "./src/app/chat/chat-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/chat/chat-routing.module.ts ***!
  \*********************************************/
/*! exports provided: ChatRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatRoutingModule", function() { return ChatRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _chat_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat.component */ "./src/app/chat/chat.component.ts");
/* harmony import */ var _chat_view_chat_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat-view/chat-view.component */ "./src/app/chat/chat-view/chat-view.component.ts");
/* harmony import */ var _chat_room_chat_room_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chat-room/chat-room.component */ "./src/app/chat/chat-room/chat-room.component.ts");
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
        component: _chat_component__WEBPACK_IMPORTED_MODULE_2__["ChatComponent"],
        children: [
            {
                path: '',
                component: _chat_view_chat_view_component__WEBPACK_IMPORTED_MODULE_3__["ChatViewComponent"],
            }
        ]
    },
    {
        path: 'chat-room/:teamId/:teamMemberId',
        component: _chat_room_chat_room_component__WEBPACK_IMPORTED_MODULE_4__["ChatRoomComponent"],
    },
    {
        path: 'chat-room/team/:teamId/:participantsOnly',
        component: _chat_room_chat_room_component__WEBPACK_IMPORTED_MODULE_4__["ChatRoomComponent"],
    }
];
var ChatRoutingModule = /** @class */ (function () {
    function ChatRoutingModule() {
    }
    ChatRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ChatRoutingModule);
    return ChatRoutingModule;
}());



/***/ }),

/***/ "./src/app/chat/chat-view/chat-view.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/chat/chat-view/chat-view.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoYXQvY2hhdC12aWV3L2NoYXQtdmlldy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/chat/chat-view/chat-view.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/chat/chat-view/chat-view.component.ts ***!
  \*******************************************************/
/*! exports provided: ChatViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatViewComponent", function() { return ChatViewComponent; });
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




var ChatViewComponent = /** @class */ (function (_super) {
    __extends(ChatViewComponent, _super);
    function ChatViewComponent(router, utils) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.utils = utils;
        _this.routeUrl = '/app/chat';
        return _this;
    }
    ChatViewComponent.prototype.onEnter = function () {
        var _this = this;
        this._initialise();
        setTimeout(function () {
            _this.chatList.onEnter();
        });
    };
    ChatViewComponent.prototype._initialise = function () {
        this.teamMemberId = null;
        this.participantsOnly = null;
        this.teamId = null;
        this.chatName = null;
    };
    ChatViewComponent.prototype.goto = function (event) {
        var _this = this;
        this.teamId = event.teamId;
        this.teamMemberId = event.teamMemberId ? event.teamMemberId : null;
        this.participantsOnly = event.participantsOnly ? event.participantsOnly : false;
        this.chatName = event.chatName;
        setTimeout(function () {
            _this.chatRoom.onEnter();
        });
    };
    ChatViewComponent.prototype.getCurrentChat = function () {
        return {
            teamId: this.teamId,
            chatName: this.chatName,
            teamMemberId: this.teamMemberId,
            participantsOnly: this.participantsOnly
        };
    };
    /**
     * this method call when chat-list component finished loading chat objects.
     * from this method we loading first chat to chat room component.
     * @param chats chat list Array
     * if we have teamId we are not doing any thing, that means we have already load first chat.
     * if we didn't have teamId we will goto() method by passing first chat channel data. to load chat.
     */
    ChatViewComponent.prototype.selectFirstChat = function (chats) {
        if (this.teamId) {
            return;
        }
        // navigate to the first chat
        this.goto({
            teamId: chats[0].team_id,
            teamMemberId: chats[0].team_member_id,
            participantsOnly: chats[0].participants_only,
            chatName: chats[0].name
        });
    };
    ChatViewComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chatList'),
        __metadata("design:type", Object)
    ], ChatViewComponent.prototype, "chatList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chatRoom'),
        __metadata("design:type", Object)
    ], ChatViewComponent.prototype, "chatRoom", void 0);
    ChatViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chat-view',
            template: __importDefault(__webpack_require__(/*! raw-loader!./chat-view.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat-view/chat-view.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./chat-view.component.scss */ "./src/app/chat/chat-view/chat-view.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"]])
    ], ChatViewComponent);
    return ChatViewComponent;
}(_services_router_enter_service__WEBPACK_IMPORTED_MODULE_3__["RouterEnter"]));



/***/ }),

/***/ "./src/app/chat/chat.component.ts":
/*!****************************************!*\
  !*** ./src/app/chat/chat.component.ts ***!
  \****************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
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

var ChatComponent = /** @class */ (function () {
    function ChatComponent() {
    }
    ChatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: '<ion-router-outlet></ion-router-outlet>',
        })
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./src/app/chat/chat.module.ts":
/*!*************************************!*\
  !*** ./src/app/chat/chat.module.ts ***!
  \*************************************/
/*! exports provided: ChatModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatModule", function() { return ChatModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _chat_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat.component */ "./src/app/chat/chat.component.ts");
/* harmony import */ var _chat_list_chat_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat-list/chat-list.component */ "./src/app/chat/chat-list/chat-list.component.ts");
/* harmony import */ var _chat_room_chat_room_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chat-room/chat-room.component */ "./src/app/chat/chat-room/chat-room.component.ts");
/* harmony import */ var _chat_preview_chat_preview_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chat-preview/chat-preview.component */ "./src/app/chat/chat-preview/chat-preview.component.ts");
/* harmony import */ var _chat_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chat-routing.module */ "./src/app/chat/chat-routing.module.ts");
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chat.service */ "./src/app/chat/chat.service.ts");
/* harmony import */ var _shared_filestack_filestack_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/filestack/filestack.module */ "./src/app/shared/filestack/filestack.module.ts");
/* harmony import */ var _fast_feedback_fast_feedback_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../fast-feedback/fast-feedback.module */ "./src/app/fast-feedback/fast-feedback.module.ts");
/* harmony import */ var _shared_directives_autoresize_autoresize_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/directives/autoresize/autoresize.directive */ "./src/app/shared/directives/autoresize/autoresize.directive.ts");
/* harmony import */ var _chat_view_chat_view_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./chat-view/chat-view.component */ "./src/app/chat/chat-view/chat-view.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};












var ChatModule = /** @class */ (function () {
    function ChatModule() {
    }
    ChatModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"],
                _chat_routing_module__WEBPACK_IMPORTED_MODULE_6__["ChatRoutingModule"],
                _shared_filestack_filestack_module__WEBPACK_IMPORTED_MODULE_8__["FilestackModule"],
                _fast_feedback_fast_feedback_module__WEBPACK_IMPORTED_MODULE_9__["FastFeedbackModule"],
            ],
            declarations: [
                _chat_component__WEBPACK_IMPORTED_MODULE_2__["ChatComponent"],
                _chat_list_chat_list_component__WEBPACK_IMPORTED_MODULE_3__["ChatListComponent"],
                _chat_preview_chat_preview_component__WEBPACK_IMPORTED_MODULE_5__["ChatPreviewComponent"],
                _chat_room_chat_room_component__WEBPACK_IMPORTED_MODULE_4__["ChatRoomComponent"],
                _shared_directives_autoresize_autoresize_directive__WEBPACK_IMPORTED_MODULE_10__["AutoresizeDirective"],
                _chat_view_chat_view_component__WEBPACK_IMPORTED_MODULE_11__["ChatViewComponent"]
            ],
            entryComponents: [_chat_preview_chat_preview_component__WEBPACK_IMPORTED_MODULE_5__["ChatPreviewComponent"]],
            providers: [_chat_service__WEBPACK_IMPORTED_MODULE_7__["ChatService"]],
            exports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"],
                _shared_filestack_filestack_module__WEBPACK_IMPORTED_MODULE_8__["FilestackModule"],
                _chat_room_chat_room_component__WEBPACK_IMPORTED_MODULE_4__["ChatRoomComponent"],
                _fast_feedback_fast_feedback_module__WEBPACK_IMPORTED_MODULE_9__["FastFeedbackModule"]
            ]
        })
    ], ChatModule);
    return ChatModule;
}());



/***/ }),

/***/ "./src/app/chat/chat.service.ts":
/*!**************************************!*\
  !*** ./src/app/chat/chat.service.ts ***!
  \**************************************/
/*! exports provided: ChatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatService", function() { return ChatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _shared_request_request_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/request/request.service */ "./src/app/shared/request/request.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _shared_pusher_pusher_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/pusher/pusher.service */ "./src/app/shared/pusher/pusher.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @environments/environment */ "./src/environments/environment.ts");
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
    getChatList: 'api/v2/message/chat/list.json',
    getChatMessages: 'api/v2/message/chat/list_messages.json',
    createMessage: 'api/v2/message/chat/create_message',
    markAsSeen: 'api/v2/message/chat/edit_message',
    getTeam: 'api/teams.json'
};
var ChatService = /** @class */ (function () {
    function ChatService(request, utils, pusherService) {
        this.request = request;
        this.utils = utils;
        this.pusherService = pusherService;
    }
    /**
     * this method return chat list data.
     */
    ChatService.prototype.getchatList = function () {
        var _this = this;
        return this.request.get(api.getChatList).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            if (response.success && response.data) {
                return _this._normaliseeChatListResponse(response.data);
            }
        }));
    };
    /**
     * this method return message for one chat.
     * @param prams
     *  prams is a json object
     * {
     *  team_id: 1234,
     *  team_member_id: 4567,
     *  page: 1,
     *  size:20
     * }
     */
    ChatService.prototype.getMessageList = function (data, isTeam) {
        var _this = this;
        return this.request
            .get(api.getChatMessages, {
            params: data
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            if (response.success && response.data) {
                return _this._normaliseeMessageListResponse(response.data, isTeam);
            }
        }));
    };
    ChatService.prototype.markMessagesAsSeen = function (prams) {
        var body = {
            team_id: prams.team_id,
            id: prams.id,
            action: 'mark_seen'
        };
        return this.request.post(api.markAsSeen, body, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    };
    /**
     * @name postNewMessage
     * @description post new text message (with text) or attachment (with file)
     * @param  {NewMessage}      data [description]
     * @return {Observable<any>}      [description]
     */
    ChatService.prototype.postNewMessage = function (data) {
        var reqData = {
            to: data.to,
            message: data.message,
            team_id: data.team_id,
            env: _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].env,
            participants_only: '',
            file: data.file,
        };
        if (data.participants_only) {
            reqData.participants_only = data.participants_only.toString();
        }
        else {
            delete reqData.participants_only;
        }
        return this.request.post(api.createMessage, reqData);
    };
    ChatService.prototype.postAttachmentMessage = function (data) {
        if (!data.file) {
            throw new Error('Fatal: File value must not be empty.');
        }
        return this.postNewMessage(data);
    };
    ChatService.prototype.unreadMessageCout = function (data) {
        var body = {
            unread_count_for: data.filter
        };
        return this.request.get(api.getChatMessages, body);
    };
    ChatService.prototype.getTeamName = function (id) {
        var _this = this;
        var data = {
            team_id: id
        };
        return this.request
            .get(api.getTeam, {
            params: data
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            if (response.success && response.data) {
                return _this._normaliseTeamResponse(response.data);
            }
        }));
    };
    /**
     * @description listen to pusher event from new/incoming message
     */
    ChatService.prototype.getMessageFromEvent = function (data) {
        var presenceChannelId = this.pusherService.getMyPresenceChannelId();
        // don't show the message if it is from the current user,
        // or it is not to this user and not a team message
        if ((presenceChannelId === data.event.from) ||
            (presenceChannelId !== data.event.to && data.event.to !== 'team')) {
            return null;
        }
        // show the message if it is team message, and participants_only match
        // or it is individual message and sender match
        if (!((data.isTeam && data.event.to === 'team' &&
            data.participants_only === data.event.participants_only) ||
            (data.event.sender_name === data.chatName &&
                data.event.to !== 'team'))) {
            return null;
        }
        var message = {
            id: data.event.id,
            is_sender: data.event.is_sender,
            message: data.event.message,
            sender_name: data.event.sender_name,
            sent_time: data.event.sent_time,
            file: data.event.file,
            sender_image: data.event.sender_image
        };
        return message;
    };
    ChatService.prototype._normaliseTeamResponse = function (data) {
        if (!this.utils.has(data, 'Team')) {
            return this.request.apiResponseFormatError('Team format error');
        }
        return data.Team.name;
    };
    /**
     * modify the Chat list response
     *  - set chat avatar color
     *  - set chat name
     * @param {Array} response
     */
    ChatService.prototype._normaliseeChatListResponse = function (data) {
        var _this = this;
        if (!Array.isArray(data)) {
            return this.request.apiResponseFormatError('Chat format error');
        }
        if (data.length === 0) {
            return [];
        }
        var chats = [];
        data.forEach(function (chat) {
            if (!_this.utils.has(chat, 'team_id') ||
                !_this.utils.has(chat, 'is_team') ||
                !_this.utils.has(chat, 'participants_only') ||
                !_this.utils.has(chat, 'name') ||
                !_this.utils.has(chat, 'team_name')) {
                return _this.request.apiResponseFormatError('Chat object format error');
            }
            chat.name = _this._getChatName(chat);
            chats.push(chat);
        });
        return chats;
    };
    ChatService.prototype._getChatName = function (chat) {
        if (!chat.is_team) {
            return chat.name;
        }
        if (chat.participants_only) {
            return chat.team_name;
        }
        else {
            return chat.team_name + ' + Mentor';
        }
    };
    /**
     * modify the message list response
     * @param data
     * @param isTeam
     */
    ChatService.prototype._normaliseeMessageListResponse = function (data, isTeam) {
        var _this = this;
        if (!Array.isArray(data)) {
            return this.request.apiResponseFormatError('Message array format error');
        }
        if (data.length === 0) {
            return [];
        }
        var messageList = [];
        data.forEach(function (message) {
            if (!_this.utils.has(message, 'id') ||
                !_this.utils.has(message, 'sender_name') ||
                !_this.utils.has(message, 'receiver_name') ||
                !_this.utils.has(message, 'message') ||
                !_this.utils.has(message, 'is_sender')) {
                return _this.request.apiResponseFormatError('Message format error');
            }
            messageList.push(message);
        });
        return messageList;
    };
    ChatService.ctorParameters = function () { return [
        { type: _shared_request_request_service__WEBPACK_IMPORTED_MODULE_1__["RequestService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
        { type: _shared_pusher_pusher_service__WEBPACK_IMPORTED_MODULE_4__["PusherService"] }
    ]; };
    ChatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_shared_request_request_service__WEBPACK_IMPORTED_MODULE_1__["RequestService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"],
            _shared_pusher_pusher_service__WEBPACK_IMPORTED_MODULE_4__["PusherService"]])
    ], ChatService);
    return ChatService;
}());



/***/ }),

/***/ "./src/app/shared/directives/autoresize/autoresize.directive.ts":
/*!**********************************************************************!*\
  !*** ./src/app/shared/directives/autoresize/autoresize.directive.ts ***!
  \**********************************************************************/
/*! exports provided: AutoresizeDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoresizeDirective", function() { return AutoresizeDirective; });
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

var AutoresizeDirective = /** @class */ (function () {
    function AutoresizeDirective(element) {
        this.element = element;
    }
    AutoresizeDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    AutoresizeDirective.prototype.ngOnInit = function () {
        this.adjust();
    };
    /**
     * in this method we resize textarea releted to text in side it.
     * when user type on textarea it will expand untill scroll height lower than max height.
     *  if scroll height biger than max height textare will not expand and it will scroll content.
     * - select textare.
     * - set 'aoto' to height and overflow properties.
     * - check min value from scrollheight and maxheight and get it as the newheight.
     * - set that new height to textarea height.
     */
    AutoresizeDirective.prototype.adjust = function () {
        var ta = this.element.nativeElement.querySelector('textarea');
        var newHeight;
        if (ta) {
            ta.style.overflow = 'auto';
            ta.style.height = 'auto';
            if (this.maxHeight) {
                newHeight = Math.min(ta.scrollHeight, this.maxHeight);
            }
            else {
                newHeight = ta.scrollHeight;
            }
            ta.style.height = newHeight + 'px';
        }
    };
    AutoresizeDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('appAutoresize'),
        __metadata("design:type", Number)
    ], AutoresizeDirective.prototype, "maxHeight", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('input', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLTextAreaElement]),
        __metadata("design:returntype", void 0)
    ], AutoresizeDirective.prototype, "onInput", null);
    AutoresizeDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appAutoresize]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], AutoresizeDirective);
    return AutoresizeDirective;
}());



/***/ })

}]);
//# sourceMappingURL=chat-chat-module.js.map