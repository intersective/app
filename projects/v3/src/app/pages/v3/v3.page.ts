import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AnimationsService } from '@v3/app/services/animations.service';
import { SettingsSlidePage } from '../settings-slide/settings-slide.page';

@Component({
  selector: 'app-v3',
  templateUrl: './v3.page.html',
  styleUrls: ['./v3.page.scss'],
})
export class V3Page implements OnInit {
  appPages = [
    {
      title: 'Home',
      url: '/v3/home',
      icon: 'home'
    },
    {
      title: 'Events',
      url: '/v3/events',
      icon: 'event'
    },
    {
      title: 'Reviews',
      url: '/v3/reviews',
      icon: 'reviews'
    },
    {
      title: 'Messages',
      url: '/v3/messages',
      icon: 'messages'
    }
  ];
  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private animationService: AnimationsService
  ) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SettingsSlidePage,
      enterAnimation: this.animationService.enterAnimation,
      leaveAnimation: this.animationService.leaveAnimation,
      cssClass: 'right-affixed'
    });
    return await modal.present();
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: SettingsSlidePage,
      size: 'cover',
      side: 'right',
      alignment: 'end',
    });
    return await popover.present();
  }
}
