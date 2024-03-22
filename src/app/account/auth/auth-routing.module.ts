import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { RecoverpwdComponent } from './recoverpwd/recoverpwd.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LogoutComponent } from './logout/logout.component';
import { ConfirmmailComponent } from './confirmmail/confirmmail.component';
import { VerificationComponent } from './verification/verification.component';
import { TwostepverificationComponent } from './twostepverification/twostepverification.component';

const routes: Routes = [
  {
    path: 'register1',
    component: RegisterComponent,
  },
  {
    path: 'recoverpw',
    component: RecoverpwdComponent,
  },
  {
    path: 'lock-screen',
    component: LockscreenComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'confirm-mail',
    component: ConfirmmailComponent,
  },
  {
    path: 'email-verification',
    component: VerificationComponent,
  },
  {
    path: 'two-step-verification',
    component: TwostepverificationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
