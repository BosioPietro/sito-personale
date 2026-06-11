import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
    selector: 'CardMobile',
    imports: [],
    templateUrl: './card-mobile.component.html',
    styleUrl: './card-mobile.component.scss'
})
export class CardMobileComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  protected readonly logoCordova = signal(false);

  constructor() {
    if (!this.isBrowser) return;

    const intervalloId = window.setInterval(() => {
      this.logoCordova.update((visibile) => !visibile);
    }, 1E4);

    this.destroyRef.onDestroy(() => window.clearInterval(intervalloId));
  }
}
