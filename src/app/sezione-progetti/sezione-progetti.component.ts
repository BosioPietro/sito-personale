import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnimazioneTecnologie } from './tecnlogie.animation';

@Component({
  selector: 'SezioneProgetti',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [AnimazioneTecnologie],
  templateUrl: './sezione-progetti.component.html',
  styleUrl: './sezione-progetti.component.scss'
})
export class SezioneProgettiComponent {

  tecnologie: Tecnologia[] = [
    {
      nome: "Angular",
      immagine: "/assets/img/loghi/angular.webp",
      link: "https://angular.dev/",
    },
    {
      nome: "Ionic",
      immagine: "/assets/img/loghi/ionic.webp",
      link: "https://ionic.io/"
    },
    {
      nome: "Capacitor",
      immagine: "/assets/img/loghi/capacitor.webp",
      link: "https://capacitorjs.com/"
    },
    {
      nome: "BunJS",
      immagine: "/assets/img/loghi/bun.webp",
      link: "https://bun.sh/"
    },
    {
      nome: "Express",
      immagine: "/assets/img/loghi/express.webp",
      link: "https://expressjs.com/"
    },
    {
      nome: "MongoDB",
      immagine: "/assets/img/loghi/mongo.webp",
      link: "https://www.mongodb.com/"
    },
    {
      nome: "SCSS",
      immagine: "/assets/img/loghi/scss.webp",
      link: "https://sass-lang.com/guide/"
    },
    {
      nome: "TypeScript",
      immagine: "/assets/img/loghi/ts.webp",
      link: "https://www.typescriptlang.org/"
    },
    {
      nome: "JavaScript",
      immagine: "/assets/img/loghi/js.webp",
      link: "https://it.wikipedia.org/wiki/JavaScript"
    },
    {
      nome: "CSS",
      immagine: "/assets/img/loghi/css.webp",
      link: "https://www.w3.org/Style/CSS/Overview.en.html"
    },
    {
      nome: "HTML",
      immagine: "/assets/img/loghi/html.webp",
      link: "https://www.w3.org/html/"
    },
    {
      nome: "jQuery",
      immagine: "/assets/img/loghi/jquery.webp",
      link: "https://jquery.com/"
    },
    {
      nome: "PHP",
      immagine: "/assets/img/loghi/php.webp",
      link: "https://www.php.net/"
    },
    {
      nome: "MariaDB",
      immagine: "/assets/img/loghi/mariadb.webp",
      link: "https://mariadb.org/"
    },
    {
      nome: "XAMPP",
      immagine: "/assets/img/loghi/xampp.webp",
      link: "https://www.apachefriends.org/"
    },
    {
      nome: "ChartJS",
      immagine: "/assets/img/loghi/chartjs.webp",
      link: "https://www.chartjs.org/"
    },
    {
      nome: "React",
      immagine: "/assets/img/loghi/react.webp",
      link: "https://react.dev/"
    },
    {
      nome: "JSX",
      immagine: "/assets/img/loghi/jsx.webp",
      link: "https://react.dev/learn/writing-markup-with-jsx"
    },
    {
      nome: "jQuery UI",
      immagine: "/assets/img/loghi/jquery_ui.webp",
      link: "https://jqueryui.com/"
    },
    {
      nome: "JS Doc",
      immagine: "/assets/img/loghi/js.webp",
      link: "https://jsdoc.app/"
    },
    {
      nome: "NodeJS",
      immagine: "/assets/img/loghi/node.webp",
      link: "https://nodejs.org/"
    }
  ]

  // non uso filter in tecnologie perchè
  // non mantiene l'ordine dell'array
  progetti: Progetto[] = [
    {
      nome: 'Rilievi & Perizie',
      tecnologie: ["Angular", "Ionic", "BunJS", "Express", "MongoDB", "SCSS", "TypeScript", "Capacitor"].map((c) => {
        return this.tecnologie.find(t => t.nome === c)!;
      }),
      icona: "globe"
    },
    {
      nome: 'AlphaVantage',
      tecnologie: ["HTML", "CSS", "JavaScript", "jQuery", "ChartJS", "XAMPP", "PHP", "MariaDB"].map((c) => {
        return this.tecnologie.find(t => t.nome === c)!;
      }),
      icona: "analytics"
    },
    {
      nome: 'Registro Elettronico',
      tecnologie: ["React", "JSX", "CSS", "ChartJS", "XAMPP", "PHP", "MariaDB"].map((c) => {
        return this.tecnologie.find(t => t.nome === c)!;
      }),
      icona: "file-tray-full"
    },
    {
      nome: 'E-Commerce',
      tecnologie: ["HTML", "CSS", "JavaScript", "jQuery", "XAMPP", "PHP", "MariaDB"].map((c) => {
        return this.tecnologie.find(t => t.nome === c)!;
      }),
      icona: "storefront"
    },
    {
      nome: 'Random User',
      tecnologie: ["HTML", "CSS", "JavaScript", "jQuery", "jQuery UI"].map((c) => {
        return this.tecnologie.find(t => t.nome === c)!;
      }),
      icona: "people"
    },
    {
      nome: 'MongoDriver',
      tecnologie: ["TypeScript", "NodeJS", "JS Doc"].map((c) => {
        return this.tecnologie.find(t => t.nome === c)!;
      }),
      icona: "server"
    },
  ]

  progettoSelezionato = this.progetti[0];
  progettoPrecedente?: Progetto; 

  ApriLink(link: string){
    window.open(link, "_blank");
  }


  // Quando si cambia progetto il @for non
  // re-renderizza i div che erano già presenti
  // anche se il loro contenuto cambia
  // uso quindi questa variable per forzarlo
  resettaForTecnologie = true;
  puoCambiare = true;
  SelezionaProgetto(p: Progetto){
    if(!this.puoCambiare) return;

    this.progettoPrecedente = this.progettoSelezionato;
    this.resettaForTecnologie = false;
    this.progettoSelezionato = p
    this.puoCambiare = false;

    setTimeout(() => {
      this.progettoPrecedente = undefined
      this.puoCambiare = true;
    }, 500);
    setTimeout(() => this.resettaForTecnologie = true, 1);
  }

  OffsetProgetto(p: Progetto){
    const mezzo = Math.floor(this.progetti.length / 2);

    return mezzo - this.progetti.indexOf(p) - 1;
  }
}

export type Tecnologia = {
  nome: string,
  immagine: string,
  link: string
}

export type Progetto = {
  nome: string,
  tecnologie: Tecnologia[],
  icona: string
}
