import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/core/services/customer.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { ServiceListService } from 'src/app/core/services/services.service';
import Swal from 'sweetalert2';
import { PurchaseMembershipComponent } from '../purchase-membership/purchase-membership.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  isOpen: boolean = false;
  isUpdate: boolean = false;
  isCustData: boolean = true;
  isOpenAppointmentList: boolean = false;
  isOpenCustAppointment: boolean = false;

  validationForm!: FormGroup;
  validationAppointmentForm!: FormGroup;
  validationServiceForm!: FormGroup;
  validationReedemPointsForm!: FormGroup;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  paginateData: any = [];

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

  customerModel: any = {};
  customerList: any = [];

  appointPage = 1;
  appointPageSize = 10;
  AppointCollectionSize = 0;
  paginateAppointData: any = [];
  appointmentList: any = [];
  usedServices: any = [];
  totalPriceForDetails: number = 0;
  totalPointForDetails: number = 0;

  bookingTimeInterval: any = [];
  selectedCustId: any;
  totalCustPoint: any = [];
  tCustPoint: any = 0;
  isVIP: boolean = false;
  servicesList: any = [];
  employeeReg: any = [];
  tempServiceData: any = [];
  servicesModel: any = {};

  comboOfferList: any = [];
  offerServicesDataList: any = [];
  totalprice: any = 0;
  totalPoint: any = 0;
  totaltime: any = 0;
  offerPrice: any = 0;
  tempComboOfferData: any = [];
  tempEmployeeData: any = [];
  selectedComboOffer: any = null;
  selectedComboId: any;

  totalTempPrice: any = 0;
  totalTempPoint: any = 0;
  totalTempTime: any = 0;

  activeMembership: any = [];
  tempActiveMembership: any = [];
  selectedActiveMembership: any = [];

  searchQuery: string = '';
  filteredCustomerList: any = [];
  isPurchaseOpen: any;
  constructor(
    private customerService: CustomerService,
    public formBuilder: UntypedFormBuilder,
    private employeeService: EmployeeService,
    private servicesService: ServiceListService,
    public toastr: ToastrService,
    private modalService: NgbModal,
    private offerService: OfferService,
    private purchaseMembershipComponent: PurchaseMembershipComponent

  ) {
    this.getCustomerDetails();
  }

  ngOnInit(): void {

    this.validationForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      whatsapp: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      state: ['', [Validators.required]],
      landmark: [''],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      gender: ['', [Validators.required]],
      vip: [Boolean]
    });
    this.validationAppointmentForm = this.formBuilder.group({
      bookingDate: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
    this.validationServiceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      employeeName: ['', [Validators.required]]
    });
    this.validationReedemPointsForm = this.formBuilder.group({
      reedempoints: ['', [Validators.required, Validators.pattern(/^(100|[1-9]\d{2,3}|10000)$/)]],
    });

  }
  get f() { return this.validationForm.controls; }
  get fo() { return this.validationAppointmentForm.controls; }
  get fs() { return this.validationServiceForm.controls; }
  get fp() { return this.validationReedemPointsForm.controls; }



  backToTable() {
    this.isOpen = false;
    this.isUpdate = false;
    this.customerModel = {};
    this.activeMembership = [];
    this.tempActiveMembership = [];
    this.validationForm.markAsUntouched();
  }
  openAddCustomer() {
    this.isOpen = true;
    this.isUpdate = false;
    this.customerModel = {};
    this.activeMembership = [];
    this.tempActiveMembership = [];
    this.validationForm.markAsUntouched();
    this.getStateList();
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
  getCustomerDetails() {
    this.customerService.getAllCustomerList().subscribe((data: any) => {
      this.customerList = data;
      this.filteredCustomerList = [...this.customerList]; // Initialize filtered list
      for (let i = 0; i < this.customerList.length; i++) {
        this.customerList[i].index = i + 1;
      }
      this.collectionSize = this.customerList.length;
      this.getPagintaion();
    });
  }

  applySearchFilter() {
    this.page = 1; // Reset the page when the search query changes
    this.filteredCustomerList = this.customerList.filter((customer: any) =>
      customer.whatsapp.includes(this.searchQuery) ||
      (customer.fname + ' ' + customer.lname).toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.getPagintaion();
  }

  getPagintaion() {
    // Paginate the filtered list
    this.paginateData = this.filteredCustomerList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  saveCustomerDetail() {

    this.customerService.saveCustomerList(this.customerModel).subscribe((data: any) => {
      this.customerList = data;
      this.customerModel = {};
      this.isOpen = false;
      this.validationForm.markAsUntouched();
      this.toastr.success('Customer details added successfully', 'Success', { timeOut: 3000 });
      this.getCustomerDetails();
    })
  }

  viewMembershipDetails() {
    this.activeMembership = [];
    this.tempActiveMembership = [];
    this.selectedActiveMembership = [];
    this.customerService.getActivatedMembershipDetail(this.selectedCustId).subscribe((data: any) => {
      this.activeMembership = data;
      debugger
      for (let i = 0; i < this.activeMembership.length; i++) {
        this.activeMembership[i].index = i + 1;
      }
      for (let i = 0; i < this.activeMembership.length; i++) {
        this.servicesList.forEach((element: any) => {
          if (element.id == this.activeMembership[i].serid) {
            this.tempActiveMembership.push({
              index: i + 1,
              time: element.time,
              serpoint: element.point,
              price: element.price,
              servicesname: element.name,
              selectedServid: element.id,
              totalquantity: this.activeMembership[i].quntity,
              servicetype: 'Membership',
              isChecked: false
            })
          }
        });
      }
      for (let i = 0; i < this.tempActiveMembership.length; i++) {
        this.tempActiveMembership[i].index = i + 1;
      }
    })
  }
  onEmployeeMemberChange(data: any, ind: any) {
    debugger
    if (data != undefined) {
      const employeeName = data.fname + ' ' + data.lname;
      this.tempActiveMembership[ind].employeename = employeeName;
      this.tempActiveMembership[ind].selectedEmpid = data.id;
    }
    else {
      this.tempActiveMembership[ind].selectedEmpid = undefined;
      this.tempActiveMembership[ind].isChecked = false;
    }
  }
  selectedMemberService(data: any) {
    debugger
    if (data.isChecked == true) {
      this.selectedActiveMembership.push({
        time: data.time,
        serpoint: data.serpoint,
        price: data.price,
        servicesname: data.servicesname,
        selectedServid: data.selectedServid,
        servicetype: 'Membership',
        employeename: data.employeename,
        selectedEmpid: data.selectedEmpid,
        isChecked: true
      });
      for (let i = 0; i < this.selectedActiveMembership.length; i++) {
        this.selectedActiveMembership[i].index = i + 1;
      }
    }
    else if (data.isChecked == false) {
      this.selectedActiveMembership.forEach((element: any, index: number) => {
        if (element.servicetype == 'Membership' && element.selectedServid == data.selectedServid) {
          debugger
          this.selectedActiveMembership.splice(index, 1);
        }
      });
    }
  }
  saveMemberShipData() {
    this.selectedActiveMembership.forEach((element: any) => {
      if (!this.tempServiceData.some((item: any) => item.selectedServid === element.selectedServid)) {
        this.tempServiceData.push({
          time: element.time,
          serpoint: element.serpoint,
          price: element.price,
          servicesname: element.servicesname,
          selectedServid: element.selectedServid,
          servicetype: element.servicetype,
          employeename: element.employeename,
          selectedEmpid: element.selectedEmpid,
        });
      }
    });
    for (let i = 0; i < this.tempServiceData.length; i++) {
      this.tempServiceData[i].index = i + 1;
    }
    this.viewMembershipDetails();
    this.calculateTempServicePointsList();
  }
  getCustomerPoints() {
    this.customerService.getCustAllPoint(this.selectedCustId).subscribe((data: any) => {
      this.totalCustPoint = data;
      this.tCustPoint = 0;
      this.totalCustPoint.forEach((element: any) => {
        if (element.totalcustpoint != undefined) {
          this.tCustPoint = element.totalcustpoint;
        }
      });
    });
  }
  updateCustomerDetails() {
    if (this.isVIP == false) {
      this.customerModel.vip = true;
    }
    else {
      this.customerModel.vip = false;
    }
    this.customerService.updateCustomerList(this.customerModel).subscribe((req) => {
      this.getCustomerDetails();
    })
  }
  seletedCustomerDetails(data: any) {
    this.getOfferDetails();

    this.validationAppointmentForm.markAsUntouched();
    this.validationServiceForm.markAsUntouched();
    this.tempServiceData = [];
    this.isCustData = false;
    this.isOpenAppointmentList = false;
    this.isOpenCustAppointment = true;
    this.selectedCustId = data.id;
    this.customerModel = data;
    this.customerModel.customerName = data.fname + ' ' + data.lname;
    if (data.vip == 0) {
      this.isVIP = false;
    }
    else {
      this.isVIP = true;
    }
    this.getCustomerPoints();
    this.getTimeIntervalJson();
    this.getAllServices();
    this.getAllEmployee();
    this.viewMembershipDetails();
  }

  purchaseMembership() {

  }
  getTimeIntervalJson() {
    this.customerService.getBookingTimeInterval().subscribe((data: any) => {
      this.bookingTimeInterval = data;
    })
  }
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
  }
  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;
      this.employeeReg.forEach((employee: any, index: number) => {
        employee.employeeName = `${employee.fname} ${employee.lname}`;
      });
    });
  }
  backToCustomerList() {
    this.validationAppointmentForm.markAsUntouched();
    this.isCustData = true;
    this.isOpen = false;
    this.isOpenAppointmentList = false;
    this.isOpenCustAppointment = false;
  }
  backToCustomerData() {
    this.isCustData = true;
    this.isOpen = false;
    this.isOpenAppointmentList = false;
  }
  openCustomerAppointementList(id: any) {
    this.isCustData = false;
    this.isOpenAppointmentList = true;
    this.customerService.getAllCustomerDataList(id).subscribe((data: any) => {
      this.appointmentList = data;
      for (let i = 0; i < this.appointmentList.length; i++) {
        this.appointmentList[i].index = i + 1;
      }
      this.getAppointPagintaion();
    });
  }
  getAppointPagintaion() {
    this.paginateAppointData = this.appointmentList.slice((this.appointPage - 1) * this.appointPageSize, (this.appointPage - 1) * this.appointPageSize + this.appointPageSize);
  }

  getOfferDetails() {
    this.offerService.getActiveOfferList().subscribe((data: any) => {
      this.comboOfferList = data;
    });
  }
  onComboOfferChange(data: any): void {

    this.totalPoint = 0;
    this.totalprice = 0;
    this.totaltime = 0;
    this.offerPrice = 0;
    this.offerServicesDataList = [];
    this.tempComboOfferData = [];
    this.selectedComboId = data.id;

    this.offerPrice = data.offerprice;
    this.offerService.getAllOfferDataList(data.id).subscribe((data: any) => {
      this.offerServicesDataList = data;

      for (let i = 0; i < this.offerServicesDataList.length; i++) {
        this.servicesList.forEach((element: any) => {
          if (element.id == this.offerServicesDataList[i].serviceId) {
            this.tempComboOfferData.push({
              time: element.time,
              serpoint: element.point,
              price: element.price,
              servicesname: element.name,
              selectedServid: element.id,
              servicetype: 'Combo',
              comboId: this.selectedComboId
            })
          }
        });
      }
      this.selectedComboOffer = null;
      for (let i = 0; i < this.tempComboOfferData.length; i++) {
        this.tempComboOfferData[i].index = i + 1;
      }
      this.calculatePointsList()
    });
  }
  removeItemFromComboOffer(i: any, data: any) {
    if (data.servicetype == 'Combo') {
      const comboIdToRemove = data.comboId;
      this.tempComboOfferData = this.tempComboOfferData.filter((item: any) => item.comboId !== comboIdToRemove);
    }
    for (let i = 0; i < this.tempComboOfferData.length; i++) {
      this.tempComboOfferData[i].index = i + 1;
    }
    this.calculatePointsList();
  }
  calculatePointsList() {
    this.tempComboOfferData.forEach((element: any) => {
      if (element.price != undefined) {
        this.totalprice = this.totalprice + element.price;
      }
      if (element.serpoint != undefined) {
        this.totalPoint = this.totalPoint + element.serpoint;
      }
      if (element.time != undefined) {
        this.totaltime = this.totaltime + element.time;
      }
    });
  }
  calculateTempServicePointsList() {
    this.totalTempPoint = 0;
    this.totalTempPrice = 0;
    this.totalTempTime = 0;

    this.tempServiceData.forEach((element: any) => {
      if (element.price != undefined) {
        this.totalTempPrice = this.totalTempPrice + element.price;
      }
      if (element.serpoint != undefined) {
        this.totalTempPoint = this.totalTempPoint + element.serpoint;
      }
      if (element.time != undefined) {
        this.totalTempTime = this.totalTempTime + element.time;
      }
    });
  }
  onEmployeeChange(data: any, ind: any) {
    debugger
    const employeeName = data.fname + ' ' + data.lname;
    this.offerServicesDataList[ind].employeename = employeeName;
    this.offerServicesDataList[ind].selectedEmpid = data.id;
  }
  saveComboOffer() {
    for (let i = 0; i < this.offerServicesDataList.length; i++) {
      this.servicesList.forEach((element: any) => {
        if (element.id == this.offerServicesDataList[i].serviceId) {
          this.tempServiceData.push({
            time: element.time,
            serpoint: element.point,
            price: element.price,
            servicesname: element.name,
            selectedServid: element.id,
            servicetype: 'Combo',
            employeename: this.offerServicesDataList[i].employeename,
            selectedEmpid: this.offerServicesDataList[i].selectedEmpid,
            comboId: this.selectedComboId
          })
        }
      });
    }
    for (let i = 0; i < this.tempServiceData.length; i++) {
      this.tempServiceData[i].index = i + 1;
    }
    this.offerServicesDataList = [];
    this.selectedComboOffer = null;
    this.calculateTempServicePointsList();
  }
  saveTempServiceDetail() {

    this.tempServiceData.push({
      time: this.servicesModel.Service.time,
      serpoint: this.servicesModel.Service.point,
      price: this.servicesModel.Service.price,
      servicesname: this.servicesModel.Service.name,
      selectedServid: this.servicesModel.Service.id,
      employeename: this.servicesModel.employee.employeeName,
      selectedEmpid: this.servicesModel.employee.id,
      servicetype: 'Regular'
    });
    this.servicesModel = {};
    this.validationServiceForm.markAsUntouched();
    for (let i = 0; i < this.tempServiceData.length; i++) {
      this.tempServiceData[i].index = i + 1;
    }
    this.calculateTempServicePointsList();
  }
  removeItemFromAppointement(i: any, data: any) {
    if (data.servicetype == 'Combo') {
      const comboIdToRemove = data.comboId;
      this.tempServiceData = this.tempServiceData.filter((item: any) => item.comboId !== comboIdToRemove);
    }
    else {
      this.tempServiceData.splice(i, 1);
    }
    for (let i = 0; i < this.tempServiceData.length; i++) {
      this.tempServiceData[i].index = i + 1;
    }
    this.calculateTempServicePointsList();
  }
  openUsedServiceList(data: any, exlargeModal: any) {
    this.modalService.open(exlargeModal, { size: 'xl', windowClass: 'modal-holder', centered: true });

    this.totalPriceForDetails = data.totalprice
    this.totalPointForDetails = data.totalpoint
    this.customerService.getServicesListUsingId(data.id).subscribe((data: any) => {
      this.usedServices = data;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
  }
  editCustomerDetails(data: any) {
    this.isOpen = true;
    this.isUpdate = true;
    this.customerModel = data;
  }
  removeCustomerDetails(id: any) {
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
        this.customerService.removeCustomerDetails(id).subscribe((req) => {
          Swal.fire('Deleted!', 'Customer details has been deleted.', 'success');
          this.getCustomerDetails();
        })
      }
    });
  }
  updateCustomerDetail() {
    // this.servicesService.updateServicesList(this.servicesModel).subscribe((req) => {
    //   this.toastr.success('Service details updated successfully', 'Updated', { timeOut: 3000 });
    //   this.isOpen = false;
    //   this.isUpdate = false;
    //   this.getAllServices();
    // })
  }

}
