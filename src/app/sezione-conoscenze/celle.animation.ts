import { trigger, transition, style, animate } from '@angular/animations';

const TEMPO_ANIMAZIONE_GRIGLIA = 300;
const EASING = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";

export const transizioneGriglie = [
  trigger('transizione-card', [
    transition(':enter', [
      style({ opacity: 0, filter: "blur(.5rem)" }),
      animate(
        `${TEMPO_ANIMAZIONE_GRIGLIA}ms ${TEMPO_ANIMAZIONE_GRIGLIA}ms ${EASING}`, 
        style({ opacity: 1, filter: "blur(0rem)" })
      ),
    ]),
    transition(':leave', [
      animate(
        `${TEMPO_ANIMAZIONE_GRIGLIA}ms ${EASING}`, 
        style({ opacity: 0, filter: "blur(.5rem)" })
      )
    ])
  ])
];