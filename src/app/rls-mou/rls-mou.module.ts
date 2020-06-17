import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RLSmouRoutingModule } from './rls-mou-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { RLSmouManagerComponent } from './rls-mou-manager/rls-mou-manager.component';

import { RLSmouCreationComponent } from './rls-mou-creation/rls-mou-creation.component';
import { RLSmouEditComponent } from './rls-mou-edit/rls-mou-edit.component';
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

  declarations: [RLSmouManagerComponent,RLSmouCreationComponent,RLSmouEditComponent],

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
    RLSmouRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class RLSmouModule { }
