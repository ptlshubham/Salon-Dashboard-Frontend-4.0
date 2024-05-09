import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-view-sallon',
  templateUrl: './view-sallon.component.html',
  styleUrl: './view-sallon.component.scss'
})
export class ViewSallonComponent {
  validationForm!: FormGroup;
  isUpdate: boolean = false;
  isOpen: boolean = false;
  sallonmodel: any = {};
  collectionSize = 0;
  page = 1;
  pageSize = 10;
  paginateData: any = [];
  RegistartionModel: any = {};
  selectedaname: any[] = [];
  customerModel: any = {};
  public saloonlist: any[] = [];
  public customerList: any[] = [];
  filteredCustomerList: any = [];


  constructor(
    public formBuilder: UntypedFormBuilder,
    private adminService: AdminService,
    private CustomerService: CustomerService


  ) {

  }
  ngOnInit(): void {

    this.onselectsaloon();
    // this.getAllRegistration();
    this.validationForm = this.formBuilder.group({
      sname: ['', [Validators.required]]

    });
  }

  customerdetails: any[] = [
    {
      index: "1",
      cname: "hi",
      whatsapp: "9574626369",
      gender: "male",
      email: "het@gmail.com"
    }
  ]

  getPagintaion() {
    this.paginateData = this.saloonlist.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  get f() { return this.validationForm.controls; }

  // getAllRegistration() {
  //   this.adminService.getAllRegistrationList().subscribe((data: any) => {
  //     this.saloonlist = data;
  //     for (let i = 0; i < this.saloonlist.length; i++) {
  //       this.saloonlist[i].index = i + 1;
  //     }
  //     this.collectionSize = this.saloonlist.length;

  //   });
  // }
  onselectsaloon() {
    this.CustomerService.getAllCustomerList().subscribe((data: any) => {
      this.customerList = data;
      this.filteredCustomerList = [...this.customerList]; // Initialize filtered list

      for (let i = 0; i < this.customerList.length; i++) {
        this.customerList[i].index = i + 1;
      }
      this.collectionSize = this.customerList.length;
      this.getPagintaion();
    });
  }
}
