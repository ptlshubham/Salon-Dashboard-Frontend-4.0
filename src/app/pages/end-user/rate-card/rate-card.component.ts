import { Component } from '@angular/core';
import { ServiceListService } from 'src/app/core/services/services.service';



@Component({
  selector: 'app-rate-card',
  templateUrl: './rate-card.component.html',
  styleUrl: './rate-card.component.scss'
})
export class RateCardComponent {
  public servicesList: any = [];

  filteredServiceList: any = [];

  searchQuery: string = '';
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  paginateData: any = [];


  constructor(
    private servicesService: ServiceListService,


  ) {

  }
  ngOnInit(): void {
    this.getAllServices();
  }
  backToDashBoard() { }

  applySearchFilter() {
    this.page = 1; // Reset the page when the search query changes
    this.filteredServiceList = this.servicesList.filter((service: any) =>
      service.name.includes(this.searchQuery) ||
      (service.name).toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.getPagintaion();
  }

  getPagintaion() {
    this.paginateData = this.filteredServiceList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
      this.filteredServiceList = [...this.servicesList];
      for (let i = 0; i < this.servicesList.length; i++) {
        this.servicesList[i].index = i + 1;
      }
      this.collectionSize = this.servicesList.length;
      this.getPagintaion();
    });
  }
}
