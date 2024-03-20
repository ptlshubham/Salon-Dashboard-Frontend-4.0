import { Component } from '@angular/core';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.scss'
})
export class EarningsComponent {

  isOpen: boolean = false;
  collectionSize = 0;
  page = 1;
  pageSize = 10;
  paginateData: any = [];
  isUpdate: boolean = false;

  onselection() { }

  flatpickrOptions: any = {
    altInput: true,
    convertModelValue: true,
    mode: "range",
    maxDate: "today",
    // Disable future dates
  };
  pendinglist() {
    this.isOpen = true;
    this.isUpdate = false;
  }
  opendailyearnings() {
    this.isOpen = false;
    this.isUpdate = true;
  }

  openAddExpense() { }
  editExpDetails() { }
  removeExpense() { }
  getPagintaion() { }
}
