import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/core/services/customer.service';
import { MembershipService } from 'src/app/core/services/membership.service';


@Component({
  selector: 'app-purchase-membership',
  templateUrl: './purchase-membership.component.html',
  styleUrl: './purchase-membership.component.scss'
})
export class PurchaseMembershipComponent {
  public joinedMembership: any = [];
  public dataMembership: any = [];
  public memberShipList: any = [];
  public customer: any = [];
  memberShipModel: any = {};
  joinMembershipModel: any = {};
  isOpen: boolean = false;
  isUpdate: boolean = false;
  validationForm!: FormGroup;
  serviceModel: any = {};
  searchContact: any = null;
  showDetails: boolean = false;
  selectedMemberShip: any = {};
  memberUsedServices: any = [];
  page = 1;
  quantity: number = 0;
  pageSize = 10;
  paginateData: any = [];
  collectionSize = 0;
  purchasedServices: any = [];
  usedServices: any = [];
  servicestotal: number = 0;
  totalPriceafterdiscount: number = 0;
  tempData: any = {};
  validity: any;
  validityDays: number = 0;
  validityDate: any;
  constructor(
    public formBuilder: UntypedFormBuilder,
    private customerService: CustomerService,
    private membershipService: MembershipService,
    public toastr: ToastrService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
  ) {
    this.getPurchasedMemberList();
    this.activatedRoute.queryParams.subscribe(res => {
      this.tempData = JSON.parse(res.customerData);
      this.customerService.getAllCustomerList().subscribe((data: any) => {
        this.customer = data;
        this.customer.forEach((element: any) => {
          if (this.tempData.contact == element.contact) {
            this.getCustomerDetails();
            this.memberShipModel = element;
            this.showDetails = true;
            this.isOpen = true;
            this.isUpdate = false;
            this.searchContact = null;
            this.validationForm.markAsUntouched();
          }
        });
      });
    });
  }

  ngOnInit(): void {
    this.getAllActiveMembershipDetails();
    this.validationForm = this.formBuilder.group({
      contact: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
  }

  get f() {
    return this.validationForm.controls;
  }
  backToTable() {
    this.isOpen = false;
    this.serviceModel = {};
    this.memberShipModel = {};
    this.validationForm.markAsUntouched();
  }
  openAddMembership() {
    this.getCustomerDetails();
    this.isOpen = true;
    this.isUpdate = false;
    this.serviceModel = {};
    this.memberShipModel = {};
    this.joinMembershipModel = {};
    this.selectedMemberShip = {};
    this.validationForm.markAsUntouched();
  }
  getCustomerDetails() {
    this.customerService.getAllCustomerList().subscribe((data: any) => {
      this.customer = data;
      for (let i = 0; i < this.customer.length; i++) {
        this.customer[i].index = i + 1;
      }
    });
  }
  getAllActiveMembershipDetails() {
    debugger
    this.membershipService.getAllActiveMembership().subscribe((data: any) => {
      this.memberShipList = data;
      debugger
      for (let i = 0; i < this.memberShipList.length; i++) {
        this.memberShipList[i].index = i + 1;
      }
    });
  }
  getCustomer(data: any) {
    this.memberShipModel = {};
    this.customer.forEach((element: any) => {
      if (data == element.contact) {
        this.memberShipModel = element;
        this.showDetails = true;
        this.searchContact = null;
        this.validationForm.markAsUntouched();
      }
    });
    if (this.searchContact != null) {
      this.toastr.error('This number is not registered.', 'Error', { timeOut: 3000 });
    }
  }
  onMembershipPackageChange(data: any) {
    this.memberShipList.forEach((element: any) => {
      if (data.target.value == element.membershipname) {
        this.selectedMemberShip = element;
        this.validity = element.validity;
        this.validityDays = element.validitydays;
        debugger
        // Calculate the validity end date
        const currentDate = new Date();
        this.validityDate = new Date(currentDate.getTime() + (this.validityDays * 24 * 60 * 60 * 1000));

        this.membershipService.getMemberServicesUsingId(element.id).subscribe((data: any) => {
          this.memberUsedServices = data;
          for (let i = 0; i < this.memberUsedServices.length; i++) {
            this.memberUsedServices[i].index = i + 1;
          }
        });
      }
    });
  }
  saveJoinMemberShipDetail() {
    this.joinMembershipModel.cid = this.memberShipModel.id;
    this.joinMembershipModel.memid = this.selectedMemberShip.id;
    this.joinMembershipModel.tprice = this.selectedMemberShip.totalprice;
    this.joinMembershipModel.discount = this.selectedMemberShip.membershipdiscount;
    this.joinMembershipModel.dprice = this.selectedMemberShip.membershipprice;
    this.joinMembershipModel.validitydate = this.validityDate;
    this.joinMembershipModel.isactive = true;
    this.joinMembershipModel.services = this.memberUsedServices;
    debugger
    this.membershipService.savePurchaseServiceList(this.joinMembershipModel).subscribe((data: any) => {
      this.joinedMembership = data;
      if (data == 'success') {
        this.toastr.success('Membership Joined successfully saved.', 'Success', { timeOut: 3000 });
        this.joinMembershipModel = {};
        this.selectedMemberShip = {};
        this.isOpen = false;
      }
      this.getPurchasedMemberList();
    })
  }
  getPurchasedMemberList() {
    this.joinedMembership = [];
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const todaydate = `${year}-${month}-${day}`;
    this.membershipService.getAllMemberPurchased().subscribe((data: any) => {
      this.dataMembership = data;
      this.joinedMembership = data;
      this.dataMembership.forEach((element: any) => {
        const validityDate = element.validitydate.split('T')[0];
        if (todaydate > validityDate) {
          this.membershipService.updatePurchaseMembershipStatus(element.memid).subscribe((data: any) => {
          })
        }
      });
      for (let i = 0; i < this.joinedMembership.length; i++) {
        this.joinedMembership[i].index = i + 1;
      }
      this.collectionSize = this.joinedMembership.length;
      this.getPagintaion();
    })

  }
  getPagintaion() {
    this.paginateData = this.joinedMembership.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }
  viewMembershipDetails(data: any) {
    debugger
    this.membershipService.getPurchasedDetail(data).subscribe((data: any) => {
      this.purchasedServices = data;
      for (let i = 0; i < this.purchasedServices.length; i++) {
        this.purchasedServices[i].index = i + 1;
      }
    })
  }
  openUsedServiceList(data: any, exlargeModal: any) {
    this.servicestotal = data.totalprice
    this.totalPriceafterdiscount = data.membershipprice
    this.modalService.open(exlargeModal, { size: 'xl', windowClass: 'modal-holder', centered: true });
    this.membershipService.getMemberServicesUsingId(data.memid).subscribe((data: any) => {
      this.usedServices = data;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    })
  }
}

