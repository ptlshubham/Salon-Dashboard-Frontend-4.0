import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Services } from 'src/app/core/models/services.model';
import { ServiceListService } from 'src/app/core/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  public servicesModel: Services = new Services;
  public servicesList: Services[] = [];
  public services: Services[] = [];

  isOpen: boolean = false;
  isUpdate: boolean = false;
  validationForm!: FormGroup;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  paginateData: any = [];


  constructor(
    private servicesService: ServiceListService,
    public formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.getAllServices();

    this.validationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      time: ['', [Validators.required]],
      point: ['', [Validators.required]],
      epoint: ['', [Validators.required]],
    });

  }
  get f() { return this.validationForm.controls; }

  backToTable() {
    this.isOpen = false;
    this.isUpdate = false;
    this.servicesModel = [];
    this.validationForm.markAsUntouched();
  }

  openAddServices() {
    this.isOpen = true;
    this.isUpdate = false;
    this.servicesModel = [];
    this.validationForm.markAsUntouched();
  }
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;

      for (let i = 0; i < this.servicesList.length; i++) {
        this.servicesList[i].index = i + 1;
      }
      this.collectionSize = this.servicesList.length;
      this.getPagintaion();
    });
  }
  getPagintaion() {
    this.paginateData = this.servicesList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  saveServicesDetail() {
    this.servicesService.saveServiceList(this.servicesModel).subscribe((data: any) => {
      this.servicesList = data;
    })
  }
  openUpdateService(data: any) {
    this.isOpen = true;
    this.isUpdate = true;
    this.servicesModel = data;
  }
  removeServiceDetails(id: any) {
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
        this.servicesService.removeServicesList(id).subscribe((req) => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          this.getAllServices();
        })
      }
    });
  }
  updateServicesDetail() {
    this.servicesModel
    this.servicesService.updateServicesList(this.servicesModel).subscribe((req) => {
      this.isOpen = false;
      this.isUpdate = false;
      this.getAllServices();
    })
  }
}
