import { Component, OnInit } from '@angular/core';
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
  constructor() {}

  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };


  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Dashboard', active: true }
    ];
  }
}