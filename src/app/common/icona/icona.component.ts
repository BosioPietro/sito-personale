import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ion-icon',
  templateUrl: './icona.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './icona.component.scss',
})
export class IconaComponent implements OnInit {
  @Input({ required: true }) name!: string;

  protected isOutline: true | null = null;

  ngOnInit(): void {
    this.isOutline = this.name.endsWith('-outline') ? true : null;
  }
}
