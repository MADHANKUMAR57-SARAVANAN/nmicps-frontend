import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

declare const $: any;
@Component({
  selector: 'app-export-table',
  templateUrl: './rls-robotic-details.component.html',
  styleUrls: ['./rls-robotic-details.component.scss']
})
export class RLSroboticdetailsComponent implements OnInit {

  constructor(private router: Router,private rest: DynamicScriptLoaderService, private fb: FormBuilder,public toastr: ToastrManager,) {}

  userTypeId = localStorage.getItem('userTypeId');
  deviceAssign: FormGroup;
  ngOnInit() {
    

  }

  
}