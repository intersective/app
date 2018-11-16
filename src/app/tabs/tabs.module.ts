import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsRoutingModule } from './tabs-routing.module';

import { TabsComponent } from './tabs.component';

import { HomeModule } from '../home/home.module';
import { ProjectModule } from '../project/project.module';
import { ActivityModule } from '../activity/activity.module';
import { ChatModule } from '../chat/chat.module';
import { HelpModule } from '../help/help.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsRoutingModule,
    HomeModule,
    ProjectModule,
    ActivityModule,
    ChatModule,
    HelpModule
  ],
  declarations: [ TabsComponent ]
})
export class TabsModule {}
