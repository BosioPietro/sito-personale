import { trigger, transition, style, animate } from '@angular/animations';

// L'export della costante e il giro col setTimeout
// si deve fare per fixare il bug delle animazioni
// in cui se il componente padre viene distrutto,
// nei figli non viene triggerato il :leave

export const TEMPO_ANIMAZIONE_GRIGLIA = 300;
const EASING = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";

export const transizioneGriglie = [
  trigger('transizione-card', [
    transition(':enter', [
      style({ opacity: 0, filter: "blur(1rem)" }),
      animate(
        `${TEMPO_ANIMAZIONE_GRIGLIA}ms ${TEMPO_ANIMAZIONE_GRIGLIA}ms ${EASING}`, 
        style({ opacity: 1, filter: "blur(0rem)" })
      ),
    ]),
    transition(':leave', [
      animate(
        `${TEMPO_ANIMAZIONE_GRIGLIA}ms ${EASING}`, 
        style({ opacity: 0, filter: "blur(1rem)" })
      )
    ])
  ])
];