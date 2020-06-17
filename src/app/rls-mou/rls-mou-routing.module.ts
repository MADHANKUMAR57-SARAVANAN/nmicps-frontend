import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RLSmouManagerComponent } from './rls-mou-manager/rls-mou-manager.component';

import { RLSmouCreationComponent } from './rls-mou-creation/rls-mou-creation.component';
import { RLSmouEditComponent } from './rls-mou-edit/rls-mou-edit.component';

import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rls-mou-manager',
    pathMatch: 'full'
  },
  {
    path: 'rls-mou-edit/:id',
    component: RLSmouEditComponent
  },
 
  {
    path: 'rls-mou-manager',
    component: RLSmouManagerComponent
  },

  {
    path: 'rls-mou-creation',
    component: RLSmouCreationComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RLSmouRoutingModule { }
