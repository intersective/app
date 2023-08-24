import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '@v3/app/services/shared.service';
import { Activity, Task } from '@v3/services/activity.service';
import { Submission } from '@v3/services/assessment.service';
import { NotificationsService } from '@v3/services/notifications.service';
import { BrowserStorageService } from '@v3/services/storage.service';
import { UtilsService } from '@v3/services/utils.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
  @Input() activity: Activity;
  @Input() currentTask: Task;
  @Input() submission: Submission;
  @Output() navigate = new EventEmitter();
  constructor(
    private utils: UtilsService,
    private storageService: BrowserStorageService,
    private notificationsService: NotificationsService,
    private sharedService: SharedService,
  ) { }

  /**
   * Task icon type
   *
   * @param   {Task}  task  task's type is the only required value
   *
   * @return  {string}      ionicon's name
   */
  leadIcon(task: Task) {
    switch (task.type) {
      case 'Locked':
        return 'lock-closed';
      case 'Topic':
        return 'reader';
      case 'Assessment':
        return 'eye';
    }
  }

  // generate task state-based subtitle for activity list
  subtitle(task: Task) {
    if (this._noSubtitleLabel(task) || !this.assessmentNotSubmitted(task)) {
      return '';
    }
    // for locked team assessment
    if (task.isForTeam && task.isLocked) {
      return `${ task.submitter.name } is working on this`;
    }
    // due date
    if (!task.dueDate) {
      return '';
    }
    // overdue shows the label only
    if (task.isOverdue) {
      return '';
    }
    return `<strong>Due Date</strong>: ${ this.utils.utcToLocal(task.dueDate) }`;
  }

  label(task: Task) {
    if (this._noSubtitleLabel(task)) {
      return '';
    }
    // for locked team assessment
    if (task.isForTeam && task.isLocked) {
      return $localize`in progress`;
    }
    if (!task.status || task.status === 'in progress') {
      if (task.isOverdue) {
        return $localize`overdue`;
      }
      return '';
    }

    // below is redundant, but it's added for the sake of i18n
    if (task?.status === 'feedback available') {
      return $localize`feedback available`;
    }

    if (task?.status === 'pending review') {
      return $localize`pending review`;
    }

    return task.status;
  }

  labelColor(task: Task) {
    if (this._noSubtitleLabel(task)) {
      return '';
    }
    // for locked team assessment
    if (task.isForTeam && task.isLocked) {
      return 'dark-blue';
    }
    switch (task.status) {
      case 'pending review':
        return 'warning black';
      case 'feedback available':
        return 'success';
    }
    if ((!task.status || task.status === 'in progress') && task.isOverdue) {
      return 'danger';
    }
    return '';
  }

  _noSubtitleLabel(task: Task) {
    return task.type !== 'Assessment' || task.status === 'done';
  }

  endingIcon(task: Task) {
    if (task.isLocked || task.type === 'Locked') {
      return 'lock-closed';
    }
    switch (task.status) {
      case 'done':
        return 'checkmark-circle';
      default:
        return 'chevron-forward';
    }
  }

  endingIconColor(task: Task) {
    if (task.status === 'done') {
      return 'success';
    }
    return 'grey-75';
  }

  assessmentNotSubmitted(task: Task) {
    return task.type === 'Assessment' && (!task.status || task.status === '' || task.status === 'in progress');
  }

  async goto(task: Task, keyboardEvent?: KeyboardEvent) {
    if (keyboardEvent && (keyboardEvent?.code === 'Space' || keyboardEvent?.code === 'Enter')) {
      keyboardEvent.preventDefault();
    } else if (keyboardEvent) {
      return;
    }

    return await this._validateTeamAssessment(task, async () => {
      if (task.type === 'Locked') {
        return await this.notificationsService.alert({
          message: $localize`This part of the app is still locked. You can unlock the features by engaging with the app and completing all tasks.`,
          buttons: [
            {
              text: $localize`OK`,
              role: 'cancel'
            }
          ]
        });
      }

      this.navigate.emit(task);
    });
  }

  private async _validateTeamAssessment(task: Task, proceedCB) {
    // update teamId
    await this.sharedService.getTeamInfo().toPromise();

    const doAssessment = (this.utils.isEmpty(this.submission) || ['in progress', 'pending review'].includes(this.submission.status));
    const teamId = this.storageService.getUser().teamId;

    // display pop up if it is team assessment or team 360 assessment and user is not in team
    if (doAssessment && (task.isForTeam || task.assessmentType === 'team360') && !teamId) {
      return await this.notificationsService.alert({
        message: $localize`Currently you are not in a team, please reach out to your Administrator or Coordinator to proceed with next steps.`,
        buttons: [
          {
            text: $localize`OK`,
            role: 'cancel',
          }
        ]
      });
    } else {
      return proceedCB();
    }
  }
}
