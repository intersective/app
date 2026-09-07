import { ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationsService } from '../../services/notifications.service';
import { BrowserStorageService } from '../../services/storage.service';
import { UppyUploaderComponent } from './uppy-uploader.component';
import { ALLOWED_FILE_TYPES, TusUploadResponse, UppyUploaderService } from './uppy-uploader.service';
import { Subject } from 'rxjs';

describe('UppyUploaderComponent', () => {
  let component: UppyUploaderComponent;
  let notificationsService: jasmine.SpyObj<NotificationsService>;
  let modalController: jasmine.SpyObj<ModalController>;
  let storageService: jasmine.SpyObj<BrowserStorageService>;
  let uppyUploaderService: jasmine.SpyObj<UppyUploaderService>;
  let changeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>;
  let compressionProgress$: Subject<any>;
  let uppy: any;

  beforeEach(() => {
    notificationsService = jasmine.createSpyObj<NotificationsService>('NotificationsService', ['alert']);
    modalController = jasmine.createSpyObj<ModalController>('ModalController', ['dismiss']);
    storageService = jasmine.createSpyObj<BrowserStorageService>('BrowserStorageService', ['clearByName']);
    changeDetectorRef = jasmine.createSpyObj<ChangeDetectorRef>('ChangeDetectorRef', ['markForCheck']);
    compressionProgress$ = new Subject();
    uppyUploaderService = jasmine.createSpyObj<UppyUploaderService>(
      'UppyUploaderService',
      ['createUppyInstance', 'parseTusUploadResponse', 'cancelCompression'],
      { uppyProps: {} as any, compressionProgress$ }
    );
    uppy = jasmine.createSpyObj('Uppy', ['resetProgress', 'destroy']);
    uppyUploaderService.createUppyInstance.and.returnValue(uppy);

    component = new UppyUploaderComponent(
      notificationsService,
      modalController,
      storageService,
      uppyUploaderService,
      changeDetectorRef
    );
  });

  it('restricts user profile uploads to images', () => {
    component.source = 'user-profile';

    expect(component.loadAllowedFileTypes()).toEqual(['image/*']);
  });

  it('requires a TUS endpoint', () => {
    component.source = 'image';
    component.tusEndpoint = '';

    expect(() => component.ngOnInit()).toThrowError('tusEndpoint is required.');
  });

  it('requires an upload source', () => {
    component.tusEndpoint = 'https://uploads.example.com';

    expect(() => component.ngOnInit()).toThrowError('source is required.');
  });

  it('creates Uppy with source-specific restrictions and event callbacks', () => {
    component.source = 'image';
    component.tusEndpoint = 'https://uploads.example.com';

    component.ngOnInit();

    expect(uppyUploaderService.createUppyInstance).toHaveBeenCalledWith(
      'image',
      'https://uploads.example.com',
      {
        onAfterResponse: jasmine.any(Function),
        onUploadSuccess: jasmine.any(Function),
      },
      { allowedFileTypes: ['image/*'] }
    );
  });

  it('only displays compression progress from its own Uppy instance', () => {
    component.source = 'video';
    component.ngOnInit();

    compressionProgress$.next({
      uppy: {},
      progress: { progress: 0.25, timeUs: 1 },
    });
    expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();

    compressionProgress$.next({
      uppy,
      progress: { progress: 0.456, timeUs: 2 },
    });
    expect(component.isCompressing).toBeTrue();
    expect(component.compressionProgress).toBe(46);
    expect(changeDetectorRef.markForCheck).toHaveBeenCalledTimes(1);

    compressionProgress$.next({ uppy, progress: null });
    expect(component.isCompressing).toBeFalse();
    expect(component.compressionProgress).toBe(0);
  });

  [
    ['profile', ['image/*']],
    ['image', ['image/*']],
    ['video', ['video/*']],
    ['chat', ALLOWED_FILE_TYPES],
    ['assessment', ALLOWED_FILE_TYPES],
  ].forEach(([source, expectedTypes]) => {
    it(`returns allowed file types for ${source}`, () => {
      component.source = source as any;

      expect(component.loadAllowedFileTypes()).toEqual(expectedTypes as string[]);
    });
  });

  it('resets Uppy upload progress', () => {
    component.uppy = uppy;

    component.reset();

    expect(uppy.resetProgress).toHaveBeenCalled();
  });

  it('clears a cached upload by name', () => {
    storageService.clearByName.and.returnValue(true as any);

    expect(component.clearUploadedCache('upload-id')).toBe(true as any);
    expect(storageService.clearByName).toHaveBeenCalledWith('upload-id');
  });

  it('sanitizes non-alphanumeric characters in file names', () => {
    expect(component.sanitizeName('my file.v1.png')).toBe('my/file/v1/png');
  });

  it('parses and stores a valid TUS response', () => {
    const parsedResponse = {
      bucket: 'uploads',
      path: '/file.pdf',
      cdnUrl: 'https://cdn.example.com/file.pdf',
      directUrl: 'https://files.example.com/file.pdf',
    };
    uppyUploaderService.parseTusUploadResponse.and.returnValue(parsedResponse);
    const response = { getBody: jasmine.createSpy('getBody').and.returnValue('{"bucket":"uploads"}') };
    spyOn(console, 'log');

    component.onAfterResponse({}, response);

    expect(uppyUploaderService.parseTusUploadResponse).toHaveBeenCalledWith('{"bucket":"uploads"}');
    expect(component.s3Info).toEqual(parsedResponse);
  });

  it('returns the canonical CDN URL from the TUS response', () => {
    const tusResponse: TusUploadResponse = {
      bucket: 'profile-images',
      path: '/users/profile.png',
      cdnUrl: 'https://cdn.example.com/users/profile.png',
      directUrl: 'https://files.example.com/users/profile.png',
    };
    component.s3Info = tusResponse;
    const file = {
      name: 'profile.png',
      type: 'image/png',
      size: 10,
      extension: 'png',
    } as any;

    component.closeModal(file);

    expect(modalController.dismiss).toHaveBeenCalledWith(jasmine.objectContaining({
      bucket: tusResponse.bucket,
      path: tusResponse.path,
      url: tusResponse.cdnUrl,
      cdnUrl: tusResponse.cdnUrl,
      directUrl: tusResponse.directUrl,
    }));
  });

  it('reports and rethrows an invalid TUS response', () => {
    uppyUploaderService.parseTusUploadResponse.and.throwError(
      'Upload server returned an empty response.'
    );
    const response = { getBody: () => '' };

    expect(() => component.onAfterResponse({}, response)).toThrowError(
      'Upload server returned an empty response.'
    );
    expect(notificationsService.alert).toHaveBeenCalledWith({
      header: 'Upload Failed',
      message: 'Upload server returned an empty response.',
    });
  });

  it('should reject closing when upload metadata is missing', () => {
    expect(() => component.closeModal({})).toThrowError(
      'Upload server response is missing required file metadata.'
    );
    expect(modalController.dismiss).not.toHaveBeenCalled();
  });

  it('should close and emit after a successful upload', () => {
    const file = { id: 'file-id' } as any;
    const response = { status: 200, body: { id: 'response-id' } };
    spyOn(component, 'closeModal');
    spyOn(component.uploadComplete, 'emit');

    component.onUploadSuccess(file, response);

    expect(component.uploadedFile).toBe(file);
    expect(component.closeModal).toHaveBeenCalledWith(file);
    expect(component.uploadComplete.emit).toHaveBeenCalledWith(response.body);
  });

  it('should warn without completing when upload is unsuccessful', () => {
    const response = { status: 500 };
    spyOn(console, 'warn');
    spyOn(component, 'closeModal');
    spyOn(component.uploadComplete, 'emit');

    component.onUploadSuccess({} as any, response);

    expect(console.warn).toHaveBeenCalledWith('Upload failed:', response);
    expect(component.uploadedFile).toBeNull();
    expect(component.closeModal).not.toHaveBeenCalled();
    expect(component.uploadComplete.emit).not.toHaveBeenCalled();
  });

  it('should cancel compression, unsubscribe, and destroy Uppy on teardown', () => {
    component.source = 'video';
    component.ngOnInit();

    component.ngOnDestroy();
    compressionProgress$.next({ uppy, progress: { progress: 0.5, timeUs: 1 } });

    expect(uppyUploaderService.cancelCompression).toHaveBeenCalled();
    expect(uppy.destroy).toHaveBeenCalled();
    expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();
  });

  it('should safely tear down before Uppy is initialized', () => {
    component.ngOnDestroy();

    expect(uppyUploaderService.cancelCompression).toHaveBeenCalled();
    expect(uppy.destroy).not.toHaveBeenCalled();
  });
});
