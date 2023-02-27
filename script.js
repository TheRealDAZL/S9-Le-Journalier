class Journaliste {
    constructor(nom="", biographie="", specialite="", couleur_pref="") {
        this.nom = nom;
        this.biographie = biographie;
        this.specialite = specialite;
        this.couleur_pref = couleur_pref;
    }

    toString() {
        return this.nom + "&" + this.biographie + "&" + this.specialite + "&" + this.couleur_pref + "#";
    }
}

class Equipe {
    constructor(tabJournalistes = []) {
        this.tabJournalistes = tabJournalistes;
        this.compteur = 0;
    }

    ajouterJournaliste(journaliste) {
        this.tabJournalistes[this.compteur] = journaliste;
        this.compteur++;
    }

    afficherJournaliste(journaliste) {
        let texte = journaliste.nom + ", " + journaliste.specialite + ", " + journaliste.couleur_pref;
        document.getElementById("equipe").append(texte);

        /*
        PARCELLE DE CODE NON FONCTIONNEL JUSQU'À PRÉSEMT
        const tag = document.createElement("p");
        const texte = journaliste.nom + ", " + journaliste.specialite + ", " + journaliste.couleur_pref;
        tag.appendChild(texte);
        document.getElementById("equipe").append(tag);
        */
    }

    verifierSpecialite(journaliste) {
        for (let i = 0; i < this.tabJournalistes.length; i++)
        {
            if (this.tabJournalistes[i].specialite === journaliste.specialite)
                return false;
        }

        return true;
    }

    verifierCouleur(journaliste) {
        for (let i = 0; i < this.tabJournalistes.length; i++)
        {
            if (this.tabJournalistes[i].couleur_pref === journaliste.couleur_pref)
                return false;
        }

        return true;
    }

    toString() {
        return this.tabJournalistes;
    }
}

function Initialiser() {
    let temp = sessionStorage.getItem("journalistes");

    if (temp != null)
    {
        equipe = new Equipe();

        const journalistes = temp.split("#");
        for (let i = 0; i < journalistes.length - 1; i++) {
            let j = journalistes[i];
            const attributs = j.split("&");
            let journaliste = new Journaliste(attributs[0], attributs[1], attributs[2], attributs[3]);
    
            equipe.ajouterJournaliste(journaliste);
            equipe.afficherJournaliste(journaliste);
        }
    } else {
        equipe = new Equipe();
    }
}

function Envoyer() {
    let nom = document.getElementById("nom").value;
    let biographie = document.getElementById("biographie").value;
    let specialite = document.getElementById("specialite").value;
    let couleur_pref = document.getElementById("couleur_pref").value;
    let journaliste = new Journaliste(nom, biographie, specialite, couleur_pref);

    if (equipe.verifierSpecialite(journaliste) && equipe.verifierCouleur(journaliste))
    {
        const temp1 = document.querySelector("#erreur_specialite");
        temp1.classList.add('invisible');
        const temp2 = document.querySelector("#erreur_couleur");
        temp2.classList.add('invisible');

        equipe.ajouterJournaliste(journaliste);

        let j = "";

        for (let i = 0; i < equipe.compteur; i++)
        {
            j += equipe.tabJournalistes[i];
        }

        sessionStorage.setItem("journalistes", j);

        return true;
    } else if (!equipe.verifierSpecialite(journaliste)) {
        const temp = document.querySelector("#erreur_specialite");
        temp.classList.remove('invisible');

        return false;
    } else {
        const temp = document.querySelector("#erreur_couleur");
        temp.classList.remove('invisible');

        return false;
    }
}
