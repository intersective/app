import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { UserResolverService } from '@services/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    resolve: {
      user: UserResolverService
    },
    children: [
      {
        path: '',
        component: ChatViewComponent,
      }
    ]
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent,
    resolve: {
      user: UserResolverService
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {}
