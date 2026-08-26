import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as siteData from '../../data.json';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class demoComponent {
  data: any = (siteData as any).default;
}
