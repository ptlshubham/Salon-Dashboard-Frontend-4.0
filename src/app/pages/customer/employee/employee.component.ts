import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { SalaryService } from 'src/app/core/services/salary.service';
import { ServiceListService } from 'src/app/core/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  isOpen: boolean = false;
  isUpdate: boolean = false;
  isSalaryUpdate: boolean = false;
  validationForm!: FormGroup;
  validationSalaryForm!: FormGroup;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  paginateData: any = [];

  page1 = 1;
  pageSize1 = 10;
  collectionSize1 = 0;
  paginateSalaryData: any = [];
  salaryId: any;
  stateData: any = [];
  cityData: any = [];
  selectedState: any;
  selectedCity: any;
  selectedServices: any[] = [];
  selectedGender: any;
  cityListData: any = [];
  genderData: any = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' }
  ]

  serviceData: any = [];
  showEmp: Boolean = true;
  showSalary: boolean = false;
  addEmp: boolean = false;

  public employeeModel: any = [];
  public salaryModel: any = [];
  public employeeReg: any[] = [];
  public servicesList: any[] = [];
  salaryList: any = [];


  constructor(
    private servicesService: ServiceListService,
    private employeeService: EmployeeService,
    private salaryService: SalaryService,
    public formBuilder: UntypedFormBuilder,
    public datepipe: DatePipe
  ) {
    this.getStateList();
    this.getAllServices();
    this.getAllEmployee();
  }

  ngOnInit(): void {
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
    this.validationSalaryForm = this.formBuilder.group({
      empName: [{ value: '', disabled: true }, [Validators.required]],
      contactNumber: [{ value: '', disabled: true }, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      gender: [{ value: '', disabled: true }, [Validators.required]],
      salary: ['', [Validators.required]],
      paiddate: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
  }
  get f() { return this.validationForm.controls; }
  get fo() { return this.validationSalaryForm.controls; }

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
    this.employeeModel.isactive = true;
    this.employeeModel.gender = this.selectedGender;
    this.employeeModel.state = this.selectedState;
    this.employeeModel.city = this.selectedCity;
    this.employeeModel.service = this.selectedServices;
    debugger
    this.employeeService.saveEmployeeList(this.employeeModel).subscribe((data: any) => {
      if (data = 'success') {
        this.isOpen = false;
        this.getAllEmployee();
      }
    })
  }
  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;
      debugger
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
  removeEmployee(id: any) {
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
        this.employeeService.removeEmployeeList(id).subscribe((req) => {
        })
        this.getAllEmployee();
        Swal.fire('Deleted!', 'Employee details has been deleted.', 'success');
      }
    });
  }
  viewEmpDetails(data: any) {
    debugger

    this.isOpen = true;
    this.isUpdate = true;
    this.employeeModel = data;
    this.selectedState = data.state;
    this.selectedCity = data.city;
    this.selectedServices = data.services;
    this.validationForm.controls['selectedCity'].setValue(data.city);
    this.validationForm.controls['selectedState'].setValue(data.state);
    this.validationForm.controls['selectedServices'].setValue(data.services);
  }
  updateEmployeeDetail() {
    this.employeeService.updateEmpList(this.employeeModel).subscribe((req) => {
      this.getAllEmployee();
    })
  }
  backToEmpPage() {
    this.showSalary = false;
    this.isOpen = false;
  }
  openSalary(data: any) {
    this.showEmp = false;
    this.showSalary = true;
    this.isSalaryUpdate = false;
    this.addEmp = false;
    this.salaryModel = data;
    this.salaryModel.contactNumber = data.contact;
    this.salaryModel.empName = data.fname + ' ' + data.lname;
    this.getAllSalary(this.salaryModel.id);

  }
  saveSalaryDetail() {
    this.salaryModel.empid = this.salaryModel.id;
    debugger
    this.salaryService.saveSalaryList(this.salaryModel).subscribe((data: any) => {
      this.salaryList = data;
      this.getAllSalary(this.salaryModel.id);
    })
  }
  getAllSalary(id: any) {

    this.salaryId = id;
    this.salaryService.getAllSalaryList(id).subscribe((data: any) => {
      this.salaryList = data;
      for (let i = 0; i < this.salaryList.length; i++) {
        this.salaryList[i].index = i + 1;
      }
      this.getSalaryPagintaion();
    })
  }
  getSalaryPagintaion() {
    this.paginateSalaryData = this.salaryList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  removeSalary(id: any) {
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
        this.salaryService.removeSalaryList(id).subscribe((req) => {
        })
        this.getAllSalary(this.salaryId);
        Swal.fire('Deleted!', 'Salary details has been deleted.', 'success');
      }
    });
  }
  generaterecipt(salarylistIndex: any) { }

  editSalDetails(data: any) {
    this.isSalaryUpdate = true;
    this.salaryModel = data;
    this.salaryModel.contactNumber = data.contact;
    this.salaryModel.empName = data.fname + ' ' + data.lname;
    var temppaidate = this.datepipe.transform(this.salaryModel.paiddate, 'yyyy-MM-dd');
    this.validationSalaryForm.controls['paiddate'].setValue(temppaidate);
  }
  updateSalaryDetails() {
    this.salaryService.updateSalaryList(this.salaryModel).subscribe((res: any) => {
      debugger
      this.getAllSalary(res);

    })
  }


}
