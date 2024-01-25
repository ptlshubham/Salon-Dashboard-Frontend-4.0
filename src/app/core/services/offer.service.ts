
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class OfferService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveOfferList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveOfferListURL, admin);
    }
    getAllOfferList(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllOfferURL);
    }
    getActiveOfferList(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getActiveOfferURL);
    }
    saveAppointmentList(admin: any): Observable<any> {
         
        return this.httpClient.post<any>(ApiService.saveAppointmentListURL, admin);
    }
    getAllAppointmentList(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllAppointmentURL);
    }
    getCompletedServices(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllCompletedServicesURL);
    }
    getViewAppointment(admin:any) {
        let data = {
            id: admin.id
        }
        return this.httpClient.post<any>(ApiService.getViewAppointmentURL, data);
    }
    updateOfferList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateOfferListURL, admin);
    }
    removeOfferDetails(id:any) {
        return this.httpClient.get<any>(ApiService.removeOfferDetailsURL + id);
    }
    getCustAllPoint(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getOfferTotalPointsURL, data);
    }
    getAllOfferDataList(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getAllOfferDataListURL, data);
    }
    getServicesListUsingId(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getUsedServicesByOfferURL, data);
    }
    activeDeavctiveOffers(admin: any): Observable<any> {
     
        return this.httpClient.post<any>(ApiService.updateActiveOffersURL, admin);
      }
}
