import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RLSkithandlerRoutingModule } from './rls-kithandler-routing.module';
import { RLSkithandlerManagerComponent } from './rls-kithandler/rls-kithandler-manager.component';
import { RLSkithandlerCreationComponent } from './rls-kithandler-creation/rls-kithandler-creation.component';
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
  declarations: [ RLSkithandlerCreationComponent,RLSkithandlerManagerComponent],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatGridListModule,
    FormsModule,
    CommonModule,
    RLSkithandlerRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class RLSkithandlerModule { }
