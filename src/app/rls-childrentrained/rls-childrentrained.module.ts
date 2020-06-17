import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RLSchildrentrainedRoutingModule } from './rls-childrentrained-routing.module';
import { RLSchildrentrainedManagerComponent } from './rls-childrentrained/rls-childrentrained-manager.component';
import { RLSchildrentrainedCreationComponent } from './rls-childrentrained-creation/rls-childrentrained-creation.component';
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
  declarations: [ RLSchildrentrainedCreationComponent,RLSchildrentrainedManagerComponent],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatGridListModule,
    FormsModule,
    CommonModule,
    RLSchildrentrainedRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class RLSchildrentrainedModule { }
