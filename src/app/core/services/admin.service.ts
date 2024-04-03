import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveRegistrationList(admin: any) {

        return this.httpClient.post<any>(ApiService.saveRegistrationListURL, admin);
    }
    getAllRegistrationList(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllRegistrationURL);
    }
    updateRegistrationList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateRegistrationListURL, admin);
    }
    removeRegistrationDetails(id: any) {

        return this.httpClient.get<any>(ApiService.removeRegistrationDetailsURL + id);
    }
    saveGeneralDetails(admin: any) {

        return this.httpClient.post<any>(ApiService.saveGeneralSalonDetailsURL, admin);
    }
    getAllGeneralDetails(id:any): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllGeneralSalonDataURL + id);
    }
}
