import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FilestackService } from '@shared/filestack/filestack.service';
import { UtilsService } from '@services/utils.service';
import { FixOrientationService } from '@services/fix-orientation.service';
// import * as exif from 'exif-js';

// const getImageClassToFixOrientation = (orientation) => {
//   switch (orientation) {
//     case 2:
//       return ('flip');
//     case 3:
//       return ('rotate-180');
//     case 4:
//       return ('flip-and-rotate-180');
//     case 5:
//       return ('flip-and-rotate-270');
//     case 6:
//       return ('rotate-90');
//     case 7:
//       return ('flip-and-rotate-90');
//     case 8:
//       return ('rotate-270');
//   }
// }

// const swapWidthAndHeight = img => {
//   const currentHeight = img.height;
//   const currentWidth = img.width;
//   img.height = currentWidth;
//   img.width = currentHeight;
// }

@Component({
  selector: 'app-file-display',
  templateUrl: 'file-display.component.html',
  styleUrls: ['file-display.component.scss']
})
export class FileDisplayComponent implements OnInit, OnChanges {
  private virusDetection: any;
  private quarantine: any;
  public imageMeta: any;

  @Input() fileType = 'any';
  @Input() file: any;

  constructor(private filestackService: FilestackService, private utils: UtilsService, private fixOrientation: FixOrientationService) { }

  ngOnInit() {
    if (this.file && this.file.workflows) {
      this.updateWorkflowStatus();
    }
  }

  private resetUILogic() {
    this.virusDetection = {};
    this.quarantine = {};
  }

  private updateWorkflowStatus(file?) {
    this.resetUILogic();

    const currentFile = file || this.file;
    this.filestackService.getWorkflowStatus(currentFile.workflows).then(responds => {
      this.utils.each((responds || []), res => {
        const { results, status } = res;

        if (status.toLowerCase() === 'finished') { // status: Finished / InProgress
          const { virus_detection, quarantine } = results;

          if (this.utils.isEmpty(this.virusDetection) && virus_detection && virus_detection.data) {
            this.virusDetection = virus_detection.data;
          }

          if (this.utils.isEmpty(this.quarantine) && quarantine && quarantine.data) {
            this.quarantine = quarantine.data;
          }
        }
      });
    });
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.file.currentValue && change.file.currentValue.workflows) {
      this.updateWorkflowStatus(change.file.currentValue);
    }
  }

  async previewFile(file) {
    try {
      return await this.filestackService.previewFile(file);
    } catch (err) {
      return err;
    }
  }

  // imageLoaded(e) {
  //   exif.getData(e.target, function () {
  //     var allMetaData = exif.getAllTags(this);
  //     const orientationClassFix = getImageClassToFixOrientation(allMetaData.Orientation);
  //     this.classList.add(orientationClassFix);
  //     if(allMetaData.Orientation >= 5) {
  //       swapWidthAndHeight(this);
  //     }

  //   });
  // }
  loaded(e) {
    this.fixOrientation.imageLoaded(e);

  }
}

