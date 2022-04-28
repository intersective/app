import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserStorageService } from '@v3/services/storage.service';

@Component({
  selector: 'app-description',
  templateUrl: 'description.component.html',
  styleUrls: ['./description.component.scss'],
  encapsulation: ViewEncapsulation.None,
  /*animations: [
    trigger('truncation', [
      state('show', style({
        'max-height': '1000px !important',
      })),
      state('hide', style({
        'max-height': '90px !important',
      })),
      transition('* <=> *', [
        animate('0.5s ease-in-out')
      ])
    ]),
  ]*/
})
export class DescriptionComponent implements AfterViewInit, OnChanges {
  heightLimit = 120;
  isTruncating = false;
  heightExceeded = false;
  elementHeight: number;

  @Input() name; // unique identity of parent element
  @Input() content;
  @Input() isInPopup;
  @ViewChild('description') descriptionRef: ElementRef;

  constructor(
    private storage: BrowserStorageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange}) {
    this.content = this.sanitizer.bypassSecurityTrustHtml(changes.content.currentValue);
    this.calculateHeight();
  }

  ngAfterViewInit() {
    this.calculateHeight();
  }

  calculateHeight(): void {
    if (!this.storage.getUser().truncateDescription) {
      return;
    }
    setTimeout(
      () => {
        this.elementHeight = this.descriptionRef.nativeElement.clientHeight;
        this.heightExceeded = this.elementHeight >= this.heightLimit;
        if (this.heightExceeded) {
          this.isTruncating = true;
        }
      },
      1000
    );
  }
}

