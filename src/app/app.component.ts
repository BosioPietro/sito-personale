import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SezionePrincipaleComponent } from "./sezione-principale/sezione-principale.component";
import { SezioneConoscenzeComponent } from './sezione-conoscenze/sezione-conoscenze.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SezionePrincipaleComponent, SezioneConoscenzeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Progetto';
}
