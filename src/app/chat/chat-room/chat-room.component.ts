import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { IonContent } from "@ionic/angular";
import { BrowserStorageService } from "@services/storage.service";
import { RouterEnter } from "@services/router-enter.service";
import { UtilsService } from "@services/utils.service";
import { PusherService } from "../../shared/pusher/pusher.service";

import { ChatService, ChatRoomObject, Message } from "../chat.service";

@Component({
  selector: "app-chat-room",
  templateUrl: "./chat-room.component.html",
  styleUrls: ["./chat-room.component.scss"]
})
export class ChatRoomComponent extends RouterEnter implements AfterViewInit {
  // @TODO need to create method to convert chat time to local time.
  @ViewChild(IonContent) content: IonContent;

  routeUrl = '/chat-room/';
  message: string;
  messageList: Array<Message> = new Array;
  selectedChat: ChatRoomObject;
  messagePageNumber: number = 0;
  messagePagesize: number = 20;
  loadingChatMessages:boolean = true;
  loadingMesageSend:boolean = false;
  isTyping:boolean = false;
  typingMessage:string;

  constructor(
    private chatService: ChatService,
    public router: Router,
    public storage: BrowserStorageService,
    private activatedRoute: ActivatedRoute,
    public utils: UtilsService,
    private pusherService: PusherService
  ) {
    super(router, utils, storage);
    let role = this.storage.getUser().role;
    this.utils.getEvent('team-message').subscribe(event => {
      let param = {
        event: event,
        isTeam: this.selectedChat.is_team,
        chatName: this.selectedChat.name,
        participants_only: this.selectedChat.participants_only
      }
      let receivedMessage =  this.chatService.getMessageFromEvent(param);
      if (!this.utils.isEmpty(receivedMessage)) {
        this.messageList.push(receivedMessage);
      }
    });
    this.utils.getEvent('team-typing').subscribe(event => {
      this._showTyping(event);
    });
    if (role !== 'mentor') {
      this.utils.getEvent('team-no-mentor-message').subscribe(event => {
        let param = {
          event: event,
          isTeam: this.selectedChat.is_team,
          chatName: this.selectedChat.name,
          participants_only: this.selectedChat.participants_only
        }
        let receivedMessage =  this.chatService.getMessageFromEvent(param);
        if (!this.utils.isEmpty(receivedMessage)) {
          this.messageList.push(receivedMessage);
        }
      });
      this.utils.getEvent('team-no-mentor-typing').subscribe(event => {
        this._showTyping(event);
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 500);
  }

  onEnter() {
    this._initialise();
    this._validateRouteParams();
    this._loadMessages();
  }

  private _initialise() {
    this.loadingChatMessages = true;
    this.selectedChat = {
      name: "",
      is_team: false,
      team_id: null,
      team_member_id: null,
      chat_color: null,
      participants_only: false
    };
  }

  private _validateRouteParams() {
    let teamId = Number(this.activatedRoute.snapshot.paramMap.get('teamId'));
    this.selectedChat.team_id = teamId;
    if (Number(this.activatedRoute.snapshot.paramMap.get('teamMemberId'))) {
      this.selectedChat.team_member_id = Number(this.activatedRoute.snapshot.paramMap.get('teamMemberId'));
    } else {
      this.selectedChat.is_team = true;
      this.selectedChat.participants_only = JSON.parse(this.activatedRoute.snapshot.paramMap.get('participantsOnly'));
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
      .getMessageList(data, this.selectedChat.is_team, this.selectedChat.chat_color)
      .subscribe(messages => {
        if (messages) {
          if (messages.length > 0) {
            messages = Object.assign([], messages);
            messages.reverse();
            if (this.messageList.length > 0) {
              this.messageList = messages.concat(this.messageList);
            } else {
              this.messageList = messages;
              setTimeout(() => {
                this.content.scrollToBottom();
              }, 500);
            }
            this._getChatName();
            this.markAsSeen(messages);
          } else {
            this.messagePageNumber -= 1;
          }
        }
        this.loadingChatMessages = false;
      }, error => {
        this.loadingChatMessages = false;
      });
  }

  loadMoreMessages(event) {
    let scrollTopPosition = event.detail.scrollTop;
    if (scrollTopPosition === 0) {
      this._loadMessages();
    }
  }

  private _getChatName() {
    if (this.selectedChat.is_team) {
      this.chatService.getTeamName(this.selectedChat.team_id)
        .subscribe(teamName => {
          this.selectedChat.team_name = teamName;
          this.loadingChatMessages = false;
        });
    } else {
      let message = this.messageList.find(function(message) {
        return message.is_sender === false;
      });
      if (message) {
        this.selectedChat.name = message.sender_name;
      }
    }
    this.loadingChatMessages = false;
  }

  getChatAvatarText(senderName) {
    return this.chatService.generateChatAvatarText(senderName);
  }

  back() {
    this.router.navigate(["/app/chat"]);
  }

  sendMessage() {
    if (this.message) {
      this.loadingMesageSend = true;
      const message = this.message;
      // remove typed message from text field.
      this.message = '';
      // createing prams need to send message
      let data:any;
      if (this.selectedChat.is_team) {
        data = {
          message: message,
          team_id: this.selectedChat.team_id,
          to: "team",
          participants_only: this.selectedChat.participants_only
        }
      } else {
        data = {
          message: message,
          team_id: this.selectedChat.team_id,
          to: this.selectedChat.team_member_id
        }
      }
      this.chatService.postNewMessage(data).subscribe(
        response => {
          this.messageList.push(response.data);
          this.loadingMesageSend = false;
          setTimeout(() => {
            this.content.scrollToBottom();
         }, 500);
        },
        error => {
          this.loadingMesageSend = false;
        }
      );
    }
  }

  // call chat api to mark message as seen messages
  private markAsSeen(messageList) {
    let messageIdList = [];
    let index = 0;
    // createing id array to mark as read.
    for (index = 0; index < messageList.length; index++) {
      messageIdList.push(messageList[index].id);
    }
    this.chatService
      .markMessagesAsSeen({
        id: JSON.stringify(messageIdList),
        team_id: this.selectedChat.team_id
      })
      .subscribe(
        response => {
          console.log("marked");
        }
      );
  }

  getMessageDate(date) {
    return this.utils.timeFormatter(date);
  }

  /**
   * check same user have messages inline
   * @param {int} message
   */
  checkIsLastMessage(message) {
    let index = this.messageList.indexOf(message);
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
    var timeDiff =
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
      return "reserved-messages no-avatar";
    } else if (!message.is_sender && !message.noAvatar) {
      return "reserved-messages";
    } else {
      return "send-messages";
    }
  }
  /**
   * check message time and return related css class for avatar
   * @param {object} message
   */
  getClassForAvatar(message) {
    if (this.checkToShowMessageTime(message)) {
      return message.chat_color;
    } else {
      return message.chat_color + " no-time";
    }
  }

  /**
   * check date and time diffrance between current message(message object of index) old message.
   * @param {int} message
   */
  checkToShowMessageTime(message) {
    let index = this.messageList.indexOf(message);
    if (index > -1) {
      if (this.messageList[index - 1]) {
        var currentMessageTime = new Date(this.messageList[index].sent_time);
        var oldMessageTime = new Date(this.messageList[index - 1].sent_time);
        if (oldMessageTime) {
          var dateDiff =
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
    var timeDiff =
      (currentMessageTime.getTime() - oldMessageTime.getTime()) / (60 * 1000);
    if (timeDiff > 5) {
      return true;
    } else {
      return false;
    }
  }

  private _showTyping(event) {
    let presenceChannelId = this.pusherService.getMyPresenceChannelId();
    if (presenceChannelId !== event.from) {
      if ((event.is_team === true) && (this.selectedChat.team_id === event.team_id)){
        this.typingMessage = event.sender_name+ ' is typing';
        this.isTyping = true;
        setTimeout(() => {
          this.typingMessage = '';
        this.isTyping = false;
        },3000);
      } else if ((event.is_team === false) && (this.selectedChat.team_id === event.team_id)){
        this.typingMessage = '';
        this.isTyping = true;
        setTimeout(() => {
          this.typingMessage = '';
        this.isTyping = false;
        },3000);
      }
    }
  }

}
