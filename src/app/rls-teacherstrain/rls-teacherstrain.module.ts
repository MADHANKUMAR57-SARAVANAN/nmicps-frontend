import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RLSteacherstrainRoutingModule } from './rls-teacherstrain-routing.module';
import { RLSteacherstrainManagerComponent } from './rls-teacherstrain/rls-teacherstrain-manager.component';
import { RLSteacherstrainCreationComponent } from './rls-teacherstrain-creation/rls-teacherstrain-creation.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
 
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatGridListModule
} from '@angular/material';
@NgModule({
  declarations: [ RLSteacherstrainCreationComponent,RLSteacherstrainManagerComponent],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatGridListModule,
    FormsModule,
    CommonModule,
    RLSteacherstrainRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class RLSteacherstrainModule { }
