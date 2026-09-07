import { ActivityCompletePopUpComponent } from './activity-complete-pop-up.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilsService } from '@v3/services/utils.service';

describe('ActivityCompletePopUpComponent', () => {
  let component: ActivityCompletePopUpComponent;
  let modalController: jasmine.SpyObj<ModalController>;
  let utils: jasmine.SpyObj<UtilsService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    modalController = jasmine.createSpyObj<ModalController>('ModalController', ['dismiss']);
    utils = jasmine.createSpyObj<UtilsService>('UtilsService', ['isMobile']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    utils.isMobile.and.returnValue(false);
    component = new ActivityCompletePopUpComponent(modalController, utils, router);
    component.activityId = 42;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should initialize its mobile state from the utility service', () => {
    utils.isMobile.and.returnValue(true);

    component = new ActivityCompletePopUpComponent(modalController, utils, router);

    expect(component.isMobile).toBeTrue();
  });

  it('should focus the first action and trap Tab focus between both actions', () => {
    let keydownHandler: (event: any) => void;
    const activityCompleteElement = {
      addEventListener: jasmine.createSpy('addEventListener').and.callFake(
        (_eventName: string, handler: (event: any) => void) => keydownHandler = handler
      ),
    };
    const reviewTasksElement = { focus: jasmine.createSpy('reviewTasksFocus') };
    const continueElement = { focus: jasmine.createSpy('continueFocus') };
    component.activityComplete = { el: activityCompleteElement };
    component.reviewTasks = { el: reviewTasksElement };
    component.continueNextActivity = { el: continueElement };

    component.ionViewDidEnter();

    expect(activityCompleteElement.addEventListener).toHaveBeenCalledWith(
      'keydown',
      jasmine.any(Function)
    );
    expect(reviewTasksElement.focus).toHaveBeenCalledTimes(1);
    const firstTab = { key: 'Tab', defaultPrevented: false, preventDefault: jasmine.createSpy('preventDefault') };
    keydownHandler(firstTab);
    expect(firstTab.preventDefault).toHaveBeenCalled();
    expect(continueElement.focus).toHaveBeenCalledTimes(1);

    const secondTab = { key: 'Tab', defaultPrevented: false, preventDefault: jasmine.createSpy('preventDefault') };
    keydownHandler(secondTab);
    expect(reviewTasksElement.focus).toHaveBeenCalledTimes(2);
  });

  it('should ignore already prevented and non-Tab key events', () => {
    let keydownHandler: (event: any) => void;
    const focus = jasmine.createSpy('focus');
    component.activityComplete = {
      el: {
        addEventListener: jasmine.createSpy('addEventListener').and.callFake(
          (_eventName: string, handler: (event: any) => void) => keydownHandler = handler
        ),
      },
    };
    component.reviewTasks = { el: { focus } };
    component.continueNextActivity = { el: { focus } };
    component.ionViewDidEnter();
    focus.calls.reset();
    const preventedEvent = { key: 'Tab', defaultPrevented: true, preventDefault: jasmine.createSpy('preventDefault') };
    const enterEvent = { key: 'Enter', defaultPrevented: false, preventDefault: jasmine.createSpy('preventDefault') };

    keydownHandler(preventedEvent);
    keydownHandler(enterEvent);

    expect(preventedEvent.preventDefault).not.toHaveBeenCalled();
    expect(enterEvent.preventDefault).not.toHaveBeenCalled();
    expect(focus).not.toHaveBeenCalled();
  });

  it('should dismiss and return desktop users to the current activity', () => {
    component.confirmed(false);

    expect(modalController.dismiss).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['v3', 'activity-desktop', 42]);
  });

  it('should return mobile users to the current activity', () => {
    utils.isMobile.and.returnValue(true);

    component.confirmed(false);

    expect(modalController.dismiss).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['v3', 'activity-mobile', 42]);
  });

  it('should return a completed activity to home with completion context', () => {
    component.activityCompleted = true;

    component.confirmed(true);

    expect(modalController.dismiss).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(
      ['v3', 'home'],
      { queryParams: { activityId: 42, activityCompleted: true } }
    );
  });

  it('should return an incomplete activity to home without completion context', () => {
    component.activityCompleted = false;

    component.confirmed(true);

    expect(modalController.dismiss).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['v3', 'home']);
  });
});
