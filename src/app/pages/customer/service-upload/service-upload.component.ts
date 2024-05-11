import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';
import { ToastrService } from 'ngx-toastr';
import { ServiceListService } from 'src/app/core/services/services.service';
import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
  selector: 'app-service-upload',
  standalone: true,
  imports: [],
  templateUrl: './service-upload.component.html',
  styleUrl: './service-upload.component.scss'
})

export class ServiceUploadComponent implements OnInit {
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  uploadedservice: any = [];
  bulkUploadedservice: any = [];
  constructor(
    private servicelistservice: ServiceListService,
    private router: Router,
    public toastr: ToastrService

  ) { }
  ngOnInit(): void {

  }
  backToTable() {
    this.router.navigate(['/service-list']);

  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log("data:", this.data);
      this.uploadedservice = this.data;
      this.toastr.success('File Uploaded Successfully', 'Uploaded', {
        timeOut: 3000,
      });
      this.saveBulkUploadservice();
      this.data.map(res => {
        if (res[0] === "no") {
          console.log(res[0]);
        } else {
          console.log(res[0]);
        }
      })
    };
    reader.readAsBinaryString(target.files[0]);
  }
  saveBulkUploadservice() {

    this.bulkUploadedservice = [];
    this.uploadedservice

    for (let i = 1; i < this.uploadedservice.length; i++) {
      let data = {
        name: this.uploadedservice[i][0],
        price: this.uploadedservice[i][1],
        totalcost: this.uploadedservice[i][2],
        time: this.uploadedservice[i][3],
        point: this.uploadedservice[i][4],
        epoint: this.uploadedservice[i][5],
        salonid: ls.get('salonid', { decrypt: true })
      }
      this.bulkUploadedservice.push(data);
    }
    this.bulkUploadedservice
    let tempArray: any = [];
    for (let i = 0; i <= (this.bulkUploadedservice.length / 300); i++) {
      tempArray = [];
      let lnth = (this.bulkUploadedservice.length / 300);

      if (i == 0) {
        tempArray = [];
        tempArray = this.bulkUploadedservice.slice(0, 300);

        this.servicelistservice.SaveBulkServiceDetails(tempArray).subscribe((res: any) => {
          this.toastr.success('Service details added successfully', 'Success', { timeOut: 3000 });
        })
      } else if (i != (this.bulkUploadedservice.length / 300)) {
        tempArray = [];
        let start = i * 300;
        let end = start + 300;
        tempArray = this.bulkUploadedservice.slice(start, end);

        this.servicelistservice.SaveBulkServiceDetails(tempArray).subscribe((res: any) => {
          this.toastr.success('Service details added successfully', 'Success', { timeOut: 3000 });
        })
      }
      else {
        tempArray = [];
        let start = (i - 1) * 300;
        let end = this.bulkUploadedservice.length - start;
        tempArray = this.bulkUploadedservice.slice(start, end);

        this.servicelistservice.SaveBulkServiceDetails(tempArray).subscribe((res: any) => {
          this.toastr.success('Service details added successfully', 'Success', { timeOut: 3000 });
        })
      }

    }

  }
  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
