import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InferenceResult } from '../services/api.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="results-container">
      <div class="results-card" [class.success]="isSuccess()" [class.failure]="!isSuccess()">
        <div class="score-ring">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path class="circle"
              [attr.stroke-dasharray]="result().confidence + ', 100'"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" class="percentage">{{ formattedConfidence() }}%</text>
          </svg>
        </div>
        
        <h2 class="result-title">
          {{ isSuccess() ? 'Sanitation Passed' : 'Sanitation Failed' }}
        </h2>
        
        <div class="result-details">
          <p><strong>File:</strong> {{ result().filename }}</p>
          <p><strong>Confidence:</strong> {{ result().confidence | number:'1.2-2' }}%</p>
        </div>
        
        <button class="reset-btn" (click)="reset.emit()">
          Analyze Another Video
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  result = input.required<InferenceResult>();
  reset = output<void>();

  // Use computed for derived state
  formattedConfidence = computed(() => {
    const conf = this.result()?.confidence || 0;
    return Math.round(conf);
  });

  isSuccess = computed(() => {
    const conf = this.result()?.confidence || 0;
    // Assume > 50% is a success for the MVP
    return conf > 50;
  });
}
