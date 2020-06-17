import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RLSkithandlerManagerComponent } from './rls-kithandler/rls-kithandler-manager.component';
import { RLSkithandlerCreationComponent } from './rls-kithandler-creation/rls-kithandler-creation.component';
// import { RLSSchoolEditComponent } from './rls-school-edit/rls-school-edit.component';

import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rls-kithandler-manger',
    pathMatch: 'full'
  },
  // {
  //   path: 'rls-user-creation-table',
  //   component: RLSUserCreationTableComponent
  // },
  // {
  //   path: 'rls-user-creation',
  //   component: RLSUserCreationComponent
  // },
  // {
  //   path: 'rls-user-edit/:id',
  //   component: RLSUserEditComponent
  // },
  // {
  //   path: 'rls-school-edit/:id',
  //   component: RLSSchoolEditComponent
  // },
  {
    path: 'rls-kithandler-manger',
    component: RLSkithandlerManagerComponent
  },
  {
    path: 'rls-kithandler-creation',
    component: RLSkithandlerCreationComponent
  },
  // {
  //   path: 'rls-device-assign',
  //   component: RLSDeviceAssignComponent
  // },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RLSkithandlerRoutingModule { }
