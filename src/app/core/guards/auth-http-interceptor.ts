import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'
import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import ls from 'localstorage-slim';
// import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        // @Inject(LOCAL_STORAGE) private storage: WebStorageService, 
        private router: Router,
        // private toastr: ToastrManager
    ) { }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    //     // this.router.navigate(['home']);
    //     let token: any = localStorage.getItem('token');
    //     let adminToken: any = localStorage.getItem('authenticationAdminToken');

    //     // request.clone({
    //     //     headers: request.headers.set('rejectUnauthorized', 'false').set('requestCert', 'false')
    //     //         .set('insecure', 'true')
    //     // })
    //     const currentUser = ls.get('UserName', { decrypt: true });

    //     if (localStorage.getItem('role') == 'admin') {
    //     // if (currentUser) {
    //         if (request.url != ApiService.getUserLoginURL) {

    //             if (adminToken == null || adminToken == undefined) {
    //                 console.log("token is null");
    //                 this.router.navigate(['/account/login']);
    //             }
    //             request = request.clone({ headers: request.headers.set('x-access-token', adminToken) });
    //             return next.handle(request).pipe(catchError(err => {

    //                 if (err.status == 401 || err.status == 111) {
    //                     // auto logout if 401 response returned from api
    //                     this.router.navigate(['/account/login']);
    //                 }
    //                 const error = err.error.statusText || err.statusText;
    //                 return throwError(error);
    //             }))
    //         }
    //     }
    //     else {
    //         if (token == null || token == undefined) {
    //             return next.handle(request);
    //         }
    //         else {
    //             if (request.url != ApiService.getUserLoginURL) {
    //                 request = request.clone({ headers: request.headers.set('x-access-token', token) });
    //                 return next.handle(request).pipe(catchError(err => {

    //                     if (err.status == 401 || err.status == 111) {
    //                         // auto logout if 401 response returned from api
    //                         this.router.navigate(['/account/login']);
    //                     }
    //                     const error = err.error.statusText || err.statusText;
    //                     return throwError(error);
    //                 }))
    //             }
    //             else {

    //                 return next.handle(request);
    //             }
    //         }
    //     }
    //     return next.handle(request);
    // }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token: any = ls.get('authenticationToken', { decrypt: true });
        // let adminToken: any = ls.get('authenticationToken', { decrypt: true }) 
        if (request.url != ApiService.getUserLoginURL && request.url != ApiService.getRegisterOtpURL && ApiService.saveUserCustomerListURL) {
            console.log("in the interceptor")
            request = request.clone({ headers: request.headers.set('x-access-token', token) });
            return next.handle(request).pipe(catchError(err => {
                if (err.status == 401 || err.status == 111) {
                    // auto logout if 401 response returned from api
                    console.log('http error')
                    this.router.navigate(['/account/login']);
                }
                const error = err.error.statusText || err.statusText;
                return throwError(error);
            }))
        }
        else {
            debugger
            return next.handle(request);
        }
    }
}