
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class MembershipService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveMembershipList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveMembershipListURL, admin);
    }
    getAllMembershipList(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllMembershipURL);
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
    getAllMemberPurchased(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllMembershipPurchasedURL);
    }

    updateMembershipList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateMembershipListURL, admin);
    }
    removeMembershipDetails(id: any) {
        return this.httpClient.get<any>(ApiService.removeMembershipDetailsURL + id);
    }

    getAllActiveMembership(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getAllActiveMembershipURL);
    }
    getMemberServicesUsingId(id: any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getUsedServicesByMembershipURL, data);
    }
    savePurchaseServiceList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.savePurchaseServiceListURL, admin);
    }
    getPurchasedDetail(data: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.getMembershipPurchasedByIDURL, data);
    }
    activeDeavctiveMemberShip(admin: any): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateActiveMemberShipURL, admin);
    }
}
