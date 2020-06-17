import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader-service.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
declare const $: any;
declare const Dropzone: any;
@Component({
  selector: 'app-profile',
  templateUrl: './rls-robotics-chart.component.html',
  styleUrls: ['./rls-robotics-chart.component.scss']
})
export class RLSRoboticsChartComponent implements OnInit {
changePassword: FormGroup;

public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartLabels1: Label[] = [];
  public barChartLabels2: Label[] = [];

  public vidbarChartLabels: Label[] = [];
  public vidbarChartLabels1: Label[] = [];
  public vidbarChartLabels2: Label[] = [];

  public audbarChartLabels: Label[] = [];
  public audbarChartLabels1: Label[] = [];
  public audbarChartLabels2: Label[] = [];


  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Number of schools' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public barChartData1: ChartDataSets[] = [
    { data: [], label: 'Number of schools' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public barChartData2: ChartDataSets[] = [
    { data: [], label: 'Number of schools' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public vidbarChartData: ChartDataSets[] = [
    { data: [], label: 'Number of videos watched' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public vidbarChartData1: ChartDataSets[] = [
    { data: [], label: 'Number of videos watched' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public vidbarChartData2: ChartDataSets[] = [
    { data: [], label: 'Number of videos watched' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public audbarChartData: ChartDataSets[] = [
    { data: [], label: 'Number of Quries' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public audbarChartData1: ChartDataSets[] = [
    { data: [], label: 'Number of Quries' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public audbarChartData2: ChartDataSets[] = [
    { data: [], label: 'Number of Quries' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public colors = [
  {
    backgroundColor:
    '#4F81BC',
  }]


  constructor(public toastr: ToastrManager,private rest: DynamicScriptLoaderService,private fb: FormBuilder,) { }

  ngOnInit() {
    this.getschoolschart();
    this.getvideoschart();
    this.getaudioschart();
  }
  userdetails : [];
  userId = localStorage.getItem('userId');

  getschoolschart(){
      this.rest.get('school/getschoolschart').subscribe((result) => {
      if(result.status)
      {
        var schooldetails = result.result;
        if(schooldetails.length>0)
        {
          var labels = [];
          var datas = [];

          var labels1 = [];
          var datas1 = [];

          var labels2 = [];
          var datas2 = [];
          for(var i=0;i<schooldetails.length;i++)
          {
            if(schooldetails[i].stateName == 'Assam')
            {
              labels.push(schooldetails[i]._id);
              datas.push(schooldetails[i].count);
            }
            if(schooldetails[i].stateName == 'Madhya Pradesh')
            {
              labels1.push(schooldetails[i]._id);
              datas1.push(schooldetails[i].count);
            }

            if(schooldetails[i].stateName == 'Jharkhand')
            {
              labels2.push(schooldetails[i]._id);
              datas2.push(schooldetails[i].count);
            }
          }
          this.barChartLabels = labels;
          this.barChartData[0].data = datas;

          this.barChartLabels1 = labels1;
          this.barChartData1[0].data = datas1;

          this.barChartLabels2 = labels2;
          this.barChartData2[0].data = datas2;
        }
      }
      else
      {
        this.userdetails = [];
      }
      });
  }
   getvideoschart(){
      this.rest.get('school/getvideoschart').subscribe((result) => {
       if(result.status)
      {
        var schooldetails = result.result;
        if(schooldetails.length>0)
        {
          var labels = [];
          var datas = [];

          var labels1 = [];
          var datas1 = [];

          var labels2 = [];
          var datas2 = [];
          for(var i=0;i<schooldetails.length;i++)
          {
            if(schooldetails[i].stateName == 'Assam')
            {
              labels.push(schooldetails[i]._id);
              datas.push(schooldetails[i].videocount);
            }
            if(schooldetails[i].stateName == 'Madhya Pradesh')
            {
              labels1.push(schooldetails[i]._id);
              datas1.push(schooldetails[i].videocount);
            }

            if(schooldetails[i].stateName == 'Jharkhand')
            {
              labels2.push(schooldetails[i]._id);
              datas2.push(schooldetails[i].videocount);
            }
          }
          this.vidbarChartLabels = labels;
          this.vidbarChartData[0].data = datas;

          this.vidbarChartLabels1 = labels1;
          this.vidbarChartData1[0].data = datas1;

          this.vidbarChartLabels2 = labels2;
          this.vidbarChartData2[0].data = datas2;
        }
      }
      else
      {
        this.userdetails = [];
      }
      });
  }
  getaudioschart(){
      this.rest.get('school/getaudioschart').subscribe((result) => {
       if(result.status)
      {
        var schooldetails = result.result;
        if(schooldetails.length>0)
        {
          var labels = [];
          var datas = [];

          var labels1 = [];
          var datas1 = [];

          var labels2 = [];
          var datas2 = [];
          for(var i=0;i<schooldetails.length;i++)
          {
            if(schooldetails[i].stateName == 'Assam')
            {
              labels.push(schooldetails[i]._id);
              datas.push(schooldetails[i].audiocount);
            }
            if(schooldetails[i].stateName == 'Madhya Pradesh')
            {
              labels1.push(schooldetails[i]._id);
              datas1.push(schooldetails[i].audiocount);
            }

            if(schooldetails[i].stateName == 'Jharkhand')
            {
              labels2.push(schooldetails[i]._id);
              datas2.push(schooldetails[i].audiocount);
            }
          }
          this.audbarChartLabels = labels;
          this.audbarChartData[0].data = datas;

          this.audbarChartLabels1 = labels1;
          this.audbarChartData1[0].data = datas1;

          this.audbarChartLabels2 = labels2;
          this.audbarChartData2[0].data = datas2;
        }
      }
      else
      {
        this.userdetails = [];
      }
      });
  }


}
