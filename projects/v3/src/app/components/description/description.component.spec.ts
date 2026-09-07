import { ElementRef, SimpleChange } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { BrowserStorageService } from '@v3/services/storage.service';

import { DescriptionComponent } from './description.component';

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let storageService: jasmine.SpyObj<BrowserStorageService>;

  beforeEach(() => {
    storageService = jasmine.createSpyObj<BrowserStorageService>('BrowserStorageService', ['getUser']);
    storageService.getUser.and.returnValue({ truncateDescription: true } as any);
    component = new DescriptionComponent(storageService);
  });

  it('should start without a previous truncation', () => {
    expect(component.hasBeenTruncated).toBeFalse();
  });

  it('should calculate height after view initialization', () => {
    spyOn(component, 'calculateHeight');

    component.ngAfterViewInit();

    expect(component.calculateHeight).toHaveBeenCalled();
  });

  it('should truncate content that reaches the height limit', fakeAsync(() => {
    component.descriptionRef = new ElementRef({ clientHeight: 145 });

    component.calculateHeight();
    tick(299);
    expect(component.elementHeight).toBeUndefined();
    tick(1);

    expect(component.elementHeight).toBe(145);
    expect(component.heightExceeded).toBeTrue();
    expect(component.isTruncating).toBeTrue();
    expect(component.hasBeenTruncated).toBeTrue();
  }));

  it('should leave short content expanded', fakeAsync(() => {
    component.descriptionRef = new ElementRef({ clientHeight: 144 });

    component.calculateHeight();
    tick(300);

    expect(component.elementHeight).toBe(144);
    expect(component.heightExceeded).toBeFalse();
    expect(component.isTruncating).toBeFalsy();
  }));

  it('should skip measurement for non-collapsible content', fakeAsync(() => {
    component.nonCollapsible = true;
    component.descriptionRef = new ElementRef({ clientHeight: 500 });

    component.calculateHeight();
    tick(300);

    expect(component.elementHeight).toBeUndefined();
    expect(component.heightExceeded).toBeFalsy();
  }));

  it('should respect the user preference to keep descriptions expanded', fakeAsync(() => {
    storageService.getUser.and.returnValue({ truncateDescription: false } as any);
    component.descriptionRef = new ElementRef({ clientHeight: 500 });

    component.calculateHeight();
    tick(300);

    expect(component.elementHeight).toBeUndefined();
    expect(component.isTruncating).toBeFalsy();
  }));

  it('should safely handle a missing description element', fakeAsync(() => {
    component.descriptionRef = null;

    component.calculateHeight();
    tick(300);

    expect(component.elementHeight).toBeUndefined();
    expect(component.heightExceeded).toBeFalsy();
  }));

  it('should not collapse content again after the user has expanded it', fakeAsync(() => {
    component.descriptionRef = new ElementRef({ clientHeight: 500 });
    component.hasBeenTruncated = true;
    component.isTruncating = false;

    component.calculateHeight();
    tick(300);

    expect(component.heightExceeded).toBeTrue();
    expect(component.isTruncating).toBeFalse();
  }));

  it('should reset truncation state and recalculate when content changes', () => {
    component.hasBeenTruncated = true;
    component.isTruncating = true;
    component.heightExceeded = true;
    spyOn(component, 'calculateHeight');

    component.ngOnChanges({
      content: new SimpleChange('old content', 'new content', false),
    });

    expect(component.hasBeenTruncated).toBeFalse();
    expect(component.isTruncating).toBeFalse();
    expect(component.heightExceeded).toBeFalse();
    expect(component.calculateHeight).toHaveBeenCalled();
  });

  it('should not recalculate for the first content binding', () => {
    spyOn(component, 'calculateHeight');

    component.ngOnChanges({
      content: new SimpleChange(undefined, 'initial content', true),
    });

    expect(component.calculateHeight).not.toHaveBeenCalled();
  });

  it('should not recalculate when an unrelated input changes', () => {
    spyOn(component, 'calculateHeight');

    component.ngOnChanges({
      ariaLabel: new SimpleChange(undefined, 'Description', false),
    });

    expect(component.calculateHeight).not.toHaveBeenCalled();
  });

  it('should toggle truncation and emit the expanded state', () => {
    component.isTruncating = true;
    spyOn(component.hasExpanded, 'emit');

    component.openShut();

    expect(component.isTruncating).toBeFalse();
    expect(component.hasExpanded.emit).toHaveBeenCalledWith(true);

    component.openShut();
    expect(component.isTruncating).toBeTrue();
    expect(component.hasExpanded.emit).toHaveBeenCalledWith(false);
  });
});
