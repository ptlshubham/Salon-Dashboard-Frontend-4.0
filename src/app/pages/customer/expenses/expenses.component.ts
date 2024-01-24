import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/core/services/expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  ExpensesModel: any = {};
  expensesList: any = [];
  constructor(
    private expensesService: ExpensesService
  ) {
  }

  ngOnInit(): void {
  }

  saveExpensesDetail() {
    this.expensesService.saveExpensesList(this.ExpensesModel).subscribe((data: any) => {
      this.expensesList = data;
    })
  }
}
