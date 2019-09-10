import { Injectable } from '@angular/core';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AlertOptions, ToastOptions, ModalOptions, LoadingOptions } from '@ionic/core';
import { PopUpComponent } from './pop-up/pop-up.component';
import { AchievementPopUpComponent } from './achievement-pop-up/achievement-pop-up.component';
import { LockTeamAssessmentPopUpComponent } from './lock-team-assessment-pop-up/lock-team-assessment-pop-up.component';
import { Achievement, AchievementsService } from '@app/achievements/achievements.service';
import { CustomToastComponent } from './custom-toast/custom-toast.component';

export interface CustomTostOptions {
  message: string;
  icon: string;
  duration?: string;
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    public achievementService: AchievementsService,
  ) {}

  dismiss() {
    return this.modalController.dismiss();
  }

  /**
   * @name modalConfig
   * @description futher customised filter
   */
  private modalConfig({ component, componentProps }, options = {}): ModalOptions {
    const config = Object.assign(
      {
        component,
        componentProps,
      },
      options
    );

    return config;
  }

  // show pop up message
  // this is using pop-up.component.ts as the view
  // put redirect = false if don't need to redirect
  async popUp(type, data, redirect: any = false) {
    const component = PopUpComponent;
    const componentProps = {
      type,
      data,
      redirect,
    };
    const modal = await this.modal(component, componentProps);
    return modal;
  }

  async modal(component, componentProps, options?, event?): Promise<void> {
    const modal = await this.modalOnly(component, componentProps, options, event);
    return modal.present();
  }

  async modalOnly(component, componentProps, options?, event?): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create(this.modalConfig({ component, componentProps }, options));

    if (event) {
      modal.onDidDismiss().then(event);
    }

    return modal;
  }

  async alert(config: AlertOptions) {
    const alert = await this.alertController.create(config);
    return await alert.present();
  }

  // toast message pop up, by default, shown success message for 2 seconds.
  async presentToast(message, success = false, duration?, customOptions?: ToastOptions) {
    let toastOptions: ToastOptions = {
      message: message,
      duration: duration || 200000,
      position: 'top',
    };
    console.log('customOptions', customOptions);
    if (customOptions) {
      toastOptions = Object.assign(customOptions, toastOptions);
    } else {
      toastOptions = Object.assign({color : success ? 'success' : 'danger'}, toastOptions);
    }
    const toast = await this.toastController.create(toastOptions);
    return toast.present();
  }

  async customToast(options: CustomTostOptions) {
    const component = CustomToastComponent;
    const icon = options.icon;
    const message = options.message;
    const duration = options.duration;
    const componentProps = {
      icon,
      message,
      duration
    };
    const modal = await this.modal(component, componentProps, {
      cssClass: 'practera-toast',
      keyboardClose: false,
      backdropDismiss: false,
      showBackdrop: false
    });
    return modal;
    // if (options.icon === 'checkmark') {
    //   options.message =  '<ion-icon name="checkmark"></ion-icon> ' + options.message;
    // }
    // return this.presentToast(options.message, false, options.duration , { cssClass: 'practera-toast' });
  }

  /**
   * pop up achievement notification and detail
   * sample call for notification popup
   * NotificationService.achievementPopUp('notification', {
   *   image: 'url' (optinal - have default one)
   *   name: "Sample Headding"
   * });
   * sample call for info popup
   * NotificationService.achievementPopUp('', {
   *    image: 'url' (optinal - have default one)
   *    name: "Sample Headding",
   *    points: "100",
   *    description: "qwert yuiop asdfg asdff"
   * });
   */
  async achievementPopUp(type: string, achievement: Achievement) {
    const component = AchievementPopUpComponent;
    const componentProps = {
      type,
      achievement
    };
    if (type === 'notification') {
      this.achievementService.markAchievementAsSeen(achievement.id);
    }
    const modal = await this.modal(component, componentProps, {
      cssClass: 'achievement-popup',
      keyboardClose: false,
      backdropDismiss: false
    });
    return modal;
  }

  /**
   * pop up to show user click on locked team assessment.
   * @param data
   * sample data object
   * NotificationService.lockTeamAssessmentPopUp({
   *    image: 'url' (optinal - have default one),
   *    name: "Alice"
   * });
   */
  async lockTeamAssessmentPopUp(data, event) {
    const componentProps = {
      name: data.name,
      image: data.image
    };
    const component = LockTeamAssessmentPopUpComponent;
    const modal = await this.modal(
      component, componentProps,
      {
      cssClass: 'lock-assessment-popup'
      },
      event
    );
    return modal;
  }

  async loading(opts?: LoadingOptions): Promise<void> {
    const loading = await this.loadingController.create(opts || {
      spinner: 'dots',

    });
    return loading.present();
  }
}
