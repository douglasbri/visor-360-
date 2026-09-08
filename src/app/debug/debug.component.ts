import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { EstadoFiguraService, EstadoPajaro } from '../services/estado-figura.service';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="font-family:monospace; padding:1rem; background:#111; color:#0f0; min-height:100vh">
      <h2 style="color:#ff0; display:flex; align-items:center; gap:.5rem">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M8 12l2 2 4-4"/>
        </svg>
        Debug — Servicios de Matrices
      </h2>

      <h3>Estado del Pájaro</h3>
      <p>posY: {{ pajaro?.posY | number:'1.2-2' }}</p>
      <p>velocidadY: {{ pajaro?.velocidadY | number:'1.2-2' }}</p>
      <p>ángulo (rad): {{ pajaro?.angulo | number:'1.4-4' }}</p>
      <p>ángulo (deg): {{ (pajaro?.angulo ?? 0) * (180/3.14159) | number:'1.2-2' }}°</p>

      <h3>Matriz actual (mat2d)</h3>
      <pre>[ {{ m(0) }}, {{ m(1) }}, {{ m(2) }},
  {{ m(3) }}, {{ m(4) }}, {{ m(5) }} ]</pre>

      <h3>Tubos activos: {{ tubosCount }}</h3>

      <div style="margin-top:1rem; display:flex; gap:1rem">
        <button (click)="saltar()" style="padding:.5rem 1rem; font-size:1rem; display:flex; align-items:center; gap:.4rem">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12l7-7 7 7"/><path d="M12 19V5"/>
          </svg>
          Saltar (Espacio)
        </button>
        <button (click)="agregarTubo()" style="padding:.5rem 1rem; font-size:1rem; display:flex; align-items:center; gap:.4rem">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          Agregar tubo
        </button>
        <button (click)="toggleLoop()" style="padding:.5rem 1rem; font-size:1rem; display:flex; align-items:center; gap:.4rem">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            @if (corriendo) {
              <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
            } @else {
              <polygon points="5,3 19,12 5,21"/>
            }
          </svg>
          {{ corriendo ? 'Pausar' : 'Iniciar' }} loop
        </button>
      </div>
    </div>
  `
})
export class DebugComponent implements OnInit, OnDestroy {
  pajaro: EstadoPajaro | null = null;
  tubosCount = 0;
  corriendo = false;
  private rafId = 0;

  constructor(
    private estadoFigura: EstadoFiguraService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    this.estadoFigura.pajaro$.subscribe(p => this.pajaro = p);
    this.estadoFigura.tubos$.subscribe(t => this.tubosCount = t.length);
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('keydown', (e) => { if (e.code === 'Space') this.saltar(); });
    }
  }

  m(i: number): string {
    return this.pajaro ? (this.pajaro.matrizActual[i] as number).toFixed(3) : '0';
  }

  saltar() { this.estadoFigura.saltar(); }

  agregarTubo() { this.estadoFigura.agregarTubo(250 + Math.random() * 100); }

  toggleLoop() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.corriendo = !this.corriendo;
    if (this.corriendo) this.loop();
    else cancelAnimationFrame(this.rafId);
  }

  private loop() {
    this.estadoFigura.tick();
    this.rafId = requestAnimationFrame(() => this.loop());
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) cancelAnimationFrame(this.rafId);
  }
}
