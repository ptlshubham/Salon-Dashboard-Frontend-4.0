import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import Swal from 'sweetalert2';

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
  editExpDetails(data: any){
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
      this.expensesModel = {};
      this.isOpen = false;
      this.isUpdate = false;
    })
  }
}
