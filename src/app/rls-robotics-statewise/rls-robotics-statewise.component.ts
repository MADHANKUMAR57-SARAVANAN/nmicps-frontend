import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader-service.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { state } from '@angular/animations';
declare const $: any;
declare const Dropzone: any;
@Component({
  selector: 'app-profile',
  templateUrl: './rls-robotics-statewise.component.html',
  styleUrls: ['./rls-robotics-statewise.component.scss']
})
export class RLSRoboticsStatewiseComponent implements OnInit {
changePassword: FormGroup;
userstateName = localStorage.getItem('stateName');
userTypeId = localStorage.getItem('userTypeId');

public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];

  public vidbarChartLabels: Label[] = [];

  public audbarChartLabels: Label[] = [];

  public barChartType: ChartType = 'pie';
  public barChartLegend = true;
  public barChartPlugins = [];
  passdata: any[];
  statetitle= 'Assam';
  title: any;
  titlevalue: any;
  notinlist = ['Andhra Pradesh','Arunachal Pradesh','Chandigarh (UT)','Dadra and Nagar Haveli (UT)','Daman and Diu (UT)','Delhi (NCT)','Goa','Haryana','Lakshadweep (UT)','Manipur','Meghalaya','Nagaland','Odisha','Puducherry (UT)','Telangana','West Bengal'];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Number of schools' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public vidbarChartData: ChartDataSets[] = [
    { data: [], label: 'Number of videos watched' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public audbarChartData: ChartDataSets[] = [
    { data: [], label: 'Number of Quries' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public colors = [
  {
    backgroundColor:
    ['#4285F4',
      '#DB4437',
      '#F4B443',
      '#469D59',
      '#EF6C37',
      '#50BDC6',
      '#AC42C5',
      '#F9CB47',
      '#DFC3BF',
      '#A22320',
      '#70ED3E',
      '#B0C58E',
      '#64E2CF',
      '#A54444',
      '#7190BF',
      '#6238C1',
      '#BD8D32',
      '#D9CFF5',
      '#A67BB2',
    ],
  }]


  constructor(public toastr: ToastrManager,private rest: DynamicScriptLoaderService,private fb: FormBuilder,) { }

  ngOnInit() {
    //const stateName = localStorage.getItem('stateName');
    this.changePassword = this.fb.group({
      stateName: ['', [Validators.required]],
    })
   
    if(this.userTypeId=='6'){
//    this.passdata = [{'stateName':stateName}];
    this.statetitle = localStorage.getItem('stateName');
    }  
    else{
      this.statetitle = 'Assam';
    }
    
    this.title = 'Videos watched';
    this.titlevalue = 'Videowatched';
    this.getschoolschart();
    this.getvideoschart();
    this.getaudioschart(this.statetitle,'Videowatched');
    this.GetStates(state);


    
  }

   get stateName() {
    return this.changePassword.get('stateName')
  }


  userdetails : [];
  userId = localStorage.getItem('userId');
  // stateName = localStorage.getItem('stateName');
   GetStates(state) {
    //  console.log('state',this.userstateName)
    // if(this.userTypeId=='6')
		// {
		// 	if(this.userstateName!=state)
		// 	{
		// 		return false;
		// 	}
    // }
    
    //End
    const webToken = localStorage.getItem('webtoken');
    const stateName = localStorage.getItem('stateName');
   
if(this.userTypeId=='6'){
this.passdata = [{'stateName':stateName}];
console.log('stateName',stateName);
this.changePassword.get('stateName').setValue(stateName);
}    
else{

    this.rest.GetStates(webToken).subscribe(data => {
      console.log('state1')
      var newdata = [];
     
      for(var i=0;i<data['data'].length;i++)
      {

        
        if(this.notinlist.indexOf(data['data'][i].stateName)==-1)
        {
            newdata.push({stateName:data['data'][i].stateName})
        }
      }
      this.passdata = newdata;
      this.changePassword.get('stateName').setValue(this.statetitle);
      setTimeout(function () {
        $('.selectpicker1').selectpicker('refresh');
      }, 2000);
    });
  }
  };
  getschoolschart(){
      this.rest.get('school/getschoolschartByMonth').subscribe((result) => {
      if(result.status)
      {
        var schooldetails = result.result;
        if(schooldetails.length>0)
        {
          var labels = [];
          var datas = [];
          for(var i=0;i<schooldetails.length;i++)
          {
            if(schooldetails[i].stateName == 'Assam')
            {
              labels.push(schooldetails[i]._id);
              datas.push(schooldetails[i].count);
            }
          }
          this.barChartLabels = labels;
          this.barChartData[0].data = datas;
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
          for(var i=0;i<schooldetails.length;i++)
          {
            if(schooldetails[i].stateName == 'Assam')
            {
              labels.push(schooldetails[i]._id);
              datas.push(schooldetails[i].videocount);
            }
          }
          this.vidbarChartLabels = labels;
          this.vidbarChartData[0].data = datas;

        }
      }
      else
      {
        this.userdetails = [];
      }
      });
  }
   stateChange(event: any) {
    if(this.userTypeId=='6'){
      document.getElementById("statename").style.display='none';
     
    }
   
    if (event.target.value != '') {
     
      this.userstateName = event.target.value;
      this.getaudioschart(event.target.value,this.titlevalue);
    }
  }

  typeChange(event: any) {
    if (event.target.value != '') {
      this.titlevalue = event.target.value;
      this.title = (event.target.value=='Videowatched')?'Vidoes watched':(event.target.value=='Queryasked')?'Queries asked':(event.target.value=='UnansweredQueries')?'Unanswered queries':(event.target.value=='TimesPoweredOn')?'Times powered on':'';
      this.getaudioschart(this.userstateName,event.target.value);
     
    }
  }
  getaudioschart(state,title){
      this.rest.get('school/getaudioschartByMonth?state='+state+'&title='+title).subscribe((result) => {
       if(result.status)
      {
          var labels = [];
          var datas = [];
          var countData = [];
        var schooldetails = result.result;
        if(schooldetails.length>0)
        {
          for(var i=0;i<schooldetails.length;i++)
          {
             var videocount =schooldetails[i].Videowatched;
             var district = schooldetails[i]._id;
             labels.push(district);
             countData.push(videocount.toString());
             
          }
          
            this.audbarChartLabels = labels;
          // this.audbarChartData[0].data = [countData];
          // console.log(this.audbarChartData,'countdata');
        }
        else
        {
          this.audbarChartLabels = labels;
          // this.audbarChartData[0].data = [countData];

        }
        this.audbarChartData[0].data = [countData[0],countData[1],countData[2],countData[3],countData[4],countData[5],countData[6],countData[7],countData[8],countData[9],countData[10],countData[11],countData[12],countData[13],countData[14],countData[15],countData[16],countData[17],countData[18],countData[19]];
      }
      else
      {
        this.userdetails = [];

      }
      });
  }
 

}
