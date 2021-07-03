import { AfterContentChecked, Component, Input, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AchievementsService, Achievement } from './achievements.service';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { RouterEnter } from '@services/router-enter.service';

@Component({
  selector: 'app-achievements',
  templateUrl: 'achievements.component.html',
  styleUrls: ['achievements.component.scss']
})
export class AchievementsComponent extends RouterEnter implements AfterContentChecked {
  routeUrl = '/achievements';
  achievements: Array<Achievement>;
  loadingAchievements = true;
  userInfo = {
    image: '',
    name: ''
  };

  constructor (
    public router: Router,
    private routes: ActivatedRoute,
    readonly utils: UtilsService,
    readonly achievementService: AchievementsService,
    private ngZone: NgZone,
    private newRelic: NewRelicService,
    public storage: BrowserStorageService,
  ) {
    super(router);
  }

  onEnter() {
    this.routes.data.subscribe(data => {
      this.userInfo = {
        image: data.user.image,
        name: data.user.name,
      };
    });
    this.loadingAchievements = true;
    this.achievementService.getAchievements().subscribe(
      achievements => {
        this.achievements = achievements;
        this.loadingAchievements = false;
      },
      err => {
        this.newRelic.noticeError(`${JSON.stringify(err)}`);
      }
    );
  }

  get isMobile() {
    return this.utils.isMobile();
  }

  get getIsPointsConfigured() {
    return this.achievementService.getIsPointsConfigured();
  }

  get getEarnedPoints() {
    return this.achievementService.getEarnedPoints();
  }

  back() {
    return this.ngZone.run(() => this.router.navigate(['app', 'home']));
  }

  ngAfterContentChecked() {
    document.getElementById('badges').focus();
  }
}
