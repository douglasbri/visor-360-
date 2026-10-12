import { Component, ElementRef, OnInit, ViewChild, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';

@Component({
  selector: 'app-visor360',
  standalone: true,
  templateUrl: './visor360.component.html',
  styleUrl: './visor360.component.scss'
})
export class Visor360Component implements OnInit, OnDestroy {

  @ViewChild('visor', { static: true }) visorRef!: ElementRef;
  private viewer!: Viewer;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.viewer = new Viewer({
        container: this.visorRef.nativeElement,
        panorama: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
        loadingTxt: 'Cargando...',
        plugins: [
          [MarkersPlugin, {
            markers: [
              {
                id: 'nombre',
                position: { yaw: 0, pitch: 0 },
                html: '<div class="marker-nombre">Douglas Brian Aliaga Quisbert</div>',
                anchor: 'center center',
                scale: [0.5, 1.5],
              }
            ]
          }]
        ]
      });
    }
  }

  ngOnDestroy() {
    this.viewer?.destroy();
  }
}
