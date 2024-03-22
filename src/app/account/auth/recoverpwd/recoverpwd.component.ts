import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../validation.mustmatch';


@Component({
  selector: 'app-recoverpwd',
  templateUrl: './recoverpwd.component.html',
  styleUrls: ['./recoverpwd.component.scss']
})

/**
 * Recover Password Component
 */
export class RecoverpwdComponent implements OnInit {

  resetForm!: UntypedFormGroup;
  unlockForm!: UntypedFormGroup;

  submitted = false;
  unlockSubmit = false; 
  error = '';
  success = '';
  loading = false;

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;


  forgotBox: boolean = false;
  forgotPwdModel: any = {};
  resetPwdModel: any = {};
  changePwd: boolean = false;
  otpBox: boolean = false;
  emailResp: any;
  otpResp: any;
  userOtp: any;
  userEmail: any;
  newPassword: any;
  fname: any;
  lname: any;
  email: any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '35px',
      'height': '50px'
    }
  };

  constructor(private formBuilder: UntypedFormBuilder,
    private router: Router,
    private userProfileService: UserProfileService,
    public toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    /**
     * Form Validation
     */
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.unlockForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpwd: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmpwd'),
    });
  }
// convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }
  get a() { return this.unlockForm.controls; }

  onSubmit() {
    this.success = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    else {
      let data = {
        email: this.f.email.value,
      }
      this.userEmail = data.email;
      this.userProfileService.forgotPwd(data).subscribe((data) => {
        this.emailResp = data[0].userid;
        this.email = data[0].email;
        this.forgotBox = true;
        this.changePwd = false;
        this.otpBox = true;
      });
    }
  }
  onOtpChange(otp: any) {
    this.userOtp = otp;
  }
  resendEmail() {
    this.changePwd = false;
    this.otpBox = false;
    this.forgotBox = false
  }
  saveOTP() {
    this.forgotPwdModel.id = this.emailResp;
    this.forgotPwdModel.otp = this.userOtp;
     
    this.userProfileService.getOneTimePwd(this.forgotPwdModel).subscribe((data:any) => {
      if(data.length>0){
        this.otpResp = data[0].userid;
        this.changePwd = true;
        this.otpBox = false;
        this.forgotBox = true
      }
      else{
        //Error msg here for wrong OTP
      }
     
    });
  }
  onResetSubmit() {
    this.unlockSubmit = true;
    if (this.unlockForm.invalid) {
      return;
    }
    else {
      this.changeForgotPwd();
    }
  }
  changeForgotPwd() {
    this.resetPwdModel.id = this.otpResp;
    this.resetPwdModel.password = this.a.password.value;
    this.resetPwdModel.email = this.email;
    this.userProfileService.updatePassword(this.resetPwdModel).subscribe((req) => {
      this.toastr.success('Your password has been successfully changed.', 'success', {
        timeOut: 3000,
      });
      this.router.navigate(['/account/login']);
    })

  }

}

