import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { DashComponent } from './dash/dash.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
//import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [MainComponent, Dashboard2Component, Dashboard3Component,DashComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    //NgImageSliderModule
  ]
})
export class DashboardModule { }
