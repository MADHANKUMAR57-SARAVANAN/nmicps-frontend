import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

declare const $: any;
@Component({
  selector: 'app-export-table',
  templateUrl: './rls-issued-table.component.html',
  styleUrls: ['./rls-issued-table.component.scss']
})
export class RLSIssuedTableComponent implements OnInit {

  public myLifeData_DisPlay: any;
  public table: any;
  public alerts: Array<any> = [];
  passdata: any[];
  curstateval = '';
  curdistrictsval = '';
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  columns: any[];
  schoolNames = [];
  source: any;
  dataAdapter: any;

  constructor(private router: Router, private rest: DynamicScriptLoaderService, private fb: FormBuilder, public toastr: ToastrManager, ) { }

  userTypeId = localStorage.getItem('userTypeId');
  deviceAssign: FormGroup;
  ngOnInit() {

    this.startScript();
    this.my_lifeDataDisplay();
    this.GetStates();
    this.deviceAssign = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3),]],


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


  submitFunction() {
    var postdata = {};
    postdata['deveices'] = this.selectedItems;
    postdata['userId'] = localStorage.getItem('assignuser');;
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
      //      this.source =
      // {
      //     localdata: result,
      //     datatype: "array",
      //     datafields:
      //     [
      //         { name: 'username', type: 'string' },
      //         { name: 'userTypeId', type: 'string' },
      //         { name: 'email', type: 'string' },
      //         { name: 'phoneNumber', type: 'string' },
      //         { name: 'country', type: 'string' },
      //         { name: 'stateName', type: 'string' },
      //         { name: 'districtId', type: 'string' },
      //         { name: 'status', type: 'string' },
      //         { name: 'userId', type: 'string' },
      //         { name: 'userId', type: 'string' },
      //         // { name: 'quantity', type: 'number' },
      //         // { name: 'price', type: 'number' },
      //         // { name: 'total', type: 'number' }
      //     ],
      // };

      // this.dataAdapter = new jqx.dataAdapter(this.source);

      // this.columns =
      // [
      //     { text: 'User Name', dataField: 'username',width: 100, },
      //     { text: 'User Type', dataField: 'userTypeId',width: 100,cellsrenderer: function (row, column, value, rowData)
      //                         {
      //                           return rowData.userTypeId==1?'Super Admin':rowData.userTypeId==2?"Admin":(rowData.userTypeId==3)?"District":"School Users"
      //                         }
      //                         },
      //     { text: 'Email-id', dataField: 'email',width: 200 },
      //     { text: 'Mobile number', dataField: 'phoneNumber',width: 100 },
      //     { text: 'Country', dataField: 'country',width: 100 },
      //     { text: 'State', dataField: 'stateName',width: 100 },
      //     { text: 'District', dataField: 'districtId',width: 100 },
      //     { text: 'User Active', dataField: 'status',width: 100 ,cellsrenderer: function (row, column, value, rowData)
      //                         {
      //                           return rowData.status==1?'Active':'Inactive'
      //                         } },
      //    { text: 'Action', dataField: '_id',width: 100 ,cellsrenderer: function (row, column, value, rowData)
      //                         {
      //                           return '<a href="#/rls-setting/rls-user-edit/{{rowData.userId}}">Edit</a>'
      //                         } },
      //     { text:"Assign", dataField: 'userId', width: 160,
      //                         cellsrenderer: function (row, column, value, rowData)
      //                         {
      //                             var orderid = rowData.userId;
      //                             if((userType==1 || userType==2) && rowData.userTypeId==3){
      //                                 return  '<div style="padding: 0;">' +
      //                                     '<button data-toggle="modal" data-target="#exampleModalCenter" (click)="unassignDevices(alert.userId)">Assign</button>' +
      //                                     '</div>';
      //                             }
      //                             else{
      //                                 return '-';
      //                             }
      //                         }
      //                     }
      // { text: 'Product', editable: false, dataField: 'productname', width: 180 },
      // { text: 'Quantity', dataField: 'quantity', width: 80, align: 'right', cellsAlign: 'right' },
      // { text: 'Unit Price', dataField: 'price', width: 90, align: 'right', cellsAlign: 'right', cellsFormat: 'c2' },
      // { text: 'Total', dataField: 'total', width: 100, align: 'right', cellsAlign: 'right', cellsFormat: 'c2' }
      // ]; 
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
