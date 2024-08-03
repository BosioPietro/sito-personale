import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
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
export class AppComponent implements AfterViewInit{
  
  title = 'Progetto';

  sezioni?: HTMLElement[];
  timeoutScroll: any[] = [];
  disattivaSnap: any = undefined;
  sezioneCorrente?: string;
  DISTANZA_SCROLL_SNAP: number = 200;

  constructor(private cd: ChangeDetectorRef) {}

  @ViewChild("wrapperSezioni")
  wrapperSezioni!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.SezionePagina()
    this.cd.detectChanges()
  }

  Scrolla(e: Event){
    // controllo che la navigazione sia scrollando
    // e non con navigazione da header
    if(!this.disattivaSnap){
      this.SezionePagina();
    }

    this.SnappaScroll(e);
  }

  SezionePagina(){
    if(!this.sezioni){
      const figli = this.wrapperSezioni.nativeElement.children;
      const sezioni = Array.from(figli).map((s) => s as HTMLElement);
      this.sezioni = sezioni;
    }

    const distanze = this.sezioni!.map((s) => {
      const ris = { el: s, distanza: NaN }
      
      if(s.id == "contatti"){
        const b = s.getBoundingClientRect().bottom;
        ris["distanza"] = Math.abs(window.innerHeight - b);
      }
      else ris["distanza"] = Math.abs(this.Distanza(s));
      
      return ris;
    }).sort((a, b) => a["distanza"] - b["distanza"]);

    this.sezioneCorrente = distanze[0].el.id;
  }

  NavigazioneBottoni(sezione: string){
    this.sezioneCorrente = sezione;
    clearTimeout(this.disattivaSnap)
    this.disattivaSnap = setTimeout(() => this.disattivaSnap = undefined, 50)
  }

  SnappaScroll(e: Event){
    // usato perchè la navigazione coi bottoni lo triggera.
    // Con scrollIntoView non ce modo per vedere quando ha
    // finito, quindi checko periodicamente
    if(this.disattivaSnap){
      clearTimeout(this.disattivaSnap);
      this.disattivaSnap = setTimeout(() => this.disattivaSnap = undefined, 50);
      this.timeoutScroll = this.timeoutScroll.flatMap((t) => {
        clearInterval(t);
        return [];
      })
      return;
    }

    const sezioniSnap = this.sezioni!.filter((s) => s.classList.contains("snap"));
    clearTimeout(this.timeoutScroll.shift());

    const distanze = sezioniSnap!.map((s) => ({
      el: s,
      distanza: Math.abs(this.Distanza(s))
    })).sort((a, b) => a["distanza"] - b["distanza"])

    const { el, distanza } = distanze[0];

    if(distanza > this.DISTANZA_SCROLL_SNAP) return;
    
    const main = e.currentTarget as HTMLElement;
    this.timeoutScroll.push(
      setTimeout(() => {
        this.SmoothScrollTo(main, el);
      }, 750)
    );
  }

  SmoothScrollTo(element: HTMLElement, target: HTMLElement, duration = 500) {
    const start = element.scrollTop;
    const targetTop = target.getBoundingClientRect().top - element.getBoundingClientRect().top + start;
    const startTime = performance.now();
    let ferma = false;

    function EaseInOutQuad(x: number): number {
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    const Scroll = () => {
        const elapsedTime = (performance.now() - startTime) / duration;
        const easedTime = EaseInOutQuad(Math.min(elapsedTime, 1));
        const newScrollTop = start + (targetTop - start) * easedTime;

        element.scrollTop = newScrollTop;

        if(this.disattivaSnap){
          console.log("premuto")
        }

        if (elapsedTime < 1 && !ferma && !this.disattivaSnap) {
            requestAnimationFrame(Scroll);
        }
    }

    function onUserScroll() {
        element.removeEventListener('wheel', onUserScroll);
        element.removeEventListener('touchmove', onUserScroll);
        ferma = true;
    }

    element.addEventListener('wheel', onUserScroll);
    element.addEventListener('touchmove', onUserScroll);

    Scroll();
}

  Distanza(el: HTMLElement){
    return el.getBoundingClientRect().top;
  }
}
