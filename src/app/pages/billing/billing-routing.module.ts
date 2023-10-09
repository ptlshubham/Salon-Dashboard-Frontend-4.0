import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

const routes: Routes = [
     {
          path: 'driver-list',
          component: DriverDetailsComponent
     }, 
     {
          path: 'vehicle-list',
          component: VehicleDetailsComponent
     },     
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})

export class BillingRoutingModule { }
