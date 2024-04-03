import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { ServiceListService } from 'src/app/core/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {

  appointmentList: any = [];
  pendingList: any = [];
  usedServices: any = [];
  public employeeReg: any[] = [];
  public idealEmployee: any[] = [];
  userBookingData: any = {};
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  paginateActiveData: any = [];
  paginatePendingData: any = [];


  pagePe = 1;
  pageSizePe = 5;
  collectionSizePe = 0;
  paginateActiveDataPe: any = [];

  totalPriceForDetails: number = 0;
  totalPointForDetails: number = 0;

  pageEmployee = 1;
  pageSizeEmployee = 10;
  collectionSizeEmployee = 0;
  paginateEmployeeData: any = [];
  isworking: boolean = false;
  paymentDataModel: any = {};
  completeNumber: number = 0;
  processNumber: number = 0;
  point: number = 0;
  price: number = 0;
  time: number = 0;
  refreshSubscription: Subscription;

  validationServiceForm!: FormGroup;

  comboOfferList: any = [];
  tempServiceData: any = [];
  offerServicesDataList: any = [];
  totalprice: any = 0;
  totalPoint: any = 0;
  totaltime: any = 0;
  offerPrice: any = 0;
  tempComboOfferData: any = [];
  tempEmployeeData: any = [];
  selectedComboOffer: any = null;
  selectedComboId: any;
  servicesList: any = [];

  totalTempPrice: any = 0;
  totalTempPoint: any = 0;
  totalTempTime: any = 0;

  activeMembership: any = [];
  dataMembership: any = [];
  tempActiveMembership: any = [];
  selectedActiveMembership: any = [];

  searchQuery: string = '';
  filteredCustomerList: any = [];
  isPurchaseOpen: any;

  appointmentModel: any = {};
  isCombo: boolean = false;
  selectedCustId: any;
  servicesModel: any = {};
  tCustPoint: any = 0;
  tempCustPoint: any = 0;
  customerModel: any = {};

  generalModel: any = {};
  salonId: any;
  billingModel: any = {};
  discountError: string | null = null;
  totalCustPoint: any = [];
  pointsError: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas,
    public formBuilder: UntypedFormBuilder,
    private offerService: OfferService,
    private servicesService: ServiceListService,
    private adminService: AdminService

  ) {
    this.refreshSubscription = this.customerService.refresh$.subscribe(() => {
      this.getAllAppointment();
      this.getOnlyIdealEmployee();
      this.userBookingData = {};
      this.getPendingAppointment(); // Refresh dashboard
    });
    this.getAllAppointment();
    this.getOnlyIdealEmployee();
    this.userBookingData = {};
    this.getPendingAppointment();
  }
  ngOnInit(): void {

    this.validationServiceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }
  get fs() { return this.validationServiceForm.controls; }

  openRight(content: TemplateRef<any>) {
    this.getAllEmployee();
    this.offcanvasService.open(content, { position: 'end' });
  }

  getAllAppointment() {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    this.customerService.getAllAppointmentList().subscribe((data: any) => {
      const filteredData = data.filter((element: any) => {
        const bookingDate = new Date(element.bookingdate);
        bookingDate.setHours(0, 0, 0, 0);
        return (element.isstatus !== 'Completed' || (!element.ispayment || element.ispayment === 0)) &&
          bookingDate.getTime() === todayDate.getTime();
      });
      this.appointmentList = filteredData;
      // for (let i = 0; i < this.appointmentList.length; i++) {
      //   this.appointmentList[i].index = i + 1;
      //   this.getUsedServicesDetails(data[i].id);
      // }
      this.collectionSize = this.appointmentList.length;
      this.getPagintaion();
    });
  }
  getRefreshAppointment() {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    this.customerService.getAllAppointmentList().subscribe((data: any) => {
      const filteredData = data.filter((element: any) => {
        const bookingDate = new Date(element.bookingdate);
        bookingDate.setHours(0, 0, 0, 0);
        return (element.isstatus !== 'Completed' || (!element.ispayment || element.ispayment === 0)) &&
          (bookingDate.getTime() === todayDate.getTime());
      });
      this.appointmentList = filteredData;
      this.collectionSize = this.appointmentList.length;
      this.getPagintaion();
    });
  }
  getPagintaion() {
    for (let i = 0; i < this.appointmentList.length; i++) {
      this.appointmentList[i].index = i + 1;
    }
    this.paginateActiveData = this.appointmentList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  getUsedServicesDetails(id: any) {
    this.customerService.getServicesListUsingId(id).subscribe((data: any) => {
      this.usedServices = data;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
  }
  openUsedServiceList(obj: any, exlargeModal: any) {

    this.userBookingData = obj;
    this.totalPriceForDetails = obj.totalprice
    this.totalPointForDetails = obj.totalpoint
    this.getUsedServicesDetails(obj.id);
    this.getOnlyIdealEmployee();
    this.modalService.open(exlargeModal, { size: 'xl', windowClass: 'modal-holder', centered: true });
  }
  onEmployeeMemberChange(data: any, ind: any, val: any) {

    if (data != undefined) {
      let emp = {
        employeeName: data.employeeName,
        empId: data.id,
        appointmentid: data.appointmentid,
        CSId: val.CSId,
        bookingId: this.userBookingData.id,
        isstatus: 'Processing'
      }
      this.employeeService.updateAppoiEmployeeDetails(emp).subscribe((data: any) => {
        this.getRefreshAppointment();
        this.getUsedServicesDetails(this.userBookingData.id);
        this.getOnlyIdealEmployee();
      })
    }
    else {
      this.getUsedServicesDetails(this.userBookingData.id);
      this.getOnlyIdealEmployee();
    }
  }
  removeEmployeeDetailsFormAppointement(data: any) {
    this.processNumber = 0;
    for (let i = 0; i < this.usedServices.length; i++) {
      if (this.usedServices[i].empid != null && this.usedServices[i].ifcomplete == false) {
        this.processNumber = this.processNumber + 1;
      }
    }
    if (this.processNumber > 1) {
      data.isstatus = 'Processing',
        data.bookingId = this.userBookingData.id,
        this.employeeService.removeAppointementEmployeeDetails(data).subscribe((res: any) => {
          this.getRefreshAppointment();
          this.getUsedServicesDetails(this.userBookingData.id);
          this.getOnlyIdealEmployee();
        })
    }
    else {
      data.isstatus = 'Hold',
        data.bookingId = this.userBookingData.id,
        this.employeeService.removeAppointementEmployeeDetails(data).subscribe((res: any) => {
          this.getRefreshAppointment();
          this.getUsedServicesDetails(this.userBookingData.id);
          this.getOnlyIdealEmployee();
        })
    }

  }
  openPaymentData(data: any, content: any) {
    this.pointsError = null;
    this.discountError = null;
    this.billingModel = {};
    this.paymentDataModel = {};
    this.billingModel.maxdiscountprice = 'Discounted Price';
    this.getAllGeneralDetails();
    this.getCustomerPoints(data.cId);

    this.customerService.getServicesListUsingId(data.id).subscribe((res: any) => {
      this.paymentDataModel = data;
      this.paymentDataModel.services = res;
      if (this.paymentDataModel.vip) {
        const totalPrice = this.paymentDataModel.totalprice;
        const vipDiscountPercentage = this.generalModel.vipdiscount;
        const priceAfterVipDiscount = totalPrice - (totalPrice * (vipDiscountPercentage / 100));
        const discountPrice = totalPrice - priceAfterVipDiscount;
        debugger
        this.billingModel.vipdiscountprice = discountPrice;
      }
    });
    this.modalService.open(content, { size: 'xl', windowClass: 'modal-holder', centered: true });
  }

  calculateDiscount(enteredValue: string) {
    const percentageDiscount = parseFloat(enteredValue);
    const maxDiscount = this.generalModel.maxdiscount;

    if (!isNaN(percentageDiscount)) {
      if (percentageDiscount > maxDiscount) {
        this.discountError = 'Discount cannot exceed the maximum discount.';
        return; // Exit the function if discount is greater than maxDiscount
      } else {
        this.discountError = null; // Clear the error message if discount is valid
      }

      const totalPrice = this.paymentDataModel?.totalprice ?? 0;
      const priceAfterDiscount = totalPrice - (totalPrice * (percentageDiscount / 100));
      const discountPrice = totalPrice - priceAfterDiscount;
      this.billingModel.maxdiscountprice = discountPrice;

      console.log('Price after discount:', priceAfterDiscount);
    } else {
      this.discountError = 'Invalid input. Please enter a valid percentage.';
    }
  }


  calculateRedeemPoints(enteredValue: any) {
    const redemptionPoints = parseInt(enteredValue, 10);

    if (isNaN(redemptionPoints) || redemptionPoints !== 100) {
      this.pointsError = 'Redemption points must be exactly 100.';
      return;
    } else if (this.billingModel.totalcustpoint < redemptionPoints) {
      this.pointsError = 'Insufficient customer points for redemption.';
      return;
    } else {
      this.pointsError = null; // Clear the error message if points are valid
    }

    debugger; // You can remove this line if you don't need to debug

    // Perform redemption and update models
    this.billingModel.redeempoints = redemptionPoints;
    this.billingModel.redeempointprice = this.generalModel.custpointsconvert;

    // Perform any other logic related to redemption
  }


  removeItemFromUsedServices(index: any, data: any) {

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
        if (data.servicetype == 'Combo') {
          const comboIdToRemove = data.comboid;

          this.usedServices.forEach((element: any) => {
            if (element.comboid == comboIdToRemove && element.appointmentid == data.appointmentid) {
              this.point = this.point + element.point;
              this.price = this.price + element.price;
              this.time = this.time + element.time;
            }
          });

          data.removepoint = this.point;
          data.removeprice = this.price;
          data.removetime = this.time;
          this.employeeService.removeComboUsedService(data).subscribe((req) => {
            this.usedServices = this.usedServices.filter((item: any) => item.comboid !== comboIdToRemove);
          })
        }
        else if (data.servicetype == 'Membership') {

          this.employeeService.removeMemberUsedService(data).subscribe((req) => {
            this.usedServices.splice(index, 1);
          })
        }
        else if (data.servicetype == 'Regular') {
          this.employeeService.removeRegularUsedService(data).subscribe((req) => {
            this.usedServices.splice(index, 1);
          })
        }
        for (let i = 0; i < this.usedServices.length; i++) {
          this.usedServices[i].index = i + 1;
        }
        Swal.fire('Deleted!', 'Service details has been deleted.', 'success');
      }
    });

  }
  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;
      this.employeeReg.forEach((employee: any, index: number) => {
        employee.employeeName = `${employee.fname} ${employee.lname}`;
      });
      for (let i = 0; i < this.employeeReg.length; i++) {
        this.employeeReg[i].index = i + 1;
      }
      this.collectionSizeEmployee = this.employeeReg.length;
      this.getEmployeePagintaion();
    });
  }
  getEmployeePagintaion() {
    this.paginateEmployeeData = this.employeeReg.slice((this.pageEmployee - 1) * this.pageSizeEmployee, (this.pageEmployee - 1) * this.pageSizeEmployee + this.pageSizeEmployee);
  }
  getOnlyIdealEmployee() {
    this.employeeService.getOnlyIdealEmployee().subscribe((data: any) => {
      this.idealEmployee = data;
      this.idealEmployee.forEach((employee: any, index: number) => {
        employee.employeeName = `${employee.fname} ${employee.lname}`;
      });
    });
  }
  updateEmpProcessingActive(data: any) {
    let valu = {
      id: data.id,
      isworking: this.isworking = false
    }
    this.employeeService.updateEmpActiveStatus(valu).subscribe((data: any) => {
      this.getAllEmployee();
    })
  }
  updateEmpProcessingDeActive(data: any) {

    let valu = {
      id: data.id,
      isworking: this.isworking = true
    }
    this.employeeService.updateEmpActiveStatus(valu).subscribe((data: any) => {
      this.getAllEmployee();
    })
  }
  selectedCompletedService(data: any) {

    if (data.ifcomplete) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Yes, Service Completed!'
      }).then(result => {
        if (result.value) {

          let com = {
            CSId: data.CSId
          }
          this.customerService.updateCompleteServiceDetails(com).subscribe((data1: any) => {
            this.getUsedServicesDetails(this.userBookingData.id);
            this.usedServices.forEach((element: any) => {
              if (element.ifcomplete == true) {
                this.completeNumber = this.completeNumber + 1;
              }
            });
            if (this.usedServices.length == this.completeNumber) {
              let req = {
                bookingId: this.userBookingData.id,
                isstatus: 'Completed'
              }
              this.customerService.updateCompleteStatusDetails(req).subscribe((data2: any) => {

              })
            }
          })
          let valu = {
            id: data.empid,
            isworking: false
          }
          this.updateEmpProcessingActive(valu);
          this.getOnlyIdealEmployee();
          Swal.fire('Completed!', 'Service completed Successfully.', 'success');
        }
        else {
          data.ifcomplete = false;
        }
      });
    }
  }
  removeAppointmentData(data: any) {

    this.getUsedServicesDetails(data.id);
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
        var userData = [];
        userData = data;
        userData.usedServices = this.usedServices;

        this.customerService.removeCustomerAppointmentData(userData).subscribe((req) => {
          this.getAllAppointment();
        })
        Swal.fire('Deleted!', 'Service details has been deleted.', 'success');
      }
    });
  }
  getPendingAppointment() {
    this.customerService.getAllAppointmentList().subscribe((data: any) => {
      const currentDateUTC = new Date().toISOString();
      this.pendingList = data.filter((item: any) => {
        return item.bookingdate > currentDateUTC;
      });

      // Sort pendingList in ascending order based on booking date
      this.pendingList.sort((a: any, b: any) => {
        return new Date(a.bookingdate).getTime() - new Date(b.bookingdate).getTime();
      });

      this.collectionSizePe = this.pendingList.length;
      this.getPendingPagintaion();
    });
  }

  getPendingPagintaion() {
    for (let i = 0; i < this.pendingList.length; i++) {
      this.pendingList[i].index = i + 1;
    }
    this.paginatePendingData = this.pendingList.slice((this.pagePe - 1) * this.pageSizePe, (this.pagePe - 1) * this.pageSizePe + this.pageSizePe);
  }

  openAddNewService(servicesexlargeModal: any) {
    this.getOfferDetails();

    this.validationServiceForm.markAsUntouched();
    this.tempServiceData = [];
    this.selectedCustId = this.userBookingData.cId;
    this.customerModel = this.userBookingData;

    this.customerModel.customerName = this.userBookingData.fname + ' ' + this.userBookingData.lname;
    this.getAllServices();
    this.getAllEmployee();
    this.viewMembershipDetails();
    this.addOldSelectedServices();
    this.modalService.open(servicesexlargeModal, { size: 'xl', windowClass: 'modal-holder', centered: true });
  }

  addOldSelectedServices() {
    this.usedServices

    for (let i = 0; i < this.usedServices.length; i++) {
      this.tempServiceData.push({
        time: this.usedServices[i].time,
        serpoint: this.usedServices[i].point,
        price: this.usedServices[i].price,
        servicesname: this.usedServices[i].servicesname,
        selectedServid: this.usedServices[i].servicesid,
        servicetype: this.usedServices[i].servicetype,
        memid: this.usedServices[i].memid,
        comboId: this.usedServices[i].comboid,
        CSId: this.usedServices[i].CSId,
        appointmentid: this.usedServices[i].appointmentid,
      });
    }
    for (let i = 0; i < this.tempServiceData.length; i++) {
      this.tempServiceData[i].index = i + 1;
    }
    this.calculateTempServicePointsList();
  }
  getOfferDetails() {
    this.offerService.getActiveOfferList().subscribe((data: any) => {
      this.comboOfferList = data;
    });
  }
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
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
            // employeename: this.offerServicesDataList[i].employeename,
            // selectedEmpid: this.offerServicesDataList[i].selectedEmpid,
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
    this.isCombo = true;
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
  selectedMemberService(data: any) {

    if (data.isChecked == true) {
      this.selectedActiveMembership.push({
        time: data.time,
        serpoint: data.serpoint,
        price: data.price,
        servicesname: data.servicesname,
        selectedServid: data.selectedServid,
        servicetype: 'Membership',
        // employeename: data.employeename,
        // selectedEmpid: data.selectedEmpid,
        memid: data.memid,
        isChecked: true
      });
      for (let i = 0; i < this.selectedActiveMembership.length; i++) {
        this.selectedActiveMembership[i].index = i + 1;
      }
    }
    else if (data.isChecked == false) {
      this.selectedActiveMembership.forEach((element: any, index: number) => {
        if (element.servicetype == 'Membership' && element.selectedServid == data.selectedServid) {

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
          // employeename: element.employeename,
          memid: element.memid,
          // selectedEmpid: element.selectedEmpid,
        });
      }
    });
    for (let i = 0; i < this.tempServiceData.length; i++) {
      this.tempServiceData[i].index = i + 1;
    }
    this.viewMembershipDetails();
    this.calculateTempServicePointsList();
  }
  viewMembershipDetails() {
    this.dataMembership = [];
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const todaydate = `${year}-${month}-${day}`;
    this.activeMembership = [];
    this.tempActiveMembership = [];
    this.selectedActiveMembership = [];
    this.customerService.getActivatedMembershipDetail(this.selectedCustId).subscribe((data: any) => {
      this.dataMembership = data;
      this.dataMembership.forEach((element: any) => {

        if (todaydate < element.validitydate) {
          this.activeMembership.push(element);
        }
      });
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
              remainingquantity: this.activeMembership[i].remainingquantity,
              servicetype: 'Membership',
              memid: this.activeMembership[i].memid,
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
  saveTempServiceDetail() {

    this.tempServiceData.push({
      time: this.servicesModel.Service.time,
      serpoint: this.servicesModel.Service.point,
      price: this.servicesModel.Service.price,
      servicesname: this.servicesModel.Service.name,
      selectedServid: this.servicesModel.Service.id,
      // employeename: this.servicesModel.employee.employeeName,
      // selectedEmpid: this.servicesModel.employee.id,
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
      this.isCombo = false;
    }
    else {
      this.tempServiceData.splice(i, 1);
    }
    for (let i = 0; i < this.tempServiceData.length; i++) {
      this.tempServiceData[i].index = i + 1;
    }
    this.calculateTempServicePointsList();
  }

  getAllGeneralDetails() {
    this.salonId = 1;
    this.adminService.getAllGeneralDetails(this.salonId).subscribe((data: any) => {
      this.generalModel = data[0];
    });
  }
  getCustomerPoints(id: any) {
    this.customerService.getCustAllPoint(id).subscribe((data: any) => {
      this.totalCustPoint = data;
      this.tempCustPoint = 0;
      this.totalCustPoint.forEach((element: any) => {
        if (element.totalcustpoint != undefined) {
          this.tempCustPoint = element.totalcustpoint;
          debugger
        }
      });
      this.billingModel.totalcustpoint = this.tempCustPoint;
    });
  }
}
