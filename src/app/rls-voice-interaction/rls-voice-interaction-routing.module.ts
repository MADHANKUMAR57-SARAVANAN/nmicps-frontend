import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RLSAnsweredQueriesComponent } from './rls-answered-queries/rls-answered-queries.component';
import { RLSAudioEventComponent } from './rls-audio-event/rls-audio-event.component';
import { RLSUnansweredQueriesComponent } from './rls-unanswered-queries/rls-unanswered-queries.component';


import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rls-audio-event',
    pathMatch: 'full'
  },
  {
    path: 'rls-answered-queries',
    component: RLSAnsweredQueriesComponent
  },

  {
    path: 'rls-audio-event',
    component: RLSAudioEventComponent
  },
  {
    path: 'rls-unanswered-queries',
    component: RLSUnansweredQueriesComponent
  },



];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RLSCommissionedRoutingModule { }
