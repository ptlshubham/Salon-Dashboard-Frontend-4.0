import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import ls from 'localstorage-slim';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
        private router: Router,
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        const currentUser = ls.get('UserName', { decrypt: true });
        if (currentUser  ) {
            // logged in so return true
            return true;
        }
        else if(this.router.url === '/account/recoverpw'){
            this.router.navigate(['/account/recoverpw']);
            return false;
        }
        else if(this.router.url === '/account/forgotpwd'){
            this.router.navigate(['/account/forgotpwd']);
            return false;
        }
        else{
            this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

    
    // not logged in so redirect to login page with the return url
    }  
}
