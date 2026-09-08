import { Injectable } from '@angular/core';
import { mat2d } from 'gl-matrix';

@Injectable({ providedIn: 'root' })
export class MatrizService {

  traducir(tx: number, ty: number): mat2d {
    const m = mat2d.create();
    mat2d.translate(m, m, [tx, ty]);
    return m;
  }

  rotar(angulo: number): mat2d {
    const m = mat2d.create();
    mat2d.rotate(m, m, angulo);
    return m;
  }

  escalar(sx: number, sy: number): mat2d {
    const m = mat2d.create();
    mat2d.scale(m, m, [sx, sy]);
    return m;
  }

  // Reflejo vertical para generar tubo superior desde el inferior
  reflejarVertical(): mat2d {
    return this.escalar(1, -1);
  }

  combinar(...matrices: mat2d[]): mat2d {
    const resultado = mat2d.create();
    for (const m of matrices) {
      mat2d.multiply(resultado, resultado, m);
    }
    return resultado;
  }
}
