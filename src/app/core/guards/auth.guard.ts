import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = localStorage.getItem('Role');
        const adminUser = localStorage.getItem('Name');

        if (currentUser) {
            // user logged in so return true
            return true;
        }
        else if (adminUser) {
            // Admin logged in so return true
            return true;
        }
        else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

    }
}
