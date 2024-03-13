import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// counter
import { CountUpModule } from 'ngx-countup';
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
// import { LightboxModule } from 'ngx-lightbox';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { TablesModule } from './tables/tables.module';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerModule } from './customer/customer.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    CountUpModule,
    SharedModule,
    NgApexchartsModule,
    PagesRoutingModule,
    SimplebarAngularModule,
    CarouselModule,
    FeatherModule.pick(allIcons),
    RouterModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbTooltipModule,
    // LightboxModule,
    TablesModule,
    LeafletModule,
    CustomerModule,
    NgbModule 
  ]
})
export class PagesModule { }
