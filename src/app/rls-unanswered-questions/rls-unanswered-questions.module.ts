import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RLSUnansweredquestionRoutingModule } from './rls-unanswered-questions-routing.module';
import { RLSUnansweredquestionManagerComponent } from './rls-unanswered-questions-manager/rls-unanswered-questions-manager.component';
import { RLSUnansweredquestionCreationComponent } from './rls-unanswered-questions-creation/rls-unanswered-questions-creation.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RLSUnansweredquestionEditComponent } from './rls-unanswered-questions-edit/rls-unanswered-questions-edit.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatGridListModule
} from '@angular/material';
@NgModule({
  declarations: [RLSUnansweredquestionManagerComponent, RLSUnansweredquestionCreationComponent, RLSUnansweredquestionEditComponent],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatGridListModule,
    FormsModule,  
    CommonModule,
    RLSUnansweredquestionRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class RLSUnansweredquestionModule { }
