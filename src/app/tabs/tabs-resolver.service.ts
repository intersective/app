import { Injectable } from '@angular/core';

import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { TabsService } from './tabs.service';
import { SwitcherService } from '../switcher/switcher.service';
import { ReviewListService } from '@app/review-list/review-list.service';
import { EventListService } from '@app/event-list/event-list.service';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { NativeStorageService } from '@services/native-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TabsResolverService {

  constructor(
    private router: Router,
    private nativeStorage: NativeStorageService,
    private tabsService: TabsService,
    private reviewsService: ReviewListService,
    private eventsService: EventListService,
    private switcherService: SwitcherService,
  ) { }

  async something() {
    const me = await this.nativeStorage.getObject('me');
    console.log('me::', me);

    return me;
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const me = await this.something();
    const {
      teamId,
      hasReviews,
      hasEvents
    } = me;
    let noOfChats: number;
    let teamData: any;
    let reviewData: any;
    let eventData: any;


    // only get the number of chats if user is in team
    if (teamId) {
      this.tabsService.getNoOfChats().subscribe(res => {
        noOfChats = res;
      });
    }

    // display the chat tab if the user is in team
    if (!teamId) {
      this.switcherService.getTeamInfo().subscribe(data => {
        if (teamId) {
          teamData = data;
        }
      });
    }

    if (!hasReviews) {
      this.reviewsService.getReviews().subscribe(res => {
        if (res.length) {
          reviewData = res;
        }
      });
    }

    if (!hasEvents) {
      this.eventsService.getEvents().subscribe(events => {
        eventData = events
      });
    }
    // return await this.nativeStorage.getObject('me');
    return {
      chat: noOfChats,
      team: teamData,
      review: reviewData,
      event: eventData,
    };
  }
}
