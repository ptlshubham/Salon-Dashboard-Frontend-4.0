import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalonRegistartionComponent } from './salon-registartion/salon-registartion.component';
import { ViewSallonComponent } from './view-sallon/view-sallon.component';

const routes: Routes = [
    {
        path: 'salon-registartion',
        component: SalonRegistartionComponent
    },
    {
        path: 'view-sallon',
        component: ViewSallonComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
