import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { observeNotification } from 'rxjs/internal/Notification';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveRegistrationList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveRegistrationListURL, admin);
    }
    getAllRegistrationList(id: any) {
        debugger
        return this.httpClient.get<any>(ApiService.getAllRegistrationURL + id);
    }

    updateUserDetails(data: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateUserDetailsURL, data);
    }

    updateCompaniesDetails(data: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateCompaniesDetailsURL, data);
    }
    updateRegistrationList(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateRegistrationListURL, admin);
    }
    removeRegistrationDetails(id: any) {

        return this.httpClient.get<any>(ApiService.removeRegistrationDetailsURL + id);
    }
    saveGeneralDetails(admin: any) {

        return this.httpClient.post<any>(ApiService.saveGeneralSalonDetailsURL, admin);
    }
    getAllGeneralDetails(id: any): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllGeneralSalonDataURL + id);
    }
    saveSocialLinks(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveSocialLinksURL, admin);
    }
    saveCredentials(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveCredentialsURL, admin);
    }
    getSocialCredentials(id: any): Observable<any> {
        return this.httpClient.get<any>(ApiService.getSocialCredentialsURL + id);
    }
    getSocialLinks(id: any): Observable<any> {
        return this.httpClient.get<any>(ApiService.getSocialLinksURL + id);
    }
    uploadLogoImage(img: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.uploadLogoImageURL, img);
    }
    saveCompaniesLogo(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveCompaniesLogoURL, admin);
    }
}
