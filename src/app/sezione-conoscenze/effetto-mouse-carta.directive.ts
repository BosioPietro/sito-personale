import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[appEffettoMouseCarta]',
  host: {
    '(mousemove)': 'aggiornaPosizione($event)',
    '[style.--mouse-x.px]': 'mouseX()',
    '[style.--mouse-y.px]': 'mouseY()',
  },
})
export class EffettoMouseCartaDirective {
  protected readonly mouseX = signal(0);
  protected readonly mouseY = signal(0);

  aggiornaPosizione(e: MouseEvent): void {
    const card = e.currentTarget as HTMLElement;
    const { left, top } = card.getBoundingClientRect();

    this.mouseX.set(e.clientX - left);
    this.mouseY.set(e.clientY - top);
  }
}
