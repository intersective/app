import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { BrowserStorageService } from '@services/storage.service';
import { RouterEnter } from '@services/router-enter.service';
import { UtilsService } from '@services/utils.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { FilestackService } from '@shared/filestack/filestack.service';

import { ChatService, ChatRoomObject, Message } from '../chat.service';
import { ChatPreviewComponent } from '../chat-preview/chat-preview.component';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent extends RouterEnter {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  routeUrl = '/chat-room/';
  message: string;
  messageList: Array<Message> = new Array;
  selectedChat: ChatRoomObject;
  messagePageNumber = 0;
  messagePagesize = 20;
  loadingChatMessages = true;
  loadingMesageSend = false;
  isTyping = false;
  typingMessage: string;

  constructor(
    private chatService: ChatService,
    public router: Router,
    public storage: BrowserStorageService,
    private route: ActivatedRoute,
    public utils: UtilsService,
    public pusherService: PusherService,
    private filestackService: FilestackService,
    private modalController: ModalController,
  ) {
    super(router);
    const role = this.storage.getUser().role;

    // message by team
    this.utils.getEvent('team-message').subscribe(event => {
      const param = {
        event: event,
        isTeam: this.selectedChat.is_team,
        chatName: this.selectedChat.name,
        participants_only: this.selectedChat.participants_only
      };
      const receivedMessage = this.chatService.getMessageFromEvent(param);
      if (receivedMessage && receivedMessage.file) {
        receivedMessage.preview = this.attachmentPreview(receivedMessage.file);
      }

      if (!this.utils.isEmpty(receivedMessage)) {
        this.messageList.push(receivedMessage);
        this._markAsSeen();
        this._scrollToBottom();
      }
    });

    // singal by team typing
    this.utils.getEvent('team-typing').subscribe(event => {
      this._showTyping(event);
    });

    // message by non-mentor
    if (role !== 'mentor') {
      this.utils.getEvent('team-no-mentor-message').subscribe(event => {
        const param = {
          event: event,
          isTeam: this.selectedChat.is_team,
          chatName: this.selectedChat.name,
          participants_only: this.selectedChat.participants_only
        };
        const receivedMessage =  this.chatService.getMessageFromEvent(param);
        if (receivedMessage && receivedMessage.file) {
          receivedMessage.preview = this.attachmentPreview(receivedMessage.file);
        }

        if (!this.utils.isEmpty(receivedMessage)) {
          this._markAsSeen();
          this.messageList.push(receivedMessage);
        }
      });
      this.utils.getEvent('team-no-mentor-typing').subscribe(event => {
        this._showTyping(event);
      });
    }
  }

  onEnter() {
    this._initialise();
    this._validateRouteParams();
    this._loadMessages();
    this._scrollToBottom();
  }

  private _initialise() {
    this.loadingChatMessages = true;
    this.selectedChat = {
      name: '',
      is_team: false,
      team_id: null,
      team_member_id: null,
      participants_only: false
    };
  }

  private _validateRouteParams() {
    const teamId = Number(this.route.snapshot.paramMap.get('teamId'));
    this.selectedChat.team_id = teamId;
    if (Number(this.route.snapshot.paramMap.get('teamMemberId'))) {
      this.selectedChat.team_member_id = Number(this.route.snapshot.paramMap.get('teamMemberId'));
    } else {
      this.selectedChat.is_team = true;
      this.selectedChat.participants_only = JSON.parse(this.route.snapshot.paramMap.get('participantsOnly'));
    }
  }

  private _loadMessages() {
    this.loadingChatMessages = true;
    let data: any;
    this.messagePageNumber += 1;
    // creating params need to load messages.
    if (this.selectedChat.is_team) {
      data = {
        team_id: this.selectedChat.team_id,
        page: this.messagePageNumber,
        size: this.messagePagesize,
        participants_only: this.selectedChat.participants_only
      };
    } else {
      data = {
        team_id: this.selectedChat.team_id,
        page: this.messagePageNumber,
        size: this.messagePagesize,
        team_member_id: this.selectedChat.team_member_id
      };
    }
    this.chatService
      .getMessageList(data, this.selectedChat.is_team)
      .subscribe(
        messages => {
          if (messages) {
            if (messages.length > 0) {
              messages.forEach((msg, i) => {
                if (msg.file) {
                  messages[i].preview = this.attachmentPreview(msg.file);
                }
              });

              messages = Object.assign([], messages);
              messages.reverse();
              if (this.messageList.length > 0) {
                this.messageList = messages.concat(this.messageList);
              } else {
                this.messageList = messages;
                this._scrollToBottom();
              }
              this._markAsSeen();
            } else {
              this.messagePageNumber -= 1;
            }
            this._getChatName();
          }
          this.loadingChatMessages = false;
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

  private _getChatName() {
    // if the chat name is passed in as parameter, use it
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.selectedChat.name = name;
      this.loadingChatMessages = false;
      return;
    }
    // if it is a team chat, use the team name as the chat title
    if (this.selectedChat.is_team) {
      this.chatService.getTeamName(this.selectedChat.team_id)
        .subscribe(teamName => {
          if (this.selectedChat.participants_only) {
            this.selectedChat.team_name = teamName;
          } else {
            // if it is not participant only, add "+ Mentor" as the chat title
            this.selectedChat.team_name = teamName + ' + Mentor';
          }
          this.loadingChatMessages = false;
        });
    } else {
      // get the chat title from messge list
      const message = this.messageList[0];
      if (message) {
        if (message.is_sender) {
          // if the current user is sender, the chat name will be the receiver name
          this.selectedChat.name = message.receiver_name;
        } else {
          // if the current user is not the sender, the chat name will be the sender name
          this.selectedChat.name = message.sender_name;
        }
      }
    }
    this.loadingChatMessages = false;
  }

  back() {
    this.router.navigate(['app', 'chat']);
  }

  sendMessage() {
    if (!this.message) {
      return;
    }
    this.loadingMesageSend = true;
    const message = this.message;
    // remove typed message from text field.
    this.message = '';
    // createing prams need to send message
    let data: any;
    if (this.selectedChat.is_team) {
      data = {
        message: message,
        team_id: this.selectedChat.team_id,
        to: 'team',
        participants_only: this.selectedChat.participants_only
      };
    } else {
      data = {
        message: message,
        team_id: this.selectedChat.team_id,
        to: this.selectedChat.team_member_id
      };
    }
    this.chatService.postNewMessage(data).subscribe(
      response => {
        this.messageList.push(response.data);
        this.loadingMesageSend = false;
        this._scrollToBottom();
      },
      error => {
        this.loadingMesageSend = false;
      }
    );
  }

  // call chat api to mark message as seen messages
  private _markAsSeen() {
    const messageIdList = [];
    let index = 0;
    // createing id array to mark as read.
    for (index = 0; index < this.messageList.length; index++) {
      messageIdList.push(this.messageList[index].id);
    }
    this.chatService
      .markMessagesAsSeen({
        id: JSON.stringify(messageIdList),
        team_id: this.selectedChat.team_id
      })
      .subscribe();
  }

  getMessageDate(date) {
    return this.utils.timeFormatter(date);
  }

  /**
   * check same user have messages inline
   * @param {int} message
   */
  checkIsLastMessage(message) {
    const index = this.messageList.indexOf(message);
    if (index === -1) {
      this.messageList[index].noAvatar = true;
      return false;
    }
    const currentMessage = this.messageList[index];
    const nextMessage = this.messageList[index + 1];
    if (currentMessage.is_sender) {
      this.messageList[index].noAvatar = true;
      return false;
    }
    if (!nextMessage) {
      this.messageList[index].noAvatar = false;
      return true;
    }
    const currentMessageTime = new Date(this.messageList[index].sent_time);
    const nextMessageTime = new Date(this.messageList[index + 1].sent_time);
    if (currentMessage.sender_name !== nextMessage.sender_name) {
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
    if (!message.is_sender && message.noAvatar) {
      return 'received-messages no-avatar';
    } else if (!message.is_sender && !message.noAvatar) {
      return 'received-messages';
    } else {
      return 'send-messages';
    }
  }

  /**
   * check date and time diffrance between current message(message object of index) old message.
   * @param {int} message
   */
  checkToShowMessageTime(message) {
    const index = this.messageList.indexOf(message);
    if (index > -1) {
      if (this.messageList[index - 1]) {
        const currentMessageTime = new Date(this.messageList[index].sent_time);
        const oldMessageTime = new Date(this.messageList[index - 1].sent_time);
        if (oldMessageTime) {
          const dateDiff =
            currentMessageTime.getDate() - oldMessageTime.getDate();
          if (dateDiff === 0) {
            return this._checkmessageOldThan5Min(
              currentMessageTime,
              oldMessageTime
            );
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    }
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
    this.pusherService.triggerTyping(
      {
        from: this.pusherService.getMyPresenceChannelId(),
        to: this.selectedChat.name,
        is_team: this.selectedChat.is_team,
        team_id: this.selectedChat.team_id,
        participants_only: this.selectedChat.participants_only,
        sender_name: this.storage.getUser().name
      },
      this.selectedChat.participants_only
    );
  }

  private _showTyping(event) {
    const presenceChannelId = this.pusherService.getMyPresenceChannelId();
    // do not display typing message if it is yourself typing, or it is not for your team
    if (presenceChannelId === event.from || this.selectedChat.team_id !== event.team_id) {
      return ;
    }
    // show the typing message if it is team message and the current page is the team message
    // or it is individual message and it is for the current user
    if ((
          event.is_team && this.selectedChat.is_team &&
          this.selectedChat.participants_only === event.participants_only
        ) ||
        (
          !event.is_team && !this.selectedChat.is_team &&
          event.to === this.storage.getUser().name
        )
      ) {
      this.typingMessage = event.sender_name + ' is typing';
      this._scrollToBottom();
      this.isTyping = true;
      setTimeout(
        () => {
          this.typingMessage = '';
          this.isTyping = false;
        },
        3000
      );
    }
  }

  private _scrollToBottom() {
    setTimeout(
      () => {
        this.content.scrollToBottom();
      },
      500
    );
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
    }
    await this.filestackService.open(
      options,
      res => {
        return this.postAttachment(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  async previewFile(file) {
    return await this.filestackService.previewFile(file);
  }

  private postAttachment(file) {
    if (this.loadingMesageSend) {
      return;
    }

    this.loadingMesageSend = true;

    const data: any = {
      message: null,
      file,
      team_id: this.selectedChat.team_id,
      to: null,
      participants_only: this.selectedChat.participants_only,
    };
    if (this.selectedChat.is_team) {
      data.to = 'team';
    } else {
      data.to = this.selectedChat.team_member_id;
    }

    this.chatService.postAttachmentMessage(data).subscribe(
      response => {
        const message = response.data;
        message.preview = this.attachmentPreview(file);

        this.messageList.push(message);
        this.loadingMesageSend = false;
        this._scrollToBottom();
      },
      error => {
        this.loadingMesageSend = false;
        // error feedback to user for failed upload
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
      result = 'clipboard';
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

  createThumb(video, w, h) {
    const c = document.createElement('canvas'),    // create a canvas
        ctx = c.getContext('2d');                // get context
    c.width = w;                                 // set size = thumb
    c.height = h;
    ctx.drawImage(video, 0, 0, w, h);            // draw in frame
    return c;                                    // return canvas
  }
}
