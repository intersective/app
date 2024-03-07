import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BrowserStorageService } from './storage.service';

interface UnlockedTask {
  milestoneId: number;
  activityId: number;
  taskId: number;
}

@Injectable({
  providedIn: 'root'
})
export class UnlockIndicatorService {
  // Initialize with an empty array
  private unlockedTasksSubject = new BehaviorSubject<UnlockedTask[]>([]);
  // Expose as an observable for components to subscribe
  public unlockedTasks$ = this.unlockedTasksSubject.asObservable();

  constructor(
    private storageService: BrowserStorageService,
  ) {
    const storedTasks = this.storageService.get('unlockedTasks');
    if (storedTasks) {
      this.unlockedTasksSubject.next(storedTasks);
    }
  }

  // Method to add a new unlocked task
  unlockTask(milestoneId: number, activityId: number, taskId: number) {
    const currentTasks = this.unlockedTasksSubject.getValue();

    const latestTasks = [...currentTasks, { milestoneId, activityId, taskId }];
    this.storageService.set('unlockedTasks', latestTasks);
    this.unlockedTasksSubject.next(latestTasks);
  }

  // Method to remove an accessed task
  removeTask(milestoneId?: number, activityId?: number, taskId?: number) {
    let currentTasks = this.unlockedTasksSubject.getValue();

    if (currentTasks.some(task => task.taskId === taskId)) {
      currentTasks = currentTasks.filter(task => task.taskId !== taskId);
    }

    this.storageService.set('unlockedTasks', currentTasks);
    this.unlockedTasksSubject.next(currentTasks);
  }

  // Method to reset the unlocked tasks
  resetTasks() {
    this.storageService.set('unlockedTasks', []);
    this.unlockedTasksSubject.next([]);
  }
}