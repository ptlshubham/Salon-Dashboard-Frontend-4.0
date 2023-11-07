import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/core/models/employee.model';
import { Services } from 'src/app/core/models/services.model';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ServiceListService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  isOpen: boolean = false;
  isUpdate: boolean = false;
  validationForm!: FormGroup;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  paginateData: any = [];

  stateData: any = [];
  cityData: any = [];
  selectedState: any;
  selectedCity: any;
  selectedServices: any;
  selectedGender: any;
  cityListData: any = [];
  genderData: any = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' }

  ]

  public employeeModel: Employee = new Employee;
  public employeeReg: Employee[];
  public servicesList: Services[];

  constructor(
    private servicesService: ServiceListService,
    private employeeService: EmployeeService,
    public formBuilder: UntypedFormBuilder,
  ) {
    this.getStateList();
    this.getAllServices();
  }

  ngOnInit(): void {
    this.selectedServices = 'Select Services';
    this.validationForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      whatsapp: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', [Validators.required]],
      selectState: ['', [Validators.required]],
      landmark: [''],
      services: ['Select Services', [Validators.required]],
      city: ['', [Validators.required]],
      selectGender: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],

    });

  }
  get f() { return this.validationForm.controls; }


  backToTable() {
    this.isOpen = false;
    this.isUpdate = false;
    // this.servicesModel = [];
    this.validationForm.markAsUntouched();
  }

  openAddEmployee() {
    this.isOpen = true;
    this.isUpdate = false;
    // this.servicesModel = [];
    this.validationForm.markAsUntouched();
  }
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
  }

  getStateList() {
    this.employeeService.getStateFromJson().subscribe((res: any) => {
      this.stateData = res;
    })
  }
  selectStateData(e: any): void {
    this.selectedState = e.target.value;
    this.getCityListAccordingState();
  }
  getCityListAccordingState() {
    this.cityListData = [];
    this.employeeService.getCityFromJson().subscribe((res: any) => {
      this.cityData = res;
      this.cityData.forEach((element: any) => {
        if (element.state == this.selectedState) {
          this.cityListData.push(element);
        }
      });
    })
  }
  selectCityData(e: any): void {
    this.selectedCity = e.target.value
  }

  selectGenderData(e: any): void {
    this.selectedGender = e.target.value;
  }

  saveEmployeeDetail() {

  }
  updateEmployeeDetail() {

  }

}
