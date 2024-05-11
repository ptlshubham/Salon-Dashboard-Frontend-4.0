import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { News } from '../../pages/dashboard/data';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Register Component
 */
export class RegisterComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();

  // Carousel navigation arrow show
  showNavigationArrows: any;

  layout_mode!: string;
  public comapanylist: any = [];


  companydetails!: FormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  News: any;
  registartionModel: any = {};

  isOpen: boolean = true;

  timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    navText: ["", ""],
    dots: true,
    responsive: {
      680: {
        items: 4
      },
    }
  }
  constructor(
    private formBuilder: UntypedFormBuilder,
    private adminService: AdminService,
    public toastr: ToastrService,
  ) {
    this._fetchData();

  }

  ngOnInit(): void {
    // Validation Set
    this.companydetails = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cname: ['', Validators.required],
      phoneno: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
    this.layout_mode = LAYOUT_MODE
    if (this.layout_mode === 'dark') {
      document.body.setAttribute("data-bs-theme", "dark");
    }
    document.body.setAttribute('data-layout', 'vertical');
  }

  get f() { return this.companydetails.controls; }

  private _fetchData() {

    this.News = News;
  }
  // convenience getter for easy access to form fields

  continueToCompanyDetails() {
    this.isOpen = false;

  }
  backToPersonalDetails() {
    this.isOpen = true;


  }
  saveRegistartionDetail() {
    this.registartionModel.adminrole = 'Admin';
    this.adminService.saveRegistrationList(this.registartionModel).subscribe((data: any) => {
      if (data = 'success') {
        this.toastr.success('You are successfully Register', 'Success', { timeOut: 3000 });
        this.isOpen = true;
        this.registartionModel = {};
        this.companydetails.markAsUntouched();
      }
    });
  }


}
