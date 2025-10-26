import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SezionePrincipaleComponent } from './sezione-principale/sezione-principale.component';
import { SezioneConoscenzeComponent } from './sezione-conoscenze/sezione-conoscenze.component';
import { SezioneProgettiComponent } from './sezione-progetti/sezione-progetti.component';
import { FooterContattiComponent } from './footer-contatti/footer-contatti.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'body',
  standalone: true,
  imports: [
    HeaderComponent,
    SezionePrincipaleComponent,
    SezioneConoscenzeComponent,
    SezioneProgettiComponent,
    FooterContattiComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'Progetto';

  sezioni?: HTMLElement[];
  sezioneCorrente?: string;

  eventoScroll?: Subscription;
  observer?: IntersectionObserver;

  @ViewChild('interno')
  rettangoloInterno!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    // forse è un bug con i <rect> svg, quando
    // faccio il resize della pagina la width
    // che collegata a --bordo non si aggiorna
    // quindi l'aggiorno manualmente
    const r = this.rettangoloInterno.nativeElement;
    window.addEventListener('resize', () => {
      r.setAttribute(
        'style',
        'width: calc(100% - var(--bordo) * 1.5) !important'
      );

      setTimeout(() => (r.style.width = ''));
    });
  }

  // gestione sezione corrente
  ngOnInit(): void {
    const sezioni = document.querySelectorAll('body > [id]');
    this.sezioni = Array.from(sezioni) as HTMLElement[];

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          el.classList.toggle('visibile', entry.intersectionRatio >= 0.33);
        });

        const visibili = entries.filter((e) => e.isIntersecting);
        if (!visibili.length) return;
        visibili.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        this.sezioneCorrente = (visibili[0].target as HTMLElement).id;
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    this.sezioni.forEach((s) => this.observer!.observe(s));
  }

  ngOnDestroy(): void {
    this.eventoScroll?.unsubscribe();
    this.observer?.disconnect();
  }

  SezionePagina() {
    if (!this.sezioni) {
      const sezioni = document.body.querySelectorAll('& > [id]');
      this.sezioni = Array.from(sezioni) as HTMLElement[];
    }

    const distanze = this.sezioni
      .map((s) => {
        const ris = { el: s, distanza: NaN };

        if (s.id === 'contatti') {
          const b = s.getBoundingClientRect().bottom;
          ris['distanza'] = Math.abs(window.innerHeight - b);
        } else ris['distanza'] = Math.abs(s.getBoundingClientRect().top);

        return ris;
      })
      .sort((a, b) => a['distanza'] - b['distanza']);

    this.sezioneCorrente = distanze[0].el.id;
  }
}
