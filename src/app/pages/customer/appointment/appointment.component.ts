import { Component, TemplateRef } from '@angular/core';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/core/services/customer.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent {

  appointmentList: any = [];
  usedServices: any = [];
  public employeeReg: any[] = [];
  public idealEmployee: any[] = [];
  userBookingData: any = {};
  page = 1;
  pageSize = 5;
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
  completeNumber: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas

  ) {
    this.getAllAppointment();
    this.getOnlyIdealEmployee();
    this.userBookingData = {};
  }

  openRight(content: TemplateRef<any>) {
    this.getAllEmployee();
    this.offcanvasService.open(content, { position: 'end' });
  }
  getAllAppointment() {
    this.customerService.getAllAppointmentList().subscribe((data: any) => {
      const filteredData = data.filter((element: any) => {
        return element.isstatus !== 'Completed' || (!element.ispayment || element.ispayment === 0);
      });
      this.appointmentList = filteredData;
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

    this.userBookingData = obj;
    this.totalPriceForDetails = obj.totalprice
    this.totalPointForDetails = obj.totalpoint
    this.customerService.getServicesListUsingId(obj.id).subscribe((data: any) => {
      this.usedServices = data;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
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
        this.customerService.getServicesListUsingId(this.userBookingData.id).subscribe((data: any) => {
          this.usedServices = data;
          for (let i = 0; i < this.usedServices.length; i++) {
            this.usedServices[i].index = i + 1;
          }
          this.getOnlyIdealEmployee();
          // this.getAllAppointment();
        });
      })
    }
    else {

      this.customerService.getServicesListUsingId(this.userBookingData.id).subscribe((data: any) => {
        this.usedServices = data;
        for (let i = 0; i < this.usedServices.length; i++) {
          this.usedServices[i].index = i + 1;
        }
        this.getOnlyIdealEmployee();
      });
    }
  }
  removeEmployeeDetailsFormAppointement(data: any) {

    data.isstatus = 'Hold',
      data.bookingId = this.userBookingData.id,
      this.employeeService.removeAppointementEmployeeDetails(data).subscribe((res: any) => {
        this.customerService.getServicesListUsingId(this.userBookingData.id).subscribe((data: any) => {
          this.usedServices = data;

          for (let i = 0; i < this.usedServices.length; i++) {
            this.usedServices[i].index = i + 1;
          }
          this.getOnlyIdealEmployee();
        });
      })
  }
  openPaymentData(data: any, exxlargeModal: any) {

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
        data
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
        // this.employeeService.removeEmployeeList(id).subscribe((req) => {
        // })
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
            this.customerService.getServicesListUsingId(this.userBookingData.id).subscribe((data: any) => {
              this.usedServices = data;
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
            });
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
}
