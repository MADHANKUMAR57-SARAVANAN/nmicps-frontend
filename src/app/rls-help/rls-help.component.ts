import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-grid',
  templateUrl: './rls-help.component.html',
  styleUrls: ['./rls-help.component.scss']
})
export class RLSHelpComponent implements OnInit {
  showLoadingIndicatior = '';
  constructor() { }



  logout() {
    localStorage.setItem('webtoken', '');
    localStorage.setItem('userTypeId', '');
    localStorage.setItem('isLoggedin', '');
    localStorage.setItem('useroption', '');
    localStorage.setItem('schooloption', '');
    localStorage.setItem('deviceoption', '');
  }

  ngOnInit() {
  }

}
