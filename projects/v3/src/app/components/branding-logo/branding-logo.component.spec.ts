import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserStorageService } from '@v3/services/storage.service';

import { BrandingLogoComponent } from './branding-logo.component';

describe('BrandingLogoComponent', () => {
  let component: BrandingLogoComponent;
  let fixture: ComponentFixture<BrandingLogoComponent>;
  let storageService: jasmine.SpyObj<BrowserStorageService>;

  beforeEach(async () => {
    storageService = jasmine.createSpyObj<BrowserStorageService>('BrowserStorageService', ['getConfig']);
    storageService.getConfig.and.returnValue({ logo: 'tenant-logo.svg' } as any);

    await TestBed.configureTestingModule({
      declarations: [BrandingLogoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: BrowserStorageService, useValue: storageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandingLogoComponent);
    component = fixture.componentInstance;
  });

  it('should use the configured tenant logo when no input is provided', () => {
    fixture.detectChanges();

    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(storageService.getConfig).toHaveBeenCalled();
    expect(component.logo).toBe('tenant-logo.svg');
    expect(image.getAttribute('src')).toBe('tenant-logo.svg');
    expect(image.getAttribute('alt')).toBe('branding logo');
  });

  it('should render an explicit logo and accessible organization name', () => {
    component.logo = 'provided-logo.svg';
    component.name = 'Example University';

    fixture.detectChanges();

    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(image.getAttribute('src')).toBe('provided-logo.svg');
    expect(image.getAttribute('alt')).toBe('Example University');
  });

  it('should render the Practera fallback when no logo is configured', () => {
    storageService.getConfig.and.returnValue({ logo: '' } as any);
    fixture = TestBed.createComponent(BrandingLogoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(image.getAttribute('src')).toBe('./assets/logo.svg');
    expect(image.getAttribute('alt')).toBe('Practera logo');
  });
});
