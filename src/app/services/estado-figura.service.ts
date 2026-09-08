import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mat2d } from 'gl-matrix';
import { MatrizService } from './matriz.service';

export interface EstadoPajaro {
  posY: number;
  velocidadY: number;
  angulo: number;
  matrizActual: mat2d;
}

export interface EstadoTubo {
  posX: number;
  alturaTuboInferior: number;
  matrizInferior: mat2d;
  matrizSuperior: mat2d; // generado con reflejo vertical
}

@Injectable({ providedIn: 'root' })
export class EstadoFiguraService {

  private readonly GRAVEDAD = 0.5;
  private readonly POS_X_PAJARO = 100;
  private readonly ANCHO_CANVAS = 480;

  private pajaroSubject = new BehaviorSubject<EstadoPajaro>({
    posY: 200,
    velocidadY: 0,
    angulo: 0,
    matrizActual: mat2d.create(),
  });

  private tubosSubject = new BehaviorSubject<EstadoTubo[]>([]);

  pajaro$ = this.pajaroSubject.asObservable();
  tubos$ = this.tubosSubject.asObservable();

  constructor(private matriz: MatrizService) {}

  // Llamar en cada tick del requestAnimationFrame
  tick(): void {
    this.actualizarPajaro();
    this.actualizarTubos();
  }

  saltar(): void {
    const estado = this.pajaroSubject.value;
    this.pajaroSubject.next({ ...estado, velocidadY: -8 });
  }

  agregarTubo(alturaTuboInferior: number): void {
    const tubos = this.tubosSubject.value;
    const nuevoTubo = this.calcularMatricesTubo(this.ANCHO_CANVAS, alturaTuboInferior);
    this.tubosSubject.next([...tubos, nuevoTubo]);
  }

  private actualizarPajaro(): void {
    const { posY, velocidadY } = this.pajaroSubject.value;

    const nuevaVelocidad = velocidadY + this.GRAVEDAD;
    const nuevaPosY = posY + nuevaVelocidad;

    // Ángulo basado en velocidad: cae → mira abajo, salta → mira arriba
    const angulo = Math.atan2(nuevaVelocidad, 8);

    // Traslación a posición actual + rotación según velocidad
    const matrizActual = this.matriz.combinar(
      this.matriz.traducir(this.POS_X_PAJARO, nuevaPosY),
      this.matriz.rotar(angulo)
    );

    this.pajaroSubject.next({ posY: nuevaPosY, velocidadY: nuevaVelocidad, angulo, matrizActual });
  }

  private actualizarTubos(): void {
    const tubos = this.tubosSubject.value;

    const actualizados = tubos
      .map(tubo => this.calcularMatricesTubo(tubo.posX - 2, tubo.alturaTuboInferior))
      .filter(tubo => tubo.posX > -60); // elimina tubos fuera de pantalla

    this.tubosSubject.next(actualizados);
  }

  private calcularMatricesTubo(posX: number, alturaTuboInferior: number): EstadoTubo {
    const matrizInferior = this.matriz.traducir(posX, alturaTuboInferior);

    // Tubo superior = reflejo vertical del inferior + traslación al tope del canvas
    const matrizSuperior = this.matriz.combinar(
      this.matriz.traducir(posX, alturaTuboInferior),
      this.matriz.reflejarVertical()
    );

    return { posX, alturaTuboInferior, matrizInferior, matrizSuperior };
  }
}
