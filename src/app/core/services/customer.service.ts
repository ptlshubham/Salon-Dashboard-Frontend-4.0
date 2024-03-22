
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    bookingTimeInterval: any = [];
    constructor(
        private httpClient: HttpClient
    ) {
        this.getBookingTimeInterval().subscribe(data => {
            this.bookingTimeInterval = data;
        });
    }
    saveCustomerList(data: any) {

        return this.httpClient.post<any>(ApiService.saveCustomerListURL, data);
    }
    getAllCustomerList(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getAllCustomerURL);
    }
    saveAppointmentList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveAppointmentListURL, admin);
    }
    getAllAppointmentList(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getAllAppointmentURL);
    }
    getCompletedServices(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getAllCompletedServicesURL);
    }
    getViewAppointment(admin: any) {
        let data = {
            id: admin.id
        }
        return this.httpClient.post<any>(ApiService.getViewAppointmentURL, data);
    }
    removeCustomerAppointmentData(data: any) {
        return this.httpClient.post<any>(ApiService.removeAppointmentDetailsURL, data);
    }
    getDailyTotalList(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getDailyTotalURL);
    }
    getMonthlyTotalList(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getMonthlyTotalURL);
    }
    updateCustomerList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateCustomerListURL, admin);
    }
    removeCustomerDetails(id: any) {
        return this.httpClient.get<any>(ApiService.removeCustomerDetailsURL + id);
    }
    updateActiveStatusList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateActiveStatusURL, admin);
    }
    getCustAllPoint(id: any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getCustomerTotalPointsURL, data);
    }
    getAllCustomerDataList(id: any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getAllCustomerDataListURL, data);
    }
    getCustomerById(id: any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getCustomerByIdURL, data);
    }
    getServicesListUsingId(id: any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getUsedServicesByCustomerURL, data);
    }
    savePaymentDetails(admin: any) {
        return this.httpClient.post<any>(ApiService.saveModeOfPayment, admin);
    }
    getPaymentDetails(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getAllModeOfPayment);
    }
    getMonthlyDetails(): Observable<any> {
        return this.httpClient.get<any>(ApiService.getMonthlyPayment);
    }
    getCustomerDataById(id: any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getCustomerDataByIdURL, data);
    }
    emailVerify(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.verificationURL, admin);
    }
    getOtpforRegister(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.getRegisterOtpURL, admin);
    }
    saveUserCustomerList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveUserCustomerListURL, admin);
    }
    savePurchasedOrder(data: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveOfferPurchaseURL, data);
    }
    removeLastInsertedOTP(data: any) {

        return this.httpClient.post<any>(ApiService.removeLastInsertedOTPURL, data);
    }
    getActivatedMembershipDetail(id: any) {

        return this.httpClient.get<any>(ApiService.getActivatedMembershipURL + id);
    }
    saveRatingsDetailsById(data: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveRatingsDetailsURL, data);
    }
    getBookingTimeInterval(): Observable<any> {
        return this.httpClient.get("./assets/json/Time-Interval.json");

    }
    updateCompleteServiceDetails(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateCompleteServicesURL, admin)
    }
    updateCompleteStatusDetails(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateAppointmentServicesStatusURL, admin)
    }
}
