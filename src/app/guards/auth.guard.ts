import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable, of, observable, throwError, from } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	console.log('routeser section');
  	if(localStorage.getItem('webtoken'))
  	{
		
  		return true;
  	}
	else
	{

		this.router.navigate(['/signin']);
	}
    return false;
  }


}
