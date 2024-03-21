import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class adminService {

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
    public getStateFromJson(): Observable<any[]> {
        return this.httpClient.get<any[]>('assets/json/state.json');
    }
    public getCityFromJson(): Observable<any[]> {
        return this.httpClient.get<any[]>('assets/json/state-city.json');
    }


}
