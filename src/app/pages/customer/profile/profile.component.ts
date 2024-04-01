import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/account/auth/validation.mustmatch';
import ls from 'localstorage-slim';
import { UserProfileService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';

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
  out_time: any;
  visit: any = '';
  loginTotalTime: number = 0;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserProfileService,
    private router: Router,
    public toastr: ToastrService,
    private adminService:AdminService

  ) { }

  ngOnInit(): void {
    this.unlockForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpwd: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmpwd'),
    });

    this.breadCrumbItems = [
      { label: 'Contacts' },
      { label: 'Profile', active: true }
    ];
  }
  get a() { return this.unlockForm.controls; }

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
          else{
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
}
