
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class vendorproductService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveVendororderList(admin: any): Observable<any> {
        debugger
        return this.httpClient.post<any>(ApiService.saveVendorOrderListURL, admin);
    }
    getVendorOrderList(id: any) {
        debugger
        return this.httpClient.get<any>(ApiService.getVendorOrderListURL + id);
    }
    removeorderDetails(id: any) {
        debugger
        return this.httpClient.get<any>(ApiService.removeorderDetailsURL + id);
    }

}
