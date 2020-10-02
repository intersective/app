import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, concat } from 'rxjs';
import { NotificationService } from '@shared/notification/notification.service';
import { SwitcherService } from '../../switcher/switcher.service';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { async } from '../../../../node_modules/@types/q';

@Component({
  selector: 'app-auth-direct-login',
  templateUrl: 'auth-direct-login.component.html',
  // styles: ['']
})
export class AuthDirectLoginComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService,
    public utils: UtilsService,
    private switcherService: SwitcherService,
    private storage: BrowserStorageService,
    private ngZone: NgZone,
    private newRelic: NewRelicService
  ) {}

  async ngOnInit() {
    this.newRelic.setPageViewName('direct-login');
    const authToken = this.route.snapshot.paramMap.get('authToken');
    if (!authToken) {
      return await this._error();
    }

    const nrDirectLoginTracer = this.newRelic.createTracer('Processing direct login');
    // move try catch inside to timeout, because if try catch is outside it not catch errors happen inside timeout.
    setTimeout(
      async () => {
        try {
          await this.authService.directLogin({ authToken }).toPromise();
          await this.switcherService.getMyInfo().toPromise();
          nrDirectLoginTracer();
          return this._redirect();
        } catch (err) {
          await this._error(err);
        }
        // tslint:disable-next-line:align
      }, 50
    );
  }

  // force every navigation happen under radar of angular
  private navigate(direction): Promise<boolean> {
    return this.ngZone.run(() => {
      this.newRelic.setCustomAttribute('redirection', direction);
      return this.router.navigate(direction);
    });
  }

  /**
   * Redirect user to a specific page if data is passed in, otherwise redirect to program switcher page
   */
  private async _redirect(redirectLater?: boolean): Promise<boolean | void> {
    const redirect = this.route.snapshot.paramMap.get('redirect');
    const timelineId = +this.route.snapshot.paramMap.get('tl');
    const activityId = +this.route.snapshot.paramMap.get('act');
    const contextId = +this.route.snapshot.paramMap.get('ctxt');
    const assessmentId = +this.route.snapshot.paramMap.get('asmt');
    const submissionId = +this.route.snapshot.paramMap.get('sm');
    // clear the cached data
    this.utils.clearCache();
    if (!redirect || !timelineId) {
      // if there's no redirection or timeline id
      return this._saveOrRedirect(['switcher', 'switcher-program'], redirectLater);
    }
    if ( this.route.snapshot.paramMap.has('return_url')) {
      this.storage.setUser({
        LtiReturnUrl: this.route.snapshot.paramMap.get('return_url')
      });
    }
    // switch parogram if user already registered
    if (!redirectLater) {
      const program = this.utils.find(await this.storage.nativeGet('programs'), value => {
        return value.timeline.id === timelineId;
      });
      if (this.utils.isEmpty(program)) {
        // if the timeline id is not found
        return this._saveOrRedirect(['switcher', 'switcher-program']);
      }
      // switch to the program
      const switching = await this.switcherService.switchProgram(program);
      switching.toPromise();
    }

    switch (redirect) {
      case 'home':
        return this._saveOrRedirect(['app', 'home'], redirectLater);
      case 'project':
        return this._saveOrRedirect(['app', 'home'], redirectLater);
      case 'activity':
        if (!activityId) {
          return this._saveOrRedirect(['app', 'home'], redirectLater);
        }
        return this._saveOrRedirect(['app', 'activity', activityId], redirectLater);
      case 'assessment':
        if (!activityId || !contextId || !assessmentId) {
          return this._saveOrRedirect(['app', 'home'], redirectLater);
        }
        if (this.utils.isMobile()) {
          return this._saveOrRedirect(['assessment', 'assessment', activityId, contextId, assessmentId], redirectLater);
        } else {
          return this._saveOrRedirect(['app', 'activity', activityId, { task: 'assessment', task_id: assessmentId, context_id: contextId}], redirectLater);
        }
      case 'reviews':
        return this._saveOrRedirect(['app', 'reviews'], redirectLater);
      case 'review':
        if (!contextId || !assessmentId || !submissionId) {
          return this._saveOrRedirect(['app', 'home'], redirectLater);
        }
        return this._saveOrRedirect(['assessment', 'review', contextId, assessmentId, submissionId], redirectLater);
      case 'chat':
        return this._saveOrRedirect(['app', 'chat'], redirectLater);
      case 'settings':
        return this._saveOrRedirect(['app', 'settings'], redirectLater);
      default:
      return this._saveOrRedirect(['app', 'home'], redirectLater);
    }
    return this._saveOrRedirect(['app', 'home'], redirectLater);
  }

  private _saveOrRedirect(route: Array<String | number | object>, save = false) {
    if (save) {
      return this.storage.nativeSet('directLinkRoute', route);
    }
    return this.navigate(route);
  }

  private async _error(res?): Promise<any> {
    await this.newRelic.noticeError('failed direct login', res ? JSON.stringify(res) : undefined);
    if (!this.utils.isEmpty(res) && res.status === 'forbidden' && [
      'User is not registered'
    ].includes(res.data.message)) {
      this._redirect(true);
      return this.navigate(['registration', res.data.user.email, res.data.user.key]);
    }
    return this.notificationService.alert({
      message: 'Your link is invalid or expired.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.navigate(['login']);
          }
        }
      ]
    });
  }

}
