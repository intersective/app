import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FilestackService } from '@v3/services/filestack.service';
import { UtilsService } from '@v3/services/utils.service';
import { PickerOptions } from 'filestack-js/build/main/lib/picker';

export interface FilestackUploaded {
  handle: string;
  url: string;
  filename: string;
  size: number;
  mimetype: string;
  key: string;
  container: string;
  status: string;
  workflow?: object;

  // flag to indicate detected virus (true: threat found, false: safe from virus/malware)
  infected?: boolean;

  // list of infected files
  infections_list?: string[];
}

@Component({
  selector: 'app-file-stack',
  templateUrl: 'filestack.component.html',
  styleUrls: ['filestack.component.scss']
})
export class FilestackComponent {
  @Input() accept: any;
  @Input() fileType: string;
  @Input() type?: string;
  @Input() disabled: boolean;

  // upon fileupload success
  @Output() uploadCompleted: EventEmitter<any> = new EventEmitter();

  uploadingFile = {
    uploadProgress: 0,
    fileName: '',
    fileSize: '',
    uploadSize: ''
  };
  isDroped: boolean;
  uploadToken: any;

  constructor(
    private filestackService: FilestackService,
    private readonly utils: UtilsService
  ) { }

  async uploadFile(keyboardEvent?: KeyboardEvent) {
    if (keyboardEvent && (keyboardEvent?.code === 'Space' || keyboardEvent?.code === 'Enter')) {
      keyboardEvent.preventDefault();
    } else if (keyboardEvent) {
      return;
    }

    const s3Config = this.filestackService.getS3Config(this.fileType);
    const pickerOptions: PickerOptions = {
      storeTo: s3Config,
      onFileUploadFailed: data => {
        this.uploadCompleted.emit({
          success: false,
          data: data
        });
      },
      onFileUploadFinished: data => {
        this.uploadCompleted.emit({
          success: true,
          data: data
        });
      },
      onOpen: () => {
        setTimeout(() => {
          const eles = document.getElementsByClassName('fsp-picker__close-button');
          if (eles.length > 0) {
            (eles[0] as HTMLElement).focus();
          }
        }, 850);
      },
    };

    if (this.accept) {
      pickerOptions['accept'] = this.accept;
    }

    try {
      const res = await this.filestackService.open(pickerOptions);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async dragAndDropUpload(dropData) {
    if (dropData.success) {
      this.isDroped = true;
      this.uploadingFile.fileName = dropData.file.name;
      this.uploadingFile.fileSize = this._bytesToSize(dropData.file.size);
      const s3Config = this.filestackService.getS3Config(this.fileType);
      this.uploadToken = {};
      const uploadOptions = {
        onProgress: progressData => {
          this.uploadingFile.uploadProgress = progressData.totalPercent;
          this.uploadingFile.uploadSize = this._bytesToSize(progressData.totalBytes);
        },
        onFileUploadFinished: fileData => {
          this.uploadCompleted.emit({
            success: true,
            data: fileData
          });
        },
        onFileUploadFailed: err => {
          this.uploadCompleted.emit({
            success: false,
            data: err
          });
        }
      };

      await this.filestackService.upload(dropData.file, uploadOptions, s3Config, this.uploadToken);
    } else {
      this.isDroped = false;
      this.uploadCompleted.emit({
        success: false,
        data: {
          message: dropData.message,
          isDragAndDropError: true
        }
      });
    }
  }

  cancelFileUpload() {
    if (this.uploadToken) {
      this.uploadToken.cancel();
      this.isDroped = false;
      this.uploadingFile = {
        uploadProgress: 0,
        fileName: '',
        fileSize: '',
        uploadSize: ''
      };
    }
  }

  private _bytesToSize(bytes) {
    if (bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.min(parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10), sizes.length - 1);
        return `${(bytes / (1024 ** i)).toFixed(i ? 1 : 0)} ${sizes[i]}`;
    }
    return '0';
  }

  get isMobile(): boolean {
    return this.utils.isMobile();
  }
}
