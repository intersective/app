import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AchievementPopUpComponent } from './achievement-pop-up.component';
import { Observable, of, pipe } from 'rxjs';
import { ModalController, IonicModule } from '@ionic/angular';
import { UtilsService } from '@services/utils.service';

class AchievementModalPage {
  fixture: ComponentFixture<AchievementPopUpComponent>;

  constructor(fixture: ComponentFixture<AchievementPopUpComponent>) {
    this.fixture = fixture;
  }

  get badge() {
    return this.query<HTMLElement>('#achievementBadgePopup');
  }
  //// query helpers ////
  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}

describe('AchievementPopUpComponent', () => {
  let component: AchievementPopUpComponent;
  let fixture: ComponentFixture<AchievementPopUpComponent>;
  let page: AchievementModalPage;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss', 'create']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ IonicModule ],
      declarations: [ AchievementPopUpComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: UtilsService,
          useValue: jasmine.createSpyObj('UtilsService', [ 'isMobile' ])
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementPopUpComponent);
    component = fixture.componentInstance;

    page = new AchievementModalPage(fixture);
  }));

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should dismiss modal', () => {
    component.achievement = {
      id: 1,
      name: 'achieve',
      description: ''
    };
    fixture.detectChanges();
    component.confirmed('Enter');
    expect(modalCtrlSpy.dismiss.calls.count()).toBe(1);
  });

  describe('ionViewDidEnter()', () => {
    beforeEach(() => {
      component.achievement = {
        id: 1,
        name: 'achieve',
        description: ''
      };
    });

    it('should prepare accessibility controls', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        component.ionViewDidEnter();
        const event = new KeyboardEvent('keydown', {
          code: 'Tab',
          key: 'Tab',
        });

        spyOn(component.achievementName.nativeElement, 'focus');
        spyOn(component.badgeImage.nativeElement, 'focus');
        spyOn(component.dismissButton.el, 'focus');

        component.achievementBadgePopup.el.dispatchEvent(event);
        expect(component.achievementName.nativeElement.focus).toHaveBeenCalled();

        component.achievementBadgePopup.el.dispatchEvent(event);
        expect(component.dismissButton.el.focus).toHaveBeenCalled();

        component.achievementBadgePopup.el.dispatchEvent(event);
        expect(component.badgeImage.nativeElement.focus).toHaveBeenCalled();
      });
    });

    it('should not trigger "navigation" if no tab pressed', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        component.ionViewDidEnter();
        const event = new KeyboardEvent('keydown', {
          code: 'Shift',
          key: 'Shift',
        });

        spyOn(component.achievementName.nativeElement, 'focus');
        spyOn(component.badgeImage.nativeElement, 'focus');
        spyOn(component.dismissButton.el, 'focus');

        component.achievementBadgePopup.el.dispatchEvent(event);
        expect(component.achievementName.nativeElement.focus).not.toHaveBeenCalled();
        expect(component.badgeImage.nativeElement.focus).not.toHaveBeenCalled();
        expect(component.dismissButton.el.focus).not.toHaveBeenCalled();
      });
    });
  });

  describe('confirm()', () => {
    it('should dismiss', () => {
      component.achievement = {
        id: 1,
        name: 'achieve',
        description: ''
      };
      component.confirmed(null);
      expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
    });
    it('should dismiss with keyboardEvent', () => {
      const keyboardEvent = new KeyboardEvent('keydown');
      component.confirmed(keyboardEvent);
      expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
    });
  });
});

