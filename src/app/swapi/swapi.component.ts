import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../services/swapi.service';
import { SwapiList } from '../models/swapi.model';

@Component({
  selector: 'app-swapi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swapi.component.html',
  styleUrl: './swapi.component.scss'
})
export class SwapiComponent {
  recursos: { clave: string; etiqueta: string }[] = [];
  recursoActivo = '';
  datos: SwapiList | null = null;
  pagina = 1;

  constructor(private swapi: SwapiService) {
    this.recursos = this.swapi.recursos;
  }

  cargar(clave: string) {
    this.recursoActivo = clave;
    this.pagina = 1;
    this.swapi.getRecurso(clave, this.pagina).subscribe(res => this.datos = res);
  }

  siguiente() {
    if (this.datos?.next) {
      this.pagina++;
      this.swapi.getRecurso(this.recursoActivo, this.pagina).subscribe(res => this.datos = res);
    }
  }

  anterior() {
    if (this.datos?.previous) {
      this.pagina--;
      this.swapi.getRecurso(this.recursoActivo, this.pagina).subscribe(res => this.datos = res);
    }
  }

  claves(item: any): string[] {
    return Object.keys(item);
  }
}
