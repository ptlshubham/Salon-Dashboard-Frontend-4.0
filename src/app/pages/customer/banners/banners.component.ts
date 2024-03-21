import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BannersService } from 'src/app/core/services/banners.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.scss'
})
export class BannersComponent implements OnInit {
  public bannersList: any = [];

  submitted = false;
  breadCrumbItems!: Array<{}>;
  isAddShow = true;
  collectionSize = 0;
  role: any;
  page = 1;
  pageSize = 10;
  isOpen: boolean = false;
  isUpdate: boolean = false;
  validationForm!: FormGroup;
  bannersImage: any = null;
  imageModel: any = {};
  cardImageBase64: any;
  editFile: boolean = true;
  removeUpload: boolean = false;
  bannersModel: any = {};
  paginateData: any = [];
  imagesData: any = [];
  filterdata: any = [];
  imageUrl: any = "assets/images/file-upload-image.jpg";


  constructor(
    private bannersService: BannersService,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService

  ) { }


  ngOnInit(): void {
    this.getBanners();
    this.validationForm = this.formBuilder.group({
      purpose: ['', [Validators.required]],
    });
  }
  get f() { return this.validationForm.controls; }


  openAddbanners() {
    this.isOpen = true;
    this.isUpdate = false;
    this.bannersModel = {};
    this.validationForm.markAsUntouched();
  }
  backToTable() {
    this.isOpen = false;
    this.isUpdate = false;
    this.bannersModel = {};
    this.validationForm.markAsUntouched();
  }
  onPurposeChange(event: any) {
    this.bannersImage = null;
    this.imageUrl = "assets/images/file-upload-image.jpg"
    console.log('Selected purpose:', event.target.value);
    
    // perform other actions based on the selected value
  }
  // uploadFile(event: any) {
  //   let reader = new FileReader();
  //   let file = event.target.files[0];
  //   if (event.target.files && event.target.files[0]) {
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.imageUrl = reader.result;
  //       const imgBase64Path = reader.result;
  //       this.cardImageBase64 = imgBase64Path;
  //       const formdata = new FormData();
  //       formdata.append('file', file);
  //       this.bannersService.uploadImage(formdata).subscribe((response) => {
  //         this.bannersImage = response;
  //         this.toastr.success('Image Uploaded Successfully', 'Uploaded', {
  //           timeOut: 3000,
  //         });
  //         
  //         this.editFile = false;
  //         this.removeUpload = true;
  //       })
  //     }
  //   }
  // }
  removeUploadedImage() {
    this.bannersImage = null;
    this.imageUrl = 'assets/images/file-upload-image.jpg';
  }
  uploadVideoFile(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('video', file);

    this.bannersService.uploadImage(formData).subscribe((response: any) => {
      this.bannersImage = response;
      this.toastr.success('Video Uploaded Successfully', 'Uploaded', {
        timeOut: 3000,
      });
    })

  }
  uploadFile(event: any) {
    let reader = new FileReader();
    let file = event.target.files[0];
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      if (this.imageModel.purpose == 'slider') {
        
        if (img.width === 1920 && img.height === 710) {
          if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.imageUrl = reader.result;
              const imgBase64Path = reader.result;
              this.cardImageBase64 = imgBase64Path;
              const formdata = new FormData();
              formdata.append('file', file);
              this.bannersService.uploadImage(formdata).subscribe((response) => {
                this.bannersImage = response;
                this.toastr.success('Image Uploaded Successfully', 'Uploaded', {
                  timeOut: 3000,
                });
                this.editFile = false;
                this.removeUpload = true;
              })
            }
          }
        } else {
          this.toastr.error('Please upload an image with dimensions of 1920x710px', 'Invalid Dimension', { timeOut: 3000, });
        }
      }
      else if (this.imageModel.purpose == 'image') {
        if (img.width === 500 && img.height === 500) {
          
          if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.imageUrl = reader.result;
              const imgBase64Path = reader.result;
              this.cardImageBase64 = imgBase64Path;
              const formdata = new FormData();
              formdata.append('file', file);
              this.bannersService.uploadImage(formdata).subscribe((response) => {
                this.bannersImage = response;
                this.toastr.success('Image Uploaded Successfully', 'Uploaded', {
                  timeOut: 3000,
                });
                this.editFile = false;
                this.removeUpload = true;
              })
            }
          }
        } else {
          this.toastr.error('Please upload an image with dimensions of 500x500px', 'Invalid Dimension', { timeOut: 3000, });
        }
      }

    };
  }



  saveGalleryDetails() {
    this.submitted = false;
    if (this.validationForm.invalid) {
      return;
    } else {
      this.imageModel.image = this.bannersImage;
      this.imageModel.status = true;
      this.bannersService.saveWebBannersImage(this.imageModel).subscribe((res: any) => {
        
        this.toastr.success('Images Data added Successfully', 'success', {
          timeOut: 3000,
        });
        this.imageModel = {};
        this.validationForm.markAsUntouched();
        this.getBanners();
        this.isOpen = false;
        this.isUpdate = false;
      })
    }
  }
  getBanners() {
    this.bannersService.getWebBanners().subscribe((res: any) => {
      this.imagesData = res;
      this.filterdata = res;
      for (let i = 0; i < this.imagesData.length; i++) {
        this.imagesData[i].index = i + 1;
      }
      this.collectionSize = this.imagesData.length;
      this.getPagintaion();
    })
  }

  getPagintaion() {
    this.paginateData = this.imagesData.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  onChange(val: any) {
    this.role = val.target.value
    if (this.role != 'All') {
      this.imagesData = [];
      this.filterdata.forEach((element: any) => {
        if (element.purpose == this.role) {
          this.imagesData.push(element);
        }
      });
    }
    else {
      this.getBanners();
    }
    for (let i = 0; i < this.imagesData.length; i++) {
      this.imagesData[i].index = i + 1;
    }
    this.collectionSize = this.imagesData.length;
    this.getPagintaion();
  }
  activeBanners(ind: any) {
    this.paginateData[ind].status = true;
    this.bannersService.activeDeavctiveWebBanners(this.paginateData[ind]).subscribe((req) => {
    })
  }
  deactiveBanners(ind: any) {
    
    this.paginateData[ind].status = false;
    this.bannersService.activeDeavctiveWebBanners(this.paginateData[ind]).subscribe((req) => {
    })
  }
  
  removeBannersImages(id: any) {
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
        this.bannersService.removeWebBanners(id).subscribe(() => {
        })
        this. getBanners();
        Swal.fire('Deleted!', 'Banners Successfully Removed.', 'success');
      }
    });
  }
  
}
