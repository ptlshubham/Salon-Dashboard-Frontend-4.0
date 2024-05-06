import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  pendingData: any = [];
  searchQuery: string = '';

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

  userBookingData: any = {};
  totalPriceForDetails: number = 0;
  totalPointForDetails: number = 0;
  usedServices: any = [];
  selectedPaymentMethod: string = 'UPI'; // Default selected option
  billingModel: any = [];
  cash: number = 0;
  online: number = 0;
  exceedError: string | null = null;

  constructor(
    private customerService: CustomerService,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private modalService: NgbModal,

  ) {
    this.activatedRoute.queryParams.subscribe(res => {
      if (res.id != undefined) {
        this.isOpen = true;
        this.isUpdate = false;
        this.customerService.getAllPaymentDetails().subscribe((data: any) => {
          data.forEach((element: any) => {
            if (element.pendingstatus == true && element.cid == res.id) {
              this.pendingPaymentData.push(element);
            }

          });
          this.getPendingPagintaion();
          this.collectionSize = this.todayPaymentData.length;
        });
      }
      else {
        this.getPendingPayment();
      }

    });

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
        if (element.pendingstatus == true) {

          this.pendingAmount = this.pendingAmount + element.pending;
          this.pendingPaymentData.push(element);
          this.pendingData.push(element);
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
  applySearchFilter() {
    this.paginateDataPending = [];

    this.page = 1; // Reset the page when the search query changes
    this.pendingData = this.pendingPaymentData.filter((customer: any) =>
      customer.whatsapp.includes(this.searchQuery) ||
      (customer.fname + ' ' + customer.lname).toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.getPendingPagintaion();
  }

  openUsedServiceList(obj: any, exlargeModal: any) {
    debugger
    this.userBookingData = obj;
    this.totalPriceForDetails = obj.tprice
    this.totalPointForDetails = obj.tpoint
    this.getUsedServicesDetails(obj.appointmentid);
    this.modalService.open(exlargeModal, { size: 'xl', windowClass: 'modal-holder', centered: true });
  }

  getUsedServicesDetails(id: any) {
    this.customerService.getServicesListUsingId(id).subscribe((data: any) => {
      this.usedServices = data;
      this.userBookingData.services = data;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
  }

  openPaymentData(content: any) {
    this.getCustomerPoints(this.userBookingData.cid);
    this.billingModel.pendingamount = this.userBookingData.pending;

    this.modalService.open(content, { size: 'xl', windowClass: 'modal-holder', centered: true });
  }

  onPaymentMethodChange() {
    this.userBookingData.paymentMethod = this.selectedPaymentMethod;
  }

  getCustomerPoints(id: any) {
    this.customerService.getCustAllPoint(id).subscribe((data: any) => {
      this.userBookingData.totalcustpoint = data[0].totalcustpoint;
    });
  }

  calculationOfPayment(enteredValue: any, value: string) {
    this.pendingAmount = this.billingModel.pendingamount;
    const enteredValueNum: number = parseFloat(enteredValue); // Convert enteredValue to a number


    if (value === 'cash') {
      if (this.cash > 0) {
        const tempPending: number = this.pendingAmount + this.cash;
        this.billingModel.pendingamount = tempPending - enteredValueNum;
        this.billingModel.cashamount = enteredValueNum;
        this.cash = enteredValueNum;
        this.pendingAmount = this.billingModel.pendingamount;

      } else {
        this.billingModel.pendingamount -= enteredValueNum;
        this.billingModel.cashamount = enteredValueNum;
        this.cash = enteredValueNum;
        this.pendingAmount = this.billingModel.pendingamount;

      }
    } else if (value === 'online') {
      if (this.online > 0) {
        const tempPending: number = this.pendingAmount + this.online;
        this.billingModel.pendingamount = tempPending - enteredValueNum;
        this.billingModel.onlineamount = enteredValueNum;
        this.online = enteredValueNum;
        this.pendingAmount = this.billingModel.pendingamount;

      } else {
        this.billingModel.pendingamount -= enteredValueNum;
        this.billingModel.onlineamount = enteredValueNum;
        this.online = enteredValueNum;
        this.pendingAmount = this.billingModel.pendingamount;

      }
    }
    if (this.pendingAmount > 0 && (this.cash + this.online) > this.pendingAmount) {

      this.exceedError = 'Error: Total payment exceeds pending amount.';
      // You can add code here to display an error message to the user
      return; // Exit the method if total payment exceeds pending amount
    }
  }
  savePaymentDetails() {

  }






  editExpDetails() { }
  removeExpense() { }
  onselection() { }


}
