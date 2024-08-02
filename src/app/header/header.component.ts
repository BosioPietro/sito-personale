import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'Header',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input("sezione-corrente")
  sezione?: string;

  @ViewChild("wrapper")
  wrapper!: ElementRef<HTMLElement>;

  @ViewChild("cella")
  cella!: ElementRef<HTMLElement>;

  @Output()
  onNaviga = new EventEmitter<string>();

  ultimo: {
    sezione?: string,
    valore?: string
  } = {}
  
  timeoutTransizione: any;
  animando: boolean = false;


  Scrolla(s: string){
    const el = document.getElementById(s)!;
    el.scrollIntoView({behavior: "smooth"});
    this.onNaviga.emit(s)
  }

  SezioneCorrente(sezione: string | undefined){
    if(!sezione) return 0;
    if(this.ultimo.sezione == sezione) return this.ultimo.valore; 

    const cella = this.wrapper.nativeElement.querySelector(`[sezione="${sezione}"] .cella`)! as HTMLElement;

    const header = this.wrapper.nativeElement.parentElement! as HTMLElement;
    const offset = header.getBoundingClientRect().left;
    let valore = `${cella.getBoundingClientRect().left - offset}px`;

    this.ultimo = { sezione, valore };
    
    this.animando = true;
    clearTimeout(this.timeoutTransizione);
    this.timeoutTransizione = setTimeout(() => {
      this.animando = false;
    }, 300);

    return valore;
  }
}
