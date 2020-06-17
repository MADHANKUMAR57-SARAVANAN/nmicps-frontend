import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RLSCommissionedRoutingModule } from './rls-voice-interaction-routing.module';

import { RLSAnsweredQueriesComponent } from './rls-answered-queries/rls-answered-queries.component';
import { RLSAudioEventComponent } from './rls-audio-event/rls-audio-event.component';
import { RLSUnansweredQueriesComponent } from './rls-unanswered-queries/rls-unanswered-queries.component';

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
  declarations: [RLSAnsweredQueriesComponent,RLSAudioEventComponent,RLSUnansweredQueriesComponent,],
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
export class RLSVoiceInteractionModule { }
