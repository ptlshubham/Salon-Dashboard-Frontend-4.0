import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/account/auth/validation.mustmatch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  unlockForm!: UntypedFormGroup;
  unlockSubmit = false; 



  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor(private formBuilder: UntypedFormBuilder,) { }

  ngOnInit(): void {
    this.unlockForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpwd: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmpwd'),
    });
    /**
     * 
     * BreadCrumb Set
     */
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
  }
}
