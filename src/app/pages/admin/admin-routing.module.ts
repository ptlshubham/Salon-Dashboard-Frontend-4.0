import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    //  {
    //       path: 'service-list',
    //       component: ServicesComponent
    //  }, 
          
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})

export class AdminRoutingModule { }
