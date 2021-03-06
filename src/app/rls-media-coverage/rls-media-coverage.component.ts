import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

declare const $: any;
@Component({
  selector: 'app-export-table',
  templateUrl: './rls-media-coverage.component.html',
  styleUrls: ['./rls-media-coverage.component.scss']
})
export class RLSmediacoverageComponent implements OnInit {

  constructor(private router: Router,private rest: DynamicScriptLoaderService, private fb: FormBuilder,public toastr: ToastrManager,) {}

  userTypeId = localStorage.getItem('userTypeId');
  deviceAssign: FormGroup;
  ngOnInit() {
    

  }

  
}