import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SezionePrincipaleComponent } from "./sezione-principale/sezione-principale.component";
import { SezioneConoscenzeComponent } from './sezione-conoscenze/sezione-conoscenze.component';
import { SezioneProgettiComponent } from "./sezione-progetti/sezione-progetti.component";
import { FooterContattiComponent } from "./footer-contatti/footer-contatti.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SezionePrincipaleComponent, SezioneConoscenzeComponent, SezioneProgettiComponent, FooterContattiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Progetto';
}
