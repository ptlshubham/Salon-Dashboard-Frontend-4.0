import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { UserProfileService } from 'src/app/core/services/user.service';

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
    private userService: UserProfileService,
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
      email: ['ptlshubham@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
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
      this.userService.userLogin(this.f.email.value, this.f.password.value).subscribe((res: any) => {

        if (res.length > 0) {
          localStorage.setItem('Id', res[0].id);
          localStorage.setItem('Name', res[0].name);
          localStorage.setItem('Role', res[0].role);
          localStorage.setItem('token', res[0].token);
          // this.toastr.success('Login Successfully', 'success', { timeOut: 3000, });
          this.router.navigate(['/']);
        } else if (res == 1) {
          // this.toastr.error('Incorrect Email !....please check your Email', 'wrong email', {
          //   timeOut: 3000,
          // });
        } else {
          // this.toastr.error('Incorrect Password !....please check your Password', 'wrong password', {
          //   timeOut: 3000,
          // });
        }
      })
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
