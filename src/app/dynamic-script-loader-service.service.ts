import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, observable, throwError, from } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { promise } from 'protractor';
import { Router } from '@angular/router';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'form.min', src: 'assets/js/form.min.js' },
  { name: 'map.min', src: 'assets/js/map.min.js' },
  { name: 'table.min', src: 'assets/js/table.min.js' },
  { name: 'ckeditor', src: 'assets/js/bundles/ckeditor/ckeditor.js' },
  { name: 'tinymce', src: 'assets/js/bundles/tinymce/tinymce.min.js' },
  { name: 'lightgallery', src: 'assets/js/bundles/lightgallery/dist/js/lightgallery-all.min.js' },
  { name: 'dataTables.buttons', src: 'assets/js/bundles/export-tables/dataTables.buttons.min.js' },
  { name: 'buttons.flash', src: 'assets/js/bundles/export-tables/buttons.flash.min.js' },
  { name: 'jszip', src: 'assets/js/bundles/export-tables/jszip.min.js' },
  { name: 'pdfmake', src: 'assets/js/bundles/export-tables/pdfmake.min.js' },
  { name: 'vfs_fonts', src: 'assets/js/bundles/export-tables/vfs_fonts.js' },
  { name: 'buttons.html5', src: 'assets/js/bundles/export-tables/buttons.html5.min.js' },
  { name: 'buttons.print', src: 'assets/js/bundles/export-tables/buttons.print.min.js' },
  { name: 'bootstrap-colorpicker', src: 'assets/js/bundles/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js' },
  { name: 'ion.rangeSlider', src: 'assets/js/bundles/rangeSlider/js/ion.rangeSlider.min.js' },
  { name: 'echart', src: 'assets/js/bundles/echart/echarts.js' },
  { name: 'apexcharts', src: 'assets/js/bundles/apexcharts/apexcharts.min.js' },
  { name: 'googleapi', src: 'https://maps.google.com/maps/api/js?v=3&sensor=false' },

];

declare var document: any;

@Injectable({providedIn: 'root'})
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor(private http: HttpClient, private router: Router) {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }



// private BASE_URL = 'http://localhost:4000/ibuddy_pro/';



//private BASE_URL = 'http://35.154.171.189/ibuddy_pro/';
  

    
    private BASE_URL = 'https://nmicpshf.org/ibuddy_pro/';
    

  // private BASE_URL = 'http://52.221.193.13/iBuddyPlatformAPI/';

    private token =  localStorage.getItem('webtoken'); 
    private httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': "Bearer "+this.token

  })
};

ngOnInit() {
}

loginPage (loginID): Observable<any> {
  console.log(loginID);
  return this.http.post<any>(this.BASE_URL + 'user/login', JSON.stringify(loginID), this.httpOptions).pipe(
  //   tap(),
  //   catchError(this.handleError <any> ('loginPage'))
  // );
  retry(1),
   catchError(this.handleError)
);
}


UserList_table(token,userTypeId): Observable<any> {
  console.log(token);
  const headers_object = {headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + token})};
   return this.http.get<any>(this.BASE_URL + 'user/alluser?type='+userTypeId, headers_object).pipe(
   retry(1),
  catchError(this.handleError)
);
}

//http://localhost:4000/iBuddy_pro/device/shippedcount

Shipped_table(token): Observable<any> {
  console.log(token);
  const headers_object = {headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + token})};
   return this.http.get<any>(this.BASE_URL + 'device/shippedcount', headers_object).pipe(
   retry(1),
  catchError(this.handleError)
);
}


user_bind(token): Observable<any> {
  console.log(token);
  const headers_object = {headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + token})};
   return this.http.get<any>(this.BASE_URL + 'user/userfind', headers_object).pipe(
  //   tap(),
  //   catchError(this.handleError <any> (''))
  // );
    retry(1),
    catchError(this.handleError)
  );
}

user_update(data, token): Observable<any> {
  // console.log(token);
  const headers_object = {headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + token})};
   return this.http.post<any>(this.BASE_URL + 'user/updateuserdetails', JSON.stringify(data), headers_object).pipe(
  //   tap(),
  //   catchError(this.handleError <any> ('id'))
  // );
  retry(1),
  catchError(this.handleError)
);
}


GetStates(token): Observable<any> {
  console.log('token');
  const headers_object = {headers: new HttpHeaders({
    'Content-Type':  'application/json',
     'Authorization': 'Bearer ' + token
  })};
  return this.http.get<any>(this.BASE_URL + 'states', headers_object).pipe(
    retry(1),
    catchError(this.handleError)
  );
}

//common services for post
fileupload(url,postData): Observable<any> {
console.log(postData);
  return this.http.post<any>(this.BASE_URL + url, postData).pipe(
  retry(1),
  catchError(this.handleError)
  );
}

//common services for post
getpost(url,postData): Observable<any> {
  return this.http.post<any>(this.BASE_URL + url, JSON.stringify(postData), this.httpOptions).pipe(
  retry(1),
  catchError(this.handleError)
  );
}
//common services for get
get(url): Observable<any> {
  console.log(this.httpOptions);
  return this.http.get<any>(this.BASE_URL + url, this.httpOptions).pipe(
    retry(1),
    catchError(this.handleError)
  );
}



GetUsertypes(token,type): Observable<any> {
 const headers_object = {headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + token})};
  return this.http.get<any>(this.BASE_URL + 'userTypes?type='+type, headers_object).pipe(
    retry(1),
    catchError(this.handleError)
  );
}

PutUserCreation (u): Observable<any> {
  console.log('data u');
  console.log(u);
  return this.http.post<any>(this.BASE_URL + 'PutRegister', JSON.stringify(u), this.httpOptions).pipe(
  retry(1),
  catchError(this.handleError)
  );
}




  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {

      if (!this.scripts[name].loaded) {

        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {  //Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }


}
