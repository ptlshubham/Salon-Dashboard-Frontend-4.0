import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/account/auth/validation.mustmatch';
import ls from 'localstorage-slim';
import { UserProfileService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { monthlyPlan, } from './pricing.model';
import { ActivatedRoute } from '@angular/router';
import { monthlyData, } from './data';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { Instagram, Linkedin, Twitter, Youtube } from 'angular-feather/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  unlockForm!: UntypedFormGroup;
  unlockSubmit = false;
  passwordValue: string = '';
  valid: boolean = false;
  resetPwdModel: any = {};
  datetime: any;
  in_time: any;


  loginTotalTime: number = 0;
  generalModel: any = {};
  discountValidationForm!: FormGroup;
  userData: any = {};
  monthlyData!: monthlyPlan[];
  selectedCurrency: string = '';
  EmployeeModel: any = {};
  public employeeList: any[] = [];
  SocialLinks!: FormGroup;
  googlecredencial!: FormGroup;
  facebookcredencial!: FormGroup;
  twiterlogincredencial!: FormGroup;
  instacreddencial!: FormGroup;
  linkedincredencial!: FormGroup;
  googleanalytics!: FormGroup;
  egaCode!: FormGroup;
  disfbmsg!: FormGroup;
  fbpixel!: FormGroup;
  userdetails!: FormGroup;
  companyDetails!: FormGroup;
  public registrationModel: any = {};
  public socialLinksModel: any = {};
  genderData: any = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' }
  ]
  selectedState: any;
  selectedGender: any;

  selectedstateuser: any;
  stateData: any = [];
  selectedCity: any;
  cityListData: any = [];
  cityData: any = [];
  cityListDataUser: any = [];
  socialmedialist: any = [];
  credentialslist: any = [];
  public googleModel: any = {};
  facebookModel: any = {};
  twitterModel: any = {};
  instaModel: any = {};
  linkedinModel: any = {};
  socialcredentiallist: any = [];
  seodetailsList: any = [];
  sociallinkslist: any = [];
  getsociallinklist: any = []
  googlelist: any = []
  hasSocialLinksData: boolean = false;
  hasgooglecred: boolean = false;
  hasfacebookcred: boolean = false;
  hastwittercred: boolean = false;
  hasinstacred: boolean = false;
  haslinkedincred: boolean = false;

  hasGoogleAnalytics: boolean = false;
  hasfacebookPixel: boolean = false;
  hasgoogleadsencecode: boolean = false;
  hasfacebookmessage: boolean = false;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  cardImageBase64: any;
  clogo: any = null;
  editFile: boolean = true;
  googleAnalyticModel: any = {}
  googleAdsenseModel: any = {}
  googleSeoList: any = []
  facebookMessagerModel: any = {}
  facebookPixelModel: any = {}
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  // bread crumb items

  breadCrumbItems!: Array<{}>;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserProfileService,
    private router: Router,
    public toastr: ToastrService,
    private adminService: AdminService,
    private employeeService: EmployeeService,
    public activatedRoute: ActivatedRoute,


  ) {
    this.getUserDataById();
    this.getAllGeneralDetails();
    this.getStateList();

  }

  ngOnInit(): void {
    this.getAllRegistration();
    this.selectedCurrency = '₹';
    this.SocialLinks = this.formBuilder.group({
      facebooklink: ['', [Validators.required]],
      instagramlink: ['', [Validators.required]],
      twitterlink: ['', [Validators.required]],
      linkedinlink: ['', [Validators.required]],
      youtubelink: ['', [Validators.required]]
    });
    this.googlecredencial = this.formBuilder.group({
      gid: ['', Validators.required],
      gpass: ['', Validators.required]
    });
    this.facebookcredencial = this.formBuilder.group({
      fbid: ['', Validators.required],
      fbpass: ['', Validators.required]
    });
    this.twiterlogincredencial = this.formBuilder.group({
      tid: ['', Validators.required],
      tpass: ['', Validators.required]
    });
    this.instacreddencial = this.formBuilder.group({
      instaid: ['', Validators.required],
      instapass: ['', Validators.required]
    });
    this.linkedincredencial = this.formBuilder.group({
      linkedinid: ['', Validators.required],
      linkedinpass: ['', Validators.required]
    });

    this.googleanalytics = this.formBuilder.group({
      analytics: ['', Validators.required]
    });

    this.egaCode = this.formBuilder.group({
      googleadsencecode: ['', Validators.required]
    });

    this.disfbmsg = this.formBuilder.group({
      fbmsg: ['', Validators.required]
    });
    this.fbpixel = this.formBuilder.group({
      pix: ['', Validators.required]
    });

    this.unlockForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpwd: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmpwd'),
    });
    this.discountValidationForm = this.formBuilder.group({
      vipdiscount: ['', Validators.required],
      maxdiscount: ['', Validators.required],
      emppointsconvert: ['', Validators.required],
      custpointsconvert: ['', Validators.required],
      currency: ['']
    });
    this.userdetails = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      uphone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      uwhatsapp: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      uaddress: ['', [Validators.required]],
      ustate: ['', [Validators.required]],
      ulandmark: [''],
      ucity: ['', [Validators.required]],
      selectGender: ['', [Validators.required]],
      upincode: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
    });

    this.companyDetails = this.formBuilder.group({
      cname: ['', Validators.required],
      cphone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      cwhatsapp: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      cemail: ['', Validators.required],
      cgst: ['', [Validators.required]],
      caddress: ['', [Validators.required]],
      cstate: ['', [Validators.required]],
      clandmark: [''],
      ccity: ['', [Validators.required]],
      cpincode: ['', [Validators.required]],
      clogo: ['']
    })
    this.breadCrumbItems = [
      { label: 'Contacts' },
      { label: 'Profile', active: true }
    ];
    this.getAllGeneralDetails();
    this._fetchData();

  }

  // Pricing Data Fetch
  private _fetchData() {
    this.monthlyData = monthlyData;
  }
  get a() { return this.unlockForm.controls; }
  get f() { return this.discountValidationForm.controls; }
  get l() { return this.SocialLinks.controls; }
  get gc() { return this.googlecredencial.controls; }
  get fb() { return this.facebookcredencial.controls; }
  get tw() { return this.twiterlogincredencial.controls; }
  get ins() { return this.instacreddencial.controls; }
  get lin() { return this.linkedincredencial.controls; }
  get gayl() { return this.googleanalytics.controls; }
  get adsense() { return this.egaCode.controls; }
  get fbmsg() { return this.disfbmsg.controls; }
  get p() { return this.fbpixel.controls; }
  get ud() { return this.userdetails.controls; }
  get cd() { return this.companyDetails.controls; }
  onResetSubmit() {
    this.unlockSubmit = true;
    if (this.unlockForm.invalid) {
      return;
    }
    else {
      if (this.valid) {
        let data = {
          id: ls.get('UserId', { decrypt: true }),
          password: this.passwordValue
        }
        this.resetPwdModel.id = ls.get('UserId', { decrypt: true });
        this.resetPwdModel.password = this.a.password.value;
        this.resetPwdModel.confirmpwd = this.a.confirmpwd.value;
        this.userService.updatePassword(this.resetPwdModel).subscribe((data) => {
          if (data == "error") {
            this.toastr.error('This Contact Number is already registered.', 'Error', { timeOut: 3000 });
          }
          else {
            this.toastr.success('Your password has been successfully changed.', 'success', {
              timeOut: 3000,
            });
            this.logout();
          }
        });
      }
    }
  }
  getTimeDifference(intime: string): number {
    const currentTime = new Date();
    const intimeDate = new Date(intime);
    if (intimeDate < currentTime) {
      const timeDifference = currentTime.getTime() - intimeDate.getTime();
      const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));
      this.loginTotalTime = timeDifferenceInMinutes;
      return timeDifferenceInMinutes;
    } else {
      console.error('Login time is in the future!');
      return NaN; // or handle it according to your requirements
    }
  }
  logout() {
    this.getTimeDifference(this.in_time);
    let data = {
      userid: ls.get('UserId', { decrypt: true }),
      loginMinute: this.loginTotalTime
    };
    this.userService.UpdateLogout(data).subscribe((res) => {
      ls.clear();
      this.router.navigate(['/account/login']);
    });
  }

  onPasswordFocusOut() {
    let data = {
      id: ls.get('UserId', { decrypt: true }),
      pass: this.passwordValue
    }
    this.userService.CheckPassword(data).subscribe((data: any) => {
      if (data.error == "Invalid credentials") {
        this.valid = false;
        this.toastr.error('Your old password is incorrect', 'Error', { timeOut: 3000 });
      }
      else {
        if (data.message == "success") {
          this.valid = true;
        }
      }
    })
  }
  getUserDataById() {
    this.userService.getUserData(ls.get('UserId', { decrypt: true })).subscribe((data: any) => {
      this.userData = data[0];
      this.userData.name = ls.get('UserName', { decrypt: true });
    });
  }
  saveGeneralServiceDetail() {
    if (this.discountValidationForm.valid) {
      this.generalModel.currency = this.selectedCurrency;
      this.adminService.saveGeneralDetails(this.generalModel).subscribe((data: any) => {
        this.generalModel = data[0];
        this.toastr.success('Service details added successfully', 'Success', { timeOut: 3000 });
        this.discountValidationForm.markAsUntouched();
      })
    }
  }
  getAllGeneralDetails() {
    this.adminService.getAllGeneralDetails(ls.get('salonid', { decrypt: true })).subscribe((data: any) => {
      this.selectedCurrency = data[0].currency;
      this.generalModel = data[0];

    });
  }
  selectedCurrencyData(currency: string) {
    this.selectedCurrency = currency;
  }
  onEmpChange() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeList = data;
    });
  }
  selectGenderData(e: any): void {
    this.selectedGender = e.target.value;
  }
  selectStateData(e: any): void {
    this.selectedState = e.target.value;
    this.selectedstateuser = e.target.value
    this.getCityListAccordingState();
  }
  getCityListAccordingState() {
    this.cityListData = [];
    this.cityListDataUser = [];
    this.employeeService.getCityFromJson().subscribe((res: any) => {
      this.cityData = res;
      this.cityData.forEach((element: any) => {
        if (element.state == this.selectedState) {
          this.cityListData.push(element);
        }
      });
      this.cityData.forEach((element: any) => {
        if (element.state == this.selectedstateuser) {
          this.cityListDataUser.push(element);
        }
      });
    })
  }
  getStateList() {
    this.employeeService.getStateFromJson().subscribe((res: any) => {
      this.stateData = res;
    })
  }
  selectCityData(e: any): void {
    this.selectedCity = e.target.value
  }

  getAllRegistration() {
    this.adminService.getAllRegistrationList(ls.get('salonid', { decrypt: true })).subscribe((data: any) => {
      this.registrationModel = data[0];
      this.selectedGender = this.registrationModel.ugender;
      this.cityListData = [];
      this.cityListDataUser = [];
      this.employeeService.getCityFromJson().subscribe((res: any) => {
        this.cityData = res;
        this.cityData.forEach((element: any) => {
          if (element.state == this.registrationModel.cstate) {
            this.cityListData.push(element);
          }
          if (element.state == this.registrationModel.ustate) {
            this.cityListDataUser.push(element);
          }
        });
      })
    });
  }

  updateuserdetails() {
    this.registrationModel.selectGender = this.selectedGender
    this.adminService.updateUserDetails(this.registrationModel).subscribe((req) => {
      this.toastr.success('User details updated successfully', 'Updated', { timeOut: 3000 });
    });
  }
  UpdateCompaniesDetails() {
    this.adminService.updateCompaniesDetails(this.registrationModel).subscribe((req) => {
      this.toastr.success('companies details updated successfully', 'Updated', { timeOut: 3000 });

    });
  }
  saveSocialLinks() {
    this.socialLinksModel.salonid = ls.get('salonid', { decrypt: true });
    this.adminService.saveSocialLinks(this.socialLinksModel).subscribe((data: any) => {
      this.sociallinkslist = data;
      this.socialLinksModel = {};
      this.toastr.success('SocialLinks added successfully', 'Success', { timeOut: 3000 });
      this.getSocialLinks();
    });
  }

  submitGoogle() {
    this.googleModel.salonid = ls.get('salonid', { decrypt: true });
    this.googleModel.accounttype = 'Google';
    this.adminService.saveCredentials(this.googleModel).subscribe((data: any) => {
      this.credentialslist = data;
      this.toastr.success('google Credentials  added successfully', 'Success', { timeOut: 3000 });
      this.getSocialCred();
    });
  }
  submitFacebook() {
    this.facebookModel.salonid = ls.get('salonid', { decrypt: true });
    this.facebookModel.accounttype = 'Facebook';
    this.adminService.saveCredentials(this.facebookModel).subscribe((data: any) => {
      this.credentialslist = data;
      this.toastr.success('Facebook Credentials  added successfully', 'Success', { timeOut: 3000 });
      this.getSocialCred();

    });
  }

  submitTwitter() {
    this.twitterModel.salonid = ls.get('salonid', { decrypt: true });
    this.twitterModel.accounttype = 'Twitter';
    this.adminService.saveCredentials(this.twitterModel).subscribe((data: any) => {
      this.credentialslist = data;
      this.toastr.success('Twitter Credentials  added successfully', 'Success', { timeOut: 3000 });
      this.getSocialCred();

    });
  }
  submitInsta() {
    this.instaModel.salonid = ls.get('salonid', { decrypt: true });
    this.instaModel.accounttype = 'Instagram';
    this.adminService.saveCredentials(this.instaModel).subscribe((data: any) => {
      this.credentialslist = data;
      this.toastr.success('Instagram Credentials  added successfully', 'Success', { timeOut: 3000 });
      this.getSocialCred();

    });
  }
  submitLinkedinCred() {
    this.linkedinModel.salonid = ls.get('salonid', { decrypt: true });
    this.linkedinModel.accounttype = 'Linkedin';
    this.adminService.saveCredentials(this.linkedinModel).subscribe((data: any) => {
      this.credentialslist = data;
      this.toastr.success('Linkedin Credentials  added successfully', 'Success', { timeOut: 3000 });
      this.getSocialCred();

    });
  }


  updateSocialLinks() {
    this.socialLinksModel.salonid = ls.get('salonid', { decrypt: true });
    this.adminService.saveSocialLinks(this.socialLinksModel).subscribe((data: any) => {
      this.sociallinkslist = data;
      this.toastr.success('SocialLinks updated successfully', 'Success', { timeOut: 3000 });
    });
  }
  updateGoogleCred() {
    this.googleModel.salonid = ls.get('salonid', { decrypt: true });
    this.googleModel.accounttype = 'Google';
    this.adminService.saveCredentials(this.googleModel).subscribe((data: any) => {
      this.credentialslist = data;
      this.toastr.success('google credentials updated successfully', 'Success', { timeOut: 3000 });
    });
  };
  updateFacebookCred() {
    this.facebookModel.salonid = ls.get('salonid', { decrypt: true });
    this.facebookModel.accounttype = 'Facebook';
    this.adminService.saveCredentials(this.facebookModel).subscribe((data: any) => {
      this.credentialslist = data;
      this.toastr.success('Facebook credentials updated successfully', 'Success', { timeOut: 3000 });
    },
    );
  }
  updateTwitterCred() {
    this.twitterModel.salonid = ls.get('salonid', { decrypt: true });
    this.twitterModel.accounttype = 'Twitter';
    this.adminService.saveCredentials(this.twitterModel).subscribe((data: any) => {
      this.credentialslist = data;
      this.toastr.success('Twitter credentials updated successfully', 'Success', { timeOut: 3000 });
    },
    );
  }
  updateLinkdinCred() {
    this.linkedinModel.salonid = ls.get('salonid', { decrypt: true });
    this.linkedinModel.accounttype = 'Linkedin';

    this.adminService.saveCredentials(this.linkedinModel).subscribe((data: any) => {
      this.credentialslist = data;
      this.toastr.success('Linkedin credentials updated successfully', 'Success', { timeOut: 3000 });
    },
    );
  }
  updateInstaCred() {
    this.instaModel.salonid = ls.get('salonid', { decrypt: true });
    this.instaModel.accounttype = 'Instagram';
    this.adminService.saveCredentials(this.instaModel).subscribe((data: any) => {
      this.credentialslist = data;
      this.toastr.success('Instagram credentials updated successfully', 'Success', { timeOut: 3000 });
    },
    );
  }
  getSocialLinks() {
    this.adminService.getSocialLinks(ls.get('salonid', { decrypt: true })).subscribe((data: any) => {
      if (data.length > 0) {
        this.hasSocialLinksData = true;
        this.socialLinksModel = data[0];
      }
      else {
        this.hasSocialLinksData = false;
      }
    });
  }


  getSocialCred() {
    this.adminService.getSocialCredentials(ls.get('salonid', { decrypt: true })).subscribe((data: any) => {
      if (data.length > 0) {
        this.hasgooglecred = data.some((item: any) => item.accounttype === 'Google');
        this.hasfacebookcred = data.some((item: any) => item.accounttype === 'Facebook');
        this.hasinstacred = data.some((item: any) => item.accounttype === 'Instagram');
        this.haslinkedincred = data.some((item: any) => item.accounttype === 'Linkedin');
        this.hastwittercred = data.some((item: any) => item.accounttype === 'Twitter');

        this.googleModel = data.find((item: any) => item.accounttype === 'Google') || {};
        this.facebookModel = data.find((item: any) => item.accounttype === 'Facebook') || {};
        this.instaModel = data.find((item: any) => item.accounttype === 'Instagram') || {};
        this.linkedinModel = data.find((item: any) => item.accounttype === 'Linkedin') || {};
        this.twitterModel = data.find((item: any) => item.accounttype === 'Twitter') || {};
      } else {
        this.hasgooglecred = false;
        this.hasfacebookcred = false;
        this.hasinstacred = false;
        this.haslinkedincred = false;
        this.hastwittercred = false;
      }

      this.socialcredentiallist.forEach((element: any) => {
        switch (element.accounttype) {
          case 'Google':
            this.googleModel.username = element.username;
            this.googleModel.password = element.password;
            break;
          case 'Facebook':
            this.facebookModel.username = element.username;
            this.facebookModel.password = element.password;
            break;
          case 'Instagram':
            this.instaModel.username = element.username;
            this.instaModel.password = element.password;
            break;
          case 'Linkedin':
            this.linkedinModel.username = element.username;
            this.linkedinModel.password = element.password;
            break;
          case 'Twitter':
            this.twitterModel.username = element.username;
            this.twitterModel.password = element.password;
            break;
          default:
            break;
        }
      });
    });
  }
  removeUploadedLogo() {
    this.clogo = null;
    this.imageUrl = 'assets/images/file-upload-image.jpg';
    this.registrationModel.clogo = this.clogo;
    this.adminService.saveCompaniesLogo(this.registrationModel).subscribe((req) => {
      this.toastr.success('Logo updated successfully', 'Updated', { timeOut: 3000 });
    });
  }
  getSocialData() {
    this.getSocialCred();
    this.getSocialLinks();
  }

  // Logo Upload
  uploadFile(event: any) {
    let reader = new FileReader();
    let file = event.target.files[0];
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {

      if (img.width === 250 && img.height === 250) {
        if (event.target.files && event.target.files[0]) {
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imageUrl = reader.result;
            const imgBase64Path = reader.result;
            this.cardImageBase64 = imgBase64Path;
            const formdata = new FormData();
            formdata.append('file', file);
            this.adminService.uploadLogoImage(formdata).subscribe((response) => {
              this.clogo = response;
              this.updatelogo();
              this.toastr.success('Image Uploaded Successfully', 'Uploaded', {
                timeOut: 3000,
              });
              this.editFile = false;
              // this.removeUpload = true;
            });
          }
        }
      } else {
        this.toastr.error('Please upload an image with dimensions of 250x250px', 'Invalid Dimension', { timeOut: 3000, });
      }
    };
  }

  removeUploadedImage() {
    this.clogo = null;
    this.imageUrl = 'assets/images/file-upload-image.jpg';
  }
  updatelogo() {
    this.registrationModel.clogo = this.clogo;
    this.adminService.saveCompaniesLogo(this.registrationModel).subscribe((req) => {
      this.toastr.success('Logo updated successfully', 'Updated', { timeOut: 3000 });
    });
  }

  saveGoogleAnalytics() {
    this.googleAnalyticModel.salonid = ls.get('salonid', { decrypt: true });
    this.googleAnalyticModel.type = 'Google Analytics';

    this.adminService.saveSeoDetails(this.googleAnalyticModel).subscribe((data: any) => {
      this.googleSeoList = data;
      this.toastr.success('Google Analytics code added successfully', 'Success', { timeOut: 3000 });
      this.getSeoDetails();

    });
  }
  updateGoogleAnalytics() {
    this.googleAnalyticModel.salonid = ls.get('salonid', { decrypt: true });
    this.googleAnalyticModel.type = 'Google Analytics';
    this.adminService.saveSeoDetails(this.googleAnalyticModel).subscribe((data: any) => {
      this.googleSeoList = data;
      this.toastr.success('Google Analytics  updated successfully', 'Success', { timeOut: 3000 });
    },
    );
  }
  saveGoogleAdsense() {
    this.googleAdsenseModel.salonid = ls.get('salonid', { decrypt: true });
    this.googleAdsenseModel.type = 'Google Adsense';
    this.adminService.saveSeoDetails(this.googleAdsenseModel).subscribe((data: any) => {
      this.googleSeoList = data;
      this.toastr.success('Google Adsense  added successfully', 'Success', { timeOut: 3000 });
      this.getSeoDetails();
    });
  }
  updateGoogleAdsense() {
    this.googleAdsenseModel.salonid = ls.get('salonid', { decrypt: true });
    this.googleAdsenseModel.type = 'Google Adsense';
    this.adminService.saveSeoDetails(this.googleAdsenseModel).subscribe((data: any) => {
      this.googleSeoList = data;
      this.toastr.success('google Adsense  updated successfully', 'Success', { timeOut: 3000 });
    },
    );
  }
  saveFacebookMessenger() {
    this.facebookMessagerModel.salonid = ls.get('salonid', { decrypt: true });
    this.facebookMessagerModel.type = 'Facebook Messenger';
    this.adminService.saveSeoDetails(this.facebookMessagerModel).subscribe((data: any) => {
      this.googleSeoList = data;
      this.toastr.success('Facebook Message  added successfully', 'Success', { timeOut: 3000 });
      this.getSeoDetails();

    });
  }
  updateFacebookMessenger() {
    this.facebookMessagerModel.salonid = ls.get('salonid', { decrypt: true });
    this.facebookMessagerModel.type = 'Facebook Messenger';
    this.adminService.saveSeoDetails(this.facebookMessagerModel).subscribe((data: any) => {
      this.googleSeoList = data;
      this.toastr.success('Facebook Message updated successfully', 'Success', { timeOut: 3000 });
    },
    );
  }
  saveFacebookPixelcode() {
    this.facebookPixelModel.salonid = ls.get('salonid', { decrypt: true });
    this.facebookPixelModel.type = 'Facebook Pixel';
    this.adminService.saveSeoDetails(this.facebookPixelModel).subscribe((data: any) => {
      this.googleSeoList = data;
      this.toastr.success('Facebook Pixel  added successfully', 'Success', { timeOut: 3000 });
      this.getSeoDetails();

    });
  }
  updateFacebookPixelcode() {
    this.facebookPixelModel.salonid = ls.get('salonid', { decrypt: true });
    this.facebookPixelModel.type = 'Facebook Pixel';
    this.adminService.saveSeoDetails(this.facebookPixelModel).subscribe((data: any) => {
      this.googleSeoList = data;
      this.toastr.success('Facebook Pixel updated successfully', 'Success', { timeOut: 3000 });
    },
    );
  }
  getSeoDetails() {
    this.adminService.GetSeoDetails(ls.get('salonid', { decrypt: true })).subscribe((data: any) => {
      if (data.length > 0) {
        this.hasGoogleAnalytics = data.some((item: any) => item.type === 'Google Analytics');
        this.hasgoogleadsencecode = data.some((item: any) => item.type === 'Google Adsense');
        this.hasfacebookmessage = data.some((item: any) => item.type === 'Facebook Messenger');
        this.hasfacebookPixel = data.some((item: any) => item.type === 'Facebook Pixel');
        this.googleAnalyticModel = data.find((item: any) => item.type === 'Google Analytics') || {};
        this.googleAdsenseModel = data.find((item: any) => item.type === 'Google Adsense') || {};
        this.facebookMessagerModel = data.find((item: any) => item.type === 'Facebook Messenger') || {};
        this.facebookPixelModel = data.find((item: any) => item.type === 'Facebook Pixel') || {};

      } else {
        this.hasGoogleAnalytics = false;
        this.hasgoogleadsencecode = false;
        this.hasfacebookmessage = false;
        this.hasfacebookPixel = false;
      }

      this.seodetailsList.forEach((element: any) => {
        switch (element.type) {
          case 'Google Analytics':
            this.googleAnalyticModel.code = element.code;
            break;
          case 'Google Adsense':
            this.googleAdsenseModel.code = element.code;
            break;
          case 'Facebook Messenger':
            this.facebookMessagerModel.code = element.code;
            break;
          case 'Facebook Pixel':
            this.facebookPixelModel.code = element.code;
            break;
          default:
            break;
        }
      });
    });
  };
  getallseo() {
    this.getSeoDetails();
  }
}
