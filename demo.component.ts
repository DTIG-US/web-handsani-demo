import { Component, signal, inject } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { UploadComponent } from './frontend/src/app/upload/upload.component';
import { ResultsComponent } from './frontend/src/app/results/results.component';
import { ApiService, InferenceResult } from './frontend/src/app/services/api.service';

@Component({
  selector: 'app-demo',
  imports: [UploadComponent, ResultsComponent],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  private apiService = inject(ApiService);

  isProcessing = signal(false);
  uploadProgress = signal(0);
  result = signal<InferenceResult | null>(null);

  onFileSelected(file: File) {
    this.isProcessing.set(true);
    this.uploadProgress.set(0);
    this.result.set(null);

    this.apiService.uploadVideo(file).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            const progress = Math.round(100 * (event.loaded / event.total));
            this.uploadProgress.set(progress);
          }
        } else if (event.type === HttpEventType.Response) {
          if (event.body) {
            this.result.set(event.body);
          }
          this.isProcessing.set(false);
        }
      },
      error: (error) => {
        console.error('Upload failed:', error);
        this.isProcessing.set(false);
        alert('An error occurred during analysis. Please try again.');
      }
    });
  }

  reset() {
    this.result.set(null);
    this.isProcessing.set(false);
    this.uploadProgress.set(0);
  }
}
