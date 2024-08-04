import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { EffettoMouse } from '../sezione-conoscenze.component';

@Component({
  selector: 'GrigliaWeb',
  standalone: true,
  imports: [],
  templateUrl: './griglia-web.component.html',
  styleUrl: './griglia-web.component.scss'
})
export class GrigliaWebComponent implements AfterViewInit{
  EffettoMouse = EffettoMouse;

  ngAfterViewInit(): void {

  }

  PosizioneLogo(nLoghi: number, i: number) {
    const angolo = (2 * Math.PI) / nLoghi;
    const angoloIndice = angolo * i;
    
    const left = `${Math.cos(angoloIndice) * 50}%`
    const top = `${Math.sin(angoloIndice) * 50}%`

    return {left : `calc(50% - ${left})`, top: `calc(50% - ${top})`}
  }

}
