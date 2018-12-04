import { TopicService } from './topic.service';
import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  topic : any;
  iframeHtml: any;
  btnToggleTopicIsDone: boolean = false;
  id = 0;
  activityId = 0;
  action= '';
  
  constructor( 
    private topicService: TopicService,
    private embedService: EmbedVideoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.action = this.route.snapshot.data.action;
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.activityId = parseInt(this.route.snapshot.paramMap.get('activityId'));

    this.topicService.getTopic(this.id)
      .subscribe(topic => {
        this.topic = topic;
        if ( topic.videolink ) {
          this.iframeHtml = this.embedService.embed(this.topic.videolink);
        }
      });

    this.topicService.getTopicIsDone(this.topic.id)
      .subscribe(result => {
        this.btnToggleTopicIsDone = result;
      });
   }  
  
  markAsDone () {
    this.btnToggleTopicIsDone = true;
    this.topicService.saveTopicRead(this.topic.id);
    
  }
  previewFile () {
    console.log('show the file');
  }

  back() {
    this.router.navigate(['app', { outlets: { project: ['activity', this.activityId] }}]);
  }

}
