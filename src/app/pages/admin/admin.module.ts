import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SalonRegistartionComponent } from './salon-registartion/salon-registartion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewSallonComponent } from './view-sallon/view-sallon.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    SalonRegistartionComponent,
    ViewSallonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgSelectModule

  ]
})
export class AdminModule { }
