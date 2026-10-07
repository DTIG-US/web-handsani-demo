import { InjectionToken } from '@angular/core';

export interface DemoConfig {
  apiUrl: string;
}

/** Override this token in any consumer component's `providers` to point at a different API. */
export const DEMO_CONFIG = new InjectionToken<DemoConfig>('DEMO_CONFIG', {
  factory: () => ({ apiUrl: 'http://localhost:8000/upload' })
});
