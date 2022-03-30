import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService, Task, Activity } from '@v3/app/services/activity.service';
import { AssessmentService, AssessmentSubmitParams } from '@v3/app/services/assessment.service';
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
  assessment$ = this.assessmentService.assessment$;
  submission$ = this.assessmentService.submission$;
  review$ = this.assessmentService.review$;

  activity: Activity;

  constructor(
    private route: ActivatedRoute,
    private service: ActivityService,
    private topicService: TopicService,
    private assessmentService: AssessmentService
  ) { }

  ngOnInit() {
    this.activity$.subscribe(res => this.activity = res);
    this.route.params.subscribe(params => {
      this.service.getActivity(params.id, true);
    });
  }

  goToTask(task: Task) {
    this.service.goToTask(task);
  }

  async topicComplete(task: Task) {
    if (task.status === 'done') {
      // just go to the next task without any other action
      return this.service.goToNextTask(this.activity.tasks, task);
    }
    // mark the topic as complete
    await this.topicService.updateTopicProgress(task.id, 'completed').subscribe();
    // get the latest activity tasks and navigate to the next task
    return this.service.getActivity(this.activity.id, true, task);
  }

  async submitAssessment(event, task: Task) {
    await this.assessmentService.saveAnswers(event.assessment, event.answers, event.action).subscribe();
    if (!event.assessment.inProgress) {
      // get the latest activity tasks and navigate to the next task
      return this.service.getActivity(this.activity.id, true, task);
    }
  }

  async readFeedback(event, task: Task) {
    await this.assessmentService.saveFeedbackReviewed(event).subscribe();
    // get the latest activity tasks and navigate to the next task
    return this.service.getActivity(this.activity.id, true, task);
  }

  nextTask(task: Task) {
    this.service.goToNextTask(this.activity.tasks, task);
  }

}
