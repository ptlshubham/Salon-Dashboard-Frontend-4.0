import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { UserProfileService } from 'src/app/core/services/user.service';
import ls from 'localstorage-slim';

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
    private authenticationService: AuthenticationService,
    // public toastr: ToastrService,
    private loginService: UserProfileService,
    // private homeService: HomeService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
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
      this.loginService.userLogin(this.f.email.value, this.f.password.value).subscribe((data:any) => {
          console.log(data);
          if (data == 1) {
              // this.apiService.showNotification('top', 'right', 'Wrong Email!', 'danger');
          }
          else if (data == 2) {
              // this.apiService.showNotification('top', 'right', 'Wrong Password!', 'danger');
          }
          else {
              if (data[0].role == 'Admin') {
                  // this.apiService.showNotification('top', 'right', 'Admin successfully Login.', 'success');
                  ls.set('lastOutTime', data[0].last_login, { encrypt: true }); // "mÆk¬�k§m®À½½°¹¿¯..."
                  ls.set('lastInTime', data[0].last_login, { encrypt: true }); 
                  ls.set('UserName', data[0].firstname + ' ' + data[0].lastname, { encrypt: true });
                  ls.set('UserId', data[0].id, { encrypt: true });
                  ls.set('authenticationToken', data[0].token, { encrypt: true });
                  ls.set('role', data[0].role, { encrypt: true });
                  this.router.navigate(['/']);
              }
              else if (data[0].role == 'Customer') {
                     
                  // this.apiService.showNotification('top', 'right', 'Customer successfully Login.', 'success');
                  // localStorage.setItem('authenticationToken', data[0].token);
                  // localStorage.setItem('UserId', data[0].uid);
                  // localStorage.setItem('UserName', data[0].fname + ' ' + data[0].lname);
                  // localStorage.setItem('VIP', data[0].vip);
                  // localStorage.setItem('role', data[0].role);
                  // localStorage.setItem('lastOutTime',data[0].last_inTime);
                  // localStorage.setItem('lastInTime',data[0].last_login);
                  // localStorage.setItem('member',data[0].ismembership);

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
                   
                  // this.apiService.showNotification('top', 'right', 'Admin successfully Login.', 'success');
                  // localStorage.setItem('authenticationToken', data[0].token);
                  // localStorage.setItem('UserId', data[0].id);
                  // localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
                  // localStorage.setItem('role', data[0].role);
                  // localStorage.setItem('lastOutTime',data[0].out_time);
                  // localStorage.setItem('lastInTime',data[0].last_login);

              
                  ls.set('lastOutTime', data[0].last_login, { encrypt: true }); // "mÆk¬�k§m®À½½°¹¿¯..."
                  ls.set('lastInTime', data[0].last_login, { encrypt: true }); 
                  ls.set('UserName', data[0].firstname + ' ' + data[0].lastname, { encrypt: true });
                  ls.set('Add Customer', data[0].id, { encrypt: true });
                  ls.set('authenticationToken', data[0].token, { encrypt: true });
                  ls.set('role', data[0].role, { encrypt: true });
                  this.router.navigate(['/']);
              }
              // else {
              //     this.router.navigate(['/']);
              // }
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
