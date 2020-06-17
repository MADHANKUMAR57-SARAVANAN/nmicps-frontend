import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { RLSUserCreationComponent } from './rls-user-creation/rls-user-creation.component';
import { RLSUserEditComponent } from './rls-user-edit/rls-user-edit.component';
import { RLSDeviceManagerComponent } from './rls-device-manager/rls-device-manager.component';
import { RLSDeviceCreationComponent } from './rls-device-creation/rls-device-creation.component';
import { RLSDeviceEditComponent } from './rls-device-edit/rls-device-edit.component';
import { RLSDeviceAssignComponent } from './rls-device-assign/rls-device-assign.component';
import { RLSUserCreationTableComponent } from './rls-user-creation-table/rls-user-creation-table.component';
import { RLSAccessDataComponent } from './rls-access-data/rls-access-data.component';
import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rls-user-creation',
    pathMatch: 'full'
  },
  {
    path: 'rls-user-creation-table',
    component: RLSUserCreationTableComponent
  },



  {
    path: 'rls-user-creation',
    component: RLSUserCreationComponent
  },
  {
    path: 'rls-user-edit/:id',
    component: RLSUserEditComponent
  },
  {
    path: 'rls-device-edit/:id',
    component: RLSDeviceEditComponent
  },
  {
    path: 'rls-device-manager',
    component: RLSDeviceManagerComponent
  },

  {
    path: 'rls-device-creation',
    component: RLSDeviceCreationComponent
  },

  {
    path: 'rls-device-assign',
    component: RLSDeviceAssignComponent
  },
  {
    path: 'rls-access-data',
    component: RLSAccessDataComponent,
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RLSsettingRoutingModule { }
