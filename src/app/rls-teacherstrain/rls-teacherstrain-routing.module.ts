import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RLSteacherstrainManagerComponent } from './rls-teacherstrain/rls-teacherstrain-manager.component';
import { RLSteacherstrainCreationComponent } from './rls-teacherstrain-creation/rls-teacherstrain-creation.component';
 

import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rls-teacherstrain-manger',
    pathMatch: 'full'
  },
 
  {
    path: 'rls-teacherstrain-manger',
    component: RLSteacherstrainManagerComponent
  },

  {
    path: 'rls-teacherstrain-creation',
    component: RLSteacherstrainCreationComponent
  },
 

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RLSteacherstrainRoutingModule { }
