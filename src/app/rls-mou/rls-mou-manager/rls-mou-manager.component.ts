import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs'
import { ToastrManager } from 'ng6-toastr-notifications';
declare const $: any;
declare const Dropzone: any;


@Component({
  selector: 'app-timeline2',
  templateUrl: './rls-mou-manager.component.html',
  styleUrls: ['./rls-mou-manager.component.scss']
})
export class RLSmouManagerComponent implements OnInit {
  public state_DisPlay: any;


  constructor(private router: Router, private rest: DynamicScriptLoaderService, private fb: FormBuilder, ) { }

  ngOnInit() {

    this.State_DisPlay();


}

  async startScript() {
    await this.rest.load('dataTables.buttons', 'buttons.flash', 'jszip', 'pdfmake', 'vfs_fonts', 'pdfmake', 'buttons.html5', 'buttons.print').then(data => {
      // this.loadData();
    }).catch(error => console.log(error));
  }

  // private loadData(){
  //   $('#tableExport').DataTable({
  //     dom: 'Bfrtip',
  //     buttons: [

  //       'copy',{
  //         extend: 'print',

  //         title: 'AFS-ICPS'
  //       } ,{
  //         extend: 'csv',
  //         title: 'AFS-ICPS'
  //       },{
  //         extend: 'excel',
  //         title: 'AFS-ICPS'
  //       }, {
  //         extend: 'pdf',
  //         title: 'AFS-ICPS'
  //       }
  //     ]
  //   });
  //   this.initBasicSelect();


  // }

  addDevice() {
    this.router.navigate(['rls-mou/rls-mou-creation']);
  }


  State_DisPlay() {

     const webToken = localStorage.getItem('webtoken');
   

    this.rest.get('/states?mou=true').subscribe((result) => {
      
        this.state_DisPlay = result.data;
        console.log(this.state_DisPlay);

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


}
