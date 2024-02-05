import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalonRegistartionComponent } from './salon-registartion/salon-registartion.component';

const routes: Routes = [
    {
        path: 'service-app-salon-registartion',
        component: SalonRegistartionComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
