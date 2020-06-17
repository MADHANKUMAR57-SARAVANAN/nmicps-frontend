import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RLSShippedTableComponent } from './rls-shipped/rls-shipped-table.component';
import { RLSTrainingDateTableComponent } from './rls-training-date/rls-training-date-table.component';
import { RLSIssuedTableComponent } from './rls-issued/rls-issued-table.component';
import { RLSCommissionedTableComponent } from './rls-commissioned/rls-commissioned-table.component';


import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rls-shipment',
    pathMatch: 'full'
  },
  {
    path: 'rls-shipment',
    component: RLSShippedTableComponent
  },

  {
    path: 'rls-training-date',
    component: RLSTrainingDateTableComponent
  },
  {
    path: 'rls-issued',
    component: RLSIssuedTableComponent
  },
  {
    path: 'rls-commissioned',
    component: RLSCommissionedTableComponent
  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RLSCommissionedRoutingModule { }
