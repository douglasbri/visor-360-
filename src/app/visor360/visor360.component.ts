import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-visor360',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './visor360.component.html',
  styleUrl: './visor360.component.scss'
})
export class Visor360Component {
  nombre = 'Douglas Brian Aliaga Quisbert';
  imagen = 'imagen360.jpg';
  color = 'red';

  cambiarColor() {
    this.color = this.color === 'red' ? 'white' : 'red';
  }
}
