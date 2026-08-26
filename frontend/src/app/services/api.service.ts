import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:8000/upload';

  uploadVideo(file: File): Observable<HttpEvent<InferenceResult>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<InferenceResult>(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
