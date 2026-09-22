import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { SwapiComponent } from './swapi/swapi.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SwapiComponent],
  template: '<app-swapi />'
})
export class App {}
