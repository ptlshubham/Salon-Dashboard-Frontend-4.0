import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { EmployeeComponent } from './employee/employee.component';
import { UsersComponent } from './users/users.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ComboOfferComponent } from './combo-offer/combo-offer.component';
import { MembershipComponent } from './membership/membership.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
     {
          path: 'service-list',
          component: ServicesComponent
     }, 
     {
          path: 'employee-list',
          component: EmployeeComponent
     },
     {
          path: 'user-list',
          component: UsersComponent
     }, 
     {
          path:'expenses',
          component: ExpensesComponent  
     }, 
     {
          path:'combo-offer',
          component: ComboOfferComponent  
     }, 
     {
          path:'membership',
          component: MembershipComponent  
     }, 
     {
          path:'vendor',
          component: VendorComponent  
     }           
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})

export class CustomerRoutingModule { }
