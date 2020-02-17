import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileDisplayComponent } from './file-display.component';
import { FilestackService } from '@shared/filestack/filestack.service';
import { Observable, of, pipe } from 'rxjs';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { UtilsService } from '@services/utils.service';

class onChangedValues extends SimpleChange {
  constructor(older, latest) {
    super(older, latest, false);
  }
}

describe('FileDisplayComponent', () => {
  let component: FileDisplayComponent;
  let fixture: ComponentFixture<FileDisplayComponent>;
  let filestackSpy: jasmine.SpyObj<FilestackService>;
  let utilSpy: jasmine.SpyObj<UtilsService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, ReactiveFormsModule ],
      declarations: [ FileDisplayComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        UtilsService,
        {
          provide: FilestackService,
          useValue: jasmine.createSpyObj('FilestackService', [
            'previewFile',
            'getWorkflowStatus'
          ])
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDisplayComponent);
    component = fixture.componentInstance;
    filestackSpy = TestBed.get(FilestackService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should preview file', () => {
    component.previewFile('file');
    expect(filestackSpy.previewFile.calls.count()).toBe(1);
  });

  it('should fail, if preview file api is faulty', () => {
    const error = 'error';
    filestackSpy.previewFile.and.returnValue(Promise.reject(error));
    const result = component.previewFile('file');
    expect(result).toEqual(error);
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      component['updateWorkflowStatus'] = jasmine.createSpy('updateWorkflowStatus');
    });

    it('should check workflow status if workflow object is available', () => {
      component.file = {
        workflows: 'isAvailable'
      };
      component.ngOnInit();
      expect(component['updateWorkflowStatus']).toHaveBeenCalled();
    });

    it('should not update workflow status if file not available', () => {
      component.file = undefined;
      component.ngOnInit();
      expect(component['updateWorkflowStatus']).not.toHaveBeenCalled();
    });
  });

  describe('ngOnChanges', () => {
    it('should track fileupload json changes', () => {
      component['updateWorkflowStatus'] = jasmine.createSpy('updateWorkflowStatus');
      const jsonData = {just: 'first test'};
      const newJsonData = {jsonData, ...{
        and: 'second test',
        without: 'workflow',
      }};

      component.ngOnChanges({
        file: new onChangedValues(jsonData, newJsonData),
      });

      expect(component['updateWorkflowStatus']).not.toHaveBeenCalled();
    });

    it('should not track fileupload changes if workflow is not available', () => {
      component['updateWorkflowStatus'] = jasmine.createSpy('updateWorkflowStatus');
      const jsonData = {just: 'first test'};
      const newJsonData = {jsonData, ...{
        and: 'second test',
        without: 'workflows',
      }};

      component.ngOnChanges({
        file: new onChangedValues(jsonData, newJsonData),
      });

      expect(component['updateWorkflowStatus']).not.toHaveBeenCalled();
    });

    it('should track fileupload changes if workflow is available', () => {
      component['resetUILogic'] = jasmine.createSpy('resetUILogic');

      const virus_detection = {
        data: 'virus_detection_test_data',
      };
      const quarantine = {
        data: 'quarantine_test_data',
      };

      filestackSpy.getWorkflowStatus.and.returnValue(Promise.resolve([
        {
          results: {
            virus_detection,
            quarantine,
          },
          status: 'FINISHED',
        },
      ]));

      const jsonData = {just: 'first test'};
      const newJsonData = {...jsonData, ...{
        and: 'second test',
        workflows: true,
      }};

      component.ngOnChanges({
        file: new onChangedValues(jsonData, newJsonData),
      });

      expect(filestackSpy.getWorkflowStatus).toHaveBeenCalledWith(newJsonData.workflows);
      expect(component['resetUILogic']).toHaveBeenCalled();
      expect(component['virusDetection']).toEqual(virus_detection);
      expect(component['quarantine']).toEqual(quarantine);
    });
  });
});

