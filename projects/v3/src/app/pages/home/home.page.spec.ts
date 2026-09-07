import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '@v3/services/activity.service';
import { AssessmentService } from '@v3/services/assessment.service';
import { UtilsService } from '@v3/services/utils.service';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AchievementService } from '@v3/app/services/achievement.service';
import { HomeService } from '@v3/app/services/home.service';
import { NotificationsService } from '@v3/app/services/notifications.service';
import { SharedService } from '@v3/app/services/shared.service';
import { BrowserStorageService } from '@v3/app/services/storage.service';
import { FastFeedbackService } from '@v3/app/services/fast-feedback.service';
import { UnlockIndicatorService } from '@v3/app/services/unlock-indicator.service';
import { NavigationStateService } from '@v3/app/services/navigation-state.service';
import { PulsecheckService } from '@v3/app/services/pulsecheck.service';

import { HomePage } from './home.page';
import { of } from 'rxjs';
import { ActivatedRouteStub } from '@testingv3/activated-route-stub';
import { MockRouter } from '@testingv3/mocked.service';
import { TestUtils } from '@testingv3/utils';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let homeService: jasmine.SpyObj<HomeService>;
  let achievementService: jasmine.SpyObj<AchievementService>;
  let sharedService: jasmine.SpyObj<SharedService>;
  let storageService: jasmine.SpyObj<BrowserStorageService>;
  let fastFeedbackService: jasmine.SpyObj<FastFeedbackService>;
  let utilsService: jasmine.SpyObj<UtilsService>;
  let router: MockRouter;
  let notificationsService: jasmine.SpyObj<NotificationsService>;
  let unlockIndicatorService: jasmine.SpyObj<UnlockIndicatorService>;
  let navigationStateService: jasmine.SpyObj<NavigationStateService>;
  let alertController: jasmine.SpyObj<AlertController>;
  let modalController: jasmine.SpyObj<ModalController>;
  let pulsecheckService: jasmine.SpyObj<PulsecheckService>;

  beforeEach(waitForAsync(() => {
    const homeServiceSpy = jasmine.createSpyObj('HomeService', [
      'getExperience',
      'getMilestones',
      'getProjectProgress',
      'getPulseCheckStatuses',
      'getPulseCheckSkills',
    ], {
      'experience$': of(),
      'experienceProgress$': of(),
      'activityCount$': of(),
      'milestonesWithProgress$': of(),
      'milestones$': of(),
      'projectProgress$': of(),
    });

    const achievementServiceSpy = jasmine.createSpyObj('AchievementService', [
      'getAchievements',
      'getIsPointsConfigured',
      'getEarnedPoints',
    ], {
      'achievements$': of(),
      'isPointsConfigured': true,
      'earnedPoints': 75,
    });

    const sharedServiceSpy = jasmine.createSpyObj('SharedService', ['refreshJWT'], {
      team$: of(null),
    });
    const storageServiceSpy = jasmine.createSpyObj('BrowserStorageService', [
      'get',
      'lastVisited',
      'getUser',
      'getFeature',
      'append',
    ]);
    const fastFeedbackServiceSpy = jasmine.createSpyObj('FastFeedbackService', ['pullFastFeedback']);
    const utilsServiceSpy = jasmine.createSpyObj('UtilsService', ['setPageTitle', 'isMobile', 'ucfirst']);
    const notificationsServiceSpy = jasmine.createSpyObj('NotificationsService', [
      'getCurrentTodoItems',
      'markTodoItemAsDone',
      'achievementPopUp',
      'popUp',
    ]);
    const unlockIndicatorServiceSpy = jasmine.createSpyObj('UnlockIndicatorService', [
      'isActivityClearable',
      'isMilestoneClearable',
      'clearByActivityIdWithDuplicates',
      'clearByMilestoneIdWithDuplicates',
      'markDuplicatesAsDone',
      'clearRelatedIndicators',
    ], {
      'unlockedTasks$': of([]),
    });
    const navigationStateServiceSpy = jasmine.createSpyObj('NavigationStateService', ['setNavigationSource']);
    const alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    const modalControllerSpy = jasmine.createSpyObj('ModalController', ['create']);
    const pulsecheckServiceSpy = jasmine.createSpyObj('PulsecheckService', ['getSkillChangeDisplayFromValue']);

    sharedServiceSpy.refreshJWT.and.returnValue(Promise.resolve());
    storageServiceSpy.get.and.returnValue({});
    storageServiceSpy.getUser.and.returnValue({});
    storageServiceSpy.getFeature.and.returnValue(false);
    storageServiceSpy.lastVisited.and.returnValue([]);
    fastFeedbackServiceSpy.pullFastFeedback.and.returnValue(of({}));
    notificationsServiceSpy.getCurrentTodoItems.and.returnValue([]);
    notificationsServiceSpy.markTodoItemAsDone.and.returnValue(of({}) as any);
    notificationsServiceSpy.popUp.and.resolveTo();
    unlockIndicatorServiceSpy.isActivityClearable.and.returnValue(false);
    unlockIndicatorServiceSpy.isMilestoneClearable.and.returnValue(false);
    unlockIndicatorServiceSpy.clearByActivityIdWithDuplicates.and.returnValue({
      clearedUnlocks: [],
      duplicatesToMark: [],
      cascadeMilestones: [],
    });
    unlockIndicatorServiceSpy.clearByMilestoneIdWithDuplicates.and.returnValue({
      clearedUnlocks: [],
      duplicatesToMark: [],
    });
    unlockIndicatorServiceSpy.clearRelatedIndicators.and.returnValue([]);
    utilsServiceSpy.ucfirst.and.callFake((value: string) =>
      value ? value.charAt(0).toUpperCase() + value.slice(1) : value
    );
    homeServiceSpy.getPulseCheckSkills.and.returnValue(of({
      success: true,
      status: 'success',
      cache: false,
      data: { pulseCheckSkills: [] },
    }));

    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub({}),
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: HomeService,
          useValue: homeServiceSpy
        },
        {
          provide: AchievementService,
          useValue: achievementServiceSpy,
        },
        {
          provide: SharedService,
          useValue: sharedServiceSpy,
        },
        {
          provide: BrowserStorageService,
          useValue: storageServiceSpy,
        },
        {
          provide: FastFeedbackService,
          useValue: fastFeedbackServiceSpy,
        },
        {
          provide: ActivityService,
          useValue: jasmine.createSpyObj('ActivityService', ['clearActivity'])
        },
        {
          provide: AssessmentService,
          useValue: jasmine.createSpyObj('AssessmentService', ['clearAssessment'])
        },
        {
          provide: UtilsService,
          useValue: utilsServiceSpy
        },
        {
          provide: NotificationsService,
          useValue: notificationsServiceSpy,
        },
        {
          provide: UnlockIndicatorService,
          useValue: unlockIndicatorServiceSpy,
        },
        {
          provide: NavigationStateService,
          useValue: navigationStateServiceSpy,
        },
        {
          provide: AlertController,
          useValue: alertControllerSpy,
        },
        {
          provide: ModalController,
          useValue: modalControllerSpy,
        },
        {
          provide: PulsecheckService,
          useValue: pulsecheckServiceSpy,
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    homeService = TestBed.inject(HomeService) as jasmine.SpyObj<HomeService>;
    achievementService = TestBed.inject(AchievementService) as jasmine.SpyObj<AchievementService>;
    sharedService = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    storageService = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
    fastFeedbackService = TestBed.inject(FastFeedbackService) as jasmine.SpyObj<FastFeedbackService>;
    utilsService = TestBed.inject(UtilsService) as jasmine.SpyObj<UtilsService>;
    router = TestBed.inject(Router) as any;
    notificationsService = TestBed.inject(NotificationsService) as jasmine.SpyObj<NotificationsService>;
    unlockIndicatorService = TestBed.inject(UnlockIndicatorService) as jasmine.SpyObj<UnlockIndicatorService>;
    navigationStateService = TestBed.inject(NavigationStateService) as jasmine.SpyObj<NavigationStateService>;
    alertController = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
    modalController = TestBed.inject(ModalController) as jasmine.SpyObj<ModalController>;
    pulsecheckService = TestBed.inject(PulsecheckService) as jasmine.SpyObj<PulsecheckService>;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a visible Project Hub label when project brief and project hub are available', () => {
    component.experience = { id: 1, name: 'Test Experience', cardUrl: 'test-card-url' } as any;
    component.isExpert = false;
    component.projectBrief = { id: 'brief-1', title: 'Project Brief' };
    component.showProjectHub = true;

    fixture.detectChanges();

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('ion-button')
    ) as HTMLElement[];
    const projectHubButton = buttons.find(button =>
      button.getAttribute('aria-label') === 'Go to Project Hub'
    );

    expect(projectHubButton).toBeTruthy();
    expect(projectHubButton?.textContent).toContain('Go to Project Hub');
  });

  it('opens the project brief with learner PDF visibility enabled', async () => {
    const projectBrief = { id: 'brief-1', title: 'Project Brief' };
    const modalController = TestBed.inject(ModalController) as jasmine.SpyObj<ModalController>;
    const modal = { present: jasmine.createSpy('present') };
    component.projectBrief = projectBrief;
    component.isMobile = false;
    modalController.create.and.returnValue(Promise.resolve(modal as any));

    await component.showProjectBrief();

    expect(modalController.create).toHaveBeenCalledWith(jasmine.objectContaining({
      componentProps: {
        projectBrief,
        allowPdfDownload: true,
      },
    }));
    expect(modal.present).toHaveBeenCalled();
  });

  describe('updateDashboard', () => {
    beforeEach(() => {
      sharedService.refreshJWT.and.returnValue(Promise.resolve());
      storageService.get.and.returnValue({
        leadImage: '',
        name: 'Test Experience',
        description: '',
        locale: 'en',
        cardUrl: 'test-url',
      });
      storageService.getFeature.and.returnValue(true);
      achievementService.getIsPointsConfigured.and.returnValue(true);
      achievementService.getEarnedPoints.and.returnValue(100);
      homeService.getPulseCheckStatuses.and.returnValue(of({
        success: true,
        status: 'success',
        cache: false,
        data: { pulseCheckStatus: { self: 1, expert: 2, team: 3, teams: [] } }
      }));
      homeService.getPulseCheckSkills.and.returnValue(of({
        success: true,
        status: 'success',
        cache: false,
        data: { pulseCheckSkills: [{ id: 1, name: 'Skill 1', value: 5 }] }
      }));
      fastFeedbackService.pullFastFeedback.and.returnValue(of({}));
      storageService.lastVisited.and.returnValue([1, 2, 3]);
    });

    it('should refresh JWT token', async () => {
      await component.updateDashboard();
      expect(sharedService.refreshJWT).toHaveBeenCalled();
    });

    it('should get experience from storage', async () => {
      await component.updateDashboard();
      expect(storageService.get).toHaveBeenCalledWith('experience');
      expect(component.experience).toEqual({
        leadImage: '',
        name: 'Test Experience',
        description: '',
        locale: 'en',
        cardUrl: 'test-url',
      });
    });

    it('should set project hub visibility from feature toggle', async () => {
      await component.updateDashboard();
      expect(storageService.getFeature).toHaveBeenCalledWith('showProjectHub');
      expect(component.showProjectHub).toBe(true);
    });

    it('should hide project hub when feature toggle is disabled', async () => {
      storageService.getFeature.and.returnValue(false);
      await component.updateDashboard();
      expect(component.showProjectHub).toBe(false);
    });

    it('should treat mentor users as expert users', async () => {
      storageService.getUser.and.returnValue({
        role: 'mentor',
        apikey: 'test-key',
        projectId: 1,
        teamId: 1,
      });

      await component.updateDashboard();

      expect(component.isExpert).toBe(true);
      expect(component.isParticipant).toBe(false);
    });

    it('should call service methods to fetch data', async () => {
      await component.updateDashboard();
      expect(homeService.getMilestones).toHaveBeenCalled();
      expect(achievementService.getAchievements).toHaveBeenCalled();
      expect(homeService.getProjectProgress).toHaveBeenCalled();
    });

    it('should get points configuration and earned points', async () => {
      await component.updateDashboard();
      expect(achievementService.getIsPointsConfigured).toHaveBeenCalled();
      expect(achievementService.getEarnedPoints).toHaveBeenCalled();
      expect(component.getIsPointsConfigured).toBe(true);
      expect(component.getEarnedPoints).toBe(100);
    });

    it('should get pulse check statuses when pulse check indicator is enabled', async () => {
      component.pulseCheckIndicatorEnabled = true;
      await component.updateDashboard();
      expect(homeService.getPulseCheckStatuses).toHaveBeenCalled();
      expect(component.pulseCheckStatus).toEqual({ self: 1, expert: 2, team: 3, teams: [] });
    });

    it('should not get pulse check statuses when pulse check indicator is disabled', async () => {
      component.pulseCheckIndicatorEnabled = false;
      await component.updateDashboard();
      expect(homeService.getPulseCheckStatuses).not.toHaveBeenCalled();
    });

    it('should set page title with experience name', async () => {
      await component.updateDashboard();
      expect(utilsService.setPageTitle).toHaveBeenCalledWith('Test Experience');
    });

    it('should set page title with default when experience has no name', async () => {
      storageService.get.and.returnValue({});
      await component.updateDashboard();
      expect(utilsService.setPageTitle).toHaveBeenCalledWith('Practera');
    });

    it('should set default lead image from experience card URL', async () => {
      await component.updateDashboard();
      expect(component.defaultLeadImage).toBe('test-url');
    });

    it('should set empty default lead image when experience has no card URL', async () => {
      storageService.get.and.returnValue({ name: 'Test Experience' });
      await component.updateDashboard();
      expect(component.defaultLeadImage).toBe('');
    });

    it('should reset and load bookmarks', async () => {
      await component.updateDashboard();
      expect(storageService.lastVisited).toHaveBeenCalledWith('homeBookmarks');
      expect(component.bookmarkedActivities).toEqual({
        1: true,
        2: true,
        3: true
      });
    });

    it('should handle empty bookmarks array', async () => {
      storageService.lastVisited.and.returnValue([]);
      await component.updateDashboard();
      expect(component.bookmarkedActivities).toEqual({});
    });

    it('should handle null bookmarks', async () => {
      storageService.lastVisited.and.returnValue(null);
      await component.updateDashboard();
      expect(component.bookmarkedActivities).toEqual({});
    });

    it('should pull fast feedback', async () => {
      await component.updateDashboard();
      expect(fastFeedbackService.pullFastFeedback).toHaveBeenCalled();
    });

    it('should get pulse check skills', async () => {
      await component.updateDashboard();
      expect(homeService.getPulseCheckSkills).toHaveBeenCalled();
      expect(component.pulseCheckSkills).toEqual([{ id: 1, name: 'Skill 1', value: 5 }]);
    });

    it('should handle null pulse check skills response', async () => {
      homeService.getPulseCheckSkills.and.returnValue(of({
        success: true,
        status: 'success',
        cache: false,
        data: { pulseCheckSkills: null }
      }));
      await component.updateDashboard();
      expect(component.pulseCheckSkills).toEqual([]);
    });

    it('should handle empty pulse check skills response', async () => {
      homeService.getPulseCheckSkills.and.returnValue(of({
        success: true,
        status: 'success',
        cache: false,
        data: { pulseCheckSkills: [] }
      }));
      await component.updateDashboard();
      expect(component.pulseCheckSkills).toEqual([]);
    });
  });

  describe('project brief actions', () => {
    beforeEach(() => {
      component.experience = {
        id: 1,
        name: 'Test Experience',
        leadImage: 'test-image',
        cardUrl: 'test-card-url'
      } as any;
      component.projectBrief = {
        id: 1,
        title: 'Project Brief'
      } as any;
      component.showProjectHub = true;
    });

    it('should hide project brief actions for expert users', () => {
      component.isExpert = true;

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.button-group-no-gap')).toBeNull();
    });

    it('should show project brief actions for non-expert users', () => {
      component.isExpert = false;

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.button-group-no-gap')).not.toBeNull();
    });
  });

  describe('navigation and dashboard presentation', () => {
    beforeEach(() => {
      component.activityCol = {
        el: {
          querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([]),
        },
      } as any;
      router.navigate.calls.reset();
    });

    it('should navigate back to experiences', () => {
      component.goBack();

      expect(router.navigate).toHaveBeenCalledWith(['experiences']);
    });

    it('should load point totals when switching to badges', () => {
      component.switchContent({ detail: { value: 'badges' } });

      expect(component.display).toBe('badges');
      expect(component.getIsPointsConfigured).toBeTrue();
      expect(component.getEarnedPoints).toBe(75);
    });

    it('should switch tabs without changing point totals for non-badge content', () => {
      component.getEarnedPoints = 12;

      component.switchContent({ detail: { value: 'activities' } });

      expect(component.display).toBe('activities');
      expect(component.getEarnedPoints).toBe(12);
    });

    [
      [{ id: 1, isLocked: true }, 'lock-closed'],
      [{ id: 2, isLocked: false }, 'chevron-forward'],
      [{ id: 3, isLocked: false }, 'checkmark-circle'],
      [{ id: 4, isLocked: false }, null],
    ].forEach(([activity, expectedIcon]) => {
      it(`should return ${expectedIcon} as the ending icon`, () => {
        component.activityProgresses = { 3: 1, 4: 0.5 };

        expect(component.endingIcon(activity)).toBe(expectedIcon as any);
      });
    });

    [
      [{ id: 1, isLocked: true }, 'medium'],
      [{ id: 2, isLocked: false }, 'medium'],
      [{ id: 3, isLocked: false }, 'success'],
      [{ id: 4, isLocked: false }, null],
    ].forEach(([activity, expectedColor]) => {
      it(`should return ${expectedColor} as the ending icon color`, () => {
        component.activityProgresses = { 3: 1, 4: 0.5 };

        expect(component.endingIconColor(activity)).toBe(expectedColor as any);
      });
    });

    it('should show unlock guidance instead of opening a locked activity', async () => {
      const activity = { id: 10, isLocked: true } as any;
      const milestone = { id: 20 } as any;
      spyOn(component, 'showGuideline').and.resolveTo();

      await component.gotoActivity({ activity, milestone });

      expect(component.showGuideline).toHaveBeenCalledWith(activity, 'activity');
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate desktop users to the desktop activity and record the source', async () => {
      component.isMobile = false;

      await component.gotoActivity({
        activity: { id: 10, isLocked: false } as any,
        milestone: { id: 20 } as any,
      });

      expect(navigationStateService.setNavigationSource).toHaveBeenCalledWith('home');
      expect(router.navigate).toHaveBeenCalledWith(['v3', 'activity-desktop', 10]);
    });

    it('should navigate mobile users to the mobile activity', async () => {
      component.isMobile = true;

      await component.gotoActivity({
        activity: { id: 10, isLocked: false } as any,
        milestone: { id: 20 } as any,
      });

      expect(router.navigate).toHaveBeenCalledWith(['v3', 'activity-mobile', 10]);
      expect(navigationStateService.setNavigationSource).not.toHaveBeenCalled();
    });

    ['Enter', 'Space'].forEach(code => {
      it(`should support ${code} keyboard activation`, async () => {
        component.isMobile = false;
        const event = new KeyboardEvent('keydown', { code });
        spyOn(event, 'preventDefault');

        await component.gotoActivity({
          activity: { id: 10, isLocked: false } as any,
          milestone: { id: 20 } as any,
        }, event);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['v3', 'activity-desktop', 10]);
      });
    });

    it('should ignore unrelated keyboard activation', async () => {
      const event = new KeyboardEvent('keydown', { code: 'Escape' });

      await component.gotoActivity({
        activity: { id: 10, isLocked: false } as any,
        milestone: { id: 20 } as any,
      }, event);

      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('unlock indicator handling', () => {
    it('should mark milestone duplicates without running fallback cleanup', () => {
      const todoItems = [{ id: 1, identifier: 'unlock-1' }];
      const result = {
        clearedUnlocks: [{ milestoneId: 20 }],
        duplicatesToMark: todoItems,
      };
      notificationsService.getCurrentTodoItems.and.returnValue(todoItems as any);
      unlockIndicatorService.clearByMilestoneIdWithDuplicates.and.returnValue(result as any);

      component.verifyUnlockedMilestoneValidity(20);

      expect(unlockIndicatorService.markDuplicatesAsDone).toHaveBeenCalledWith(
        result,
        notificationsService,
        'milestone'
      );
      expect(unlockIndicatorService.clearRelatedIndicators).not.toHaveBeenCalled();
    });

    it('should mark fallback milestone indicators when no duplicates are found', () => {
      const fallbackTodo = { milestoneId: 20 };
      unlockIndicatorService.clearByMilestoneIdWithDuplicates.and.returnValue({
        clearedUnlocks: [],
        duplicatesToMark: [],
      });
      unlockIndicatorService.clearRelatedIndicators.and.returnValue([fallbackTodo] as any);

      component.verifyUnlockedMilestoneValidity(20);

      expect(unlockIndicatorService.clearRelatedIndicators).toHaveBeenCalledWith('milestone', 20);
      expect(notificationsService.markTodoItemAsDone).toHaveBeenCalledWith(fallbackTodo as any);
    });

    it('should clear activity duplicates before navigating', async () => {
      const result = {
        clearedUnlocks: [{ activityId: 10 }],
        duplicatesToMark: [{ id: 1, identifier: 'unlock-1' }],
        cascadeMilestones: [],
      };
      component.activityCol = {
        el: { querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([]) },
      } as any;
      component.isMobile = true;
      unlockIndicatorService.isActivityClearable.and.returnValue(true);
      unlockIndicatorService.clearByActivityIdWithDuplicates.and.returnValue(result as any);

      await component.gotoActivity({
        activity: { id: 10, isLocked: false } as any,
        milestone: { id: 20 } as any,
      });

      expect(unlockIndicatorService.markDuplicatesAsDone).toHaveBeenCalledWith(
        result,
        notificationsService,
        'activity'
      );
      expect(unlockIndicatorService.clearRelatedIndicators).not.toHaveBeenCalled();
    });

    it('should run fallback activity cleanup when no matching unlock is found', async () => {
      const fallbackTodo = { activityId: 10 };
      component.activityCol = {
        el: { querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([]) },
      } as any;
      component.isMobile = true;
      unlockIndicatorService.isActivityClearable.and.returnValue(true);
      unlockIndicatorService.clearByActivityIdWithDuplicates.and.returnValue({
        clearedUnlocks: [],
        duplicatesToMark: [],
        cascadeMilestones: [],
      });
      unlockIndicatorService.clearRelatedIndicators.and.returnValue([fallbackTodo] as any);

      await component.gotoActivity({
        activity: { id: 10, isLocked: false } as any,
        milestone: { id: 20 } as any,
      });

      expect(unlockIndicatorService.clearRelatedIndicators).toHaveBeenCalledWith('activity', 10);
      expect(notificationsService.markTodoItemAsDone).toHaveBeenCalledWith(fallbackTodo as any);
    });
  });

  describe('dialogs and helper text', () => {
    function makeAlert() {
      return {
        present: jasmine.createSpy('present').and.resolveTo(),
      } as any;
    }

    it('should present traffic light guidance', async () => {
      const alert = makeAlert();
      alertController.create.and.resolveTo(alert);

      await component.onTrackInfo();

      expect(alertController.create).toHaveBeenCalledWith(jasmine.objectContaining({
        header: 'Traffic Light System',
        buttons: ['OK'],
      }));
      expect(alert.present).toHaveBeenCalled();
    });

    it('should present global skills guidance', async () => {
      const alert = makeAlert();
      alertController.create.and.resolveTo(alert);

      await component.showGlobalSkillsInfo();

      expect(alertController.create).toHaveBeenCalledWith(jasmine.objectContaining({
        header: 'Global Skills Assessment',
        buttons: ['OK'],
      }));
      expect(alert.present).toHaveBeenCalled();
    });

    it('should not create a project brief modal without a project brief', async () => {
      component.projectBrief = null;

      await component.showProjectBrief();

      expect(modalController.create).not.toHaveBeenCalled();
    });

    it('should use a full-screen project brief modal on mobile', async () => {
      const modal = { present: jasmine.createSpy('present').and.resolveTo() } as any;
      component.projectBrief = { id: 1, title: 'Brief' } as any;
      component.isMobile = true;
      modalController.create.and.resolveTo(modal);

      await component.showProjectBrief();

      expect(modalController.create).toHaveBeenCalledWith(jasmine.objectContaining({
        cssClass: ['project-brief-modal', 'modal-fullscreen'],
      }));
      expect(modal.present).toHaveBeenCalled();
    });

    it('should open Project Hub using the current API key', () => {
      storageService.getUser.and.returnValue({ apikey: 'api-key' });
      const openSpy = spyOn(window as any, 'open');

      component.openProjectBriefExternal();

      expect(openSpy).toHaveBeenCalledWith(
        jasmine.stringMatching(/login\?token=api-key$/),
        '_blank'
      );
    });

    it('should open an achievement from pointer activation', () => {
      const achievement = { id: 1 } as any;

      component.achievePopup(achievement);

      expect(notificationsService.achievementPopUp).toHaveBeenCalledWith('', achievement);
    });

    ['Enter', 'Space'].forEach(code => {
      it(`should support ${code} activation for achievements`, () => {
        const achievement = { id: 1 } as any;
        const event = new KeyboardEvent('keydown', { code });
        spyOn(event, 'preventDefault');

        component.achievePopup(achievement, event);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(notificationsService.achievementPopUp).toHaveBeenCalledWith('', achievement);
      });
    });

    it('should ignore unrelated keys for achievements', () => {
      component.achievePopup({ id: 1 } as any, new KeyboardEvent('keydown', { code: 'Escape' }));

      expect(notificationsService.achievementPopUp).not.toHaveBeenCalled();
    });

    [
      [1, 2.5, 'Level 1 achieved'],
      [3, 2.5, 'Level 3 half achieved'],
      [4, 2.5, 'Level 4 not achieved'],
    ].forEach(([level, value, expected]) => {
      it(`should describe skill level ${level}`, () => {
        expect(component.getSkillDotAriaLabel(level as number, value as number)).toBe(expected as string);
      });
    });

    it('should delegate defined skill changes to the pulse check service', () => {
      const display = { text: '+20%', cssClass: 'skill-change-positive' };
      pulsecheckService.getSkillChangeDisplayFromValue.and.returnValue(display);

      expect(component.getSkillChangeDisplay(1, 3, 0.2)).toEqual(display);
      expect(pulsecheckService.getSkillChangeDisplayFromValue).toHaveBeenCalledWith(0.2);
    });

    it('should return no skill change when the API omits it', () => {
      expect(component.getSkillChangeDisplay(1, 3)).toBeNull();
      expect(pulsecheckService.getSkillChangeDisplayFromValue).not.toHaveBeenCalled();
    });
  });

  describe('unlock guidelines', () => {
    it('should skip guidelines when unlock conditions are absent or empty', async () => {
      await component.showGuideline({ unlockConditions: null } as any);
      await component.showGuideline({ unlockConditions: [] } as any);

      expect(notificationsService.popUp).not.toHaveBeenCalled();
    });

    it('should build desktop topic and assessment routes', async () => {
      utilsService.isMobile.and.returnValue(false);
      const item = {
        unlockConditions: [
          {
            action: 'complete',
            name: 'Topic task',
            meta: { activityId: 10, topicId: 11 },
          },
          {
            action: 'submit',
            name: 'Assessment task',
            meta: { activityId: 10, contextId: 12, assessmentId: 13 },
          },
        ],
      } as any;

      await component.showGuideline(item, 'activity');

      expect(notificationsService.popUp).toHaveBeenCalledWith('guidelines', {
        logo: 'lock-open',
        message: 'Please follow the steps below to unlock this activity:',
        routes: [
          {
            path: '/v3/activity-desktop/10/11',
            label: '<i><b>Complete</b></i> Topic task',
          },
          {
            path: '/v3/activity-desktop/12/10/13',
            label: '<i><b>Submit</b></i> Assessment task',
          },
        ],
      });
    });

    it('should build mobile routes and mark incomplete route metadata unavailable', async () => {
      utilsService.isMobile.and.returnValue(true);
      const item = {
        unlockConditions: [
          {
            action: 'view',
            name: 'Mobile topic',
            meta: { activityId: 10, topicId: 11 },
          },
          {
            action: 'submit',
            name: 'Unavailable assessment',
            meta: { activityId: 10, assessmentId: 13 },
          },
        ],
      } as any;

      await component.showGuideline(item);

      expect(notificationsService.popUp).toHaveBeenCalledWith(
        'guidelines',
        jasmine.objectContaining({
          routes: [
            {
              path: '/topic-mobile/10/11',
              label: '<i><b>View</b></i> Mobile topic',
            },
            {
              path: null,
              label: '<i><b>Submit</b></i> Unavailable assessment (unavailable)',
            },
          ],
        })
      );
    });
  });

  describe('scroll restoration and cleanup', () => {
    it('should scroll to a visible last-visited activity and clear the stored id', () => {
      const activityElement = {
        scrollIntoView: jasmine.createSpy('scrollIntoView'),
        classList: { add: jasmine.createSpy('add') },
      };
      const querySelector = jasmine.createSpy('querySelector').and.callFake((selector: string) => {
        expect(selector).toBe('#act-10');
        return activityElement;
      });
      component.activities = new (class {
        nativeElement = {
          querySelector,
        };
      })() as any;
      const visibilitySpy = spyOn<any>(component, 'isElementVisible').and.returnValue(true);
      storageService.lastVisited.calls.reset();

      component.scrollToElement(10);

      expect(activityElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'center' });
      expect(activityElement.classList.add).toHaveBeenCalledWith('lastVisited');
      expect(visibilitySpy).toHaveBeenCalledWith(activityElement);
      expect(storageService.lastVisited).toHaveBeenCalledWith('activityId', null);
    });

    it('should restore the last visited activity after the view is checked', () => {
      storageService.lastVisited.and.returnValue(10);
      component.activities = { nativeElement: document.createElement('div') } as any;
      component.milestones = [{ id: 1 }] as any;
      spyOn<any>(component, 'isElementVisible').and.returnValue(true);
      spyOn(component, 'scrollToElement');
      (component as any).cdr = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

      component.ngAfterViewChecked();

      expect(component.lastVisitedActivityId).toBe(10);
      expect(component.scrollToElement).toHaveBeenCalledWith(10);
    });

    it('should complete its teardown subject', () => {
      spyOn(component.unsubscribe$, 'next');
      spyOn(component.unsubscribe$, 'complete');

      component.ngOnDestroy();

      expect(component.unsubscribe$.next).toHaveBeenCalledWith(null);
      expect(component.unsubscribe$.complete).toHaveBeenCalled();
    });
  });

  describe('filterActivities', () => {
    const mockMilestones = [
      {
        id: 1,
        name: 'Milestone 1',
        description: 'First milestone',
        isLocked: false,
        activities: [
          {
            id: 1,
            name: 'Activity 1',
            description: 'First activity about project planning',
            isLocked: false,
            leadImage: '',
            progress: 0.5
          },
          {
            id: 2,
            name: 'Activity 2',
            description: 'Second activity about design',
            isLocked: false,
            leadImage: '',
            progress: 0
          }
        ],
        unlockConditions: []
      },
      {
        id: 2,
        name: 'Milestone 2',
        description: 'Second milestone',
        isLocked: false,
        activities: [
          {
            id: 3,
            name: 'Development Task',
            description: 'Build the application component',
            isLocked: true,
            leadImage: '',
            progress: 0
          }
        ],
        unlockConditions: []
      }
    ];

    beforeEach(() => {
      component.milestones = mockMilestones;
    });

    it('should set filtered milestones to null when milestones are null', () => {
      component.milestones = null;
      component.activitySearchText = 'test';
      component.filterActivities();
      expect(component.filteredMilestones).toBeNull();
    });

    it('should return all milestones when search text is empty', () => {
      component.activitySearchText = '';
      component.filterActivities();
      expect(component.filteredMilestones).toEqual(mockMilestones);
    });

    it('should return all milestones when search text is only whitespace', () => {
      component.activitySearchText = '   ';
      component.filterActivities();
      expect(component.filteredMilestones).toEqual(mockMilestones);
    });

    it('should filter activities by name match (case insensitive)', () => {
      component.activitySearchText = 'activity 1';
      component.filterActivities();

      expect(component.filteredMilestones.length).toBe(1);
      expect(component.filteredMilestones[0].activities.length).toBe(1);
      expect(component.filteredMilestones[0].activities[0].id).toBe(1);
    });

    it('should filter activities by description match (case insensitive)', () => {
      component.activitySearchText = 'planning';
      component.filterActivities();

      expect(component.filteredMilestones.length).toBe(1);
      expect(component.filteredMilestones[0].activities.length).toBe(1);
      expect(component.filteredMilestones[0].activities[0].id).toBe(1);
    });

    it('should filter activities by partial name match', () => {
      component.activitySearchText = 'Activity';
      component.filterActivities();

      expect(component.filteredMilestones.length).toBe(1);
      expect(component.filteredMilestones[0].activities.length).toBe(2);
    });

    it('should filter activities by partial description match', () => {
      component.activitySearchText = 'about';
      component.filterActivities();

      expect(component.filteredMilestones.length).toBe(1);
      expect(component.filteredMilestones[0].activities.length).toBe(2);
    });

    it('should handle search with uppercase text', () => {
      component.activitySearchText = 'DESIGN';
      component.filterActivities();

      expect(component.filteredMilestones.length).toBe(1);
      expect(component.filteredMilestones[0].activities.length).toBe(1);
      expect(component.filteredMilestones[0].activities[0].id).toBe(2);
    });

    it('should filter activities matching locked activity name or description', () => {
      component.activitySearchText = 'development';
      component.filterActivities();

      expect(component.filteredMilestones.length).toBe(1);
      expect(component.filteredMilestones[0].activities[0].id).toBe(3);
    });

    it('should return empty milestones array when no activities match', () => {
      component.activitySearchText = 'nonexistent';
      component.filterActivities();

      expect(component.filteredMilestones).toEqual([]);
    });

    it('should only include milestones with matching activities', () => {
      component.activitySearchText = 'first';
      component.filterActivities();

      expect(component.filteredMilestones.length).toBe(1);
      expect(component.filteredMilestones[0].id).toBe(1);
    });

    it('should preserve milestone structure in filtered results', () => {
      component.activitySearchText = 'activity';
      component.filterActivities();

      expect(component.filteredMilestones[0].id).toBeDefined();
      expect(component.filteredMilestones[0].name).toBeDefined();
      expect(component.filteredMilestones[0].activities).toBeDefined();
    });

    it('should handle activities with missing description property', () => {
      const milestonesWithMissingDesc = [{
        id: 1,
        name: 'Milestone',
        description: 'desc',
        isLocked: false,
        activities: [
          {
            id: 1,
            name: 'Activity',
            description: undefined,
            isLocked: false,
            leadImage: ''
          }
        ],
        unlockConditions: []
      }];

      component.milestones = milestonesWithMissingDesc;
      component.activitySearchText = 'activity';
      component.filterActivities();

      expect(component.filteredMilestones.length).toBe(1);
      expect(component.filteredMilestones[0].activities.length).toBe(1);
    });

    it('should handle multiple activities matching same search term', () => {
      component.activitySearchText = 'a';
      component.filterActivities();

      expect(component.filteredMilestones.length).toBe(2);
      expect(component.filteredMilestones[0].activities.length).toBe(2);
      expect(component.filteredMilestones[1].activities.length).toBe(1);
    });

    it('should include locked activities when they match search text', () => {
      component.activitySearchText = 'task';
      component.filterActivities();

      expect(component.filteredMilestones.length).toBe(1);
      expect(component.filteredMilestones[0].activities[0].id).toBe(3);
    });

    it('should trim whitespace from search text', () => {
      component.activitySearchText = '  activity 1  ';
      component.filterActivities();

      expect(component.filteredMilestones.length).toBe(1);
      expect(component.filteredMilestones[0].activities.length).toBe(1);
    });
  });

  describe('clearSearch', () => {
    const mockMilestones = [
      {
        id: 1,
        name: 'Milestone 1',
        description: 'First milestone',
        isLocked: false,
        activities: [
          {
            id: 1,
            name: 'Activity 1',
            description: 'First activity',
            isLocked: false,
            leadImage: ''
          }
        ],
        unlockConditions: []
      }
    ];

    beforeEach(() => {
      component.milestones = mockMilestones;
    });

    it('should clear search text', () => {
      component.activitySearchText = 'test search';
      component.clearSearch();

      expect(component.activitySearchText).toBe('');
    });

    it('should reset filtered milestones to all milestones', () => {
      component.activitySearchText = 'test';
      component.filterActivities();
      component.clearSearch();

      expect(component.filteredMilestones).toEqual(mockMilestones);
    });

    it('should call filterActivities when clearing search', () => {
      spyOn(component, 'filterActivities');
      component.clearSearch();

      expect(component.filterActivities).toHaveBeenCalled();
    });
  });

  describe('getFilteredActivityCount', () => {
    it('should return 0 when filtered milestones is null', () => {
      component.filteredMilestones = null;

      expect(component.getFilteredActivityCount()).toBe(0);
    });

    it('should return 0 when there are no filtered milestones', () => {
      component.filteredMilestones = [];

      expect(component.getFilteredActivityCount()).toBe(0);
    });

    it('should return correct count of activities from single milestone', () => {
      component.filteredMilestones = [
        {
          id: 1,
          name: 'Milestone 1',
          description: 'desc',
          isLocked: false,
          activities: [
            { id: 1, name: 'Activity 1', description: 'desc', isLocked: false, leadImage: '' },
            { id: 2, name: 'Activity 2', description: 'desc', isLocked: false, leadImage: '' }
          ],
          unlockConditions: []
        }
      ];

      expect(component.getFilteredActivityCount()).toBe(2);
    });

    it('should return correct count of activities from multiple milestones', () => {
      component.filteredMilestones = [
        {
          id: 1,
          name: 'Milestone 1',
          description: 'desc',
          isLocked: false,
          activities: [
            { id: 1, name: 'Activity 1', description: 'desc', isLocked: false, leadImage: '' },
            { id: 2, name: 'Activity 2', description: 'desc', isLocked: false, leadImage: '' }
          ],
          unlockConditions: []
        },
        {
          id: 2,
          name: 'Milestone 2',
          description: 'desc',
          isLocked: false,
          activities: [
            { id: 3, name: 'Activity 3', description: 'desc', isLocked: false, leadImage: '' }
          ],
          unlockConditions: []
        }
      ];

      expect(component.getFilteredActivityCount()).toBe(3);
    });

    it('should handle milestone with no activities', () => {
      component.filteredMilestones = [
        {
          id: 1,
          name: 'Milestone 1',
          description: 'desc',
          isLocked: false,
          activities: [],
          unlockConditions: []
        }
      ];

      expect(component.getFilteredActivityCount()).toBe(0);
    });

    it('should handle milestone with undefined activities', () => {
      component.filteredMilestones = [
        {
          id: 1,
          name: 'Milestone 1',
          description: 'desc',
          isLocked: false,
          activities: undefined,
          unlockConditions: []
        }
      ];

      expect(component.getFilteredActivityCount()).toBe(0);
    });

  });
});
