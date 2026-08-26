import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="upload-container" 
      [class.dragging]="isDragging()"
      (dragover)="onDragOver($event)" 
      (dragleave)="onDragLeave($event)" 
      (drop)="onDrop($event)">
      
      <div class="upload-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        
        <h2 class="upload-title">Drag & Drop Video or GIF</h2>
        <p class="upload-subtitle">Maximum file size: 15MB</p>
        
        <div class="upload-divider">
          <span>OR</span>
        </div>
        
        <button class="upload-btn" (click)="fileInput.click()">
          Browse Files
        </button>
        <input 
          #fileInput 
          type="file" 
          class="hidden-input" 
          accept="video/mp4,video/avi,video/quicktime,image/gif"
          (change)="onFileSelected($event)">
          
        @if (error()) {
          <div class="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {{ error() }}
          </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  isDragging = signal(false);
  error = signal<string | null>(null);
  
  fileDropped = output<File>();

  private readonly MAX_SIZE = 15 * 1024 * 1024; // 15MB

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    this.error.set(null);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    this.error.set(null);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
      // Reset input so the same file can be selected again
      input.value = '';
    }
  }

  private handleFile(file: File) {
    // Validate file type
    const validTypes = ['video/mp4', 'video/avi', 'video/quicktime', 'image/gif'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|avi|mov|gif)$/i)) {
      this.error.set('Invalid file type. Please upload an MP4, AVI, MOV, or GIF file.');
      return;
    }

    // Validate size
    if (file.size > this.MAX_SIZE) {
      this.error.set('File is too large. Maximum size is 15MB.');
      return;
    }

    this.fileDropped.emit(file);
  }
}
