import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { IconaResult, IconaService } from './icona.service';

@Component({
  selector: 'ion-icon',
  templateUrl: './icona.component.html',
  styleUrl: './icona.component.scss',
})
export class IconaComponent implements OnInit, OnChanges {
  @Input({ required: true }) name!: string;

  private readonly iconeService: IconaService = inject(IconaService);
  protected svg: WritableSignal<IconaResult | undefined> = signal(undefined);
  protected isOutline: true | null = null;

  ngOnInit() {
    this.RichiediIcona();
  }

  ngOnChanges() {
    this.RichiediIcona();
  }

  async RichiediIcona(): Promise<void> {
    const icona = this.iconeService.FetchIcona(this.name);

    this.svg.set(await icona);
  }
}
