import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ServiceListService } from 'src/app/core/services/services.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import { VendorService } from 'src/app/core/services/vendor.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { MembershipService } from 'src/app/core/services/membership.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  title!: string;
  dataSource!: Object;
  num: number = 0;

  public customerList: any = [];
  public servicesList: any = [];
  public dailyexpensesList: any = [];
  public vendorList: any = [];
  offerList: any = [];
  ExpensesList: any = [];
  MembershipList: any = [];
  
  appointmentList: any = [];
  usedServices: any = [];

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  paginateActiveData: any = [];

  totalPriceForDetails: number = 0;
  totalPointForDetails: number = 0;

  constructor(

    private servicesService: ServiceListService,
    private customerService: CustomerService,
    private expensesService: ExpensesService,
    private vendorService: VendorService,
    private offerService: OfferService,
    private membershipService: MembershipService,
    private router: Router,
    private modalService: NgbModal,

  ) {
    this.getAllAppointment();
  }


  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    // decimalPlaces: 2,
  };


  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Dashboard', active: true }
    ];
    this.getCustomerDetails();
    this.getServicesDetails();
    this.getExpensesDetails();
    this.getVendorServiceDetails();
    this.getOfferDetails();
    this.getMembershipServiceDetails();

  }
  getServicesDetails() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
  }
  getCustomerDetails() {
    this.customerService.getAllCustomerList().subscribe((data: any) => {
      this.customerList = data;
    });
  }
  getExpensesDetails() {
    this.expensesService.getAllExpensesList().subscribe((data: any) => {
      this.dailyexpensesList = data;
    });
  }
  getVendorServiceDetails() {
    this.vendorService.getAllVendorList().subscribe((data: any) => {
      this.vendorList = data;
    });
  }
  getOfferDetails() {

    this.offerService.getAllOfferList().subscribe((data: any) => {
      this.offerList = data;
    });
  }
  getMembershipServiceDetails() {

    this.membershipService.getAllMembershipList().subscribe((data: any) => {
      this.MembershipList = data;
    });
  }
  getofferSerivceDetails() {

    this.offerService.getAllOfferList().subscribe((data: any) => {
      this.MembershipList = data;
    });
  }

  openCustomer() {
    this.router.navigate(['/custom/user-list']);
  }
  openService() {
    this.router.navigate(['/custom/service-list']);
  }
  openExpenses() {
    this.router.navigate(['/custom/expenses']);
  }
  openVendor() {
    this.router.navigate(['/custom/vendor']);
  }
  openMembershipService() {
    this.router.navigate(['/custom/membership']);
  }
  openofferSerivce() {
    this.router.navigate(['/custom/combo-offer'])
  }

  getAllAppointment() {
    this.customerService.getAllAppointmentList().subscribe((data: any) => {
      this.appointmentList = data;
      debugger
      for (let i = 0; i < this.appointmentList.length; i++) {
        this.appointmentList[i].index = i + 1;
        this.customerService.getServicesListUsingId(data[i].id).subscribe((data: any) => {
          this.usedServices = data;
          debugger
          for (let i = 0; i < this.usedServices.length; i++) {
            this.usedServices[i].index = i + 1;
          }
        });
      }
      this.collectionSize = this.servicesList.length;
      this.getPagintaion();
    });
  }
  getPagintaion() {
    this.paginateActiveData = this.appointmentList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  openUsedServiceList(obj: any,exlargeModal: any) {
    this.totalPriceForDetails = obj.totalprice
    this.totalPointForDetails = obj.totalpoint
    this.customerService.getServicesListUsingId(obj.id).subscribe((data: any) => {
      this.usedServices = data;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
    this.modalService.open(exlargeModal, { size: 'xl', windowClass: 'modal-holder', centered: true });

  }
}