import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

declare const $: any;
@Component({
  selector: 'app-export-table',
  templateUrl: './rls-usage-report.component.html',
  styleUrls: ['./rls-usage-report.component.scss']
})
export class RLSUsageReportComponent implements OnInit {
public sys_datas: any[];
  public schooldata: any[];
  public table: any;
  public alerts: Array<any> = [];


  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  columns: any[];
  source: any;
  dataAdapter: any;


  statedata: any[];
  curstateval = '';
  curdistrictsval = '';

  constructor(private router: Router,private rest: DynamicScriptLoaderService, private fb: FormBuilder,public toastr: ToastrManager,) {}


  userTypeId = localStorage.getItem('userTypeId');
  deviceAssign: FormGroup;
  ngOnInit() {
    this.startScript();
    this.sys_data();
    this.GetStates();
    this.startScript();

     this.deviceAssign = this.fb.group({
      deviceId      : [''],
      state         : [''],
      stateName     : [''],
      districtId    : [''],
      startDate     : ['', [Validators.required]],
      endDate       : ['', [Validators.required]],
      schoolName    : ['']

    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: '_id',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

   get deviceId() {
    return this.deviceAssign.get('deviceId')
  }
  get startDate() {
    return this.deviceAssign.get('startDate')
  }
  get endDate() {
    return this.deviceAssign.get('endDate')
  }
  get schoolName() {
    return this.deviceAssign.get('schoolName')
  } 
  get stateName() {
    return this.deviceAssign.get('stateName')
  } 
  get state() {
    return this.deviceAssign.get('state')
  } 
  get districtId() {
    return this.deviceAssign.get('districtId')

  }


  async startScript() {
    await this.rest.load('dataTables.buttons','buttons.flash','jszip','pdfmake','vfs_fonts','pdfmake','buttons.html5','buttons.print').then( data => {
      // this.loadData();
    }).catch(error => console.log(error));
  }



  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  loadData(){
    $('#tableExport').DataTable({
      dom: 'Bfrtip',
      buttons: [
        'copy',{
          extend: 'print',
          title: 'AFS-ICPS'
        } ,{
          extend: 'csv',
          title: 'AFS-ICPS'
        },{
          extend: 'excel',
          title: 'AFS-ICPS'
        }, {
          extend: 'pdf',
          title: 'AFS-ICPS'
        }
      ]
    });
  }

onSubmit(formdata) {
    console.log(formdata);
    let validData = this.deviceAssign.valid;
    if (validData) {
      var userId = localStorage.getItem('userTypeId');
      formdata.userId = userId;
      $('.submit').prop('disabled',true)
      this.rest.getpost('device/getsystem_datafilter', formdata).subscribe(data => {
           if(data['status'])
              {

                  var results = data.result;
                  var audio_eventsdata = results.audio_eventsdata;
                  var uanswereddata = results.uanswereddata;
                  var system_eventsdata = results.system_eventsdata;
                  var devicedata = results.devicedata;
                  if(devicedata.length>0)
                  {
                    // console.log('device loop');
                    for (var i = 0; i < devicedata.length; i++) {
                      var NameofSchool = devicedata[i].schoolName;
                     
                           var deviceIMEI = devicedata[i].deviceIMEI;
                          // console.log(deviceIMEI,'deviceid');
                          var audiocount = 0;
                          var unanscount = 0;
                          var deviceoncount = 0;
                          
                          for (var j = 0; j < audio_eventsdata.length; j++) {
                            // console.log('audio loop');
                          // console.log(audio_eventsdata[j].Device_ID+' == '+deviceIMEI);
                            if(audio_eventsdata[j].Device_ID ===deviceIMEI)
                            {
                              
                              audiocount++;
                            }
                          }
                          
                          for (var jk = 0; jk < uanswereddata.length; jk++) {
                            if(uanswereddata[jk].Device_ID ===deviceIMEI)
                            {
                              unanscount++;
                            }
                          }

                          for (var jk = 0; jk < system_eventsdata.length; jk++) {
                            if(system_eventsdata[jk].Device_Id ===deviceIMEI && system_eventsdata[jk].Device_Off=='0')
                            {
                              deviceoncount++;
                            }
                          }
                    devicedata[i].audiocount = audiocount;
                    devicedata[i].unanscount = unanscount;
                    devicedata[i].deviceoncount = deviceoncount;
                     $('.submit').prop('disabled',false)
                  }
                  this.sys_datas = devicedata;
                  $("#tableExport").DataTable().destroy();
                  
                }
                else
                {
                  this.sys_datas = [];
                  $("#tableExport").DataTable().destroy();
                }
                setTimeout(function() {
                $('#tableExport').DataTable({
                dom: 'Bfrtip',
                buttons: [
                  
                  'copy',{
                    extend: 'print',
                    title: 'AFS-ICPS'
                  } ,{
                    extend: 'csv',
                    title: 'AFS-ICPS'
                  },{
                    extend: 'excel',
                    title: 'AFS-ICPS'
                  }, {
                    extend: 'pdf',
                    title: 'AFS-ICPS'
                  }
                ]
                });
                },2000);
              }
              else
              {
                  this.sys_datas = [];
                  $("#tableExport").DataTable().destroy();
                   setTimeout(function() {
                $('#tableExport').DataTable({
                dom: 'Bfrtip',
                buttons: [
                  
                  'copy',{
                    extend: 'print',
                    title: 'AFS-ICPS'
                  } ,{
                    extend: 'csv',
                    title: 'AFS-ICPS'
                  },{
                    extend: 'excel',
                    title: 'AFS-ICPS'
                  }, {
                    extend: 'pdf',
                    title: 'AFS-ICPS'
                  }
                ]
                });
                },2000);
              }
          
        
      });
    } else {
      this.toastr.errorToastr('Invalid deatails check the inputs start and end dates');
    }
  }


districtChange(event: any) {
      if(event.target.value!=''){
        this.rest.get('device/listbyDistrict?districtId='+event.target.value+'&stateName='+this.deviceAssign.get('stateName').value).subscribe((result) => {
          if(result.status){
            this.schooldata = result.result;
            setTimeout(function(){
              $('.selectpicker3').selectpicker('refresh');
              $('.filter-option-inner-inner').css('text-transform','none');
            },2000);
          }
          else
          {
           this.toastr.errorToastr(result.message); 
          }
        }, (err) => {
          console.log(err);
        });  
      
    }
  }

 schoolChange(event: any) {
  if(event.target.value!=''){
   // $("#tableExport").DataTable().search(event.target.value).draw(); 
   } 
 }

 stateChange(event: any) {
    if(event.target.value!=''){
      this.curstateval = event.target.value;
      this.curdistrictsval = this.statedata['data'][this.curstateval].districts;
      let stateName = this.statedata['data'][this.curstateval].stateName;
      this.deviceAssign.get('stateName').setValue(stateName);
      setTimeout(function(){
        $('.selectpicker2').selectpicker('refresh');
        $('.filter-option-inner-inner').css('text-transform','none');
      },2000);
      
    }
  }   

 GetStates(): void {
    const webToken = localStorage.getItem('webtoken');
    this.rest.GetStates(webToken).subscribe(data=>{
      console.log(data,'testtttttttt');
      this.statedata = data;
      setTimeout(function(){
        $('.selectpicker1').selectpicker('refresh');
         $('.dropdown-menu.show').css('transform','none !important');
         $('.filter-option-inner-inner').css('text-transform','none');
      },1000);

    });
  };




  sys_data() {
    const webToken = localStorage.getItem('webtoken');
    const userType = localStorage.getItem('userTypeId');

    this.rest.get('device/getsystem_data').subscribe((result) => {
              if(result['status'])
              {

                  var results = result.result;
                  var audio_eventsdata = results.audio_eventsdata;
                  var uanswereddata = results.uanswereddata;
                  var system_eventsdata = results.system_eventsdata;
                  var devicedata = results.devicedata;
                  if(devicedata.length>0)
                  {
                    // console.log('device loop');
                    for (var i = 0; i < devicedata.length; i++) {
                      var NameofSchool = devicedata[i].schoolName;
                     
                           var deviceIMEI = devicedata[i].deviceIMEI;
                          // console.log(deviceIMEI,'deviceid');
                          var audiocount = 0;
                          var unanscount = 0;
                          var deviceoncount = 0;
                          
                          for (var j = 0; j < audio_eventsdata.length; j++) {
                            // console.log('audio loop');
                          // console.log(audio_eventsdata[j].Device_ID+' == '+deviceIMEI);
                            if(audio_eventsdata[j].Device_ID ===deviceIMEI)
                            {
                              console.log(audiocount,'ssss');
                              audiocount++;
                            }
                          }

                          for (var jk = 0; jk < uanswereddata.length; jk++) {
                            if(uanswereddata[jk].Device_ID ===deviceIMEI)
                            {
                              unanscount++;
                            }
                          }

                          for (var jk = 0; jk < system_eventsdata.length; jk++) {
                            if(system_eventsdata[jk].Device_Id ===deviceIMEI && system_eventsdata[jk].Device_Off=='0')
                            {
                              deviceoncount++;
                            }
                          }
                          
                    devicedata[i].audiocount = audiocount;
                    devicedata[i].unanscount = unanscount;
                    devicedata[i].deviceoncount = deviceoncount;
                     $('.submit').prop('disabled',false)
                  }
                  this.sys_datas = devicedata;
                  $("#tableExport").DataTable().destroy();
                  
                }
                else
                {
                  this.sys_datas = [];
                  $("#tableExport").DataTable().destroy();
                }
                setTimeout(function() {
                $('#tableExport').DataTable({
                dom: 'Bfrtip',
                buttons: [
                  
                  'copy',{
                    extend: 'print',
                    title: 'AFS-ICPS'
                  } ,{
                    extend: 'csv',
                    title: 'AFS-ICPS'
                  },{
                    extend: 'excel',
                    title: 'AFS-ICPS'
                  }, {
                    extend: 'pdf',
                    title: 'AFS-ICPS'
                  }
                ]
                });
                },2000);
              }
              else
              {
                  this.sys_datas = [];
                  $("#tableExport").DataTable().destroy();
                   setTimeout(function() {
                $('#tableExport').DataTable({
                dom: 'Bfrtip',
                buttons: [
                  
                  'copy',{
                    extend: 'print',
                    title: 'AFS-ICPS'
                  } ,{
                    extend: 'csv',
                    title: 'AFS-ICPS'
                  },{
                    extend: 'excel',
                    title: 'AFS-ICPS'
                  }, {
                    extend: 'pdf',
                    title: 'AFS-ICPS'
                  }
                ]
                });
                },2000);
              }
          
     
   

    }, (err) => {
      console.log(err);
    });
  }



}
