import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SezionePrincipaleComponent } from "./sezione-principale/sezione-principale.component";
import { SezioneConoscenzeComponent } from './sezione-conoscenze/sezione-conoscenze.component';
import { SezioneProgettiComponent } from "./sezione-progetti/sezione-progetti.component";
import { FooterContattiComponent } from "./footer-contatti/footer-contatti.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SezionePrincipaleComponent, SezioneConoscenzeComponent, SezioneProgettiComponent, FooterContattiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Progetto';

  sezioni?: HTMLElement[];
  timeoutScroll: any[] = [];

  Scrolla(e: Event){
    this.sezioni = this.sezioni ?? Array.from(document.querySelectorAll('.snap'))!
    clearTimeout(this.timeoutScroll.shift());

    const distanze = this.sezioni!.map((s) => ({
      el: s,
      distanza: Math.abs(this.Distanza(s))
    })).sort((a, b) => a["distanza"] - b["distanza"])

    const { el, distanza } = distanze[0];

    if(distanza > 300) return;

    
    const main = e.currentTarget as HTMLElement;
    this.timeoutScroll.push(
      setTimeout(() => {

        this.SmoothScrollTo(main, el);
      }, 1000)
    );
  }

  SmoothScrollTo(element: HTMLElement, target: HTMLElement, duration = 500) {
    const start = element.scrollTop;
    const targetTop = target.getBoundingClientRect().top - element.getBoundingClientRect().top + start;
    const startTime = performance.now();

    function EaseInOutQuad(x: number): number {
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    function Scroll() {
        const elapsedTime = (performance.now() - startTime) / duration;
        const easedTime = EaseInOutQuad(Math.min(elapsedTime, 1));
        const newScrollTop = start + (targetTop - start) * easedTime;

        element.scrollTop = newScrollTop;

        if (elapsedTime < 1) {
            requestAnimationFrame(Scroll);
        }
    }

    function onUserScroll() {
        element.removeEventListener('scroll', onUserScroll);
        element.removeEventListener('wheel', onUserScroll);
        element.removeEventListener('touchmove', onUserScroll);
    }

    element.addEventListener('scroll', onUserScroll);
    element.addEventListener('wheel', onUserScroll);
    element.addEventListener('touchmove', onUserScroll);

    Scroll();
}

  Distanza(el: HTMLElement){
    return el.getBoundingClientRect().top;
  }
}
