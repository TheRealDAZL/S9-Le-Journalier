// Cette classe sert à créer des objets "Journaliste"
class Journaliste {
    constructor(nom="", biographie="", specialite="", couleur_pref="") {
        this.nom = nom;
        this.biographie = biographie;
        this.specialite = specialite;
        this.couleur_pref = couleur_pref;
    }

    // Cette méthode crée un string à partir des valeurs de l'objet
    toString() {
        return this.nom + "&" + this.biographie + "&" + this.specialite + "&" + this.couleur_pref + "#";
    }
}

// Cette classe sert à créer et à manipuler une liste de journalistes
class Equipe {
    constructor(tabJournalistes = []) {
        this.tabJournalistes = tabJournalistes;
        this.compteur = 0;
    }

    // Cette méthode ajoute un nouveau journaliste dans la liste, et compte les journalistes
    ajouterJournaliste(journaliste) {
        this.tabJournalistes[this.compteur] = journaliste;
        this.compteur++;
    }

    // Cette méthode affiche le nouveau journaliste dans le HTML
    afficherJournaliste(journaliste) {
        // Créer un élément <p></p> nommé tag
        const tag = document.createElement("p");
        // Attribuer un id au tag
        tag.setAttribute("id", "journaliste_"+this.compteur);
        // Définir le contenu textuel du tag
        const texte = document.createTextNode(journaliste.nom + ", " + journaliste.specialite + ", " + journaliste.couleur_pref);
        // Ajouter le contenu textuel au tag
        tag.appendChild(texte);
        // Ajouter tag à la fin de la liste des journalistes
        document.getElementById("equipe").appendChild(tag);
    }

    // Cette méthode vérifie que le nouveau journaliste possède une spécialité qui n'a pas encore été choisie
    verifierSpecialite(journaliste) {
        for (let i = 0; i < this.tabJournalistes.length; i++)
        {
            if (this.tabJournalistes[i].specialite === journaliste.specialite)
                return false;
        }

        return true;
    }

    // Cette méthode vérifie que le nouveau journaliste possède une couleur préférée qui n'a pas encore été choisie
    verifierCouleur(journaliste) {
        for (let i = 0; i < this.tabJournalistes.length; i++)
        {
            if (this.tabJournalistes[i].couleur_pref === journaliste.couleur_pref)
                return false;
        }

        return true;
    }

    toString() {
        // Créer un string vide, puis concaténer la liste de journalistes dans ce string, puis retourner la valeur du string
        let j = "";

        for (let i = 0; i < equipe.compteur; i++)
        {
            j += equipe.tabJournalistes[i];
        }

        return j;
    }
}





function initialiser() {
    // Créer une nouvelle équipe de journalistes
    equipe = new Equipe();
    
    // Aller chercher le string "journalistes" de la session
    let temp = sessionStorage.getItem("journalistes");

    // Si le string "journalistes" n'est pas nul
    if (temp != null)
    {
        recreerListeJournalistes(temp);
    }
}

function envoyer() {
    return verifierNouveauJournaliste(creerNouveauJournaliste());
}





function recreerListeJournalistes(temp) {
    // "Diviser" le contenu du string temp pour tous les #
    const journalistes = temp.split("#");

    // Pour chaque string du tableau journalistes (sauf le string vide de la fin)
    for (let i = 0; i < journalistes.length - 1; i++) {
        // "Diviser" le contenu du string journalistes[i] pour tous les &
        const attributs = journalistes[i].split("&");
        // Créer un nouveau Journaliste
        let journaliste = new Journaliste(attributs[0], attributs[1], attributs[2], attributs[3]);



        // Test
        console.log(journaliste);
        // Test



        // Ajouter le journaliste à l'équipe
        equipe.ajouterJournaliste(journaliste);
        // Afficher le journaliste ajouté à l'équipe
        equipe.afficherJournaliste(journaliste);
    }
}

function creerNouveauJournaliste() {
    // Aller chercher les valeurs du formulaire dans le HTML
    let nom = document.getElementById("nom").value;
    let biographie = document.getElementById("biographie").value;
    let specialite = document.getElementById("specialite").value;
    let couleur_pref = document.getElementById("couleur_pref").value;

    // Créer un nouvel objet Journaliste
    let journaliste = new Journaliste(nom, biographie, specialite, couleur_pref);

    return journaliste;
}

function verifierNouveauJournaliste(journaliste) {
    if (equipe.verifierSpecialite(journaliste) && equipe.verifierCouleur(journaliste)) // Vérifier si le/la nouveau/nouvelle journaliste correspond aux conditions
    {
        const temp1 = document.querySelector("#erreur_specialite");
        temp1.classList.add('invisible');
        const temp2 = document.querySelector("#erreur_couleur");
        temp2.classList.add('invisible');

        // Ajouter le/la nouveau/nouvelle journaliste à l'équipe des journalistes
        equipe.ajouterJournaliste(journaliste);

        // Enregistrer le string de l'équie des journalistes dans la session
        sessionStorage.setItem("journalistes", equipe.toString());

        return true;
    } else if (!equipe.verifierSpecialite(journaliste)) { // Dans le cas où la spécialité du journaliste a déjà été choisie
        const temp = document.querySelector("#erreur_specialite");
        temp.classList.remove('invisible');

        return false;
    } else {  // Dans les autres cas
        const temp = document.querySelector("#erreur_couleur");
        temp.classList.remove('invisible');

        return false;
    }
}
