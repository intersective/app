import { TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { NativeStorageService } from './native-storage.service';
import { Storage as IONIC_STORAGE } from '@ionic/storage';

describe('NativeStorageService', function() {
  let service: NativeStorageService;
  let storage: IONIC_STORAGE;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NativeStorageService,
        {
          provide: IONIC_STORAGE,
          useValue: jasmine.createSpyObj('IONIC_STORAGE', [
            'set',
            'get',
            'remove',
            'keys',
            'clear',
          ])
        }
      ]
    });
    service = TestBed.inject(NativeStorageService);
    storage = TestBed.inject(IONIC_STORAGE);
  });

  it('should created', () => {
    expect(service).toBeTruthy();
  });

  describe('get "referrer" value from cache', function() {
    it('should get referrer information', () => {
      service.getObject('referrer');
      expect(storage.get).toHaveBeenCalledWith('referrer');
    });
  });

  describe('set "referrer" value into cache', function() {
    it('should set referrer information', fakeAsync(() => {
      spyOn(service, 'getObject').and.returnValues({});

      const KEY = 'referrer';
      const PARAM = { activityTaskUrl: 'tester' };
      service.setObject(KEY, PARAM);
      flushMicrotasks();
      expect(service.getObject).toHaveBeenCalledWith(KEY);
      expect(storage.set).toHaveBeenCalledWith(KEY, PARAM);
    }));
  });




  describe('remove', () => {
    it('should remove', fakeAsync(() => {
      const KEY = 'test';
      service.remove(KEY);
      flushMicrotasks();
      expect(storage.remove).toHaveBeenCalledWith(KEY);
    }));
  });

  describe('keys', () => {
    it('should keys', fakeAsync(() => {
      service.keys();
      flushMicrotasks();
      expect(storage.keys).toHaveBeenCalled();
    }));
  });

  describe('clear', () => {
    it('should clear', fakeAsync(() => {
      service.clear();
      flushMicrotasks();
      expect(storage.clear).toHaveBeenCalled();
    }));
  });
});
