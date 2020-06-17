import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RLSchildrentrainedManagerComponent } from './rls-childrentrained/rls-childrentrained-manager.component';
import { RLSchildrentrainedCreationComponent } from './rls-childrentrained-creation/rls-childrentrained-creation.component';
// import { RLSSchoolEditComponent } from './rls-school-edit/rls-school-edit.component';

import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rls-childrentrained-manger',
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
    path: 'rls-childrentrained-manger',
    component: RLSchildrentrainedManagerComponent
  },
  {
    path: 'rls-childrentrained-creation',
    component: RLSchildrentrainedCreationComponent
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
export class RLSchildrentrainedRoutingModule { }
