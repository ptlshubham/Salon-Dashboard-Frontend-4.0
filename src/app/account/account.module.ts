import { NgModule } from '@angular/core';
import { NgbCarouselModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    AccountRoutingModule,
    AuthModule,
    NgStepperModule,
    NgbProgressbarModule,
    CdkStepperModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CarouselModule,
    NgbTooltipModule

  ]
})
export class AccountModule { }
