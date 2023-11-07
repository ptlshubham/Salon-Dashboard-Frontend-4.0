
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Services } from '../models/services.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class ServiceListService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveServiceList(admin: Services): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveServicesListURL, admin);
    }
    getAllServicesList(): Observable<Services[]> {
        return this.httpClient.get<any>(ApiService.getAllServicesURL);
    }
    updateServicesList(admin: Services): Observable<any[]> {
        return this.httpClient.post<any>(ApiService.updateServicesListURL, admin);
    }
    removeServicesList(id:any) {
        return this.httpClient.get<any>(ApiService.removeServicesListURL + id);
    }
    removeCustomerDetails(id:any) {
        return this.httpClient.get<any>(ApiService.removeCustomerDetailsURL + id);
    }
}
