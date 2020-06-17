import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';



constructor(private http: HttpClient,private rest: DynamicScriptLoaderService,private _lightbox: Lightbox, private fb: FormBuilder,) { }


ngOnInit() {
    this.fileupload = this.fb.group({
        file: ['', [Validators.required]],
    });
}

fileChange(element) {
    alert('fsdnsldhf');
        console.log(element.target.files);
      this.uploadedFiles = element.target.files;
  }

    OnDeviceformSubmit(formdata) {
console.log(this.uploadedFiles);
console.log(this.uploadedFiles.length);
        let formData = new FormData();
        for (var i = 0; i < this.uploadedFiles.length; i++) {

            formData.append("file[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
            console.log(formData);
            console.log(this.uploadedFiles[i]);
            console.log(this.uploadedFiles[i].name);
        }
       this.http.post('http://localhost:4000/ibuddy_pro/uploadfile', formData)
      .subscribe(res => {
        console.log(res);
        alert('SUCCESS !!');
      })
 
  }

    get file() {
    return this.fileupload.get('file')
  }