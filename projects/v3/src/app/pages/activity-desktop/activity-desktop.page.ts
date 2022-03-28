import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService, Task } from '@v3/app/services/activity.service';
import { Topic, TopicService } from '@v3/app/services/topic.service';

@Component({
  selector: 'app-activity-desktop',
  templateUrl: './activity-desktop.page.html',
  styleUrls: ['./activity-desktop.page.scss'],
})
export class ActivityDesktopPage implements OnInit {
  activity$ = this.service.activity$;
  currentTask$ = this.service.currentTask$;
  topic$ = this.topicService.topic$;

  constructor(
    private route: ActivatedRoute,
    private service: ActivityService,
    private topicService: TopicService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.getActivity(params.id, true);
    });
  }

  goToTask(task: Task) {
    this.service.goToTask(task);
  }

  topicComplete(topic: Topic) {

  }

}
