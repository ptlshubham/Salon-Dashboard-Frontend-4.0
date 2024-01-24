
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class ExpensesService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveExpensesList(data: any): Observable<any> {
        
        return this.httpClient.post<any>(ApiService.saveExpensesListURL, data);
    }
    getAllExpensesList(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getAllExpensesURL);
    }
    removeExpensesDetails(id: any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeexpensesDetailsURL, data);
    }
    updateExpensesList(admin: any): Observable<any> {
        console.log(admin, "updateservices")
        return this.httpClient.post<any>(ApiService.updateExpensesDetailsURL, admin);
    }
    getMonthlyExpensesList(): Observable<any[]> {
        return this.httpClient.get<any>(ApiService.getMonthlyExpensesURL);
    }
}
