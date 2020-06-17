import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RLSkitshippedRoutingModule } from './rls-kitshipped-routing.module';
import { RLSkitshippedManagerComponent } from './rls-kitshipped/rls-kitshipped-manager.component';
import { RLSkitshippedCreationComponent } from './rls-kitshipped-creation/rls-kitshipped-creation.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { RLSSchoolEditComponent } from './rls-school-edit/rls-school-edit.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatGridListModule
} from '@angular/material';
@NgModule({
  declarations: [ RLSkitshippedCreationComponent,RLSkitshippedManagerComponent],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatGridListModule,
    FormsModule,
    CommonModule,
    RLSkitshippedRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class RLSkitshippedModule { }
