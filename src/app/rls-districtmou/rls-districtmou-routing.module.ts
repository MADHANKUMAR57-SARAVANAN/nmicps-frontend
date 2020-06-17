import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RLSdistrictmouManagerComponent } from './rls-districtmou-manager/rls-districtmou-manager.component';

import { RLSdistrictmouCreationComponent } from './rls-districtmou-creation/rls-districtmou-creation.component';
import { RLSdistrictmouEditComponent } from './rls-districtmou-edit/rls-districtmou-edit.component';

import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rls-districtmou-manager',
    pathMatch: 'full'
  },
  {
    path: 'rls-districtmou-edit/:id',
    component: RLSdistrictmouEditComponent
  },
 
  {
    path: 'rls-districtmou-manager',
    component: RLSdistrictmouManagerComponent
  },

  {
    path: 'rls-districtmou-creation',
    component: RLSdistrictmouCreationComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RLSdistrictmouRoutingModule { }
