import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
    providedIn: 'root'
})
export class MarketingService {

    constructor(
        private httpClient: HttpClient
    ) { }
    uploadRefrenceImage(img: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.UploadRefrenceImageURL, img);
    }
    RemoveRefrenceImage(id: any) {
        let bnr = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.RemoveRefrenceImageURL, bnr);
    }
    SavePromotiondetails(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.SavePromotiondetailsURL, admin);
    }
    UploadMultiRefrence(img: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.UploadMultiRefrenceURL, img);
    }
}