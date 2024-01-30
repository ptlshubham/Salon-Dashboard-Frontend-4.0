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
      membershipdiscount: ['', [Validators.required, Validators.pattern('^[1-9][0-9]?$|^100$')],
      ],
    });
    this.validationServiceForm = this.formBuilder.group({
      servicename: ['', [Validators.required]],
    });
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
    debugger
    this.MembershipService.saveMembershipList(this.memberShipModel).subscribe((data: any) => {
      this.memberShipList = data;
      this.toastr.success('membership package details added successfully', 'Success', { timeOut: 3000 });
      this.tempServiceData = [];
      this.memberShipModel = {};
      this.validationServiceForm.markAsUntouched();
      this.validationForm.markAsUntouched();
      this.getMembershiDetails();
      this.backToTable();

    })
  }

  getMembershiDetails() {
    this.MembershipService.getAllMembershipList().subscribe((data: any) => {
      this.memberShipList = data;
      debugger
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
    debugger
    this.MembershipService.activeDeavctiveMemberShip(this.memberShipList[ind]).subscribe((req) => {
    })
  }
  deactiveMemberShipBanners(ind: any) {
    this.memberShipList[ind].status = true;
    this.MembershipService.activeDeavctiveMemberShip(this.memberShipList[ind]).subscribe((req) => {
    })
  }
  openAddEMembership() {
    this.isOpen = true;
    this.isUpdate = false;
    this.serviceModel = {};
    this.memberShipModel = {};
    this.validationForm.markAsUntouched();
  }
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
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
