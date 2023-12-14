import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf'
import html2canvas from "html2canvas";

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {
  constructor() {}

  generatePdfFromHtml(html: HTMLDivElement, filename: string = 'new-file') {
    html2canvas(html).then(canvas => {
      const imgWidth = 190
      const pageHeight = 290
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      let position = 0
      pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight)

      heightLeft -= pageHeight
      while(heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      pdf.save(`${filename}.pdf`)
    })
  }
}
