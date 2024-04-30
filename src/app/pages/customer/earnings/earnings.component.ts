import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.scss'
})
export class EarningsComponent implements OnInit {

  isOpen: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  paginateData: any = [];

  pagePending = 1;
  pageSizePending = 10;
  collectionSizePending = 0;
  paginateDataPending: any = [];

  isUpdate: boolean = false;
  flatpickrOptions: any = {
    altInput: true,
    convertModelValue: true,
    mode: "range",
    maxDate: "today",
    // Disable future dates
  };
  pendingPaymentData: any = [];
  todayPaymentData: any = [];
  todayDate: any;
  todayTotalAmount: number = 0;
  pendingAmount: number = 0;
  num: number = 0;

  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    // decimalPlaces: 2,
  };

  constructor(
    private customerService: CustomerService,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe

  ) {
    this.getPendingPayment();
    // this.getTodayPendingPayment();
  }
  ngOnInit(): void {

  }
  opendailyearnings() {
    this.isOpen = false;
    this.isUpdate = true;
  }

  getPendingPayment() {
    this.todayTotalAmount = 0;
    this.pendingAmount = 0;
    let nowDate = new Date();
    // Format the date using DatePipe
    this.todayDate = this.datePipe.transform(nowDate, 'yyyy-MM-dd');
    this.customerService.getAllPaymentDetails().subscribe((data: any) => {
      
      data.forEach((element: any) => {
        let lastpdate = element.lastpdate;
        let lastdateWithoutTime = new Date(lastpdate).toISOString().split('T')[0];

        if (lastdateWithoutTime == this.todayDate) {
          
          this.todayTotalAmount = this.todayTotalAmount + element.paidprice;
          this.todayPaymentData.push(element)
        }
        if (lastdateWithoutTime == this.todayDate && element.pendingstatus == true) {
          
          this.pendingAmount = this.pendingAmount + element.pending;
          this.pendingPaymentData.push(element);
        }

      });
      this.getPagintaion();
      this.collectionSize = this.todayPaymentData.length;
    });
  }
  getPagintaion() {
    for (let i = 0; i < this.todayPaymentData.length; i++) {
      this.todayPaymentData[i].index = i + 1;
    }
    this.paginateData = this.todayPaymentData.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  pendinglist() {
    this.isOpen = true;
    this.isUpdate = false;
    this.collectionSizePending = this.pendingPaymentData.length;
    this.getPendingPagintaion();
  }
  getPendingPagintaion() {
    for (let i = 0; i < this.pendingPaymentData.length; i++) {
      this.pendingPaymentData[i].index = i + 1;
    }
    this.paginateDataPending = this.pendingPaymentData.slice((this.pagePending - 1) * this.pageSizePending, (this.pagePending - 1) * this.pageSizePending + this.pageSizePending);
  }
  editExpDetails() { }
  removeExpense() { }
  onselection() { }
}
