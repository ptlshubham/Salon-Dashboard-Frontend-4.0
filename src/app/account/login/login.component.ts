import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { UserProfileService } from 'src/app/core/services/user.service';
import ls from 'localstorage-slim';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  loginForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  layout_mode!: string;
  fieldTextType!: boolean;

  constructor(private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: UserProfileService,
    public toastr: ToastrService,
    // private homeService: HomeService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if (this.layout_mode === 'dark') {
      document.body.setAttribute("data-bs-theme", "dark");
    }
    //Validation Set
    this.loginForm = this.formBuilder.group({
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    document.body.setAttribute('data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      ls.clear();
      this.loginService.userLogin(this.f.email.value, this.f.password.value).subscribe((data: any) => {
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

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
