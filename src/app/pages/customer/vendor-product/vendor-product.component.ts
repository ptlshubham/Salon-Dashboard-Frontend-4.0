import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from 'src/app/core/services/vendor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { vendorproductService } from 'src/app/core/services/vedorproduct.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-product',
  templateUrl: './vendor-product.component.html',
  styleUrl: './vendor-product.component.scss'
})
export class VendorProductComponent {
  isOpen: boolean = false;
  validationForm!: FormGroup;
  vendorModel: any = {};
  vendorList: any = [];
  orderList: any = [];
  vendorId: any;
  collectionSize: any;
  tempProductData: any = [];
  productServiceData: any = [];
  productmodel: any = {};
  validationServiceForm!: FormGroup;
  finalprice: any = 0;
  quantity: any = 0;
  totalQuantity: any = 0
  paginateData: any = [];
  page = 1;
  pageSize = 10;
  isUpdate: boolean = false;



  constructor(
    private vendorService: VendorService,
    public formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private vendorProductService: vendorproductService,
    public toastr: ToastrService,

  ) {
    this.activatedRoute.params.subscribe(params => {
      this.vendorId = params['id'];
      this.getVendorDetails();
      this.getorderlist()

    });
  }
  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      Productname: ['', [Validators.required]],
      productprice: ['', Validators.required],
      qty: [0, Validators.required]
    });
  }
  get f() { return this.validationForm.controls; }

  getVendorDetails() {
    this.vendorService.getAllVendorList().subscribe((data: any) => {
      this.vendorList = data;
      this.vendorList.forEach((element: any) => {
        if (this.vendorId == element.id) {
          this.vendorModel = element
        }
      });
    });
  }

  backToTable() {
    this.isOpen = false;
    this.isUpdate = false;
    this.validationForm.markAsUntouched();
    this.productmodel = {};
  }

  addProductList() {
    this.tempProductData.push({
      Productname: this.productmodel.Productname,
      qty: this.productmodel.qty,
      productprice: this.productmodel.productprice,
      selectedServid: this.productmodel.id,
      totalprice: this.productmodel.productprice * this.productmodel.qty,
    });
    this.addFinalPrice();
    this.productmodel = {};
    this.validationForm.markAsUntouched();
    for (let i = 0; i < this.tempProductData.length; i++) {
      this.tempProductData[i].index = i + 1;
    }
  }
  addFinalPrice() {
    this.finalprice = 0;
    this.totalQuantity = 0;

    this.tempProductData.forEach((element: any) => {
      // Check if element.totalprice is defined and add it to final price
      if (element.totalprice !== undefined) {
        this.finalprice += element.totalprice;
      }

      // Check if element.qty exists and is a number or can be parsed to a number
      if (element.qty) {
        const quantity = parseFloat(element.qty);
        if (!isNaN(quantity)) {
          this.totalQuantity += quantity;
        }
      }
    });
  }


  removeItemFromTempServices(i: any) {
    this.tempProductData.splice(i, 1);
    for (let i = 0; i < this.tempProductData.length; i++) {
      this.tempProductData[i].index = i + 1;
    }
    this.addFinalPrice();
  }

  savevedorproductlist() {
    this.productmodel.vid = this.vendorModel.id;
    this.productmodel.finalprice = this.finalprice;
    this.productmodel.totalQuantity = this.totalQuantity;
    this.productmodel.product = this.tempProductData;
    this.vendorProductService.saveVendororderList(this.productmodel).subscribe((data: any) => {
      if (data = 'success') {
        this.toastr.success('Employee details added successfully', 'Success', { timeOut: 3000 });
        this.isOpen = false;
        this.productmodel = {};
        this.validationForm.markAllAsTouched();
        this.backToTable();
        this.getorderlist();
      }
    })
  }

  openvendorder() {
    this.isOpen = true;
    this.isUpdate = false;
    this.productmodel = {};
    this.tempProductData = [];
    this.validationForm.markAsUntouched();
  }

  getorderlist() {
    this.vendorProductService.getVendorOrderList(this.vendorId).subscribe((data: any) => {
      this.orderList = data
      for (let i = 0; i < this.orderList.length; i++) {
        this.orderList[i].index = i + 1;
      }
      this.collectionSize = this.orderList.length;
      this.getPagintaion();
    });
  }
  getPagintaion() {
    this.paginateData = this.orderList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  removeorder(id: any) {
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
        this.vendorProductService.removeorderDetails(id).subscribe(() => {
        })
        Swal.fire('Deleted!', 'vendor order details has been deleted.', 'success');
        this.getorderlist();
      }
    });
  }

  backtovendor() {
    this.router.navigate(['/custom/vendor']);
  }
}
