import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateCardComponent } from './rate-card/rate-card.component';
import { EndUserRoutingModule } from './end-user.routing.module';
import { NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { GalleryComponent } from './gallery/gallery.component';


@NgModule({
  declarations: [
    RateCardComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,
    EndUserRoutingModule,
    NgbPaginationModule,
    FormsModule,
    NgbNavModule,

  ]
})
export class EndUserModule { }
