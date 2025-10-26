import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';

@Component({
  selector: 'FooterContatti',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SfondoComponent],
  templateUrl: './footer-contatti.component.html',
  styleUrl: './footer-contatti.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterContattiComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;
    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        host.classList.toggle('visibile', entry?.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
