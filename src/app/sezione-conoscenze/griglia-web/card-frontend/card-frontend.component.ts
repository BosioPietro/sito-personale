import { Component } from '@angular/core';

@Component({
    selector: 'CardFrontend',
    imports: [],
    templateUrl: './card-frontend.component.html',
    styleUrl: './card-frontend.component.scss'
})
export class CardFrontendComponent {
  
  PosizioneLogo(nLoghi: number, i: number) {
    const angolo = (2 * Math.PI) / nLoghi;
    const angoloIndice = angolo * i;
    
    const left = `${Math.cos(angoloIndice) * 50}%`
    const top = `${Math.sin(angoloIndice) * 50}%`

    return {left : `calc(50% - ${left})`, top: `calc(50% - ${top})`}
  }
}
