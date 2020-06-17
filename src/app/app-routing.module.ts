import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetComponent } from './widget/widget.component';
import {SigninComponent} from './signin/signin.component';
import {RLSTeamCoordinators} from './rls-team-coordinators/rls-team-coordinators.component';
import {TrainingStatusComponent} from './rls-training-status/rls-training-status.component';
import {RLSFeedbackComponent} from './rls-feedback/rls-feedback.component';
import {RLSHelpComponent} from './rls-help/rls-help.component';
import {RLSMapviewComponent} from './rls-mapview/rls-mapview.component';
import {RLSParticipationMetrixComponent} from './rls-participation-metrix/rls-participation-metrix.component';
import {RLSpoweronmetricsComponent} from './rls-poweron-metrics/rls-poweron-metrics.component';
import {RLSprogramdetailsComponent} from './rls-program-details/rls-program-details.component';
import {RLSprogramhindidetailsComponent} from './rls-program-hindi-details/rls-program-hindi-details.component';
import {RLSroboticdetailsComponent} from './rls-robotic-details/rls-robotic-details.component';
import {RLSmediacoverageComponent} from './rls-media-coverage/rls-media-coverage.component';
import {RLSmediakitComponent} from './rls-media-kit/rls-media-kit.component';
import {RLSUsageReportComponent} from './rls-usage-report/rls-usage-report.component';
import {RLSMobilesnapshotDetailsComponent} from './rls-mobilesnapshot-details/rls-mobilesnapshot-details.component';
import {ProfileComponent} from './rls-profile/rls-profile.component';
import {RLSRoboticsChartComponent} from './rls-robotics-chart/rls-robotics-chart.component'
import {RLSRoboticsStatewiseComponent} from './rls-robotics-statewise/rls-robotics-statewise.component'
import { from } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { CheckGuard } from './guards/check.guard';
import { formatNumber } from '@angular/common';

const routes: Routes = [
    {
        path: 'dashboard',
        canActivate:[AuthGuard],
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'authentication',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
    },
    {
        path: 'email',
        loadChildren: './email/email.module#EmailModule'
    },
    {
        path: 'apps',
        loadChildren: './apps/apps.module#AppsModule'
    },
    {
        path: 'widget',
        component: WidgetComponent
    },
    {

        path: 'rls-feedback',
        component: RLSFeedbackComponent
    },
    {

        path: 'rls-profile',
        component: ProfileComponent
    },
    {

        path: 'rls-robotics-chart',
        component: RLSRoboticsChartComponent
    },
    {

        path: 'rls-robotics-statewise',
        component: RLSRoboticsStatewiseComponent
    },
    {
        path: 'rls-help',
        component: RLSHelpComponent
    },
    {
        path: 'rls-mobilesnapshot-details',
        component: RLSMobilesnapshotDetailsComponent
    },
    {
        path: 'rls-participation-metrix',
        component: RLSParticipationMetrixComponent
    },
    {
        path: 'rls-mapview',
        component: RLSMapviewComponent
    },
    {
        path: 'rls-usage-report',
        component: RLSUsageReportComponent
    },

    {
        path: 'signin',
        canActivate:[CheckGuard],
        component: SigninComponent,
        pathMatch: 'full'
    },
    {
        path: 'rls-team-coordinators',
        
        component: RLSTeamCoordinators,
        
    },
    {
        path: 'rls-training-status',
        canActivate:[CheckGuard],
        component: TrainingStatusComponent,

    },
    {
        path: 'ui',
        loadChildren: './ui/ui.module#UiModule'
    },
    {
        path: 'forms',
        loadChildren: './forms/forms.module#FormModule'
    },

    {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
    },
    {
        path: 'media',
        loadChildren: './media/media.module#MediaModule'
    },
    {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule'
    },
    {
        path: 'timeline',
        loadChildren: './timeline/timeline.module#TimelineModule'
    },
    {
        path: 'rls-setting',
        canActivate:[AuthGuard],
        loadChildren: './rls-setting/rls-setting.module#RLSsettingModule'
    },
    {
        path: 'rls-mou',
        canActivate:[AuthGuard],
        loadChildren: './rls-mou/rls-mou.module#RLSmouModule'
    },
    {
        path: 'rls-districtmou',
        canActivate:[AuthGuard],
        loadChildren: './rls-districtmou/rls-districtmou.module#RLSdistrictmouModule'
    },
    {
        path: 'rls-voice-interaction',
        canActivate:[AuthGuard],
        loadChildren: './rls-voice-interaction/rls-voice-interaction.module#RLSVoiceInteractionModule'
    },
    {

        path: 'rls-commissioned-report',
        canActivate:[AuthGuard],
        loadChildren: './rls-commissioned-report/rls-commissioned-report.module#RLSCommissionedModule'
    },
    {

        path: 'rls-school',
        canActivate:[AuthGuard],
        loadChildren: './rls-school/rls-school.module#RLSschoolModule'
    },
     {

        path: 'rls-unanswered-questions',
        canActivate:[AuthGuard],
        loadChildren: './rls-unanswered-questions/rls-unanswered-questions.module#RLSUnansweredquestionModule'
    },
    {

        path: 'rls-poweron',
        canActivate:[AuthGuard],
        component: RLSpoweronmetricsComponent
    },
    {

        path: 'rls-program-details',
        canActivate:[AuthGuard],
        component: RLSprogramdetailsComponent
    },

     {

        path: 'rls-program-hindi-details',
        canActivate:[AuthGuard],
        component: RLSprogramhindidetailsComponent
    },
    {

        path: 'rls-media-coverage',
        canActivate:[AuthGuard],
        component: RLSmediacoverageComponent
    },
    {

        path: 'rls-media-kit',
        canActivate:[AuthGuard],
        component: RLSmediakitComponent
    },
    {

        path: 'rls-robotic-details',
        canActivate:[AuthGuard],
        component: RLSroboticdetailsComponent
    },
    {

        path: 'rls-kitshipped',
        canActivate:[AuthGuard],
        loadChildren: './rls-kitshipped/rls-kitshipped.module#RLSkitshippedModule'
    },
    {

        path: 'rls-kithandler',
        canActivate:[AuthGuard],
        loadChildren: './rls-kithandler/rls-kithandler.module#RLSkithandlerModule'
    },
     {

        path: 'rls-childrentrained',
        canActivate:[AuthGuard],
        loadChildren: './rls-childrentrained/rls-childrentrained.module#RLSchildrentrainedModule'
    },
    {

        path: 'rls-teacherstrain',
        canActivate:[AuthGuard],
        loadChildren: './rls-teacherstrain/rls-teacherstrain.module#RLSteacherstrainModule'
    },
    {
        path: 'tables',
        canActivate:[AuthGuard],
        loadChildren: './tables/tables.module#TablesModule'
    },
    {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule'
    },
    {
        path: 'authentication',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
    },
    {
        path: 'extra-pages',
        loadChildren: './extra-pages/extra-pages.module#ExtraPagesModule'
    },
    {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule'
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
