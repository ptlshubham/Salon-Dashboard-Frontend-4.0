import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ServiceListService } from 'src/app/core/services/services.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import { VendorService } from 'src/app/core/services/vendor.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { MembershipService } from 'src/app/core/services/membership.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
mpage: any;
totalRec: any;
paginateData: any;
page = 1;
pageSize = 10;
collectionSize = 0;

cContact: any;
  cEmail: any;
  cName: any;
  cPoint: any;
  cPrice: any;
  cId: any;
  appId: any;
totalPriceForDetails: any;
totalPointForDetails: any;
  isworking: any;
modeOfPayment(obj:any) {
  this.cContact = obj.contact;
  this.cEmail = obj.email;
  this.cName = obj.fname + ' ' + obj.lname;
  this.cPoint = obj.totalpoint;
  this.cPrice = obj.totalprice;
  this.cId = obj.custid;
  this.appId = obj.id;
}
openUsedServiceList(obj:any) {
  this.totalPriceForDetails = obj.totalprice
  this.totalPointForDetails = obj.totalpoint
  this.customerService.getServicesListUsingId(obj.id).subscribe((data: any) => {
    this.servicesList= data;
    for (let i = 0; i < this.servicesList.length; i++) {
      this.servicesList[i].index = i + 1;
    }
  });
}
updateEmpProcessingActive(data:any) {
  let valu = {
    id: data.id,
    isworking: this.isworking = false
  }
  this.employeeService.updateEmpActiveStatus(valu).subscribe((data: any) => {
    this.getAllEmployee();
  })
}
updateEmpProcessingDeActive(data:any) {
  let valu = {
    id: data.id,
    isworking: this.isworking = true
  }
  this.employeeService.updateEmpActiveStatus(valu).subscribe((data: any) => {
    this.getAllEmployee();
  })
}


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  title!: string;
  dataSource!: Object;
  num: number = 0;
  public employeeReg: any[] = [];
  
  public customerList: any = [];
  public servicesList: any = [];
  public dailyexpensesList: any = [];
  public vendorList: any = [];
  offerList: any = [];
  ExpensesList: any = [];
  MembershipList: any = [];
appointmentList: any;

 

  constructor(
    private employeeService: EmployeeService,
    private servicesService: ServiceListService,
    private customerService: CustomerService,
    private expensesService: ExpensesService,
    private vendorService: VendorService,
    private offerService: OfferService,
    private membershipService: MembershipService,
    private router: Router
  ) {
   
      this.getAllServices();
       this.getAllEmployee();
    
   }
   getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
      for (let i = 0; i < this.servicesList.length; i++) {
        this.servicesList[i].index = i + 1;
      }
      this.collectionSize = this.servicesList.length;
       
    });
  }
 
  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;

      for (let i = 0; i < this.employeeReg.length; i++) {
        this.employeeReg[i].index = i + 1;
      }
      this.collectionSize = this.employeeReg.length;
      this.getPagintaion();
    });
  }
  getPagintaion() {
    this.paginateData = this.employeeReg.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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
}