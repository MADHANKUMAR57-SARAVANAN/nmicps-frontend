import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RLSUnansweredquestionManagerComponent } from './rls-unanswered-questions-manager/rls-unanswered-questions-manager.component';
import { RLSUnansweredquestionCreationComponent } from './rls-unanswered-questions-creation/rls-unanswered-questions-creation.component';
import { RLSUnansweredquestionEditComponent } from './rls-unanswered-questions-edit/rls-unanswered-questions-edit.component';

import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'rls-unanswered-questions-manger',
    pathMatch: 'full'
  },
  {
    path: 'rls-unanswered-questions-edit/:id',
    component: RLSUnansweredquestionEditComponent
  },
  {
    path: 'rls-unanswered-questions-manger',
    component: RLSUnansweredquestionManagerComponent
  },
  {
    path: 'rls-unanswered-questions-manger/:id',
    component: RLSUnansweredquestionManagerComponent
  },

  {
    path: 'rls-unanswered-questions-creation',
    component: RLSUnansweredquestionCreationComponent
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RLSUnansweredquestionRoutingModule { }
