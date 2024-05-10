import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateCardComponent } from './rate-card/rate-card.component';
import { GalleryComponent } from './gallery/gallery.component';




const routes: Routes = [
    {
        path: 'rate-card',
        component: RateCardComponent
    },
    {
        path: 'gallery',
        component: GalleryComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EndUserRoutingModule { }
