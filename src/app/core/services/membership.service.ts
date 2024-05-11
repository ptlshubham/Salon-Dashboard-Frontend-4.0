
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
    getAllMembershipList(id: any): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllMembershipURL + id);
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

    getAllActiveMembership(id: any): Observable<any> {
        return this.httpClient.get<any>(ApiService.getAllActiveMembershipURL + id);
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
    updatePurchaseMembershipStatus(id: any) {
        return this.httpClient.get<any>(ApiService.updatePurchaseMembershipStatusURL + id);
    }
    activeDeavctiveMemberShip(admin: any): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateActiveMemberShipURL, admin);
    }
}
