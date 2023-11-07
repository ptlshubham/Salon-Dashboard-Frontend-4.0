import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
     {
          path: 'service-list',
          component: ServicesComponent
     }, 
     {
          path: 'employee-list',
          component: EmployeeComponent
     },     
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})

export class CustomerRoutingModule { }
