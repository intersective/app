import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService, Task, Activity } from '@v3/app/services/activity.service';
import { Assessment, AssessmentService } from '@v3/app/services/assessment.service';
import { TopicService } from '@v3/app/services/topic.service';

@Component({
  selector: 'app-activity-desktop',
  templateUrl: './activity-desktop.page.html',
  styleUrls: ['./activity-desktop.page.scss'],
})
export class ActivityDesktopPage implements OnInit {
  activity$ = this.activityService.activity$;
  currentTask$ = this.activityService.currentTask$;
  topic$ = this.topicService.topic$;
  assessment$ = this.assessmentService.assessment$;
  submission$ = this.assessmentService.submission$;
  review$ = this.assessmentService.review$;

  activity: Activity;
  assessment: Assessment;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private topicService: TopicService,
    private assessmentService: AssessmentService
  ) { }

  ngOnInit() {
    this.activity$.subscribe(res => this.activity = res);
    this.assessment$.subscribe(res => this.assessment = res);
    this.route.params.subscribe(params => {
      this.activityService.getActivity(params.id, true);
    });
  }

  goToTask(task: Task) {
    this.activityService.goToTask(task);
  }

  async topicComplete(task: Task) {
    if (task.status === 'done') {
      // just go to the next task without any other action
      return this.activityService.goToNextTask(this.activity.tasks, task);
    }
    // mark the topic as complete
    await this.topicService.updateTopicProgress(task.id, 'completed').subscribe();
    // get the latest activity tasks and navigate to the next task
    return this.activityService.getActivity(this.activity.id, true, task);
  }

  async submitAssessment(event, task: Task) {
    await this.assessmentService.saveAnswers(event.assessment, event.answers, event.action, this.assessment.pulseCheck).subscribe();
    if (!event.assessment.inProgress) {
      // get the latest activity tasks and navigate to the next task
      return this.activityService.getActivity(this.activity.id, true, task);
    }
  }

  async readFeedback(event, task: Task) {
    await this.assessmentService.saveFeedbackReviewed(event).subscribe();
    // get the latest activity tasks and navigate to the next task
    return this.activityService.getActivity(this.activity.id, true, task);
  }

  nextTask(task: Task) {
    this.activityService.goToNextTask(this.activity.tasks, task);
  }

}
