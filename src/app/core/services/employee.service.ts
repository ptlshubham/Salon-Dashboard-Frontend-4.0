
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveEmployeeList(admin: Employee): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveEmployeeListURL, admin);
    }
    getAllEmployeeList(): Observable<Employee[]> {
        return this.httpClient.get<any>(ApiService.getAllEmployeeURL);
    }
    removeEmployeeList(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeEmployeeListURL, data);
    }
    updateEmpList(admin: Employee): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateEmployeeListURL, admin);
    }
    updateEmpActiveStatus(admin:Employee):Observable<any>{
        return this.httpClient.post<any>(ApiService.updateWorkingStatusURL,admin)
    }
    public getStateFromJson(): Observable<any[]> {
        return this.httpClient.get<any[]>('assets/json/state.json');
    }
    public getCityFromJson(): Observable<any[]> {
        return this.httpClient.get<any[]>('assets/json/state-city.json');
    }
 

}
