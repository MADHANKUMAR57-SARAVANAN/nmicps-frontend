import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RLSCommissionedRoutingModule } from './rls-commissioned-report-routing.module';

import { RLSShippedTableComponent } from './rls-shipped/rls-shipped-table.component';
import { RLSTrainingDateTableComponent } from './rls-training-date/rls-training-date-table.component';
import { RLSIssuedTableComponent } from './rls-issued/rls-issued-table.component';
import { RLSCommissionedTableComponent } from './rls-commissioned/rls-commissioned-table.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import{ jqxDataTableComponent } from 'jqwidgets-ng/jqxdatatable';  
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatGridListModule
} from '@angular/material';
import { from } from 'rxjs';
@NgModule({
  declarations: [RLSShippedTableComponent, RLSTrainingDateTableComponent, RLSIssuedTableComponent, RLSCommissionedTableComponent],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatGridListModule,
    FormsModule,
    CommonModule,
    RLSCommissionedRoutingModule,

    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class RLSCommissionedModule { }
