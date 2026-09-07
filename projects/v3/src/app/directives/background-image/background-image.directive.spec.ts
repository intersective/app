import { ElementRef, Renderer2 } from "@angular/core";
import { BrowserStorageService } from "@v3/app/services/storage.service";
import { BackgroundImageDirective } from "./background-image.directive";

describe('BackgroundImageDirective', () => {
  let directive: BackgroundImageDirective;
  let el: ElementRef;
  let renderer: jasmine.SpyObj<Renderer2>;
  let storageService: jasmine.SpyObj<BrowserStorageService>;

  beforeEach(() => {
    el = new ElementRef(document.createElement('div'));
    renderer = jasmine.createSpyObj<Renderer2>('Renderer2', ['setStyle']);
    storageService = jasmine.createSpyObj<BrowserStorageService>('BrowserStorageService', ['getUser']);
    storageService.getUser.and.returnValue({
      activityCardImage: 'activity-card.jpg',
      programImage: 'program.jpg',
    } as any);
    directive = new BackgroundImageDirective(el, renderer, storageService);
  });

  afterEach(() => {
    directive.ngOnDestroy();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should load and apply the requested background image', () => {
    directive.appBackgroundImage = 'requested.jpg';

    directive.ngOnInit();
    directive['img'].onload(new Event('load'));

    expect(directive['img'].src).toContain('requested.jpg');
    expect(renderer.setStyle).toHaveBeenCalledWith(
      el.nativeElement,
      'backgroundImage',
      'url(requested.jpg)'
    );
  });

  it('should use the activity card image when the requested image fails', () => {
    directive.appBackgroundImage = 'missing.jpg';

    directive.ngOnInit();
    directive['img'].onerror(new Event('error'));

    expect(renderer.setStyle).toHaveBeenCalledWith(
      el.nativeElement,
      'backgroundImage',
      'url(activity-card.jpg)'
    );
  });

  it('should use the program image when no activity card image is available', () => {
    storageService.getUser.and.returnValue({
      activityCardImage: '',
      programImage: 'program.jpg',
    } as any);
    directive.appBackgroundImage = 'missing.jpg';

    directive.ngOnInit();
    directive['img'].onerror(new Event('error'));

    expect(renderer.setStyle).toHaveBeenCalledWith(
      el.nativeElement,
      'backgroundImage',
      'url(program.jpg)'
    );
  });

  it('should remove image callbacks when destroyed', () => {
    directive.ngOnInit();

    directive.ngOnDestroy();

    expect(directive['img'].onload).toBeNull();
    expect(directive['img'].onerror).toBeNull();
  });
});
