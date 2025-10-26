import {
  Component,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'ion-icon',
  templateUrl: './icona.component.html',
  styleUrl: './icona.component.scss',
})
export class IconaComponent implements OnInit {
  @Input({ required: true }) name!: string;

  protected svg: WritableSignal<string | null> = signal(null);

  ngOnInit(): void {
    fetch(`./assets/icone/${this.name}.svg`)
      .then((res) => res.text())
      .then((svg) => {
        this.svg.set(svg);
      })
      .catch(() => {
        this.svg.set(null);
      });
  }
}
