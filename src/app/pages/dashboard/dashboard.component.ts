import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import { BannersService } from 'src/app/core/services/banners.service';
import { ChartType } from './dashboard.model';
import { basicRadialBarChart, investedOverview, News } from './data';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  simplePieChart!: ChartType;
  basicRadialBarChart!: ChartType;

  investedOverview!: ChartType;
  News: any;


  page = 1;
  pageSize = 10;
  collectionSize = 0;
  paginateActiveData: any = [];

  totalPriceForDetails: number = 0;
  totalPointForDetails: number = 0;
  imagesData: any = [];

  showNavigationArrows: any;
  topServiceChart: ChartType = {
    chart: {
      width: 227,
      height: 227,
      type: 'pie'
    },
    colors: ["#35398e", "#3c40a0", "#4348b3", "#5156be", "#6468c5"],
    legend: { show: !1 },
    stroke: {
      width: 0
    },
    series: [],
    labels: [],
  };


  timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    navText: ["", ""],
    dots: true,
    responsive: {
      680: {
        items: 4
      },
    }
  }
  constructor(

    private bannersService: BannersService,
    private customerService: CustomerService,
    private expensesService: ExpensesService,
    private dashboardService: DashboardService,

    private router: Router,
  ) {
    this.getCustomerServicesChart();
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
    this._fetchData();
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

  private _fetchData() {
    this.basicRadialBarChart = basicRadialBarChart;
    this.investedOverview = investedOverview;
    this.News = News;
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
  getCustomerServicesChart() {
    this.dashboardService.getCustservice().subscribe((data: any) => {
      debugger
      data.forEach((element: any) => {
        this.topServiceChart.series.push(element.service_count);
        this.topServiceChart.labels.push(element.servicesname);
      });
    });
  }
}
