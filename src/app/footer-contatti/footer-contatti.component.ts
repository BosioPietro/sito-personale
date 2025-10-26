import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';
import { IconaComponent } from '../common/icona/icona.component';

@Component({
  selector: 'FooterContatti',
  imports: [SfondoComponent, IconaComponent],
  templateUrl: './footer-contatti.component.html',
  styleUrl: './footer-contatti.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterContattiComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private mostrato = false; // stato per isteresi: mostra finché è almeno parzialmente visibile

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;
    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const ratio = entry?.intersectionRatio ?? 0;
        const intersects = entry?.isIntersecting ?? false;
        console.log({ ratio, intersects });

        // entra a 0.1, esce solo quando non interseca più (ratio = 0)
        if (!this.mostrato && ratio >= 0.1) {
          this.mostrato = true;
          host.classList.add('visibile');
          return;
        }

        if (this.mostrato && !intersects) {
          this.mostrato = false;
          host.classList.remove('visibile');
          return;
        }
      },
      { root: null, threshold: [0, 0.1] }
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
