import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(
        private httpClient: HttpClient
    ) { }
    getCustservice(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getCustomerServicesURL);
    }
}