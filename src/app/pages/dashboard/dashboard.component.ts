import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ServiceListService } from 'src/app/core/services/services.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import { VendorService } from 'src/app/core/services/vendor.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { MembershipService } from 'src/app/core/services/membership.service';
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
  totalExpense: number = 0;

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
    private customerService: CustomerService,
    private expensesService: ExpensesService,
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
    this.getExpensesDetails();

  }
  getwebsilder() {
    this.bannersService.getWebSlider().subscribe((res: any) => {

      this.imagesData = res;
      for (let i = 0; i < this.imagesData.length; i++) {
        this.imagesData[i].index = i + 1;
      }
    })

  }
  getCustomerDetails() {
    this.customerService.getAllCustomerList().subscribe((data: any) => {
      this.customerList = data;
    });
  }
  getExpensesDetails() {
    this.expensesService.getAllExpensesList().subscribe((data: any[]) => {
      const todayDate = new Date().toISOString().slice(0, 10); // Get today's date in "YYYY-MM-DD" format
      const todayExpenses = data.filter((expense: any) => {
        const expenseDate = expense.expensesdate.slice(0, 10); // Get date part only
        return expenseDate === todayDate && expense.expensesprices > 0;
      });
  
      // Calculate total expense amount for today
      let totalExpense = 0;
      todayExpenses.forEach((expense: any) => {
        totalExpense += expense.expensesprices;
      });
  
      // Store total expense amount in the variable
      this.totalExpense = totalExpense;
  
      // Store filtered expenses in dailyexpensesList
      this.dailyexpensesList = todayExpenses;
    });
  }
 
  openCustomer() {
    this.router.navigate(['/custom/user-list']);
  }
  openExpenses() {
    this.router.navigate(['/custom/expenses']);
  }
  openearnings() {
    this.router.navigate(['/custom/earnings'])
  }


}
