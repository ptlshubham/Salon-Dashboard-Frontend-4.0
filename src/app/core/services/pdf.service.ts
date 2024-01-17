// pdf.service.ts

import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  generatePdf(data: any): void {
    const pdf = new jsPDF();
    pdf.text('Dynamic PDF Example', 20, 10);

    // Add dynamic data to the PDF
    pdf.text(`Name: ${data.name}`, 20, 20);
    pdf.text(`Age: ${data.age}`, 20, 30);

    // Save the PDF
    pdf.save('dynamic-pdf.pdf');
  }
}
