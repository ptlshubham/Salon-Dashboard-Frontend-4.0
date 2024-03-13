import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateCardComponent } from './rate-card/rate-card.component';
import { EndUserRoutingModule } from './end-user.routing.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RateCardComponent
  ],
  imports: [
    CommonModule,
    EndUserRoutingModule,
    NgbPaginationModule,
    FormsModule

  ]
})
export class EndUserModule { }
