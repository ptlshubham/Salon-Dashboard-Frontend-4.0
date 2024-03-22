
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveEmployeeList(data: any) {

        return this.httpClient.post<any>(ApiService.saveEmployeeListURL, data);
    }
    getAllEmployeeList(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllEmployeeURL);
    }
    getOnlyIdealEmployee(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getOnlyIdealEmployeeList);
    }
    
    removeEmployeeList(id: any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeEmployeeListURL, data);
    }
    updateEmpList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateEmployeeListURL, admin);
    }
    updateEmpActiveStatus(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateWorkingStatusURL, admin)
    }
    updateAppoiEmployeeDetails(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateAppointementEmployeeDetailsURL, admin)
    }
    removeAppointementEmployeeDetails(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.removeAppointementEmployeeDataURL, admin)
    }
    public getStateFromJson(): Observable<any[]> {
        return this.httpClient.get<any[]>('assets/json/state.json');
    }
    public getCityFromJson(): Observable<any[]> {
        return this.httpClient.get<any[]>('assets/json/state-city.json');
    }


}
