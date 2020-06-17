import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

declare const $: any;
@Component({
  selector: 'app-export-table',
  templateUrl: './rls-poweron-metrics.component.html',
  styleUrls: ['./rls-poweron-metrics.component.scss']
})
export class RLSpoweronmetricsComponent implements OnInit {

  public video_datas: any[];
  public schooldata: any[];
  public table: any;
  public alerts: Array<any> = [];


  dropdownList = [];
  devicehrs = [];
  devicecount = [];
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
    this.getsystem_events_data();
     this.GetStates();
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
    await this.rest.load('dataTables.buttons', 'buttons.flash', 'jszip', 'pdfmake', 'vfs_fonts', 'pdfmake', 'buttons.html5', 'buttons.print').then(data => {
      // this.loadData();
    }).catch(error => console.log(error));
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  // loadData() {
  //   $('#tableExport').DataTable({
  //     dom: 'Bfrtip',
  //     buttons: [

  //       'copy', {
  //         extend: 'print',
  //         title: 'AFS-ICPS'
  //       }, {
  //         extend: 'csv',
  //         title: 'AFS-ICPS'
  //       }, {
  //         extend: 'excel',
  //         title: 'AFS-ICPS'
  //       }, {
  //         extend: 'pdf',
  //         title: 'AFS-ICPS'
  //       }
  //     ]
  //   });
  // }

 onSubmit(formdata) {
    console.log(formdata);
    let validData = this.deviceAssign.valid;
    if (validData) {
      var userId = localStorage.getItem('userTypeId');
      formdata.userId = userId;
      $('.submit').prop('disabled',true)
      this.rest.getpost('school/system_eventsfilter', formdata).subscribe(data => {
          if (data['status']) {
                var results = data.result;
                var system_events = results.System_Events;
                var schooldata = results.schooldata;
                var devicedata = results.devicedata;
                if(schooldata.length>0 && system_events.length>0)
                {
                  for (var i = 0; i < schooldata.length; i++) {
                    var NameofSchool = schooldata[i].NameofSchool;
                    var index = devicedata.findIndex(x => x.schoolName ===NameofSchool);
                    if(index!='-1')
                    {
                         var deviceIMEI = devicedata[index].deviceIMEI;
                        console.log(deviceIMEI,'deviceid');
                        var videocount = 0;
                        var tothours = 0;
                        var oncount = 0;
                        var deviceontime = [];
                        var deviceofftime = [];
                        for (var j = 0; j < system_events.length; j++) {

                            

                            var Time = system_events[j]._id;

                            var temphrs = 0;

                            if(system_events[j].Device_Id ===deviceIMEI)
                            {
                                var Device_Off = '';
                                var Device_On = '';
                                if(typeof system_events[j].Device_Off != 'undefined')
                                {
                                   Device_Off = system_events[j].Device_Off;
                                } 
                                if(typeof system_events[j].Device_On != 'undefined')
                                {
                                  oncount++;
                                    console.log('on is not undefined');
                                    Device_On = system_events[j].Device_On;
                                }
                                console.log(system_events[j]);
                                console.log('deviceidif');
                                if(!(deviceIMEI in this.devicehrs))
                                {
                                  console.log('deviceiassign');
                                  this.devicehrs[deviceIMEI] = 0;
                                }
                                console.log(Device_On,'on');
                                console.log(Device_Off,'off');
                                if(Device_On!='')
                                {

                                  console.log('deviceiof');
                                  console.log(deviceontime[deviceIMEI],'dsfsdfsdf');
                                 
                                    if(typeof deviceontime[deviceIMEI] != 'undefined')
                                    {
                                        console.log('deviceiofif');
                                      // if(deviceofftime[deviceIMEI] != Time){
                                      console.log(Time);
                                      deviceofftime[deviceIMEI] = Time;
                                        console.log(deviceontime[deviceIMEI],'ontime');
                                        console.log(Time,'offtime');
                                        var date_future = new Date(deviceontime[deviceIMEI]);
                                        var date_now = new Date(Time);
                                        var delta = Math.abs(date_future.getTime() - date_now.getTime()) / 1000;

                                        var days = Math.floor(delta / 86400);
                                        delta -= days * 86400;

                                        var hours = Math.floor(delta / 3600) % 24;
                                        delta -= hours * 3600;
                                        console.log(hours,'hours');

                                        var minutes = Math.floor(delta / 60) % 60;
                                        delta -= minutes * 60;
                                        console.log(minutes,'minutes');
                                        tothours =  tothours+hours;
                                        this.devicehrs[deviceIMEI] +=  hours;
                                      // }
                                    }


                                  
                                } 
                                if(Device_Off=='0')
                                {
                                   console.log('deviceion');
                                  if(!(deviceIMEI in deviceontime)){
                                      console.log(Time);
                                      deviceontime[deviceIMEI] = Time;
                                      var ontime = Time;
                                      
                                  } 
                                }
                            }

                        }
                        
                  }
                  schooldata[i].deviceIMEI = deviceIMEI;
                  schooldata[i].oncount = oncount;
                  schooldata[i].hours = tothours;
                }
                this.video_datas = schooldata;
                $("#tableExport").DataTable().destroy();
                
              }
              else
              {
                this.video_datas = [];
                $("#tableExport").DataTable().destroy();
              }

               setTimeout(function() {
                  $('.submit').prop('disabled',false)
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
                
            
               // this.video_datas = result.result;
            
          }
          else {

            this.toastr.errorToastr(data['message']);
          }
        
      });
    } else {
      this.toastr.errorToastr('Invalid deatails check the inputs start and end dates');
    }
  }

districtChange(event: any) {
      if(event.target.value!=''){
        // $("#tableExport").DataTable().search(event.target.value).draw();
        this.rest.get('device/listbyDistrict?districtId='+event.target.value+'&stateName='+this.deviceAssign.get('stateName').value).subscribe((result) => {
          if(result.status){
            this.schooldata = result.result;
            setTimeout(function(){
              $('.selectpicker3').selectpicker('refresh');
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

  particulardata(deviceId) {
      
        this.rest.get('school/getsystemdatas?DeviceId='+deviceId).subscribe((result) => {
          if(result.status){
            this.particulardata = result.result;
            setTimeout(function(){
              $('#exampleModalCenter').modal('show');

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
      },2000);
      // $("#tableExport").DataTable().search(stateName).draw();
    }
  }   

 GetStates(): void {
    const webToken = localStorage.getItem('webtoken');
    this.rest.GetStates(webToken).subscribe(data=>{
      console.log(data,'testtttttttt');
      this.statedata = data;
      setTimeout(function(){
        $('.selectpicker1').selectpicker('refresh');
        $('.filter-option-inner-inner').css('text-transform','none');
         $('.dropdown-menu.show').css('transform','none !important');
      },1000);

    });
  };




  getsystem_events_data() {
    const webToken = localStorage.getItem('webtoken');
    const userType = localStorage.getItem('userTypeId');

    this.rest.get('school/system_events').subscribe((result) => {
    if(result.status)
    {
        var results = result.result;
        var system_events = results.System_Events;
        var schooldata = results.schooldata;
        var devicedata = results.devicedata;
        if(schooldata.length>0 && system_events.length>0)
        {
          for (var i = 0; i < schooldata.length; i++) {
            var NameofSchool = schooldata[i].NameofSchool;
            var index = devicedata.findIndex(x => x.schoolName ===NameofSchool);
             // var deviceIMEI = '';
            if(index!='-1')
            {
                // var deviceIMEI = "863847084032150";
                 var deviceIMEI = devicedata[index].deviceIMEI;
                console.log(deviceIMEI,'deviceid');
                var videocount = 0;
                var tothours = 0;
                var oncount = 0;
                var deviceontime = [];
                var deviceofftime = [];
                for (var j = 0; j < system_events.length; j++) {

                    

                    var Time = system_events[j]._id;

                    var temphrs = 0;

                    if(system_events[j].Device_Id ===deviceIMEI)
                    {
                        var Device_Off = '';
                        var Device_On = '';
                        if(typeof system_events[j].Device_Off != 'undefined')
                        {
                           Device_Off = system_events[j].Device_Off;
                        } 
                        if(typeof system_events[j].Device_On != 'undefined')
                        {
                          oncount++;
                            console.log('on is not undefined');
                            Device_On = system_events[j].Device_On;
                        }
                        console.log(system_events[j]);
                        console.log('deviceidif');
                        if(!(deviceIMEI in this.devicehrs))
                        {
                          console.log('deviceiassign');
                          this.devicehrs[deviceIMEI] = 0;
                        }
                        console.log(Device_On,'on');
                        console.log(Device_Off,'off');
                        if(Device_On!='')
                        {

                          console.log('deviceiof');
                          console.log(deviceontime[deviceIMEI],'dsfsdfsdf');
                         
                            if(typeof deviceontime[deviceIMEI] != 'undefined')
                            {
                                console.log('deviceiofif');
                              // if(deviceofftime[deviceIMEI] != Time){
                              console.log(Time);
                              deviceofftime[deviceIMEI] = Time;
                                console.log(deviceontime[deviceIMEI],'ontime');
                                console.log(Time,'offtime');
                                var date_future = new Date(deviceontime[deviceIMEI]);
                                var date_now = new Date(Time);
                                var delta = Math.abs(date_future.getTime() - date_now.getTime()) / 1000;

                                var days = Math.floor(delta / 86400);
                                delta -= days * 86400;

                                var hours = Math.floor(delta / 3600) % 24;
                                delta -= hours * 3600;
                                console.log(hours,'hours');

                                var minutes = Math.floor(delta / 60) % 60;
                                delta -= minutes * 60;
                                console.log(minutes,'minutes');
                                tothours =  tothours+hours;
                                this.devicehrs[deviceIMEI] +=  hours;
                              // }
                            }


                          
                        } 
                        if(Device_Off=='0')
                        {
                           console.log('deviceion');
                          if(!(deviceIMEI in deviceontime)){
                              console.log(Time);
                              deviceontime[deviceIMEI] = Time;
                              var ontime = Time;
                              
                          } 
                        }
                    }

                }
                
          }
          schooldata[i].deviceIMEI = deviceIMEI;
          schooldata[i].oncount = oncount;
          schooldata[i].hours = tothours;
        }
        this.video_datas = schooldata;
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
    
       // this.video_datas = result.result;
    }

    }, (err) => {
      console.log(err);
    });
  

}
}