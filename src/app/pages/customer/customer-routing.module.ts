import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { EmployeeComponent } from './employee/employee.component';
import { UsersComponent } from './users/users.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ComboOfferComponent } from './combo-offer/combo-offer.component';
import { MembershipComponent } from './membership/membership.component';
import { VendorComponent } from './vendor/vendor.component';
import { SalonRegistartionComponent } from '../admin/salon-registartion/salon-registartion.component';
import { PurchaseMembershipComponent } from './purchase-membership/purchase-membership.component';
import { BannersComponent } from './banners/banners.component';
import { VendorProductComponent } from './vendor-product/vendor-product.component';
import { ProfileComponent } from './profile/profile.component';
import { EarningsComponent } from './earnings/earnings.component';
import { ServiceUploadComponent } from './service-upload/service-upload.component';
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
          path: 'expenses',
          component: ExpensesComponent
     },
     {
          path: 'combo-offer',
          component: ComboOfferComponent
     },
     {
          path: 'membership',
          component: MembershipComponent
     },
     {
          path: 'vendor',
          component: VendorComponent
     },
     {
          path: 'purchase-membership',
          component: PurchaseMembershipComponent
     },
     {
          path: 'banners',
          component: BannersComponent
     },
     {
          path: 'vendor-product/:id',
          component: VendorProductComponent
     },
     {
          path: 'profile',
          component: ProfileComponent
     },
     {
          path: 'earnings',
          component: EarningsComponent
     },
     {
          path: 'service-upload',
          component: ServiceUploadComponent
     },


];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})

export class CustomerRoutingModule { }
