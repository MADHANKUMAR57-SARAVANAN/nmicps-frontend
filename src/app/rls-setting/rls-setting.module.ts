import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RLSsettingRoutingModule } from './rls-setting-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { RLSUserCreationComponent } from './rls-user-creation/rls-user-creation.component';
import { RLSUserEditComponent } from './rls-user-edit/rls-user-edit.component';
import { RLSDeviceManagerComponent } from './rls-device-manager/rls-device-manager.component';
import { RLSDeviceCreationComponent } from './rls-device-creation/rls-device-creation.component';
import { RLSDeviceEditComponent } from './rls-device-edit/rls-device-edit.component';
import { RLSDeviceAssignComponent } from './rls-device-assign/rls-device-assign.component';
import { RLSUserCreationTableComponent } from './rls-user-creation-table/rls-user-creation-table.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { RLSAccessDataComponent } from './rls-access-data/rls-access-data.component';

// import{ jqxDataTableComponent } from 'jqwidgets-ng/jqxdatatable';  
import { Component } from '@angular/core';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatGridListModule
} from '@angular/material';

import { from } from 'rxjs';
@NgModule({

  declarations: [RLSDeviceAssignComponent, RLSUserCreationComponent, RLSUserCreationTableComponent, RLSDeviceEditComponent, RLSDeviceManagerComponent, RLSDeviceCreationComponent, RLSUserEditComponent, RLSAccessDataComponent],

  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatRippleModule,
    MatGridListModule,
    FormsModule,
    CommonModule,
    RLSsettingRoutingModule,



    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class RLSsettingModule { }
