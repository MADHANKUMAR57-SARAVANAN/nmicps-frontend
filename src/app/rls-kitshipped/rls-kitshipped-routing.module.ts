import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RLSkitshippedManagerComponent } from './rls-kitshipped/rls-kitshipped-manager.component';
import { RLSkitshippedCreationComponent } from './rls-kitshipped-creation/rls-kitshipped-creation.component';
 

import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rls-kitshipped-manger',
    pathMatch: 'full'
  },
 
  {
    path: 'rls-kitshipped-manger',
    component: RLSkitshippedManagerComponent
  },
  {
    path: 'rls-kitshipped-creation',
    component: RLSkitshippedCreationComponent
  },
 

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RLSkitshippedRoutingModule { }
