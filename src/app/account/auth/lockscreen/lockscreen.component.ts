import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ls from 'localstorage-slim';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.scss']
})

/**
 * LookScreen Component
 */
export class LockscreenComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  unlockForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;
  lsData: any = {};
  constructor(private formBuilder: UntypedFormBuilder,
    private loginService: UserProfileService,
    private router: Router,
    public toastr: ToastrService,
  ) {
    this.lsData.userName = ls.get('UserName', { decrypt: true });
    this.lsData.Roles = ls.get('role', { decrypt: true });
    this.lsData.uid = ls.get('UserId', { decrypt: true });
  }

  ngOnInit(): void {
    ls.clear();
    this.setDataToLocalStorage();
    this.unlockForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    });

    document.body.setAttribute('data-layout', 'vertical');

  }
  setDataToLocalStorage() {
    ls.set('UserName', this.lsData.userName, { encrypt: true });
    ls.set('UserId', this.lsData.uid, { encrypt: true });
    ls.set('role', this.lsData.Roles, { encrypt: true });
  };
  // convenience getter for easy access to form fields
  get f() { return this.unlockForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.unlockForm.invalid) {
      return;
    }

  }
  unlockScreen() {
    this.submitted = false;
    // stop here if form is invalid
    if (this.unlockForm.valid) {
      return;
    } else {
      this.loginService.UnlockScreen(this.f.password.value, this.lsData).subscribe((data: any) => {
        
        console.log(data);
        console.log(data);
        if (data == 1) {
          this.toastr.error('Wrong Email!', 'Danger', { timeOut: 3000 });
        }
        else if (data == 2) {
          this.toastr.error('Wrong Password!', 'Danger', { timeOut: 3000 });
        }
        else {
          if (data[0].role == 'Admin') {
          this.toastr.success('Admin successfully Login.', 'Success', { timeOut: 3000 });
            ls.set('lastOutTime', data[0].last_login, { encrypt: true }); // "mÆk¬�k§m®À½½°¹¿¯..."
            ls.set('lastInTime', data[0].last_login, { encrypt: true });
            ls.set('UserName', data[0].firstname + ' ' + data[0].lastname, { encrypt: true });
            ls.set('UserId', data[0].id, { encrypt: true });
            ls.set('authenticationToken', data[0].token, { encrypt: true });
            ls.set('role', data[0].role, { encrypt: true });
            this.router.navigate(['/']);
          }
          else if (data[0].role == 'Customer') {
          this.toastr.success('Customer successfully Login.', 'Success', { timeOut: 3000 });
            ls.set('VIP', data[0].vip, { encrypt: true });
            ls.set('member', data[0].ismembership, { encrypt: true });
            ls.set('lastOutTime', data[0].last_login, { encrypt: true }); // "mÆk¬�k§m®À½½°¹¿¯..."
            ls.set('lastInTime', data[0].last_login, { encrypt: true });
            ls.set('UserName', data[0].fname + ' ' + data[0].lname, { encrypt: true });
            ls.set('UserId', data[0].id, { encrypt: true });
            ls.set('authenticationToken', data[0].token, { encrypt: true });
            ls.set('role', data[0].role, { encrypt: true });

            this.router.navigate(['/']);
          }
          else if (data[0].role == 'Sub-Admin') {
          this.toastr.success('Successfully Login.', 'Success', { timeOut: 3000 });
            ls.set('lastOutTime', data[0].last_login, { encrypt: true }); // "mÆk¬�k§m®À½½°¹¿¯..."
            ls.set('lastInTime', data[0].last_login, { encrypt: true });
            ls.set('UserName', data[0].firstname + ' ' + data[0].lastname, { encrypt: true });
            ls.set('Add Customer', data[0].id, { encrypt: true });
            ls.set('authenticationToken', data[0].token, { encrypt: true });
            ls.set('role', data[0].role, { encrypt: true });
            this.router.navigate(['/']);
          }
        }
      });
    }
  }
}
