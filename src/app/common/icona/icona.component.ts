import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ion-icon',
  templateUrl: './icona.component.html',
  styleUrl: './icona.component.scss',
})
export class IconaComponent implements OnInit {
  @Input({ required: true }) name!: string;

  protected svg: WritableSignal<SafeHtml | undefined | null> =
    signal(undefined);
  private readonly sanitizer = inject(DomSanitizer);
  protected isOutline: true | null = null;

  ngOnInit(): void {
    this.isOutline = this.name.includes('outline') ? true : null;
    fetch(`./assets/icone/${this.name}.svg`)
      .then((res) => res.text())
      .then((svg) => {
        this.svg.set(this.sanitizer.bypassSecurityTrustHtml(svg));
      })
      .catch(() => {
        this.svg.set(null);
      });
  }
}
