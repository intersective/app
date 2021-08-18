import {ApolloModule as ApolloModule} from 'apollo-angular';
import {HttpLinkModule} from 'apollo-angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [],
  imports: [
    ApolloAngular,
    HttpLinkModule,
    CommonModule,
  ],
  providers: []
})
export class ApolloModule {}
