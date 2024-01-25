import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OfferService } from 'src/app/core/services/offer.service';
import { ServiceListService } from 'src/app/core/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-combo-offer',
  templateUrl: './combo-offer.component.html',
  styleUrl: './combo-offer.component.scss'
})
export class ComboOfferComponent {
  public offerList: any = [];
  public services: any = [];
  offerModel: any = {};
  serviceModel: any = {};
  servicesList: any = [];
  tempServiceData: any = [];

  isOpen: boolean = false;
  isUpdate: boolean = false;
  validationForm!: FormGroup;
  validationServiceForm!: FormGroup;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  paginateData: any = [];

  totalprice: any = 0;
  totalPoint: any = 0;
  totalOfferPoint: any = 0;
  offerprice: number = 0;
  discount: number = 0;

  offerData: any = [];
  constructor(
    private offerService: OfferService,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    private servicesService: ServiceListService,
  ) {
    this.getAllServices();
    this.getOfferDetails();

  }

  ngOnInit(): void {

    this.validationForm = this.formBuilder.group({
      offername: ['', [Validators.required]],
      percentage: ['', [Validators.required, Validators.pattern("^[1-9][0-9]?$|^100$")]],
    });
    this.validationServiceForm = this.formBuilder.group({
      servicename: ['', [Validators.required]],
    });
  }
  get f() { return this.validationForm.controls; }
  get fo() { return this.validationServiceForm.controls; }

  backToTable() {
    this.isOpen = false;
    this.serviceModel = {};
    this.offerModel = {};
    this.validationForm.markAsUntouched();
    this.validationServiceForm.markAsUntouched();
  }
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
  }
  openAddOffer() {
    this.isOpen = true;
    this.isUpdate = false;
    this.serviceModel = {};
    this.offerModel = {};
    this.validationForm.markAsUntouched();
  }
  addServiceList() {
    this.tempServiceData.push({
      time: this.serviceModel.Service.time,
      serpoint: this.serviceModel.Service.point,
      price: this.serviceModel.Service.price,
      servicesname: this.serviceModel.Service.name,
      selectedServid: this.serviceModel.Service.id,
    });
    this.serviceModel = {};
    this.validationServiceForm.markAsUntouched();
    for (let i = 0; i < this.tempServiceData.length; i++) {
      this.tempServiceData[i].index = i + 1;
    }
    this.addPoinInList();
  }
  addPoinInList() {
    this.totalPoint = 0;
    this.totalprice = 0;
    this.tempServiceData.forEach((element: any) => {
      if (element.price != undefined) {
        this.totalprice = this.totalprice + element.price;
      }
    });
  }
  getOfferVal(event: any) {
    this.offerprice = this.totalprice - (this.totalprice * (this.offerModel.percentage / 100));
    this.offerModel.offerprice = this.offerprice;
  }
  removeItemFromTempServices(i: any) {
    this.tempServiceData.splice(i, 1);
    for (let i = 0; i < this.tempServiceData.length; i++) {
      this.tempServiceData[i].index = i + 1;
    }
    this.addPoinInList();
  }
  saveOfferDetail() {
    this.offerModel.services = this.tempServiceData;
    this.offerModel.totalprice = this.totalprice;
    this.offerService.saveOfferList(this.offerModel).subscribe((data: any) => {
      this.offerList = data;
      this.toastr.success('Offer details added successfully', 'Success', { timeOut: 3000 });
      this.tempServiceData = [];
      this.offerModel = {};
      this.validationServiceForm.markAsUntouched();
      this.validationForm.markAsUntouched();
      this.getOfferDetails();
    })
  }
  getOfferDetails() {
    this.offerService.getAllOfferList().subscribe((data: any) => {
      this.offerList = data;
      for (let i = 0; i < this.offerList.length; i++) {
        this.offerList[i].index = i + 1;
      }
      this.collectionSize = this.offerList.length;
      this.getPagintaion();
    });
  }
  getPagintaion() {
    this.paginateData = this.offerList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  activeBanners(ind: any) {
    this.offerList[ind].status = true;
    this.offerService.activeDeavctiveOffers(this.offerList[ind]).subscribe((req) => {
    })
  }
  deactiveBanners(ind: any) {
    this.offerList[ind].status = false;
    this.offerService.activeDeavctiveOffers(this.offerList[ind]).subscribe((req) => {
    })
  }
  openUpdateComboOffer(data: any) {
    this.isOpen = true;
    this.tempServiceData = [];
    this.isUpdate = true;
    this.offerModel = data;
    this.offerService.getAllOfferDataList(data.id).subscribe((data: any) => {
      this.offerData = data;
      for (let i = 0; i < this.offerData.length; i++) {
        this.servicesList.forEach((element: any) => {
          if (element.id == this.offerData[i].serviceId) {
            this.tempServiceData.push({
              time: element.time,
              serpoint: element.point,
              price: element.price,
              servicesname: element.name,
              selectedServid: element.id,
            })
          }
        });
      }
      for (let i = 0; i < this.tempServiceData.length; i++) {
        this.tempServiceData[i].index = i + 1;
      }
      this.addPoinInList();
      this.getOfferVal(data);
    });
  }
  updateOfferDetail() {
    this.offerModel.services = this.tempServiceData;
    this.offerModel.totalprice = this.totalprice;
    debugger
    this.offerService.saveOfferList(this.offerModel).subscribe((data: any) => {
      this.offerList = data;
      this.toastr.success('Offer details updated successfully', 'Success', { timeOut: 3000 });
      this.tempServiceData = [];
      this.offerModel = {};
      this.validationServiceForm.markAsUntouched();
      this.validationForm.markAsUntouched();
      this.getOfferDetails();
    })
  }
  removeComboOfferDetails(id: any) {
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
        this.offerService.removeOfferDetails(id).subscribe((req) => {
          Swal.fire('Deleted!', 'Offer has been deleted.', 'success');
          this.getOfferDetails();
        })
      }
    });
  }
}
