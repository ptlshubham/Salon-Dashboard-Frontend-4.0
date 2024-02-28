import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/core/services/customer.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent {

  appointmentList: any = [];
  usedServices: any = [];
  public employeeReg: any[] = [];

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  paginateActiveData: any = [];

  totalPriceForDetails: number = 0;
  totalPointForDetails: number = 0;

  pageEmployee = 1;
  pageSizeEmployee = 10;
  collectionSizeEmployee = 0;
  paginateEmployeeData: any = [];
  isworking: boolean = false;
  paymemtDataModel: any = {};

  constructor(
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private modalService: NgbModal,

  ) {
    this.getAllAppointment();
    this.getAllEmployee();
  }

  getAllAppointment() {
    this.customerService.getAllAppointmentList().subscribe((data: any) => {
      this.appointmentList = data;
      for (let i = 0; i < this.appointmentList.length; i++) {
        this.appointmentList[i].index = i + 1;
        this.customerService.getServicesListUsingId(data[i].id).subscribe((data: any) => {
          this.usedServices = data;
          for (let i = 0; i < this.usedServices.length; i++) {
            this.usedServices[i].index = i + 1;
          }
        });
      }
      this.collectionSize = this.appointmentList.length;
      this.getPagintaion();
    });
  }
  getPagintaion() {
    this.paginateActiveData = this.appointmentList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  openUsedServiceList(obj: any, exlargeModal: any) {
    this.totalPriceForDetails = obj.totalprice
    this.totalPointForDetails = obj.totalpoint
    this.customerService.getServicesListUsingId(obj.id).subscribe((data: any) => {
      this.usedServices = data;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
    this.modalService.open(exlargeModal, { size: 'xl', windowClass: 'modal-holder', centered: true });
  }
  openPaymentData(data: any, exxlargeModal: any) {
    debugger
    this.paymemtDataModel = {};
    this.customerService.getServicesListUsingId(data.id).subscribe((data: any) => {
      this.usedServices = data;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
    this.paymemtDataModel = data;
    this.paymemtDataModel.services = this.usedServices;
    this.modalService.open(exxlargeModal, { size: 'xl', windowClass: 'modal-holder', centered: true });
  }

  removeItemFromUsedServices(index: any, data: any) {
    debugger
    if (data.servicetype == 'Combo') {
      const comboIdToRemove = data.comboid;
      this.usedServices = this.usedServices.filter((item: any) => item.comboid !== comboIdToRemove);
    }
    else if (data.servicetype == 'Membership') {
      this.usedServices.splice(index, 1);
    }
    else if (data.servicetype == 'Regular') {
      this.usedServices.splice(index, 1);
    }

    for (let i = 0; i < this.usedServices.length; i++) {
      this.usedServices[i].index = i + 1;
    }
  }
  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;
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

}
