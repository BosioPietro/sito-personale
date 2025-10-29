import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IconaResult, IconaService } from './icona.service';

@Component({
  selector: 'ion-icon',
  templateUrl: './icona.component.html',
  styleUrl: './icona.component.scss',
})
export class IconaComponent implements OnInit, OnChanges {
  @Input({ required: true }) name!: string;

  private readonly iconeService: IconaService = inject(IconaService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  protected svg: WritableSignal<IconaResult | undefined> = signal(undefined);
  protected isOutline: true | null = null;

  ngOnInit() {
    this.RichiediIcona();
  }

  ngOnChanges() {
    this.RichiediIcona();
  }

  async RichiediIcona(): Promise<void> {
    if (!this.isBrowser) return;
    const icona = this.iconeService.FetchIcona(this.name);

    this.svg.set(await icona);
  }
}
