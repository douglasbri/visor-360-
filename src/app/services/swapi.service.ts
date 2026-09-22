import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SwapiList } from '../models/swapi.model';

@Injectable({ providedIn: 'root' })
export class SwapiService {

  private readonly BASE_URL = 'https://swapi.dev/api';

  readonly recursos = [
    { clave: 'people',    etiqueta: 'Personajes'  },
    { clave: 'films',     etiqueta: 'Películas'   },
    { clave: 'planets',   etiqueta: 'Planetas'    },
    { clave: 'starships', etiqueta: 'Naves'       },
    { clave: 'vehicles',  etiqueta: 'Vehículos'   },
    { clave: 'species',   etiqueta: 'Especies'    },
  ];

  constructor(private http: HttpClient) {}

  getRecurso(recurso: string, page = 1): Observable<SwapiList> {
    return this.http.get<SwapiList>(`${this.BASE_URL}/${recurso}/?page=${page}`);
  }
}
