import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class BannersService {
  

  constructor(
    private httpClient: HttpClient
  ) { }
  getWebSlider(): Observable<any>{
    return this.httpClient.get<any>(ApiService.getactiveBannerURL);
  }
  
  uploadImage(img:any): Observable<any>{
     
    return this.httpClient.post<any>(ApiService.uploadBannersImageURL, img);

  }
  saveWebBannersImage(admin: any): Observable<any> {
     
    return this.httpClient.post<any>(ApiService.saveWebBannersURL, admin);
  }
  getWebBanners(): Observable<any[]>{
    return this.httpClient.get<any>(ApiService.getWebBannersURL);
  }
  removeWebBanners(id:any){
    let bnr={
      id:id
    }
    return this.httpClient.post<any>(ApiService.removeWebBannersURL,bnr);
  }

  activeDeavctiveWebBanners(admin: any): Observable<any> {
     
    return this.httpClient.post<any>(ApiService.updateActiveWebStatusURL, admin);
  }
}


