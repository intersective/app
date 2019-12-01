import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { OverviewRoutingComponent } from './overview-routing.component';
import { OverviewComponent } from './overview/overview.component';
import { OverviewService } from './overview.service';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { TodoCardComponent } from './home/todo-card/todo-card.component';
import { SlidableComponent } from './home/slidable/slidable.component';
import { ProjectComponent } from './project/project.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FastFeedbackModule } from '../fast-feedback/fast-feedback.module';
import { ProjectService } from './project/project.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OverviewRoutingComponent,
        children: [
          {
            path: '',
            component: HomeComponent,
            outlet: 'home',
          },
          {
            path: '',
            component: ProjectComponent,
            outlet: 'project',
          },
          {
            path: '',
            component: OverviewComponent,
            outlet: 'mobile-overview',
          }
        ]
      },
    ]),

    NgCircleProgressModule.forRoot({
      'outerStrokeLinecap': 'butt',
      'toFixed': 0,
      'outerStrokeColor': 'var(--ion-color-primary)',
      'backgroundColor': 'var(--ion-color-light)',
      'backgroundStroke': 'var(--ion-color-primary)',
      'showTitle': false,
      'showSubtitle': false,
      'startFromZero': false,
      'showInnerStroke': false,
      'showUnits': false,
      'backgroundStrokeWidth': 2,
      'maxPercent': 100,
      'outerStrokeWidth': 8,
      'radius': 4,
      'space': -20
    }),
    FastFeedbackModule,
  ],
  declarations: [
    HomeComponent,
    // HomeRoutingComponent,
    TodoCardComponent,
    SlidableComponent,
    OverviewComponent,
    OverviewRoutingComponent,
    ProjectComponent,
  ],
  providers: [
    OverviewService,
    ProjectService,
    HomeService,
  ],
  exports: [
    RouterModule,
    SharedModule,
    FastFeedbackModule,
  ],
})
export class OverviewModule { }
