import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

declare const $: any;
@Component({
  selector: 'app-export-table',
  templateUrl: './rls-user-creation-table.component.html',
  styleUrls: ['./rls-user-creation-table.component.scss']
})
export class RLSUserCreationTableComponent implements OnInit {

  public myLifeData_DisPlay: any;
  public table: any;
  public alerts: Array<any> = [];
  public useroption = localStorage.getItem('useroption');
  public schooloption = localStorage.getItem('schooloption');
  public deviceoption = localStorage.getItem('deviceoption');


  schoolNames = [];
  dropdownList = [];
  dropdownList1 = [];
  selectedItems = [];
  selectedItems1 = [];
  dropdownSettings = {};
  columns: any[];
  source: any;
  dataAdapter: any;
  passdata: any[];
  curstateval = '';
  curdistrictsval = '';

  constructor(private router: Router, private rest: DynamicScriptLoaderService, private fb: FormBuilder, public toastr: ToastrManager, ) { }

  userTypeId = localStorage.getItem('userTypeId');
  deviceAssign: FormGroup;
  ngOnInit() {



    //this.startScript();


    this.my_lifeDataDisplay();
    this.startScript();
    this.GetStates();

    this.deviceAssign = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3),]],


    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'deviceIMEI',
      textField: 'deviceIMEI',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };



  }

  GetStates(): void {
    const webToken = localStorage.getItem('webtoken');
    this.rest.GetStates(webToken).subscribe(data => {
      console.log(data, 'testtttttttt');
      this.passdata = data;
      setTimeout(function () {
        $('.selectpicker1').selectpicker('refresh');
        $('.dropdown-menu.show').css('transform', 'none !important');
      }, 1000);
    });
  };


  // ngOnDestroy(){
  //  $('#tableExport').DataTable().destroy();
  // }

  stateChange(event: any) {
    if (event.target.value != '') {
      this.curstateval = event.target.value;
      this.curdistrictsval = this.passdata['data'][this.curstateval].districts;
      let stateName = this.passdata['data'][this.curstateval].stateName;

      setTimeout(function () {
        $('.selectpicker2').selectpicker('refresh');
      }, 2000);
      $("#tableExport").DataTable().search(stateName).draw();

    }
  }

  districtChange(event: any) {
    if (event.target.value != '') {

      $("#tableExport").DataTable().search(event.target.value).draw();
      this.rest.getpost('school/getSchoolbydistrict', { district: event.target.value }).subscribe((result) => {
        if (result.status) {
          this.schoolNames = result.result;
          setTimeout(function () {
            $('.selectpicker3').selectpicker('refresh');
          }, 2000);
        }
        else {
          this.toastr.errorToastr(result.message);
        }
      }, (err) => {
        console.log(err);
      });

    }
  }

  schoolChange(event: any) {
    if (event.target.value != '') {

      $("#tableExport").DataTable().search(event.target.value).draw();
      this.rest.getpost('school/getSchooluser', { _id: event.target.value }).subscribe((result) => {
        if (result.status) {
          $("#tableExport").DataTable().destroy();
          this.myLifeData_DisPlay = result.result;
          setTimeout(function () {
            $('#tableExport').DataTable({
              dom: 'Bfrtip',
              buttons: [
                'copy', {
                  extend: 'print',
                  title: 'Robotics Learning System'
                }, {
                  extend: 'csv',
                  title: 'Robotics Learning System'
                }, {
                  extend: 'excel',
                  title: 'Robotics Learning System'
                }, {
                  extend: 'pdf',
                  title: 'Robotics Learning System'
                }
              ]
            });
          }, 1000);
   
        }
        else {
          this.toastr.errorToastr(result.message);
        }
      }, (err) => {
        console.log(err);
      });
    }
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


  addSongPlayList() {
    this.router.navigate(['rls-setting/rls-user-creation']);
  }
  get userName() {
    return this.deviceAssign.get('userName')
  }

  submitFunction() {
    var postdata = {};
    console.log(this.selectedItems);
    postdata['deveices'] = this.selectedItems;
    postdata['userId'] = localStorage.getItem('assignuser');
    postdata['_id'] = localStorage.getItem('_id');

    this.rest.getpost('device/districtassignDevices', postdata).subscribe((result) => {
      if (result.status) {
        this.toastr.successToastr(result.message, 'Success');
        this.unassignDevices(null);
      }
      else {
        this.toastr.errorToastr(result.message);
      }
    }, (err) => {
      console.log(err);
    });
  }

  submitFunction1() {
    console.log(this.selectedItems1);
    var postdata = {};
    postdata['_id'] = this.selectedItems1;
    postdata['userId'] = localStorage.getItem('assignuser1');;
    this.rest.getpost('school/assignSchool', postdata).subscribe((result) => {
      if (result.status) {
        this.toastr.successToastr(result.message, 'Success');
        this.unassignSchools(null);
        $("#tableExport").DataTable().destroy();
        this.my_lifeDataDisplay();
      }
      else {
        this.toastr.errorToastr(result.message);
      }
    }, (err) => {
      console.log(err);
    });
  }

  my_lifeDataDisplay() {


    const webToken = localStorage.getItem('webtoken');
    const userType = localStorage.getItem('userTypeId');

    this.rest.UserList_table(webToken, userType).subscribe((result) => {
      this.myLifeData_DisPlay = result;
      setTimeout(function () {
        $('#tableExport').DataTable({
          dom: 'Bfrtip',
          buttons: [

            'copy', {
              extend: 'print',
              title: 'AFS-ICPS'
            }, {
              extend: 'csv',
              title: 'AFS-ICPS'
            }, {
              extend: 'excel',
              title: 'AFS-ICPS'
            }, {
              extend: 'pdf',
              title: 'AFS-ICPS'
            }
          ]
        });
      }, 1000);

    }, (err) => {
      console.log(err);
    });
  }

  unassignDevices(userId) {
    console.log(userId, 'flksdjfksdhjf');
    const webToken = localStorage.getItem('webtoken');
    const userType = localStorage.getItem('userTypeId');
    localStorage.setItem('assignuser', userId);

    this.rest.get('device/unassignDevices').subscribe((result) => {

      this.dropdownList = result.result;
      console.log('My_Life Data Display', result);


    }, (err) => {
      console.log(err);
    });
  }

  unassignSchools(userId) {
    console.log(userId, 'flksdjfksdhjf');
    const webToken = localStorage.getItem('webtoken');
    const userType = localStorage.getItem('userTypeId');
    localStorage.setItem('assignuser1', userId);

    this.rest.get('school/unassignSchools?userId=' + userId).subscribe((result) => {

      this.dropdownList1 = result.result;

    }, (err) => {
      console.log(err);
    });
  }


  private initBasicSelect() {
    /* basic select start*/
    $('select').formSelect();
    $('#sel').formSelect();
    var data = [{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }];

    var Options = "";
    $.each(data, function (i, val) {
      $('#sel').append("<option value='" + val.id + "'>" + val.name + "</option>");
      $('#sel').formSelect();
    });
    /* basic select end*/
  }


}
