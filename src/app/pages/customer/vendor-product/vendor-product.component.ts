import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from 'src/app/core/services/vendor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { vendorproductService } from 'src/app/core/services/vedorproduct.service';

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
  vendorId: any;
  collectionSize: any;
  tempProductData: any = [];
  productServiceData: any = [];
  productmodel: any = {};
  validationServiceForm!: FormGroup;
  finalprice: any = 0;
  quantity: any = 0;
  totalQuantity: any = 0


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
    this.router.navigate(['/custom/vendor']);
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
      element.qty
      debugger
      if (element.totalprice != undefined) {
        this.finalprice = this.finalprice + element.totalprice;
      }
      if (element.qty) {
        debugger
        this.totalQuantity = this.totalQuantity + element.qty;

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
    debugger
    this.vendorProductService.saveVendororderList(this.productmodel).subscribe((data: any) => {
      if (data = 'success') {
        this.toastr.success('Employee details added successfully', 'Success', { timeOut: 3000 });
        this.isOpen = false;
        this.productmodel = {};
        this.validationForm.markAllAsTouched();
        this.backToTable();
      }
    })
  }
}
