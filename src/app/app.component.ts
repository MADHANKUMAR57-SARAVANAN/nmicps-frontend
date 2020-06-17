import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, RouterEvent,ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { DynamicScriptLoaderService } from './dynamic-script-loader-service.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUrl: string;
  showLoadingIndicatior = true;
  roles = [];
  userTypeId = localStorage.getItem('userTypeId');
  useroption = '';
  schooloption = '';
  deviceoption = '';
  schoolidentifiedoption = '';
  shippeddistrictoption = '';
  issuedschooloption = '';
  commissionedschooloption = '';
  deviceassignoption = '';
  voicerecordoption = '';
  webTokencheck = localStorage.getItem('webtoken');

  constructor(private _router: Router,private route: ActivatedRoute, location: PlatformLocation, private dynamicScriptLoader: DynamicScriptLoaderService) {
    this._router.events.subscribe((routerEvent: Event) => {
      console.log(this.userTypeId,'usertype');

      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicatior = true;
        location.onPopState(() => {
          window.location.reload();
        });
        this.currentUrl = routerEvent.url.substring(routerEvent.url.lastIndexOf('/') + 1);
      }

      if (this.currentUrl.trim() === "signin" || this.currentUrl.trim() === "signup" || this.currentUrl.trim() === "forgot-password" || this.currentUrl.trim() === "locked" || this.currentUrl.trim() === "page404" || this.currentUrl.trim() === "page500") {
        document.getElementById("main-component").style["display"] = "none";  


        
      } else {
        document.getElementById('main-component').style.removeProperty("display");
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicatior = false;
      }
      window.scrollTo(0, 0)
      const url: Observable<string> = route.url.pipe(map(segments => segments.join('')));
      console.log(url);
    });

  }

  btn_click() {
     
    this._router.navigate(['/rls-training-status']);
}

  getuserTypes() {
    const webToken = localStorage.getItem('webtoken');
    const userTypeId = localStorage.getItem('userTypeId');
    this.dynamicScriptLoader.getpost('getparticularusertype', { 'userTypeId': userTypeId }).subscribe(data => {
      console.log(data);
      if (data.status) {
        this.roles = data.data.roles;
        this.useroption = this.roles[1]?this.roles[1].split(","):'';
        this.schooloption = this.roles[2]?this.roles[2].split(","):'';
        this.deviceoption = this.roles[3]?this.roles[3].split(","):'';
        this.schoolidentifiedoption   = this.roles[4]?this.roles[4].split(","):'';
        this.shippeddistrictoption    = this.roles[5]?this.roles[5].split(","):'';
        this.issuedschooloption       = this.roles[6]?this.roles[6].split(","):'';
        //console.log(this.issuedschooloption);
        this.commissionedschooloption = this.roles[7]?this.roles[7].split(","):'';
        this.deviceassignoption       = this.roles[8]?this.roles[8].split(","):'';
        console.log(this.deviceassignoption,"ege");
        this.voicerecordoption        = this.roles[9]?this.roles[9].split(","):'';
        //console.log( this.voicerecordoption);
        console.log(this.useroption);
        localStorage.setItem('useroption', this.useroption);
        localStorage.setItem('schooloption', this.schooloption);
        localStorage.setItem('deviceoption', this.deviceoption);
      }
    });
  }

  logout() {
    localStorage.setItem('webtoken', '');
    localStorage.setItem('userTypeId', '');
    localStorage.setItem('isLoggedin', '');
    localStorage.setItem('useroption', '');
    localStorage.setItem('schooloption', '');
    localStorage.setItem('deviceoption', '');
    window.location.href="/#/signin";
    // this._router.navigate(['/signin'])
  }
  ngOnInit() {
    console.log(this.userTypeId, 'usertypeid');
    console.log(this.roles, 'usertypeid');
    'use strict';
    this.getuserTypes();
  }
}
