import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import ls from 'localstorage-slim';
import { MarketingService } from 'src/app/core/services/marketing.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-marketing-promotions',
  templateUrl: './marketing-promotions.component.html',
  styleUrl: './marketing-promotions.component.scss'
})
export class MarketingPromotionsComponent {
  validationForm!: FormGroup;

  purposeData: any = [
    { name: 'Flyer' },
    { name: 'Banner' },
    { name: 'PaperAd' },
    { name: 'Visting Card' },
    { name: 'Letter Head' },
    { name: 'Standy' },
    { name: 'Brochure' },
    { name: 'social media post' },
    { name: 'Extra' }

  ]
  promotionModel: any = {};
  refrenceMultiImage: any = [];
  refrenceImages: any
  optionurlfields: boolean = false;
  promotionData: any = [];
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  addMultiImg: any = [];
  val: number = 0;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private marketingservice: MarketingService,
    public toastr: ToastrService,
  ) {

  }
  ngOnInit(): void {
    this.val++;
    this.sortPurposeData();
    this.validationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      description: ['', [Validators.required]],
      size: ['', [Validators.required]],
      url: [''],
      url1: [''],
      url2: [''],

      custom: ['']
    });
  }
  get f() { return this.validationForm.controls; }

  uploadFile(event: any) {
    debugger
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          this.imageUrl = reader.result;
          const imgBase64Path = reader.result;
          this.cardImageBase64 = imgBase64Path;
          const formdata = new FormData();
          formdata.append('file', file);
          this.marketingservice.uploadRefrenceImage(formdata).subscribe((response) => {
            this.toastr.success('Image Uploaded Successfully', 'Uploaded', { timeOut: 3000, });
            this.refrenceImages = response;
            debugger
            this.editFile = false;
            this.removeUpload = true;
          });

        };
      };
    }
  }
  uploadMultiFile(event: any, ind: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          this.addMultiImg[ind].multiImageUrl = reader.result;
          const imgBase64Path = reader.result;
          this.cardImageBase64 = imgBase64Path;
          const formdata = new FormData();
          formdata.append('file', file);
          this.marketingservice.UploadMultiRefrence(formdata).subscribe((response) => {
            this.toastr.success('Image Uploaded Successfully', 'Uploaded', { timeOut: 3000, });
            this.refrenceMultiImage = response
            this.addMultiImg[ind].multiImageUrl = response;
            debugger
            this.editFile = false;
            this.removeUpload = true;
          });
        }
      };
    };
  }
  removeUploadedLogo() {

    // this.imageUrl = 'assets/images/file-upload-image.jpg';
    // this.promotionModel.image = this.image;
    // this.marketingservice.SavePromotiondetails(this.promotionModel).subscribe((req) => {
    //   this.toastr.success('Logo Remove successfully', 'Updated', { timeOut: 3000 });
    // });
  }
  removeUploadedImage() {
    // let data = {
    //   img: this.refrenceImage
    // };
    // this.marketingservice.RemoveRefrenceImage(data).subscribe((res: any) => {
    //   if (res == 'sucess') {
    //     this.toastr.success('Image removed successfully.', 'Deleted', { timeOut: 2000, });
    //   } else {
    //     this.toastr.error('Something went wrong try again later', 'Error', { timeOut: 2000, });
    //   }
    // })
    // this.refrenceImage = null;
    // this.imageUrl = 'assets/images/file-upload-image.jpg';

  }
  sortPurposeData() {
    this.purposeData.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }
  addMultiplrImage() {
    this.val++;
    this.addMultiImg.push(
      {
        name: this.val,
        multiImageUrl: 'assets/images/file-upload-image.jpg'
      }
    );
  }

  savePromotionDetails() {
    debugger
    this.promotionModel.refrenceMultiImage = this.refrenceMultiImage;
    this.promotionModel.salonid = ls.get('salonid', { decrypt: true });
    this.marketingservice.SavePromotiondetails(this.promotionModel).subscribe((res: any) => {
      this.promotionData = res;
      this.promotionModel.refrenceImages = null;
      this.refrenceImages = null;
      this.promotionModel.refrenceMultiImage = [];
      this.refrenceMultiImage = [];
      this.toastr.success('Images Data added Successfully', 'success', {
        timeOut: 3000,
      });
      this.promotionModel = {};
      this.validationForm.markAsUntouched();
    })
  }
}








