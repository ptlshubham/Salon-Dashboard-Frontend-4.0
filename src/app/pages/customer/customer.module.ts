import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbAlertModule, NgbDropdownModule, NgbCarouselModule, NgbProgressbarModule, NgbNavModule, NgbCollapseModule, NgbAccordionModule, NgbPopoverModule, NgbTooltipModule, NgbPaginationModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicesComponent } from './services/services.component';
import { EmployeeComponent } from './employee/employee.component';
import { UsersComponent } from './users/users.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ComboOfferComponent } from './combo-offer/combo-offer.component';
import { VendorComponent } from './vendor/vendor.component';
import { MembershipComponent } from './membership/membership.component';
import { PurchaseMembershipComponent } from './purchase-membership/purchase-membership.component';
import { VendorProductComponent } from './vendor-product/vendor-product.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    ServicesComponent,
    EmployeeComponent,
    UsersComponent,
    ExpensesComponent,
    ComboOfferComponent,
    VendorComponent,
    MembershipComponent,
    PurchaseMembershipComponent,
    VendorProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgbAlertModule,
    DropzoneModule,
    NgbDropdownModule,
    NgbCarouselModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgbToastModule,
    NgSelectModule,
    FlatpickrModule.forRoot(),
    NgbDatepickerModule
  ],
  providers: [
    DatePipe,
    PurchaseMembershipComponent
  ],
  exports: [
    UsersComponent,
    ComboOfferComponent,
    // PurchaseMembershipComponent
  ]
})
export class CustomerModule { }
