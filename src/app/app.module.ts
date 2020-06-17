import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetComponent } from './widget/widget.component';
import { RLSFeedbackComponent } from './rls-feedback/rls-feedback.component';
import { ProfileComponent } from './rls-profile/rls-profile.component';
import {RLSRoboticsChartComponent} from './rls-robotics-chart/rls-robotics-chart.component';
import {RLSRoboticsStatewiseComponent} from './rls-robotics-statewise/rls-robotics-statewise.component';
import { RLSParticipationMetrixComponent } from './rls-participation-metrix/rls-participation-metrix.component';
import { RLSUsageReportComponent } from './rls-usage-report/rls-usage-report.component';
import { SigninComponent } from './signin/signin.component';
import { RLSTeamCoordinators } from './rls-team-coordinators/rls-team-coordinators.component';
import {TrainingStatusComponent} from './rls-training-status/rls-training-status.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DynamicScriptLoaderService } from './dynamic-script-loader-service.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { CheckGuard } from './guards/check.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RLSHelpComponent } from './rls-help/rls-help.component';
import {RLSpoweronmetricsComponent} from './rls-poweron-metrics/rls-poweron-metrics.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { RLSMobilesnapshotDetailsComponent } from './rls-mobilesnapshot-details/rls-mobilesnapshot-details.component';
import { LightboxModule } from 'ngx-lightbox';
import {RLSprogramdetailsComponent} from './rls-program-details/rls-program-details.component';
import {RLSroboticdetailsComponent} from './rls-robotic-details/rls-robotic-details.component';
import {RLSmediacoverageComponent} from './rls-media-coverage/rls-media-coverage.component';
import {RLSmediakitComponent} from './rls-media-kit/rls-media-kit.component';
import {RLSprogramhindidetailsComponent} from './rls-program-hindi-details/rls-program-hindi-details.component';
import {RLSMapviewComponent} from './rls-mapview/rls-mapview.component';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { NgImageSliderModule } from 'ng-image-slider';



import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
    RLSFeedbackComponent,
    RLSHelpComponent,
    RLSMobilesnapshotDetailsComponent,
    ProfileComponent,

    
    RLSRoboticsChartComponent,
    RLSRoboticsStatewiseComponent,
    RLSParticipationMetrixComponent,
    RLSUsageReportComponent,
    RLSHelpComponent,
    SigninComponent,
    RLSTeamCoordinators,
    TrainingStatusComponent,
    RLSpoweronmetricsComponent,
    RLSprogramdetailsComponent,
    RLSroboticdetailsComponent,
    RLSmediacoverageComponent,
    RLSprogramhindidetailsComponent,
    RLSmediakitComponent,
    RLSMapviewComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    SelectDropDownModule,
    LightboxModule,
    ChartsModule,
     NgImageSliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDevDlcD-iiGG4qOs1OE8ZKsi11HTODjtA'
    })

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, DynamicScriptLoaderService, AuthGuard, CheckGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
