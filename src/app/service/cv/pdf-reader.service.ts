import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'; 




(pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfjsWorker;

@Injectable({
  providedIn: 'root'
})
export class PdfReaderService {

     constructor() {
    // ⚙️ Configuration du worker pour pdf.js
    (pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfjsWorker;
  }
  async extraireTexte(file: File): Promise<string> {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onload = async () => {
        try {
          const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map((item: any) => item.str).join(' ');
            fullText += pageText + '\n';
          }

          resolve(fullText);
        } catch (error) {
          reject(error);
        }
      };

      fileReader.onerror = (error) => reject(error);
      fileReader.readAsArrayBuffer(file);
    });
  }
}
