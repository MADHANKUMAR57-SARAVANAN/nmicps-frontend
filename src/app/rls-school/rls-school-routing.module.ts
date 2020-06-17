import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RLSSchoolManagerComponent } from './rls-manager/rls-school-manager.component';
import { RLSSchoolCreationComponent } from './rls-school-creation/rls-school-creation.component';
import { RLSSchoolEditComponent } from './rls-school-edit/rls-school-edit.component';

import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rls-school-manger',
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
  {
    path: 'rls-school-edit/:id',
    component: RLSSchoolEditComponent
  },
  {
    path: 'rls-school-manger',
    component: RLSSchoolManagerComponent
  },
  {
    path: 'rls-school-manger/:id',
    component: RLSSchoolManagerComponent
  },

  {
    path: 'rls-school-creation',
    component: RLSSchoolCreationComponent
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
export class RLSschoolRoutingModule { }
