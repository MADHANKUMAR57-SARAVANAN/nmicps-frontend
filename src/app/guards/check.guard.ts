import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable, of, observable, throwError, from } from 'rxjs';

@Injectable()
export class CheckGuard implements CanActivate {

	constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('routeser section');
    console.log(localStorage.getItem('webtoken'));
  	if(localStorage.getItem('webtoken'))
  	{
      console.log('kfjdskjfsdlkjfsdf');
      this.router.navigate(['/dashboard']);
      console.log('654548498454');
    }
    else
    {
    		return true;
  	}
    return false;
  }


}
