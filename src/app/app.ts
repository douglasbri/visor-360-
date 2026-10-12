import { Component } from '@angular/core';
import { Visor360Component } from './visor360/visor360.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Visor360Component],
  template: '<app-visor360 />'
})
export class App {}
