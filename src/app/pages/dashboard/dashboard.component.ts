import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ServiceListService } from 'src/app/core/services/services.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import { VendorService } from 'src/app/core/services/vendor.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { MembershipService } from 'src/app/core/services/membership.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { BannersService } from 'src/app/core/services/banners.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showNavigationIndicators = true; // Assuming you want to show navigation indicators by default
  banners: any[] = [];
  mpage: any;
  totalRec: any;
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


  page = 1;
  pageSize = 10;
  collectionSize = 0;
  paginateActiveData: any = [];

  totalPriceForDetails: number = 0;
  totalPointForDetails: number = 0;
  imagesData: any = [];

  showNavigationArrows: any;
  constructor(
    private bannersService: BannersService,
    private employeeService: EmployeeService,
    private servicesService: ServiceListService,
    private customerService: CustomerService,
    private expensesService: ExpensesService,
    private vendorService: VendorService,
    private offerService: OfferService,
    private membershipService: MembershipService,
    private router: Router,

  ) {
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

    this.getwebsilder();
    this.getCustomerDetails();
    this.getServicesDetails();
    this.getExpensesDetails();
    this.getVendorServiceDetails();
    this.getOfferDetails();
    this.getMembershipServiceDetails();

  }
  getwebsilder() {
    this.bannersService.getWebSlider().subscribe((res: any) => {
      debugger
      this.imagesData = res;
      for (let i = 0; i < this.imagesData.length; i++) {
        this.imagesData[i].index = i + 1;
      }
    })

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
  openearnings() {
    this.router.navigate(['/custom/earnings'])
  }


}
