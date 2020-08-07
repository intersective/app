import { Component, Input, ViewChild, NgZone, AfterContentInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { BrowserStorageService } from '@services/storage.service';
import { RouterEnter } from '@services/router-enter.service';
import { UtilsService } from '@services/utils.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { FilestackService } from '@shared/filestack/filestack.service';
import { ChatService, ChatChannel, Message } from '../chat.service';
import { ChatPreviewComponent } from '../chat-preview/chat-preview.component';
import { NewRelicService } from '@shared/new-relic/new-relic.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent extends RouterEnter {
  @ViewChild(IonContent) content: IonContent;
  @Input() chatChannel: ChatChannel;

  routeUrl = '/chat-room/';
  channelId: number | string;
  // message history list
  messageList: Message[] = [];
  // the message that the current user is typing
  message: string;
  messagePageNumber = 0;
  messagePageSize = 20;
  loadingChatMessages = true;
  sendingMessage = false;
  // display "someone is typing" when received a typing event
  whoIsTyping: string;
  // this use to show/hide bottom section of text field which have attachment buttons and send button, when user start typing text messages
  showBottomAttachmentButtons = false;

  constructor(
    private chatService: ChatService,
    public router: Router,
    public storage: BrowserStorageService,
    private route: ActivatedRoute,
    public utils: UtilsService,
    public pusherService: PusherService,
    private filestackService: FilestackService,
    private modalController: ModalController,
    private ngZone: NgZone,
    public element: ElementRef,
    private newrelic: NewRelicService
  ) {
    super(router);
    this.newrelic.setPageViewName(`Chat room`);
    this.utils.getEvent('chat:new-message').subscribe(event => {
      const receivedMessage = this.getMessageFromEvent(event);
      if (receivedMessage.channelId !== this.channelId) {
        // only display message for the current channel
        return;
      }
      if (receivedMessage && receivedMessage.file) {
        receivedMessage.preview = this.attachmentPreview(receivedMessage.file);
      }
      if (!this.utils.isEmpty(receivedMessage)) {
        this.messageList.push(receivedMessage);
        this._markAsSeen();
        this._scrollToBottom();
      }
    });
  }

  onEnter() {
    this._initialise();
    this._bindTypingEvent();
    this._loadMessages();
    this._scrollToBottom();
  }

  private _initialise() {
    this.message = '';
    this.messageList = [];
    this.loadingChatMessages = true;
    this.messagePageNumber = 0;
    this.messagePageSize = 20;
    this.sendingMessage = false;
    this.whoIsTyping = '';
    this.showBottomAttachmentButtons = false;
  }

  private _bindTypingEvent() {
    if (!this.chatChannel) {
      this.chatChannel = this.storage.getCurrentChatChannel();
    }
    this.channelId = this.route.snapshot.paramMap.get('channelId') || this.chatChannel.channelId;
    // subscribe to typing event
    this.utils.getEvent('typing-' + this.chatChannel.pusherChannelName).subscribe(event => this._showTyping(event));
  }

  /**
   * @description listen to pusher event for new message
   */
  getMessageFromEvent(data): Message {
    return {
      senderName: data.sender.name,
      senderRole: data.sender.role,
      senderAvatar: data.sender.avatar,
      isSender: false,
      message: data.message,
      sentTime: data.sent_time,
      channelId: data.channel_id,
      file: data.file
    };
  }

  private _loadMessages() {
    this.loadingChatMessages = true;
    this.messagePageNumber += 1;
    this.chatService
      .getMessageList({
        channel_id: this.channelId,
        page: this.messagePageNumber,
        size: this.messagePageSize
      })
      .subscribe(
        (messages: Message[]) => {
          this.loadingChatMessages = false;
          if (messages.length === 0) {
            this.messagePageNumber -= 1;
            return;
          }
          messages = messages.map(msg => {
            if (msg.file) {
              msg.preview = this.attachmentPreview(msg.file);
            }
            return msg;
          });
          messages.reverse();
          if (this.messageList.length > 0) {
            this.messageList = messages.concat(this.messageList);
          } else {
            this.messageList = messages;
            this._scrollToBottom();
          }
          this._markAsSeen();
        },
        error => {
          this.loadingChatMessages = false;
        }
      );
  }

  loadMoreMessages(event) {
    const scrollTopPosition = event.detail.scrollTop;
    if (scrollTopPosition === 0) {
      this._loadMessages();
    }
  }

  back() {
    return this.ngZone.run(() => this.router.navigate(['app', 'chat']));
  }

  sendMessage() {
    if (!this.message) {
      return;
    }
    this.sendingMessage = true;
    this.chatService.postNewMessage({
      channelId: this.channelId,
      message: this.message
    }).subscribe(
      response => {
        this.messageList.push(response.data);
        this._scrollToBottom();
        this._afterSendMessage();
      },
      error => {
        this._afterSendMessage();
      }
    );
  }

  private _afterSendMessage() {
    // remove typed message from text area and shrink text area.
    this.message = '';
    this.element.nativeElement.querySelector('textarea').style.height = 'auto';
    this.sendingMessage = false;
    this.showBottomAttachmentButtons = false;
  }

  // call chat api to mark message as seen messages
  private _markAsSeen() {
    const messageIds = this.messageList.map(m => m.id);
    this.chatService
      .markMessagesAsSeen({
        ids: messageIds,
        channel_id: this.channelId
      })
      .subscribe (
        res => {
          if (!this.utils.isMobile()) {
            this.utils.broadcastEvent('chat-badge-update', {
              channelId: this.chatChannel.channelId,
              readcount: messageIds.length
            });
          }
        },
        err => {}
      );
  }

  getMessageDate(date) {
    return this.utils.timeFormatter(date);
  }

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
  getAvatarClass(message) {
    if (!this.checkToShowMessageTime(message)) {
      return 'no-time';
    }
    return '';
  }

  /**
   * check same user have messages inline
   * @param {int} message
   */
  isLastMessage(message) {
    const index = this.messageList.indexOf(message);
    if (index === -1) {
      this.messageList[index].noAvatar = true;
      return false;
    }
    const currentMessage = this.messageList[index];
    const nextMessage = this.messageList[index + 1];
    if (currentMessage.isSender) {
      this.messageList[index].noAvatar = true;
      return false;
    }
    if (!nextMessage) {
      this.messageList[index].noAvatar = false;
      return true;
    }
    const currentMessageTime = new Date(this.messageList[index].sentTime);
    const nextMessageTime = new Date(this.messageList[index + 1].sentTime);
    if (currentMessage.senderName !== nextMessage.senderName) {
      this.messageList[index].noAvatar = false;
      return true;
    }
    const timeDiff =
      (nextMessageTime.getTime() - currentMessageTime.getTime()) /
      (60 * 1000);
    if (timeDiff > 5) {
      this.messageList[index].noAvatar = false;
      return true;
    } else {
      this.messageList[index].noAvatar = true;
      return false;
    }
  }

  /**
   * check message sender and return related css class
   * @param {object} message
   */
  getClassForMessageBubble(message) {
    if (message.isSender) {
      return 'send-messages';
    }
    if (message.noAvatar) {
      return 'received-messages no-avatar';
    }
    return 'received-messages';
  }

  /**
   * check date and time diffrance between current message(message object of index) old message.
   * @param {int} message
   */
  checkToShowMessageTime(message) {
    const index = this.messageList.indexOf(message);
    if (index <= -1) {
      return;
    }
    // show message time for the first message
    if (!this.messageList[index - 1]) {
      return true;
    }
    const currentMessageTime = new Date(this.messageList[index].sentTime);
    const oldMessageTime = new Date(this.messageList[index - 1].sentTime);
    if ((currentMessageTime.getDate() - oldMessageTime.getDate()) === 0) {
      return this._checkmessageOldThan5Min(
        currentMessageTime,
        oldMessageTime
      );
    }
    return true;
  }

  /**
   * check time diffrance larger than 5 min.
   * @param {object} currentMessageTime
   * @param {object} oldMessageTime
   */
  private _checkmessageOldThan5Min(currentMessageTime, oldMessageTime) {
    const timeDiff =
      (currentMessageTime.getTime() - oldMessageTime.getTime()) / (60 * 1000);
    if (timeDiff > 5) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Trigger typing event when user is typing
   */
  typing() {
    if (!this.utils.isEmpty(this.message)) {
      this.showBottomAttachmentButtons = true;
      this._scrollToBottom();
    } else {
      this.showBottomAttachmentButtons = false;
    }
    this.pusherService.triggerTyping(this.chatChannel.pusherChannelName);
  }

  private _showTyping(event) {
    // don't need to show typing message if the current user is the one who is typing
    if (event.user === this.storage.getUser().name) {
      return;
    }
    this.whoIsTyping = event.user + ' is typing';
    this._scrollToBottom();
    setTimeout(
      () => {
        this.whoIsTyping = '';
      },
      3000
    );
  }

  private _scrollToBottom() {
    setTimeout(() => this.content.scrollToBottom(), 500);
  }

  private attachmentPreview(filestackRes) {
    let preview = `Uploaded ${filestackRes.filename}`;
    const dimension = 224;
    if (filestackRes.mimetype.includes('image')) {
      const attachmentURL = `https://cdn.filestackcontent.com/quality=value:70/resize=w:${dimension},h:${dimension},fit:crop/${filestackRes.handle}`;
      // preview = `<p>Uploaded ${filestackRes.filename}</p><img src=${attachmentURL}>`;
      preview = `<img src=${attachmentURL}>`;
    } else if (filestackRes.mimetype.includes('video')) {
      // we'll need to identify filetype for 'any' type fileupload
      preview = `<app-file-display [file]="submission.answer" [fileType]="question.fileType"></app-file-display>`;
    }
    return preview;
  }

  async attach(type: string) {
    const options: any = {};

    if (this.filestackService.getFileTypes(type)) {
      options.accept = this.filestackService.getFileTypes(type);
      options.storeTo = this.filestackService.getS3Config(type);
    }
    await this.filestackService.open(
      options,
      res => {
        return this._postAttachment(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  previewFile(file) {
    return this.filestackService.previewFile(file);
  }

  private _postAttachment(file) {
    if (this.sendingMessage) {
      return;
    }
    this.sendingMessage = true;
    this.chatService.postAttachmentMessage({
      channelId: this.channelId,
      message: this.message,
      file
    }).subscribe(
      response => {
        const message = response.data;
        message.preview = this.attachmentPreview(file);
        this.messageList.push(message);
        this._scrollToBottom();
        this._afterSendMessage();
      },
      error => {
        this._afterSendMessage();
      }
    );
  }

  private getTypeByMime(mimetype: string): string {
    const zip = [
      'application/x-compressed',
      'application/x-zip-compressed',
      'application/zip',
      'multipart/x-zip',
    ];

    let result = '';

    if (zip.indexOf(mimetype) >= 0) {
      result = 'Zip';

    // set icon to different document type (excel, word, powerpoint, audio, video)
    } else if (mimetype.indexOf('audio/') >= 0) {
      result = 'Audio';
    } else if (mimetype.indexOf('image/') >= 0) {
      result = 'Image';
    } else if (mimetype.indexOf('text/') >= 0) {
      result = 'Text';
    } else if (mimetype.indexOf('video/') >= 0) {
      result = 'Video';
    } else {
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
  }

  private getIconByMime(mimetype: string): string {
    const zip = [
      'application/x-compressed',
      'application/x-zip-compressed',
      'application/zip',
      'multipart/x-zip',
    ];
    let result = '';

    if (zip.indexOf(mimetype) >= 0) {
      result = 'document';
    } else if (mimetype.includes('audio')) {
      result = 'volume-mute';
    } else if (mimetype.includes('image')) {
      result = 'photos';
    } else if (mimetype.includes('text')) {
      result = 'clipboard-outline';
    } else if (mimetype.includes('video')) {
      result = 'videocam';
    } else {
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
  }

  async preview(file) {
    const modal = await this.modalController.create({
      component: ChatPreviewComponent,
      componentProps: {
        file,
      }
    });
    return await modal.present();
  }

  // @Deprecated in case we need it later
  createThumb(video, w, h) {
    const c = document.createElement('canvas'),    // create a canvas
        ctx = c.getContext('2d');                // get context
    c.width = w;                                 // set size = thumb
    c.height = h;
    ctx.drawImage(video, 0, 0, w, h);            // draw in frame
    return c;                                    // return canvas
  }
}
