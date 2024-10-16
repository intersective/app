import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { environment } from '@v3/environments/environment';
import { DemoService } from './demo.service';
import { map, mergeMap, shareReplay } from 'rxjs/operators';
import { UtilsService } from '@v3/services/utils.service';
import { ApolloService } from '@v3/services/apollo.service';
import { BrowserStorageService } from '@v3/services/storage.service';
import { SharedService } from '@v3/services/shared.service';
import { EventService } from '@v3/services/event.service';
import { ReviewService } from '@v3/services/review.service';
import { HomeService } from './home.service';
import { AuthService } from './auth.service';
import { filter } from 'rxjs/operators';

export interface ProgramObj {
  program: Program;
  project: Project;
  timeline: Timeline;
  enrolment: Enrolment;
  experience: Experience;
  institution: {
    name: string;
    logo_url: string;
    config: {
      appv3?: boolean; // appv3 activation
      banner_url?: string;
      billing_plan?: string;
      card_url?: string;
      email_template?: string;
      icon_url?: string; // square logo string institution logo
      lead_url?: string;
      primary_color?: string;
      secondary_color?: string;
      support_name?: string;
      application_language?: string;
    };
    uuid: string;
  };
  progress?: number;
  todoItems?: number;
}

export interface Program {
  id: number;
  name: string;
  experience_id: number;
  config: ProgramConfig;
}

export interface ProgramConfig {
  theme_color: string;
  card_style?: string;
  review_rating?: boolean;
  truncate_description?: boolean;
}

export interface Project {
  id: number;
  lead_image?: string;
}

export interface Timeline {
  id: number;
}

export interface Experience {
  id: number;
  name: string;
  lead_image: string;
  config: any;
}

export interface Enrolment {
  contact_number: string;
}

export interface ProjectProgress {
  id: number;
  progress: number;
  todoItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  review$ = this.reviewService.reviews$;

  private _experience$ = new BehaviorSubject<any>(null);
  experience$ = this._experience$.asObservable();

  private _experiences$ = new BehaviorSubject<any>(null);
  experiences$ = this._experiences$.asObservable();

  private _programs$ = new BehaviorSubject<ProgramObj[]>(null);
  programs$ = this._programs$.asObservable();

  programsWithProgress$ = this._experiences$.asObservable().pipe(
    filter(experiences => experiences !== null),
    mergeMap(
      async experiences => {
        const projectIds = experiences.map(exp => exp.projectId);
        this.getProgresses(projectIds).subscribe(
          res => {
            res.forEach(progress => {
              const i = experiences.findIndex(exp => exp.projectId === progress.id);
              experiences[i].progress = Math.round(progress.progress * 100);
            });
          }
        );
        return experiences;
      }
    ),
    shareReplay(1)
  );

  constructor(
    private demo: DemoService,
    private utils: UtilsService,
    private apolloService: ApolloService,
    private sharedService: SharedService,
    private storage: BrowserStorageService,
    private eventService: EventService,
    private reviewService: ReviewService,
    private homeService: HomeService,
    private authService: AuthService,
  ) { }

  getExperiences(): Subscription {
    return this.apolloService.graphQLFetch(
      `query experiences {
        experiences {
          id
          uuid
          timelineId
          projectId
          name
          description
          type
          leadImage
          status
          setupStep
          color
          secondaryColor
          todoItemCount
          role
          isLast
          locale
          supportName
          supportEmail
          cardUrl
          bannerUrl
          logoUrl
          iconUrl
          reviewRating
          truncateDescription
        }
      }`
    )
    .pipe(map(res => {
      const cdn = 'https://cdn.filestackcontent.com/resize=fit:crop,width:';
      let imagewidth = 600;

      const { experiences } = res?.data || {};
      experiences.forEach((experience, index) => {
        if (experience.leadImage) {
          const imageId = experience.leadImage.split('/').pop();
          if (!this.utils.isMobile()) {
            imagewidth = 1024;
          }
          experiences[index].leadImage = `${cdn}${imagewidth}/${imageId}`;
        }
        experiences[index].progress = 0;
      });
      return experiences;
    })).subscribe(res => {
      // [CORE-6272] - accessing a deleted experience
      if (environment.demo) {
        res = [this.demo.deletedExperience, ...res];
      }
      this._experiences$.next(res);
    });
  }

  /**
   * Get the progress and number of notifications for each project
   * @param projectIds Project ids
   */
  getProgresses(projectIds: number[]) {
    if (environment.demo) {
      return of(this.demo.projectsProgress);
    }
    return this.apolloService.graphQLFetch(
      `query getProjectList($ids: [Int]!) {
        projects(ids: $ids) {
          id
          progress
        }
      }`,
      {
        variables: {
          ids: projectIds
        },
      }
    )
    .pipe(map(res => {
      return res.data.projects.map(project => {
        return {
          id: +project.id,
          progress: project.progress,
        };
      });
    }));
  }

  extractColors(programObj: ProgramObj) {
    const experienceConfig = (programObj.experience || {}).config;
    const programConfig = (programObj.program || {}).config;

    const primary = (experienceConfig || {}).primary_color;
    const secondary = (experienceConfig || {}).secondary_color;
    const themeColor = (programConfig || {}).theme_color;

    return {
      primary,
      secondary,
      themeColor,
    };
  }

  /**
   * insert experience to localStorage and switch program
   *
   * @param   {any}  authObj  auth object return from authService:authenticate()
   * @param   {object}  options  refreshJWT: boolean, 2nd call to auth query to refresh APIKEY
   *
   * @return  {Promise<any>}
   */
  async switchProgram(authObj): Promise<any> {
    const exp = authObj?.experience;
    this.storage.set('experience', exp);
    const colors = {
      themeColor: exp?.color,
      primary: exp?.color,
      secondary: exp?.secondaryColor,
    };

    const cardBackgroundImage = (exp?.cardUrl) ? '/assets/' + exp?.cardUrl : '';
    this.storage.setUser({
      colors: {
        theme: colors.themeColor,
        primary: colors.primary,
        secondary: colors.secondary,
      },

      programId: exp.id,
      programName: exp.name,
      programImage: exp.leadImage,
      hasReviewRating: exp.reviewRating || false,
      truncateDescription: exp.truncateDescription || true,
      experienceId: exp.experienceId,
      institutionLogo: exp?.logoUrl || null,
      squareLogo: exp?.iconUrl || null,
      institutionName: exp?.name || null,
      projectId: exp?.projectId,
      timelineId: exp?.timelineId,
      activityCardImage: cardBackgroundImage, // default activity image
      activityCompleteMessage: exp?.activityCompleteMessage || null,
      chatEnabled: exp?.chatEnable || true,
      teamId: null,
      hasEvents: false,
      hasReviews: false,
    });

    this.sharedService.onPageLoad();
    this.homeService.clearExperience();

    // initialise Pusher
    this.sharedService.initWebServices();
    try {
      const teamInfo = await this.sharedService.getTeamInfo().toPromise();
      const me = await this.authService.getMyInfo().toPromise();

      this._experience$.next(exp);

      return [teamInfo, me];
    } catch (err) {
      throw Error(err);
    }
  }

  getEvents() {
    if (environment.demo) {
      this.storage.setUser({
        hasEvents: true
      });
      return of([]);
    }

    return this.eventService.getEvents().pipe(map(events => {
      this.storage.setUser({
        hasEvents: !this.utils.isEmpty(events)
      });
      return events;
    }));
  }

  /**
   * this method will check program data and navigate to switcher or dashboard/go-mobile
   * @param programs
   * there are 4 types of values can come to programs variable.
   * - Array with multiple program objects -> [{},{},{},{}]
   * - Array with one program object -> [{}]
   * - one program object -> {}
   * - empty value
   * if method got 'Array with multiple program objects', redirect to switcher page.
   * if method got 'Array with one program object', switch to that program object and navigate to dashboard.
   * if method got 'one program object', switch to that program object and navigate to dashboard.
   * if method got 'empty value', do nothing.
   */
  async switchProgramAndNavigate(experience): Promise<string[]> {
    if (environment.demo) {
      return ['experiences'];
    }

    await this.switchProgram({ experience });
    await this.authService.authenticate({
      experienceUuid: experience.uuid,
    }).toPromise();

    // await this.pusherService.initialise({ unsubscribe: true });
    // clear the cached data
    await this.authService.clearCache();

    if (this.storage.get('directLinkRoute')) {
      const route = this.storage.get('directLinkRoute');
      this.storage.remove('directLinkRoute');
      return route;
    }

    /* if (environment.goMobile === true
      || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      return ['go-mobile'];
    } */

    return ['v3', 'home'];
  }
}
