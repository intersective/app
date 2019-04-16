import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthService } from './auth.service';

import { UnauthorizedGuard } from './unauthorized.guard';
import { ProgramSelectedGuard } from './program-selected.guard';
import { AuthComponent } from './auth.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthForgotPasswordComponent } from './auth-forgot-password/auth-forgot-password.component';
import { AuthRegistrationComponent } from './auth-registration/auth-registration.component';
import { AuthResetPasswordComponent } from './auth-reset-password/auth-reset-password.component';
import { AuthDirectLoginComponent } from './auth-direct-login/auth-direct-login.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [
    AuthComponent,
    AuthLoginComponent,
    AuthForgotPasswordComponent,
    AuthRegistrationComponent,
    AuthResetPasswordComponent,
    AuthDirectLoginComponent
  ],
  entryComponents: [
    AuthComponent
  ],
  providers: [
    AuthService,
    UnauthorizedGuard,
    ProgramSelectedGuard,
  ],
  exports: [SharedModule]
})
export class AuthModule {}
