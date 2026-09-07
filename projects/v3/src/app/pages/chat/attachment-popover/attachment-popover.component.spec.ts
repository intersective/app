import { PopoverController } from '@ionic/angular';

import { AttachmentPopoverComponent } from './attachment-popover.component';
import { UppyUploaderService } from '@v3/app/components/uppy-uploader/uppy-uploader.service';
import { NotificationsService } from '@v3/services/notifications.service';

describe('AttachmentPopoverComponent', () => {
  let component: AttachmentPopoverComponent;
  let popoverController: jasmine.SpyObj<PopoverController>;
  let uppyUploaderService: jasmine.SpyObj<UppyUploaderService>;
  let notificationsService: jasmine.SpyObj<NotificationsService>;

  beforeEach(() => {
    popoverController = jasmine.createSpyObj<PopoverController>('PopoverController', ['dismiss']);
    uppyUploaderService = jasmine.createSpyObj<UppyUploaderService>('UppyUploaderService', ['open']);
    notificationsService = jasmine.createSpyObj<NotificationsService>('NotificationsService', ['alert']);
    component = new AttachmentPopoverComponent(
      popoverController,
      uppyUploaderService,
      notificationsService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close without a selected file by default', () => {
    component.close();

    expect(popoverController.dismiss).toHaveBeenCalledWith({ selectedFile: null });
  });

  it('should close with the selected file', () => {
    const selectedFile = {
      url: 'https://cdn.example.com/file.pdf',
      filename: 'file.pdf',
      mimetype: 'application/pdf',
      size: 123,
      path: '/file.pdf',
      bucket: 'uploads',
    };

    component.close(selectedFile);

    expect(popoverController.dismiss).toHaveBeenCalledWith({ selectedFile });
  });

  it('should open the requested uploader and return its selected file', async () => {
    const selectedFile = { filename: 'photo.jpg' } as any;
    const modal = {
      onDidDismiss: jasmine.createSpy('onDidDismiss').and.resolveTo({ data: selectedFile }),
    } as any;
    uppyUploaderService.open.and.resolveTo(modal);

    await component.openAttachPopup('image');
    await Promise.resolve();

    expect(uppyUploaderService.open).toHaveBeenCalledWith('image');
    expect(popoverController.dismiss).toHaveBeenCalledWith({ selectedFile });
  });

  it('should keep the popover open when the uploader is dismissed without data', async () => {
    const modal = {
      onDidDismiss: jasmine.createSpy('onDidDismiss').and.resolveTo({ data: null }),
    } as any;
    uppyUploaderService.open.and.resolveTo(modal);

    await component.openAttachPopup('video');
    await Promise.resolve();

    expect(popoverController.dismiss).not.toHaveBeenCalled();
  });

  it('should alert when the uploader cannot be opened', async () => {
    const error = new Error('Uploader unavailable');
    uppyUploaderService.open.and.rejectWith(error);
    spyOn(console, 'error');

    await component.openAttachPopup('any');

    expect(console.error).toHaveBeenCalledWith(error);
    expect(notificationsService.alert).toHaveBeenCalledWith({
      header: 'Upload Failed',
      message: 'Uploader unavailable',
    });
  });
});
