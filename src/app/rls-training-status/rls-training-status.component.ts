import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DynamicScriptLoaderService } from '../dynamic-script-loader-service.service';
import { Login } from '../model/login';
declare const jQuery: any;

@Component({
    selector: 'app-signin',
    templateUrl: './rls-training-status.component.html',
    styleUrls: ['./rls-training-status.component.scss']
})
export class TrainingStatusComponent implements OnInit {
    public loginID = new Login('', '');
    public submitted = false;
    constructor(private rest: DynamicScriptLoaderService, public toastr: ToastrManager, public router: Router) { }

    ngOnInit() {

        (function ($) {
            "use strict";


            /*==================================================================
            [ Focus input ]*/
            $('.input100').each(function () {
                $(this).on('blur', function () {
                    if ($(this).val().trim() != "") {
                        $(this).addClass('has-val');
                    }
                    else {
                        $(this).removeClass('has-val');
                    }
                })
            })


            /*==================================================================
            [ Validate ]*/
            var input = $('.validate-input .input100');

            


            $('.validate-form .input100').each(function () {
                $(this).focus(function () {
                    hideValidate(this);
                });
            });

            function showValidate(input) {
                var thisAlert = $(input).parent();

                $(thisAlert).addClass('alert-validate');
                $(".erroe_dis").remove();
                $(".alert-validate").append('<i class="material-icons erroe_dis">error</i>');
            }

            function hideValidate(input) {
                var thisAlert = $(input).parent();

                $(thisAlert).removeClass('alert-validate');
                $(".erroe_dis").remove();
            }

            /*==================================================================
            [ Show pass ]*/
            var showPass = 0;
            $('.btn-show-pass').on('click', function () {
                if (showPass == 0) {
                    $(this).next('input').attr('type', 'text');
                    $(this).addClass('active');
                    showPass = 1;
                }
                else {
                    $(this).next('input').attr('type', 'password');
                    $(this).removeClass('active');
                    showPass = 0;
                }

            });


        })(jQuery);
    }


    // onLoggedin() {
    //     console.log('12')
    //     let addDetail;
    //     this.submitted = true;
    //     if (this.loginID.email == '' || this.loginID.password == '') {

    //         this.toastr.errorToastr('Input Email id and Password');

    //     } else {
    //         this.rest.loginPage(this.loginID).subscribe((result) => {
              

    //             if (result.success) {
                    
    //                 console.log(result);
    //                 console.log('a', result.userTypeId);
    //                 localStorage.setItem('webtoken', result.token);
    //                 localStorage.setItem('userTypeId', result.userTypeId);
    //                 localStorage.setItem('isLoggedin', 'true');
    //                 localStorage.setItem('userId', result.userId);

    //                 this.router.navigate(['/dashboard']);
    //                 //  window.location.href = '/#/dashboard';
                    

    //                 this.toastr.successToastr('Login Successful', 'Welcome to NM-ICPS',{
    //                     timeOut: 4000,
                      
    //                 });

    //             } 

    //             else {
    //                 this.toastr.errorToastr('','Input Valid Email and Password',{
    //                     preventDuplicates: true
    //                 });
                   
    //             }
    //         }, (err) => {
    //             console.log(err);
    //         });
    //     }
    // }

}
