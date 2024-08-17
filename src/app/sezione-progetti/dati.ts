export type Tecnologia = {
    nome: string,
    immagine: string,
    link: string
}

export type Progetto = {
    nome: string,
    tecnologie: Tecnologia[],
    icona: string,
    introduzione: string[],
    funzionalita: {
        titolo: string,
        testo: string[]
    }[],
    link: string
}

const tecnologie: Tecnologia[] = [
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
export const progetti: Progetto[] = [
    {
        nome: 'Rilievi & Perizie',
        tecnologie: ["Angular", "Ionic", "BunJS", "Express", "MongoDB", "SCSS", "TypeScript", "Capacitor"].map((c) => {
            return tecnologie.find(t => t.nome === c)!;
        }),
        icona: "globe",
        introduzione: ["Questo è stato il mio progetto di fine anno, in cui ho integrato molte delle tecnologie che abbiamo appreso, soprattutto quelle legate al web."],
        funzionalita: [
            {
                titolo: "Applicazione",
                testo: ["Il progetto si basa su due app: una web, realizzata con Angular, a cui gli admin possono accedere per aggiornare le informazioni, e una mobile, sviluppata con Ionic e Capacitor, destinata ai dipendenti per eseguire i compiti assegnati."]
            },
            {
                titolo: "BunJS",
                testo: ["Ho deciso di utilizzare BunJS al posto di Node, una runtime alternativa per JavaScript. L'ho scelto perché è generalmente più performante, richiede meno tempo per installare ed eseguire il codice e consuma meno RAM durante l'esecuzione. Inoltre, BunJS mantiene la compatibilità con i moduli core di Node, nel caso fossero necessari."]
            },
            {
                titolo: "Server",
                testo: ["Il backend è creato con ExpressJS insieme a diversi altri strumenti. Questi includono JWT per l'accesso degli utenti, Google oAuth2 per l'invio di mail agli utenti e cloudinary per il caricamento delle immagini"],
            },
            {
                titolo: "Single Sign-On",
                testo: ["Il sito admin prevede l'accesso sia tramite credenziali che per SSO. Questo sia attraverso l'account Google o Microsoft. Quest'ultimo può essere configurato per far accedere solo gli utenti che appartengono ad un dominio autorizzato."]
            },
            {
                titolo: "Geolocation",
                testo: ["Il progetto si basa sulle API di Google per la geolocalizzazione. Queste API vengono utilizzate sia per la creazione e l'inserimento di mappe, sia per il geocoding, cioè la conversione di un indirizzo testuale in coordinate geografiche e viceversa."]
            }
        ],
        link: "https://github.com/BosioPietro/Assicurazioni"
    },
    {
      nome: 'AlphaVantage',
      tecnologie: ["HTML", "CSS", "JavaScript", "jQuery", "ChartJS", "XAMPP", "PHP", "MariaDB"].map((c) => {
        return tecnologie.find(t => t.nome === c)!;
      }),
      icona: "analytics",
      introduzione: ["Progetto fatto in quarta superiore come introduzione alle API. Si basa su l'API gratuita di alphavantage.co che permette l'acceso a informazioni riguardanti gli stock e l'economia. Queste informazioni vengono mostrate come tabella e come grafico. "],
      funzionalita: [
        {
            titolo: "Caching",
            testo: ["Dato che l'API gratuita presenta diverse limitazioni, principalmente quella di un basso numero di richieste al minuto, sono stati implementati due livelli di caching.", "Il primo è quello del LocalStorage, per informazioni che cambiano più rapidamente e che quindi scadono dopo un breve tempo. Il secondo metodo è attraverso un database MariaDB al quale il sito si interfaccia tramite PHP."]
        },
        {
            titolo: "Grafici",
            testo: ["Le informazioni vengono anche stampate sottoforma di grafico grazie all'apposita libreria ChartJs. C'è la possibilità di scegliere tra due tipi di grafico e di ricavare dal canvas su è renderizzato in un'immagine che si può scaricare."]
        },
        {
            titolo: "Mappe",
            testo: ["Il progetto usa la Google Maps API per JavaScript per mostrare le sedi delle aziende quotate pubblicamente che si possono ricercare."]
        }
      ],
      link: "https://github.com/vallauri-ict/alpha-vantage-BosioPietro"
    },
    {
      nome: 'Registro Elettronico',
      tecnologie: ["React", "JSX", "CSS", "ChartJS", "XAMPP", "PHP", "MariaDB"].map((c) => {
        return tecnologie.find(t => t.nome === c)!;
      }),
      icona: "file-tray-full",
      introduzione: ["Progetto di fine quarta superiore per consolidare tutte le conoscenze riguardo a PHP, SSR e MySQL (o MariaDB in questo caso specifico). Questo è anche il primo progetto che ho creato con un framework, React, cosa che mi ha permesso di capire il meccanismo con cui funzionano aiutandomi poi l'anno successivo con Angular."],
      funzionalita: [
        {
            titolo: "Sessione",
            testo: ["Il mantimento delle informazioni è gestito su due livelli. Alcune informazioni, come preferenze, sono salvate localmente nei cookie mentre altre, legate prevalentemente al login, nella sessione PHP gestita dal server."]
        },
        {
            titolo: "Layout",
            testo: ["Questo è stato il primo progetto in cui ho iniziato a capire come creare layout che si adattano meglio con i diversi dispositivi grazie a proprietà come display:flex e grid. Oltre a quello ho anche usato vari breakpoint nelle @media query per garantire che il layout si adatti correttamente"]
        }
      ],
      link: "https://github.com/BosioPietro/Registro-Elettronico"
    },
    {
      nome: 'E-Commerce',
      tecnologie: ["HTML", "CSS", "JavaScript", "jQuery", "XAMPP", "PHP", "MariaDB"].map((c) => {
        return tecnologie.find(t => t.nome === c)!;
      }),
      icona: "storefront",
      introduzione: ["Progetto creato in quarta superiore come esercizio per capire meglio il meccanismo di SSR e PHP in generale.", "Ho anche usato questa come un'oppurtunità per lavorare sul mio CSS e da ciò ne deriva l'aspetto quasi eccessivo ed esagerato dell'intero sito."],
      funzionalita: [
        {
            titolo: "Integrazione PHP",
            testo: ["Questo progetto è scritto quasi totalmente in PHP dal backend al frontend con il quale sono renderizzate pagine relativamente complesse. L'esempio principale è quella dei prodotti nella quale tramite SSR restituisco la pagina al client mostrando solo i prodotti rilevanti."]
        }
      ],
      link: "https://github.com/BosioPietro/E-Shop"
    },
    {
      nome: 'Random User',
      tecnologie: ["HTML", "CSS", "JavaScript", "jQuery", "jQuery UI"].map((c) => {
        return tecnologie.find(t => t.nome === c)!;
      }),
      icona: "people",
      introduzione: ["Questo progetto è stata l'introduzione alle richieste alle API Web, inizialmente tramite Ajax di jQuery e poi con Axios e fetch(). È una ricreazione il più fedele possibile al sito randomuser.me con alcune funzionalità aggiuntive."],
      funzionalita: [
        {
            titolo: "Filtri & Griglia",
            testo: ["Queste funzionalità sono la possibilità di poter generare più di un utente alla volta, avendo la possibilità di filtrare per sesso e nazionalità.", "Gli utenti possono essere visualizzati in una griglia e riordinati attraverso drag-and-drop usando i sortable di jQuery UI."]
        }
      ],
      link: "https://github.com/BosioPietro/Random-User"
    },
    // {
    //   nome: 'MongoDriver',
    //   tecnologie: ["TypeScript", "NodeJS", "JS Doc"].map((c) => {
    //     return this.tecnologie.find(t => t.nome === c)!;
    //   }),
    //   icona: "server"
    // },
]