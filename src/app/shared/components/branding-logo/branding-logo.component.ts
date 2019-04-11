import { Component, Input } from '@angular/core';
import { BrowserStorageService } from '@services/storage.service';

@Component({
  selector: 'app-branding-logo',
  templateUrl: './branding-logo.component.html',
})
export class BrandingLogoComponent {
  @Input() logo: string;

  constructor(public storage: BrowserStorageService) {}
}
