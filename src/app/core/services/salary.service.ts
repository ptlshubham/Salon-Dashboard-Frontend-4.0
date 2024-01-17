
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class SalaryService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllSalaryList(id:any): Observable<any> {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getAllSalaryListURL, data);
    }
    removeSalaryList(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeSalaryListURL, data);
    }
    updateActiveStatusList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateSalaryStatusURL, admin);
    }
    updateSalaryList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateSalaryListURL, admin);
    }
    saveSalaryList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveSalaryListURL, admin);
    }

}
