import { Component } from '@angular/core';

type LogoFrontend = Readonly<{
  src: string;
  alt: string;
  title?: string;
  offset?: boolean;
}>;

@Component({
    selector: 'CardFrontend',
    imports: [],
    templateUrl: './card-frontend.component.html',
    styleUrl: './card-frontend.component.scss'
})
export class CardFrontendComponent {
  protected readonly gruppiLoghi = [
    {
      posizione: this.PosizioneLogo(3, 0),
      loghi: [
        {
          src: 'https://bosio.zip/assets/img/loghi/ts.svg',
          alt: 'A',
          title: 'TypeScript',
        },
        {
          src: 'https://bosio.zip/assets/img/loghi/jquery.svg',
          alt: 'J',
          title: 'jQuery',
        },
      ],
    },
    {
      posizione: this.PosizioneLogo(3, 1),
      loghi: [
        {
          src: 'https://bosio.zip/assets/img/loghi/tailwind.svg',
          alt: 'T',
          title: 'Tailwind CSS',
        },
        {
          src: 'https://bosio.zip/assets/img/loghi/css.svg',
          alt: 'C',
          title: 'CSS',
          offset: true,
        },
      ],
    },
    {
      posizione: this.PosizioneLogo(3, 2),
      loghi: [
        {
          src: 'https://bosio.zip/assets/img/loghi/html.svg',
          alt: 'H',
          title: 'HTML',
          offset: true,
        },
        {
          src: 'https://bosio.zip/assets/img/loghi/js.svg',
          alt: 'J',
          title: 'JavaScript',
        },
      ],
    },
  ] satisfies readonly Readonly<{
    posizione: Readonly<{ left: string; top: string }>;
    loghi: readonly LogoFrontend[];
  }>[];

  protected readonly loghiCentro: readonly LogoFrontend[] = [
    {
      src: 'https://bosio.zip/assets/img/loghi/angular.svg',
      alt: 'A',
    },
    {
      src: 'https://bosio.zip/assets/img/loghi/html.svg',
      alt: 'H',
      offset: true,
    },
  ];

  PosizioneLogo(nLoghi: number, i: number) {
    const angolo = (2 * Math.PI) / nLoghi;
    const angoloIndice = angolo * i;
    
    const left = `${Math.cos(angoloIndice) * 50}%`;
    const top = `${Math.sin(angoloIndice) * 50}%`;

    return { left: `calc(50% - ${left})`, top: `calc(50% - ${top})` };
  }
}
