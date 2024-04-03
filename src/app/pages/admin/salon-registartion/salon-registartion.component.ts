import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { EmployeeService } from 'src/app/core/services/employee.service';




@Component({
  selector: 'app-salon-registartion',
  templateUrl: './salon-registartion.component.html',
  styleUrl: './salon-registartion.component.scss'
})
export class SalonRegistartionComponent {

  saloonlist: any = [];
  isOpen: boolean = false;
  isUpdate: boolean = false;
  validationForm!: FormGroup;
  RegistartionModel: any = {};
  selectedGender: any;
  selectedSupscription: any;
  selectedSocialLink: any;
  selectedState: any;
  cityListData: any = [];
  stateData: any = [];
  cityData: any = [];
  selectedCity: any;
  paginateData: any = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  genderData: any = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' }
  ]

  supscriptionData: any = [
    { type: 'Trial(1 Month)' },
    { type: '3 Months' },
    { type: '6 Months' },
    { type: '12 Months' }

  ]

  SocialMediaLinks: any = [
    { type: 'None' },
    { type: 'InstaGram' },
    { type: 'FaceBook' },
    { type: 'SnapChat' },
    { type: 'Twitter' },

  ]

  constructor(
    public formBuilder: UntypedFormBuilder,
    private adminService: AdminService,
    public toastr: ToastrService,
    public employeeService: EmployeeService

  ) {
    this.getStateList();
  }

  ngOnInit(): void {
    this.getAllRegistration();

    this.validationForm = this.formBuilder.group({
      sname: ['', [Validators.required]],
      oemail: ['', [Validators.required]],
      ocontact: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      scontact: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      selectGender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      landmark: [''],
      selectState: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', Validators.required],
      gst: [''],
      selectSupscription: ['', [Validators.required]],
      websitelink: ['', [Validators.required, Validators.pattern("^(https?|ftp):\/\/[^\s/$.?#]+\.[^\s/?#]+(\/[^\s/?#]*)?$")]],
      oname: ['', [Validators.required]],
      semail: ['', [Validators.required]],
      adminfname:['',[Validators.required]]
    });
  }
  get f() { return this.validationForm.controls; }

  selectGenderData(e: any): void {
    this.selectedGender = e.target.value;
  }
  selectSupscriptionData(e: any): void {
    this.selectedSupscription = e.target.value;
  }
  selectSocialLink(e: any): void {
    this.selectedSocialLink = e.target.value;
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
  getStateList() {
    this.employeeService.getStateFromJson().subscribe((res: any) => {
      this.stateData = res;
    })
  }
  getPagintaion() {
    this.paginateData = this.saloonlist.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  backToTable() {
    this.isOpen = false;
    this.isUpdate = false;
    this.validationForm.markAsUntouched();
    this.RegistartionModel = {};
  }
  openAddExpense() {
    this.isOpen = true;
    this.isUpdate = false;
    this.RegistartionModel = {};
    this.validationForm.markAsUntouched();
  }
  saveRegistartionDetail() {
    this.RegistartionModel.city = this.selectedCity;
    this.RegistartionModel.selectState = this.selectedState;
    this.RegistartionModel.selectGender = this.selectedGender;
    this.RegistartionModel.selectSupscription = this.selectedSupscription
    this.adminService.saveRegistrationList(this.RegistartionModel).subscribe((data: any) => {
      if (data = 'success') {
        this.toastr.success('registration details added successfully', 'Success', { timeOut: 3000 });
        this.isOpen = false;
        this.RegistartionModel = {};
        this.validationForm.markAsUntouched();
        this.getAllRegistration();
      }
    })
  }
  getAllRegistration() {
    this.adminService.getAllRegistrationList().subscribe((data: any) => {
      this.saloonlist = data;

      for (let i = 0; i < this.saloonlist.length; i++) {
        this.saloonlist[i].index = i + 1;
      }
      this.collectionSize = this.saloonlist.length;
      this.getPagintaion();
    });
  }
  removeRegistrationDetails(id: any) {
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
        this.adminService.removeRegistrationDetails(id).subscribe(() => {
        })
        this.getAllRegistration();
        Swal.fire('Deleted!', 'registration  details has been deleted.', 'success');
      }
    });
  }
  editRegistartionDeatil(data: any) {
    this.isOpen = true;
    this.isUpdate = true;
    this.RegistartionModel = data;

  }
  updateRegistartionDetail() {
    this.RegistartionModel.selectState = this.selectedState;
    this.RegistartionModel.city = this.selectedCity;
    this.RegistartionModel.selectGender = this.selectedGender;
    this.RegistartionModel.selectSupscription = this.selectedSupscription
    this.adminService.updateRegistrationList(this.RegistartionModel).subscribe((req) => {
      this.toastr.success('Expense details updated successfully', 'Updated', { timeOut: 3000 });
      this.isOpen = false;
      this.isUpdate = false;
      this.getAllRegistration();
    })
  }
}
