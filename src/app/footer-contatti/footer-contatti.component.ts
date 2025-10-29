import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';
import { IconaComponent } from '../common/icona/icona.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'FooterContatti',
  imports: [SfondoComponent, IconaComponent],
  templateUrl: './footer-contatti.component.html',
  styleUrl: './footer-contatti.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterContattiComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private mostrato = false;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platform = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const host = this.el.nativeElement;
    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const ratio = entry?.intersectionRatio ?? 0;
        const intersects = entry?.isIntersecting ?? false;

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
    if (this.isBrowser) {
      this.observer?.disconnect();
    }
  }
}
