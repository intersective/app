import { Topic } from '@v3/services/topic.service';
import { Component, NgZone, Input, Output, EventEmitter, Inject, SimpleChange } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UtilsService } from '@v3/services/utils.service';
import { BrowserStorageService } from '@v3/services/storage.service';
import { SharedService } from '@v3/services/shared.service';
import * as Plyr from 'plyr';
import { EmbedVideoService } from '@shared/ngx-embed-video/ngx-embed-video.service';
import { SafeHtml } from '@angular/platform-browser';
import { FilestackService } from '@v3/app/services/filestack.service';
import { NotificationsService } from '@v3/app/services/notifications.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent {
  @Input() topic: Topic;
  continuing: boolean;
  @Output() continue = new EventEmitter();

  iframeHtml = '' as SafeHtml;
  btnToggleTopicIsDone = false;
  isLoadingPreview = false;
  askForMarkAsDone: boolean;

  constructor(
    private embedService: EmbedVideoService,
    private notification: NotificationsService,
    public storage: BrowserStorageService,
    public utils: UtilsService,
    private sharedService: SharedService,
    private filestack: FilestackService,
    @Inject(DOCUMENT) private readonly document: Document
  ) { }

  ngOnChanges(): void {
    this.continuing = false;
    if (this.topic && this.topic.videolink) {
      this._setVideoUrlElelemts();
    }
    // mark topic as started after topic load
    // this._markAsStartStop('started');
    this._initVideoPlayer();
  }

  ionViewWillLeave() {
    this.sharedService.stopPlayingVideos();
    // mark topic as stopped when leave topic page
    // this._markAsStartStop('stopped');
  }

  private _setVideoUrlElelemts() {
    if (this.topic.videolink.includes('vimeo') || this.topic.videolink.includes('youtube')) {
      this.iframeHtml = this.embedService.embed(this.topic.videolink, { attr: { class: !this.utils.isMobile() ? 'topic-video desktop-view' : 'topic-video' } }) || null;
    }
  }

  // convert other brand video players to custom player.
  private _initVideoPlayer() {
    setTimeout(() => {
      this.utils.each(this.document.querySelectorAll('.video-embed'), embedVideo => {
        embedVideo.classList.remove('topic-video');
        if (!this.utils.isMobile()) {
          embedVideo.classList.remove('desktop-view');
        }
        embedVideo.classList.add('plyr__video-embed');
        new Plyr(embedVideo as HTMLElement, { ratio: '16:9' });
        // if we have video tag, plugin will adding div tags to wrap video tag and main div contain .plyr css class.
        // so we need to add topic-video and desktop-view to that div to load video properly .
        if (embedVideo.nodeName === 'VIDEO') {
          embedVideo.classList.remove('plyr__video-embed');
          this.utils.each(this.document.querySelectorAll('.plyr'), videoPlayer => {
            if (!videoPlayer.classList.contains('topic-custome-player', 'desktop-view')) {
              videoPlayer.classList.add('topic-custome-player');
              if (!this.utils.isMobile()) {
                videoPlayer.classList.add('desktop-view');
              }
            }
          });
          return;
        }
        embedVideo.classList.add('topic-custome-player');
        if (!this.utils.isMobile()) {
          embedVideo.classList.add('desktop-view');
        }
      });
    }, 500);
  }

  /**
   * @name previewFile
   * @description open and preview file in a modal
   * @param {object} file filestack object
   */
   async previewFile(file) {
    if (this.isLoadingPreview === false) {
      this.isLoadingPreview = true;
      try {

        const filestack = await this.filestack.previewFile(file);
        this.isLoadingPreview = false;
        return filestack;
      } catch (err) {
        const toasted = await this.notification.alert({
          header: 'Error Previewing file',
          message: err.msg || JSON.stringify(err)
        });
        // this.newRelic.noticeError(`${JSON.stringify(err)}`);
        return toasted;
      }
    }
  }

}
