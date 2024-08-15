import { animate, style, transition, trigger } from "@angular/animations";

export const AnimazioneTecnologie =  [
    trigger('sparisci', [
    //   transition(':leave', [
    //     animate('0.5s ease-out', style({
    //       opacity: 0,
    //       transform: 'translateY(100%)',
    //       filter: 'blur(.5rem)'
    //     }))
    //   ]),
      transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateY(100%)',
            filter: 'blur(.5rem)'
        }),
        animate('0.5s ease-out', style({
          opacity: 1,
          transform: 'translateY(0%)',
          filter: 'blur(0rem)'
        }))
      ])
    ])
  ]