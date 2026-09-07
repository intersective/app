import { TestBed } from '@angular/core/testing';
import { NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UppyUploaderService } from './uppy-uploader.service';
import { BrowserStorageService } from '../../services/storage.service';
import { Uppy } from '@uppy/core';
import { environment } from '../../../environments/environment';
import { FfmpegService } from '../../services/ffmpeg.service';
import { Subject } from 'rxjs';
import { UppyUploaderComponent } from './uppy-uploader.component';

describe('UppyUploaderService', () => {
  let service: UppyUploaderService;
  let ffmpegServiceSpy: jasmine.SpyObj<FfmpegService>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;
  let beforeUnloadHandler: (event: any) => void;
  let windowAddEventListenerSpy: jasmine.Spy;

  beforeEach(() => {
    windowAddEventListenerSpy = spyOn(window, 'addEventListener').and.callFake(
      ((eventName: string, callback: (event: any) => void) => {
        if (eventName === 'beforeunload') {
          beforeUnloadHandler = callback;
        }
      }) as any
    );
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    storageSpy = jasmine.createSpyObj('BrowserStorageService', ['getUser', 'clearByName']);
    storageSpy.getUser.and.returnValue({ apikey: 'test-key' });

    ffmpegServiceSpy = jasmine.createSpyObj('FfmpegService', [
      'shouldCompress',
      'compressVideo',
      'terminate',
    ], {
      progress$: new Subject(),
    });

    // mock environment config
    environment.uppyConfig = {
      tusUrl: 'https://example.com/uploads',
      uploadPreset: 'test-preset',
      restrictions: {
        minFileSize: 0,
        maxFileSize: 1000000,
        minNumberOfFiles: 1,
        maxNumberOfFiles: 10,
        maxTotalFileSize: 10000000,
        requiredMetaFields: []
      }
    };
    environment.stackName = 'test-stack';

    TestBed.configureTestingModule({
      providers: [
        UppyUploaderService,
        { provide: ModalController, useValue: modalCtrlSpy },
        { provide: BrowserStorageService, useValue: storageSpy },
        { provide: FfmpegService, useValue: ffmpegServiceSpy },
      ],
    });

    service = new UppyUploaderService(
      modalCtrlSpy,
      storageSpy,
      ffmpegServiceSpy,
      TestBed.inject(NgZone),
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have compressingUppy null initially', () => {
    expect(service.compressingUppy).toBeNull();
  });

  it('should expose compressionProgress$ subject', () => {
    expect(service.compressionProgress$).toBeTruthy();
  });

  describe('createUppyInstance', () => {
    it('should create an Uppy instance with correct options', () => {
      const events = {
        onAfterResponse: jasmine.createSpy('onAfterResponse'),
        onUploadSuccess: jasmine.createSpy('onUploadSuccess')
      };

      const options = {
        allowedFileTypes: ['image/*']
      };

      const result = service.createUppyInstance('chat', 'https://upload.example.com', events, options);

      // verify the result is an Uppy instance by checking it has expected methods
      expect(result).toBeTruthy();
      expect(typeof result.use).toBe('function');
      expect(typeof result.on).toBe('function');
    });

    it('should log error if environment config is missing', () => {
      const originalConfig = environment.uppyConfig;
      const originalStackName = environment.stackName;
      environment.uppyConfig = null;
      environment.stackName = '';

      const consoleSpy = spyOn(console, 'error');
      const events = {
        onAfterResponse: jasmine.createSpy('onAfterResponse'),
        onUploadSuccess: jasmine.createSpy('onUploadSuccess')
      };

      // this will log error but not throw since the config check just logs
      try {
        service.createUppyInstance('chat', 'https://upload.example.com', events);
      } catch (e) {
        // expected - uppyConfig is null so restrictions will throw
      }

      expect(consoleSpy).toHaveBeenCalledWith('Uppy configuration is missing or incomplete.');

      // restore config
      environment.uppyConfig = originalConfig;
      environment.stackName = originalStackName;
    });
  });

  describe('initializeEventHandlers', () => {
    let mockUppy: any;
    let handlers: Record<string, (...args: any[]) => void>;

    beforeEach(() => {
      handlers = {};
      mockUppy = {
        on: jasmine.createSpy('on').and.callFake(function(
          this: any,
          eventName: string,
          handler: (...args: any[]) => void
        ) {
          handlers[eventName] = handler;
          return this;
        }),
      };
    });

    it('should set up event handlers on the Uppy instance', () => {
      const onUploadSuccessSpy = jasmine.createSpy('onUploadSuccess');
      (service as any).initializeEventHandlers(mockUppy, onUploadSuccessSpy);
      expect(mockUppy.on).toHaveBeenCalled();
    });

    it('should register upload-success handler', () => {
      const onUploadSuccessSpy = jasmine.createSpy('onUploadSuccess');
      (service as any).initializeEventHandlers(mockUppy, onUploadSuccessSpy);

      const registeredEvents = mockUppy.on.calls.allArgs().map((args: any[]) => args[0]);
      expect(registeredEvents).toContain('upload-success');
    });

    it('should forward upload-success events to the component callback', () => {
      const onUploadSuccessSpy = jasmine.createSpy('onUploadSuccess');
      const file = { id: 'file-id' };
      const response = { status: 200 };
      spyOn(console, 'log');
      (service as any).initializeEventHandlers(mockUppy, onUploadSuccessSpy);

      handlers['upload-success'](file, response);

      expect(onUploadSuccessSpy).toHaveBeenCalledWith(file, response);
    });

    it('should clear the successful upload from storage when complete', () => {
      const onUploadSuccessSpy = jasmine.createSpy('onUploadSuccess');
      storageSpy.clearByName.and.returnValue(true as any);
      spyOn(console, 'log');
      (service as any).initializeEventHandlers(mockUppy, onUploadSuccessSpy);

      handlers.complete({ successful: [{ id: 'file-id' }] } as any);

      expect(storageSpy.clearByName).toHaveBeenCalledWith('file-id');
    });

    it('should not clear storage when no upload completed successfully', () => {
      const onUploadSuccessSpy = jasmine.createSpy('onUploadSuccess');
      spyOn(console, 'log');
      (service as any).initializeEventHandlers(mockUppy, onUploadSuccessSpy);

      handlers.complete({ successful: [] } as any);

      expect(storageSpy.clearByName).not.toHaveBeenCalled();
    });

  });

  describe('getPatchValue', () => {
    it('should return the correct patch value for a given id', () => {
      const testId = 'test-id';
      const testValue = { path: 'test-path', bucket: 'test-bucket' };

      service['patchValue'] = { [testId]: testValue };

      expect(service.getPatchValue(testId)).toEqual(testValue);
    });
  });

  describe('compression preprocessor', () => {
    let files: Record<string, any>;
    let mockUppy: any;
    let preprocessor: (fileIDs: string[]) => Promise<void>;

    beforeEach(() => {
      files = {};
      mockUppy = {
        addPreProcessor: jasmine.createSpy('addPreProcessor').and.callFake(
          (handler: (fileIDs: string[]) => Promise<void>) => preprocessor = handler
        ),
        getFile: jasmine.createSpy('getFile').and.callFake((id: string) => files[id]),
        setFileState: jasmine.createSpy('setFileState'),
      };
      (service as any).registerCompressionPreProcessor(mockUppy);
    });

    it('should skip non-video files', async () => {
      files.document = {
        id: 'document',
        name: 'document.pdf',
        type: 'application/pdf',
        data: new Blob(['document']),
      };

      await preprocessor(['document']);

      expect(ffmpegServiceSpy.shouldCompress).not.toHaveBeenCalled();
      expect(ffmpegServiceSpy.compressVideo).not.toHaveBeenCalled();
    });

    it('should skip videos that do not benefit from compression', async () => {
      files.video = {
        id: 'video',
        name: 'small.mp4',
        type: 'video/mp4',
        data: new Blob(['small video']),
      };
      ffmpegServiceSpy.shouldCompress.and.returnValue({
        compress: false,
        reason: 'file too small',
      });
      spyOn(console, 'log');

      await preprocessor(['video']);

      expect(ffmpegServiceSpy.shouldCompress).toHaveBeenCalled();
      expect(ffmpegServiceSpy.compressVideo).not.toHaveBeenCalled();
      expect(service.compressingUppy).toBeNull();
    });

    it('should compress a video, forward progress, and replace its Uppy state', async () => {
      const sourceFile = {
        id: 'video',
        name: 'source.mov',
        type: 'video/quicktime',
        data: new Blob(['source video']),
        meta: { name: 'source.mov', type: 'video/quicktime', custom: true },
      };
      const compressedFile = new File(['compressed'], 'source.mp4', { type: 'video/mp4' });
      files.video = sourceFile;
      ffmpegServiceSpy.shouldCompress.and.returnValue({ compress: true });
      let resolveCompression: (value: any) => void;
      ffmpegServiceSpy.compressVideo.and.returnValue(new Promise(resolve => {
        resolveCompression = resolve;
      }));
      const emissions: any[] = [];
      const subscription = service.compressionProgress$.subscribe(value => emissions.push(value));
      spyOn(console, 'log');

      const processing = preprocessor(['video']);
      await Promise.resolve();
      (ffmpegServiceSpy.progress$ as Subject<any>).next({ progress: 0.5, timeUs: 100 });
      resolveCompression({
        file: compressedFile,
        originalSize: 100,
        compressedSize: 40,
        reductionPercent: 60,
        skipped: false,
      });
      await processing;

      expect(emissions).toEqual([
        { uppy: mockUppy, progress: { progress: 0, timeUs: 0 } },
        { uppy: mockUppy, progress: { progress: 0.5, timeUs: 100 } },
        { uppy: mockUppy, progress: null },
      ]);
      expect(mockUppy.setFileState).toHaveBeenCalledWith('video', {
        data: compressedFile,
        size: 40,
        name: 'source.mp4',
        type: 'video/mp4',
        meta: {
          name: 'source.mp4',
          type: 'video/mp4',
          custom: true,
        },
      });
      expect(service.compressingUppy).toBeNull();
      subscription.unsubscribe();
    });

    it('should not replace a file removed while compression is running', async () => {
      files.video = {
        id: 'video',
        name: 'source.mp4',
        type: 'video/mp4',
        data: new Blob(['source video']),
        meta: {},
      };
      ffmpegServiceSpy.shouldCompress.and.returnValue({ compress: true });
      ffmpegServiceSpy.compressVideo.and.callFake(async () => {
        delete files.video;
        return {
          file: new File(['compressed'], 'source.mp4', { type: 'video/mp4' }),
          originalSize: 100,
          compressedSize: 40,
          reductionPercent: 60,
          skipped: false,
        };
      });
      spyOn(console, 'log');
      spyOn(console, 'warn');

      await preprocessor(['video']);

      expect(mockUppy.setFileState).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        'file video was removed during compression, skipping state update'
      );
    });

    it('should retain the original file when compression returns a skipped result', async () => {
      files.video = {
        id: 'video',
        name: 'source.mp4',
        type: 'video/mp4',
        data: new Blob(['source video']),
        meta: {},
      };
      ffmpegServiceSpy.shouldCompress.and.returnValue({ compress: true });
      ffmpegServiceSpy.compressVideo.and.resolveTo({
        file: new File(['source video'], 'source.mp4', { type: 'video/mp4' }),
        originalSize: 100,
        compressedSize: 100,
        reductionPercent: 0,
        skipped: true,
      });

      await preprocessor(['video']);

      expect(mockUppy.setFileState).not.toHaveBeenCalled();
      expect(service.compressingUppy).toBeNull();
    });

    it('should clear compression state and keep the original after a failure', async () => {
      files.video = {
        id: 'video',
        name: 'source.mp4',
        type: 'video/mp4',
        data: new Blob(['source video']),
        meta: {},
      };
      ffmpegServiceSpy.shouldCompress.and.returnValue({ compress: true });
      ffmpegServiceSpy.compressVideo.and.rejectWith(new Error('compression failed'));
      const emissions: any[] = [];
      const subscription = service.compressionProgress$.subscribe(value => emissions.push(value));
      spyOn(console, 'error');

      await preprocessor(['video']);

      expect(emissions).toEqual([
        { uppy: mockUppy, progress: { progress: 0, timeUs: 0 } },
        { uppy: mockUppy, progress: null },
      ]);
      expect(service.compressingUppy).toBeNull();
      expect(mockUppy.setFileState).not.toHaveBeenCalled();
      subscription.unsubscribe();
    });
  });

  describe('beforeunload protection', () => {
    it('should only prevent page unload while compression is active', () => {
      const event = { preventDefault: jasmine.createSpy('preventDefault') };

      beforeUnloadHandler(event);
      expect(event.preventDefault).not.toHaveBeenCalled();

      service.compressingUppy = {} as Uppy<any, any>;
      beforeUnloadHandler(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(windowAddEventListenerSpy).toHaveBeenCalled();
    });
  });

  describe('cancelCompression', () => {
    it('should do nothing if no compression is active', () => {
      service.compressingUppy = null;

      service.cancelCompression();

      expect(ffmpegServiceSpy.terminate).not.toHaveBeenCalled();
    });

    it('should terminate ffmpeg and emit null progress when compressing', () => {
      const fakeUppy = {} as Uppy<any, any>;
      service.compressingUppy = fakeUppy;

      const emitted: any[] = [];
      const sub = service.compressionProgress$.subscribe(v => emitted.push(v));

      service.cancelCompression();

      expect(ffmpegServiceSpy.terminate).toHaveBeenCalled();
      expect(emitted.length).toBe(1);
      expect(emitted[0]).toEqual({ uppy: fakeUppy, progress: null });
      expect(service.compressingUppy).toBeNull();

      sub.unsubscribe();
    });
  });

  describe('open', () => {
    it('should create a modal with backdropDismiss false', async () => {
      const mockModal = jasmine.createSpyObj('HTMLIonModalElement', ['present']);
      mockModal.present.and.returnValue(Promise.resolve());
      modalCtrlSpy.create.and.returnValue(Promise.resolve(mockModal));

      await service.open('chat');

      expect(modalCtrlSpy.create).toHaveBeenCalledWith(jasmine.objectContaining({
        component: UppyUploaderComponent,
        backdropDismiss: false,
      }));
    });

    it('should create a modal with canDismiss function', async () => {
      const mockModal = jasmine.createSpyObj('HTMLIonModalElement', ['present']);
      mockModal.present.and.returnValue(Promise.resolve());
      modalCtrlSpy.create.and.returnValue(Promise.resolve(mockModal));

      await service.open('chat');

      const createArgs = modalCtrlSpy.create.calls.mostRecent().args[0];
      expect(createArgs.canDismiss).toBeDefined();
      expect(typeof createArgs.canDismiss).toBe('function');
    });

    it('should allow dismiss when not compressing', async () => {
      const mockModal = jasmine.createSpyObj('HTMLIonModalElement', ['present']);
      mockModal.present.and.returnValue(Promise.resolve());
      modalCtrlSpy.create.and.returnValue(Promise.resolve(mockModal));

      await service.open('chat');

      const createArgs = modalCtrlSpy.create.calls.mostRecent().args[0];
      service.compressingUppy = null;
      const canDismissFn = createArgs.canDismiss as (data?: any, role?: string) => Promise<boolean>;
      const canDismiss = await canDismissFn();
      expect(canDismiss).toBeTrue();
    });

    it('should block dismiss when compressing', async () => {
      const mockModal = jasmine.createSpyObj('HTMLIonModalElement', ['present']);
      mockModal.present.and.returnValue(Promise.resolve());
      modalCtrlSpy.create.and.returnValue(Promise.resolve(mockModal));

      await service.open('chat');

      const createArgs = modalCtrlSpy.create.calls.mostRecent().args[0];
      service.compressingUppy = {} as Uppy<any, any>;
      const canDismissFn = createArgs.canDismiss as (data?: any, role?: string) => Promise<boolean>;
      const canDismiss = await canDismissFn();
      expect(canDismiss).toBeFalse();

      // cleanup
      service.compressingUppy = null;
    });

    it('should present the modal', async () => {
      const mockModal = jasmine.createSpyObj('HTMLIonModalElement', ['present']);
      mockModal.present.and.returnValue(Promise.resolve());
      modalCtrlSpy.create.and.returnValue(Promise.resolve(mockModal));

      await service.open('chat');

      expect(mockModal.present).toHaveBeenCalled();
    });

    it('should pass the source as component prop', async () => {
      const mockModal = jasmine.createSpyObj('HTMLIonModalElement', ['present']);
      mockModal.present.and.returnValue(Promise.resolve());
      modalCtrlSpy.create.and.returnValue(Promise.resolve(mockModal));

      await service.open('assessment');

      expect(modalCtrlSpy.create).toHaveBeenCalledWith(jasmine.objectContaining({
        componentProps: { source: 'assessment' },
      }));
    });
  });

  describe('parseTusUploadResponse', () => {
    it('should parse the upload metadata returned by the TUS server', () => {
      const response = service.parseTusUploadResponse(JSON.stringify({
        bucket: 'bucket',
        path: '/uploads/profile.png',
        cdnUrl: 'https://cdn.example.com/profile.png',
        directUrl: 'https://files.example.com/profile.png',
      }));

      expect(response).toEqual({
        bucket: 'bucket',
        path: '/uploads/profile.png',
        cdnUrl: 'https://cdn.example.com/profile.png',
        directUrl: 'https://files.example.com/profile.png',
      });
    });

    it('should reject an empty response body', () => {
      expect(() => service.parseTusUploadResponse('')).toThrowError(
        'Upload server returned an empty response.'
      );
    });

    it('should reject malformed JSON', () => {
      expect(() => service.parseTusUploadResponse('{invalid')).toThrowError(
        'Upload server returned an invalid response.'
      );
    });

    it('should reject incomplete upload metadata', () => {
      expect(() => service.parseTusUploadResponse(JSON.stringify({
        bucket: 'bucket',
        path: '/uploads/profile.png',
      }))).toThrowError(
        'Upload server response is missing required file metadata.'
      );
    });
  });
});
