import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import Swal from 'sweetalert2';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  isOpen: boolean = false;
  expensesModel: any = {};
  expensesList: any = [];
  collectionSize = 0;
  page = 1;
  pageSize = 10;
  paginateData: any = [];
  formdate: Date = new Date();
  isUpdate: boolean = false;
  validationForm!: FormGroup;
  paymentData: any = [
    { name: 'Gpay' },
    { name: 'Cash' },
    { name: 'Bank-Tansaction' },

  ]
  
  totalprice: number =0;
  dailyTotal: number = 0;

  finalprice: any = 0;
  tempServiceData: any = [];
  
  constructor(
    private expensesService: ExpensesService,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    public datePipe: DatePipe
  ) {


  }
  ngOnInit(): void {

    this.getAllExpenses()

    this.validationForm = this.formBuilder.group({
      expensesprices: ['', [Validators.required]],
      employeename: ['', [Validators.required]],
      expensesname: ['', [Validators.required]],
      expensesdate: ['', [Validators.required]],
      paymenttype: ['', [Validators.required]],

    });
  }
  get f() { return this.validationForm.controls; }

  backToTable() {
    this.isOpen = false;
    this.isUpdate = false;
    this.validationForm.markAsUntouched();
    this.expensesModel = {};
  }
  backToExpenses() {
    this.isOpen = false
  }
  openAddExpense() {
    this.isOpen = true;
    this.isUpdate = false;
    this.expensesModel = {};
    this.validationForm.markAsUntouched();
  }

  // -------------------------------get data------------//
  getAllExpenses() {
    this.expensesService.getAllExpensesList().subscribe((data: any) => {
      this.expensesList = data;
      for (let i = 0; i < this.expensesList.length; i++) {
        this.expensesList[i].index = i + 1;
      }
      this.collectionSize = this.expensesList.length;
      this.getPagintaion();
    });
  }
  getPagintaion() {
  
    this.paginateData = this.expensesList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    
    
  }
  // -----------------------get data end---------------//


  removeExpense(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.expensesService.removeExpensesDetails(id).subscribe((req) => {
        })
        this.getAllExpenses();
        Swal.fire('Deleted!', 'Expense details has been deleted.', 'success');
      }
    });
  }
  editExpDetails(data: any) {
    this.isOpen = true;
    this.isUpdate = true;
    this.expensesModel = data;
  }
  updateExpenseDetail() {
    this.expensesService.updateExpensesList(this.expensesModel).subscribe((req) => {
      this.toastr.success('Expense details updated successfully', 'Updated', { timeOut: 3000 });
      this.isOpen = false;
      this.isUpdate = false;
      this.getAllExpenses();
    })
  }
  saveExpensesDetail() {

    this.expensesService.saveExpensesList(this.expensesModel).subscribe((data: any) => {
      this.expensesList = data;
      this.toastr.success('Expense details added successfully', 'Success', { timeOut: 3000 });
      this.expensesList = data;
      this.getAllExpenses();
      this.dailyTotal = 0;
      this.paginateData.reduce((sum: any, p: any) => sum + p.expensesprices, 0)

      this.expensesModel = {};
      this.isOpen = false;
      this.isUpdate = false;
    })
  }
  
  generateInvoicePDF() {

    let documentDefinition: any = {
     
      footer: function (currentPage:any, pageCount:any) {
        return { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'center', fontSize: 10, margin: [0, 20, 0, 0] }
      },
      content: [
        {
          columns: [
            {
              image: 'webimg',
              width: 140,
              height: 60,
              alignment: 'left',
              margin: [0, 0, 0, 10],
              color: 'black',

            },
            [
              {
                text: 'Invoice:   Billing',
                bold: true,
                style: 'companydetail'
              },
              {
                text: 'Address:   14-Commerce Complex ',
                style: 'companydetail'
              },
              {
                text: 'City: Anand,  State: Gujarat',
                style: 'companydetail'
              },
              {
                text: 'Contact No: +91 942-731-8581',
                style: 'companydetail'
              },

            ]
          ]
        },
        {
          text: 'Invoice',
          style: 'sectionHeader',
          fontSize: 32,
          alignment: 'center',
          color: '#54575a',
          margin: [30, 0, 35, 10]
        },
        {
          columns: [
            [
              {
                text: `DATE: ${new Date().toLocaleString()}`,
                style: ['Bill']
              },
              {
                text: `INVOICE : ${((Math.random() * 1000).toFixed(0))}`,
                style: ['Bill']
              }
            ]
          ]
        },
        {
          text: 'Invoice Type:    Expenses ',
          alignment: 'left',
          fontSize: 14,
        },
        {
          text: 'Expenses :    ',
          alignment: 'left',
          fontSize: 14,
          margin: [0, 0, 0, 15]
        },
        {
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: ['auto','*', '*', 'auto', 'auto'],
            body: [
               [// {text: 'Index', style: 'tablehead'}, 
                { text: 'Expenses Name', style: 'tablehead' },
                { text: 'Expenses Date', style: 'tablehead' },
                { text: 'Employee Name', style: 'tablehead' },
                { text: 'Payment Type', style: 'tablehead' },
                { text: 'Expense Price', style: 'tablehead' }],
              ...this.paginateData.map((p:any ,index:any) => ([
                //{ text: p.index, style: 'tablecell' },
                { text: p.expensesname, style: 'tablecell' },
                { text: new Date(p.expensesdate).getDate() + "/" + (new Date(p.expensesdate).getMonth() + 1) + "/" + (new Date(p.expensesdate).getFullYear()), style: 'tablecell' },
                { text: p.employeename, style: 'tablecell' },
                { text: p.paymenttype, style: 'tablecell' },
                { text: "₹" + p.expensesprices, style: 'tablecell' }])),
              [{}, {},
              // { text: 'Total Entry: ', bold: true, fontSize: 14, colSpan: 2, alignment: 'right', margin: [0, 25, 0, 0] },
              // {}, { text: this.paginateData.reduce((sum: any) => sum + 1, 0), bold: true, fontSize: 14, margin: [0, 25, 0, 0], alignment: 'center' }],
              // [{}, {},
              { text: 'Total Expenses: ', bold: true, fontSize: 18, colSpan: 2, alignment: 'right' },
              {}, { text: "₹" + this.paginateData.reduce((sum: any, p: any) => sum + p.expensesprices, 0), bold: true, fontSize: 18, alignment: 'center' }],

            ],
            margin: [0, 0, 0, 15]
          }
        },
      ],
      images: {
        webimg: 'https://res.cloudinary.com/dfojt5f1l/image/upload/v1654778945/media/keryar/output-onlinepngtools_vysa26.png',
      
      },
      styles: {
        Bill: {
          fontSize: 10,
          alignment: 'left',
          margin: [380, 0, 0, 0],
          fillColor: '#dedede',
        },
        companydetail: {
          alignment: 'left',
          margin: [200, 0, 0, 5],
          fontSize: 10
        }, 
        tablehead: {
          bold: true,
          fontSize: 12,
          alignment: 'center',
        },
        tablecell: {
          margin: [0, 0, 0, 5],
          alignment: 'center',
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();

  }
  // addPoinInList() {
  //   this.finalprice = 0;
  //   this.tempServiceData.forEach((element: any) => {
  //     if (element.totalAmount != undefined) {
  //       this.finalprice = this.finalprice + element.totalAmount;
  //     }
  //   });
  // }
}
