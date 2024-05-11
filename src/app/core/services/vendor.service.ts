
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class VendorService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveVendorList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveVendorListURL, admin);
    }
    getAllVendorList(id: any): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllVendorURL + id);
    }
    removeVendorList(id: any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeVendorListURL, data);
    }
    updateVenList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateVendorListURL, admin);
    }

}
