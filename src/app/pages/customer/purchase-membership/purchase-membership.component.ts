import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

@Component({
  selector: 'app-purchase-membership',
  templateUrl: './purchase-membership.component.html',
  styleUrl: './purchase-membership.component.scss'
})
export class PurchaseMembershipComponent {
  @ViewChild('fullDataModal', { static: true }) fullDataModal!: TemplateRef<any>;
  modalData: any; // Define a property to hold dynamic data
  private modalRef!: NgbModalRef | undefined;; // Declare NgbModalRef
  constructor(
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
  }
  // openModal(data: any) {
  //   console.log(data);
  //   this.modalData = data;
  //   this.cdr.detectChanges(); // Manually trigger change detection
  //   this.modalRef = this.modalService.open(this.fullDataModal, { size: 'fullscreen', windowClass: 'modal-holder' });
  // }
  openModal(data: any) {
    this.modalData = of(data);
    this.modalRef = this.modalService.open(this.fullDataModal, { size: 'fullscreen', windowClass: 'modal-holder' });
  }
  closeModal() {
    if (this.modalRef) {
      this.modalRef.close(); // Check for null or undefined before calling close
    }
  }
}
