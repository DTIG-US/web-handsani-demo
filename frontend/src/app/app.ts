import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { ResultsComponent } from './results/results.component';
import { ApiService, InferenceResult } from './services/api.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UploadComponent, ResultsComponent],
  template: `
    <main class="app-container">
      <header class="app-header">
        <h1>Hand Sanitation Analysis</h1>
        <p>AI-powered assessment of hand washing technique</p>
      </header>

      <div class="content-wrapper">
        @if (isProcessing()) {
          <div class="loading-state">
            <div class="spinner"></div>
            <p>Analyzing video frames...</p>
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="uploadProgress()"></div>
            </div>
          </div>
        } @else if (result()) {
          <app-results [result]="result()!" (reset)="reset()"></app-results>
        } @else {
          <app-upload (fileDropped)="onFileSelected($event)"></app-upload>
        }
      </div>
    </main>
  `,
  styleUrls: ['./app.component.css'] // Or keep it simple without a css file if not needed
})
export class AppComponent {
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
