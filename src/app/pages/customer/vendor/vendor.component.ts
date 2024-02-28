import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { VendorService } from 'src/app/core/services/vendor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss'
})
export class VendorComponent {
  isOpen: boolean = false;
  isUpdate: boolean = false;

  vendorModel: any = {};
  vendorList: any = [];
  validationForm!: FormGroup;
  cityData: any = [];
  stateData: any = [];

  selectedState: any;
  selectedCity: any;
  cityListData: any = [];
  selectedServices: any[] = [];
  page = 1;
  pageSize = 10;
  paginateData: any = [];
  collectionSize = 0;


  constructor(
    private router: Router,
    private vendorService: VendorService,
    private employeeService: EmployeeService,
    public toastr: ToastrService,
    public formBuilder: UntypedFormBuilder,


  ) {
    this.getStateList();

  }

  ngOnInit(): void {

    this.getAllvendor()

    this.validationForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      whatsapp: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      gst: ['', [Validators.required]],
      address: ['', [Validators.required]],
      selectState: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required]],

    });
  }

  get f() { return this.validationForm.controls; }

  openAddvendor() {
    this.isOpen = true;
    this.isUpdate = false;
    this.vendorModel = {};
    this.validationForm.markAsUntouched();
  }
  backToTable() {
    this.isOpen = false;
    this.isUpdate = false;
    this.vendorModel = {};
    this.validationForm.markAsUntouched();
  }

  getStateList() {
    this.employeeService.getStateFromJson().subscribe((res: any) => {
      this.stateData = res;
    })
  }

  selectCityData(e: any): void {
    this.selectedCity = e.target.value
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
  savevendorDetail() {
    this.vendorModel.isactive = true;
    this.vendorModel.city = this.selectedCity;
    this.vendorModel.service = this.selectedServices;
    this.vendorService.saveVendorList(this.vendorModel).subscribe((data: any) => {
      if (data = 'success') {
        this.toastr.success('vendor details added successfully', 'Success', { timeOut: 3000 });
        this.isOpen = false;
        this.vendorModel = {};
        this.validationForm.markAsUntouched();
        this.getAllvendor();
      }
    })
  }
  updatevendorDetail() {
    this.vendorService.updateVenList(this.vendorModel).subscribe((req: any) => {
      this.toastr.success('Expense details updated successfully', 'Updated', { timeOut: 3000 });
      this.isOpen = false;
      this.isUpdate = false;
      this.getAllvendor();
    })
  }


  getAllvendor() {
    this.vendorService.getAllVendorList().subscribe((data: any) => {
      this.vendorList = data;
      for (let i = 0; i < this.vendorList.length; i++) {
        this.vendorList[i].index = i + 1;
      }
      this.collectionSize = this.vendorList.length;
      this.getPagintaion();
    });
  }

  editvendorDetails(data: any) {
    this.isOpen = true;
    this.isUpdate = true;
    this.vendorModel = data;
    this.selectedState = data.state;
    this.selectedCity = data.city;
    this.selectedServices = data.services;
    this.validationForm.controls['selectedCity'].setValue(data.city);
    this.validationForm.controls['selectedState'].setValue(data.state);
    this.validationForm.controls['selectedServices'].setValue(data.services);
  }
  removevendor(id: any) {
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
        this.vendorService.removeVendorList(id).subscribe(() => {
        })
        this.getAllvendor();
        Swal.fire('Deleted!', 'vendor  details has been deleted.', 'success');
      }
    });
  }
  getPagintaion() {
    this.paginateData = this.vendorList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  redirectToVendorProduct(id: any) {
    this.router.navigate(['/custom/vendor-product', id]);

  }
}



