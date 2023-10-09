import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }
  
    userLogin(email: any, pass: any) {
        let data = {
            email: email,
            pass: pass,
        };
        return this.http.post(ApiService.userLoginURL, data);
    }

    adminLogin(email: any, pass: any) {
        let data = {
            email: email,
            pass: pass,
        };
        return this.http.post(ApiService.adminLoginURL, data);
    }
    public getStateFromJson(): Observable<any[]> {
        return this.http.get<any[]>('assets/json/state.json');
    }
    public getCityFromJson(): Observable<any[]> {
        return this.http.get<any[]>('assets/json/state-city.json');
    }
}
