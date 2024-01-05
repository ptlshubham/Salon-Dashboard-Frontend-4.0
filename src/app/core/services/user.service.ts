import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ForgotPwd } from '../models/forgotpwd.model';
import { Loginuser } from '../models/login.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }
  
    // userLogin(email: any, pass: any) {
    //     let data = {
    //         email: email,
    //         pass: pass,
    //     };
    //     return this.http.post(ApiService.userLoginURL, data);
    // }

    // adminLogin(email: any, pass: any) {
    //     let data = {
    //         email: email,
    //         pass: pass,
    //     };
    //     return this.http.post(ApiService.adminLoginURL, data);
    // }
    // public getStateFromJson(): Observable<any[]> {
    //     return this.http.get<any[]>('assets/json/state.json');
    // }
    // public getCityFromJson(): Observable<any[]> {
    //     return this.http.get<any[]>('assets/json/state-city.json');
    // }

    login(credentials: Loginuser): Observable<any> {
        if (credentials.role == 'admin') {
            const data = {
                email: credentials.email,
                password: credentials.password,
            };

            return this.http.post<any>(ApiService.saveAdminLoginURL, data);
        }
        else {
            const data = {
                email: credentials.email,
                password: credentials.password,
                role: credentials.role
            };
            return this.http.post<any>(ApiService.saveLoginUserURL, data);
        }


    }
    userLogin(email: any, pass: any): Observable<any> {
         debugger
        const data = {
            email: email,
            password:pass,
        };

        return this.http.post<any>(ApiService.getUserLoginURL, data);
    }
    forgotPwd(admin: ForgotPwd): Observable<any> {

        return this.http.post<any>(ApiService.forgotPasswordURL, admin);
    }
    getOneTimePwd(admin: ForgotPwd): Observable<any> {
        return this.http.post<any>(ApiService.getOneTimePasswordURL, admin)
    }
    // changePassword(admin: ForgotPwd): Observable<any> {
    //     return this.http.post<any>(ApiService.getOneTimePasswordURL, admin)
    // }
    updatePassword(admin: ForgotPwd): Observable<any> {

        return this.http.post<any>(ApiService.updatePasswordURL, admin);
    }
    changePassword(admin:any) {
        return this.http.post<any>(ApiService.updatePasswordURL, admin);
    }
    CheckPassword(data:any) {
        return this.http.post(ApiService.ChackForPasswordURL, data);
    }
    UpdateLogout(data:any) {
         debugger
        return this.http.post(ApiService.updateLogoutDetailsURL, data);
    }
}
