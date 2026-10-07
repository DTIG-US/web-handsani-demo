import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DEMO_CONFIG } from '../demo.config';

export interface InferenceResult {
  filename: string;
  confidence: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private config = inject(DEMO_CONFIG);
  private apiUrl = this.config.apiUrl;

  uploadVideo(file: File): Observable<HttpEvent<InferenceResult>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<InferenceResult>(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
