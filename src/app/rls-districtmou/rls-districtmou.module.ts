import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RLSdistrictmouRoutingModule } from './rls-districtmou-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { RLSdistrictmouManagerComponent } from './rls-districtmou-manager/rls-districtmou-manager.component';

import { RLSdistrictmouCreationComponent } from './rls-districtmou-creation/rls-districtmou-creation.component';
import { RLSdistrictmouEditComponent } from './rls-districtmou-edit/rls-districtmou-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



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

  declarations: [RLSdistrictmouManagerComponent,RLSdistrictmouCreationComponent,RLSdistrictmouEditComponent],

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
    RLSdistrictmouRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class RLSdistrictmouModule { }
