import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Activity, Task } from '@v3/app/services/activity.service';
import { UtilsService } from '@v3/app/services/utils.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  @Input() activity: Activity;
  @Input() currentTask: Task;
  @Output() currentTaskChange = new EventEmitter<Task>();
  @Output() navigate = new EventEmitter();
  constructor(
    private utils: UtilsService
  ) { }

  ngOnInit() {}

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

  dueDateText(dueDate: string) {
    if (!dueDate) {
      return '';
    }
    return `Due Data: ${ this.utils.utcToLocal(dueDate) }`;
  }

  endingIcon(task: Task) {
    if (task.isLocked) {
      return 'lock-closed';
    }
    switch (task.status) {
      case 'done':
        return 'checkmark-circle';
      default:
        return 'arrow-forward';
    }
  }

  endingIconColor(task: Task) {
    if (task.status === 'done') {
      return 'success';
    }
    if (task.isLocked) {
      return 'medium';
    }
    return 'light';
  }

  assessmentNotSubmitted(task) {
    return task.type === 'Assessment' && (!task.status || task.status === '' || task.status === 'in progress');
  }

  goto(task: Task) {
    this.currentTaskChange.emit(task);
    this.navigate.emit(task);
  }
}
