import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RLSschoolRoutingModule } from './rls-school-routing.module';
import { RLSSchoolManagerComponent } from './rls-manager/rls-school-manager.component';
import { RLSSchoolCreationComponent } from './rls-school-creation/rls-school-creation.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RLSSchoolEditComponent } from './rls-school-edit/rls-school-edit.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatGridListModule
} from '@angular/material';
@NgModule({
  declarations: [RLSSchoolManagerComponent, RLSSchoolCreationComponent, RLSSchoolEditComponent],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatGridListModule,
    FormsModule,
    CommonModule,
    RLSschoolRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class RLSschoolModule { }
