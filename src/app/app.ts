import { Component } from '@angular/core';
import { DebugComponent } from './debug/debug.component';

@Component({
  selector: 'app-root',
  imports: [DebugComponent],
  template: '<app-debug />'
})
export class App {}
