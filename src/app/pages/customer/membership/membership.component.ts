import { Component } from '@angular/core';
import { FormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MembershipService } from 'src/app/core/services/membership.service';
import { ServiceListService } from 'src/app/core/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.scss',
})
export class MembershipComponent {
  public memberShipList: any = [];

  memberShipModel: any = {};
  isOpen: boolean = false;
  isUpdate: boolean = false;
  finalprice: any = 0;
  validationForm!: FormGroup;
  validationServiceForm!: FormGroup;
  serviceModel: any = {};
  membershipprice: number = 0;
  collectionSize = 0;
  totalprice: any = 0;
  page = 1;
  quantity: number = 0;
  pageSize = 10;
  paginateData: any = [];
  servicesList: any = [];
  tempServiceData: any = [];
  membershipData: any = [];
  validityData: any = [
    { name: '3 Month' },
    { name: '6 Month' },
    { name: '9 Month' },
    { name: '12 Month' }
  ]
  selectedValidity: any;

  get f() {
    return this.validationForm.controls;
  }
  get fo() {
    return this.validationServiceForm.controls;
  }

  constructor(
    private MembershipService: MembershipService,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    private servicesService: ServiceListService
  ) {

    this.getAllServices();
    this.getMembershiDetails();
  }
  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      membershipname: ['', [Validators.required]],
      selectValidity: ['', [Validators.required]],
      membershipdiscount: ['', [Validators.required, Validators.pattern('^[1-9][0-9]?$|^100$')],
      ],
    });
    this.validationServiceForm = this.formBuilder.group({
      servicename: ['', [Validators.required]],
    });
    this.selectedValidity = '';

  }

  addServiceList() {
    this.tempServiceData.push({
      time: this.serviceModel.Service.time,
      serpoint: this.serviceModel.Service.point,
      price: this.serviceModel.Service.price,
      servicesname: this.serviceModel.Service.name,
      selectedServid: this.serviceModel.Service.id,
      quantity: 0,
      totalAmount: 0
    });
    this.serviceModel = {};
    this.validationServiceForm.markAsUntouched();
    for (let i = 0; i < this.tempServiceData.length; i++) {
      this.tempServiceData[i].index = i + 1;
    }
  }
  selectValidityDetails(e: any): void {
    this.selectedValidity = e.target.value;
    if (this.selectedValidity == '3 Month') {
      this.memberShipModel.validitydays = 90;
      this.memberShipModel.validity = this.selectedValidity;
    }
    else if (this.selectedValidity == '6 Month') {
      this.memberShipModel.validitydays = 180;
      this.memberShipModel.validity = this.selectedValidity;
    }
    else if (this.selectedValidity == '9 Month') {
      this.memberShipModel.validitydays = 270;
      this.memberShipModel.validity = this.selectedValidity;
    }
    else if (this.selectedValidity == '12 Month') {
      this.memberShipModel.validitydays = 365;
      this.memberShipModel.validity = this.selectedValidity;
    }
  }
  updatePricesTotal(data: any, ind: any) {
    this.tempServiceData[ind].totalAmount = Number(data.quantity) * data.price;
    this.addPoinInList();
  }
  addPoinInList() {
    this.finalprice = 0;
    this.tempServiceData.forEach((element: any) => {
      if (element.totalAmount != undefined) {
        this.finalprice = this.finalprice + element.totalAmount;
      }
    });
  }
  getOfferVal(event: any) {
    this.membershipprice = this.finalprice - (this.finalprice * (this.memberShipModel.membershipdiscount / 100));
    this.memberShipModel.membershipprice = this.membershipprice;
  }

  backToTable() {
    this.isOpen = false;
    this.serviceModel = {};
    this.memberShipModel = {};
    this.validationForm.markAsUntouched();
    this.validationServiceForm.markAsUntouched();
    this.selectedValidity = '';
  }
  removeItemFromTempServices(i: any) {
    this.tempServiceData.splice(i, 1);
    for (let i = 0; i < this.tempServiceData.length; i++) {
      this.tempServiceData[i].index = i + 1;
    }
    this.addPoinInList();
  }

  saveMemberShipDetail() {
    this.memberShipModel.services = this.tempServiceData;
    this.memberShipModel.totalprice = this.finalprice;
    this.memberShipModel.isactive = true;
    this.MembershipService.saveMembershipList(this.memberShipModel).subscribe((data: any) => {
      this.memberShipList = data;
      this.toastr.success('membership package details added successfully', 'Success', { timeOut: 3000 });
      this.tempServiceData = [];
      this.memberShipModel = {};
      this.validationServiceForm.markAsUntouched();
      this.validationForm.markAsUntouched();
      this.getMembershiDetails();
      this.isOpen = false;
      this.isUpdate = false;
    })
  }

  getMembershiDetails() {
    this.MembershipService.getAllMembershipList().subscribe((data: any) => {
      this.memberShipList = data;
      for (let i = 0; i < this.memberShipList.length; i++) {
        this.memberShipList[i].index = i + 1;
      }
      this.collectionSize = this.memberShipList.length;
      this.getPagintaion();
    });
  }
  getPagintaion() {
    this.paginateData = this.memberShipList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  activeMemberShipBanners(ind: any) {
    this.memberShipList[ind].status = false;
    this.MembershipService.activeDeavctiveMemberShip(this.memberShipList[ind]).subscribe((req) => {
    })
  }
  deactiveMemberShipBanners(ind: any) {
    this.memberShipList[ind].status = true;
    this.MembershipService.activeDeavctiveMemberShip(this.memberShipList[ind]).subscribe((req) => {
    })
  }
  openAddMembership() {
    this.isOpen = true;
    this.isUpdate = false;
    this.serviceModel = {};
    this.memberShipModel = {};
    this.tempServiceData = [];
    this.validationForm.markAsUntouched();
  }
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
  }
  openMembershipDetails(data1: any) {
    this.validationForm.markAsUntouched();
    this.tempServiceData = [];

    this.isOpen = true;
    this.isUpdate = true;
    this.memberShipModel = data1;
    this.membershipprice = data1.membershipprice;
    // this.serviceModel = {};
    this.selectedValidity = data1.validity;
    this.MembershipService.getMemberServicesUsingId(data1.id).subscribe((data: any) => {
      this.membershipData = data;

      for (let i = 0; i < this.membershipData.length; i++) {
        this.servicesList.forEach((element: any) => {
          if (element.id == this.membershipData[i].serviceid) {
            this.tempServiceData.push({
              time: element.time,
              serpoint: element.point,
              price: element.price,
              servicesname: element.name,
              selectedServid: element.id,
              quantity: this.membershipData[i].quantity,
              totalAmount: Number(this.membershipData[i].quantity) * element.price,
            })
          }
        });
      }
      for (let i = 0; i < this.tempServiceData.length; i++) {
        this.tempServiceData[i].index = i + 1;
      }
      this.addPoinInList();
    });
  }
  updateMembershipPackage() {
    this.memberShipModel.services = this.tempServiceData;
    this.memberShipModel.totalprice = this.finalprice;
    this.MembershipService.saveMembershipList(this.memberShipModel).subscribe((data: any) => {
      this.memberShipList = data;
      this.toastr.success('membership package details updated successfully', 'Success', { timeOut: 3000 });
      this.isOpen = true;
      this.isUpdate = false;
      this.tempServiceData = [];
      this.memberShipModel = {};
      this.finalprice = 0;
      this.membershipprice = 0;
      this.validationServiceForm.markAsUntouched();
      this.validationForm.markAsUntouched();
      this.getMembershiDetails();
    })
  }
  removeMembershipDetailes(id: any) {
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
        this.MembershipService.removeMembershipDetails(id).subscribe((req) => {
          Swal.fire('Deleted!', 'Membership package has been deleted.', 'success');
          this.getMembershiDetails();
        })
      }
    });
  }
}
