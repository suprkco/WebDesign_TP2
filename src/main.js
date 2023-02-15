// custom js here

/**
 * Fonction js pour l'exercice 1
 */
// la fonction calculerPrixTTC() récupère les valeurs des inputs PU, TVA et QT, effectue le calcul et affiche le résultat dans le div cardBodyEx1
function calculerPrixTTC() {
    const PU = document.getElementById("PU").value // récupère la valeur de l'input PU
    const TVA = document.getElementById("TVA").value // récupère la valeur de l'input TVA
    const QT = document.getElementById("QT").value // récupère la valeur de l'input QT
    const PT = Math.round(parseFloat(PU) * (1 + parseFloat(TVA) / 100) * parseFloat(QT), 4) // effectue le calcul
    document.getElementById("cardBodyEx1").innerHTML = `
        <h5>
            Prix TTC: 
        </h5>
        <p>
            Prix unitaire: ${PU} €,<br>
            TVA: ${TVA} %,<br>
            Quantité: ${QT} unités,<br>
            <strong>
                ${PT} €
            </strong>
        </p>
    `
    document.getElementById("cardBodyEx1").style.display = "block"
}

// Fonction js pour l'exercice 2
// la fonction multiplier() récupère les valeurs des inputs nb1 et nb2, effectue le calcul et affiche le résultat dans le div cardBodyEx2
function multiplier() {
    const nb1 = document.getElementById("nb1").value // récupère la valeur de l'input nb1
    const nb2 = document.getElementById("nb2").value // récupère la valeur de l'input nb2
    const resultat = nb1 * nb2 // effectue le calcul
    document.getElementById("cardBodyEx2").innerHTML = `
        <h5>
            ${nb1} x ${nb2} = ${resultat}
        </h5>
    `
    document.getElementById("cardBodyEx2").style.display = "block"
}

// Fonction js pour l'exercice 3
// la fonction addition() récupère les valeurs des inputs entree, plat et dessert, effectue le calcul et affiche le résultat dans le div cardBodyEx3
function addition() {
    const entree = document.getElementById("entree")
    const prixEntree = entree.value // récupère la valeur de l'input entree
    const nomEntree = entree.options[entree.selectedIndex].text.split(" - ")[0] // récupère le nom de l'input entree

    const plat = document.getElementById("plat")
    const prixPlat = plat.value // récupère la valeur de l'input plat
    const nomPlat = plat.options[plat.selectedIndex].text.split(" - ")[0] // récupère le nom de l'input plat

    const dessert = document.getElementById("dessert")
    const prixDessert = dessert.value // récupère la valeur de l'input dessert
    const nomDessert = dessert.options[dessert.selectedIndex].text.split(" - ")[0] // récupère le nom de l'input dessert

    const prixTotal = parseFloat(prixEntree) + parseFloat(prixPlat) + parseFloat(prixDessert)// crée un string avec le résultat
    document.getElementById("cardBodyEx3").innerHTML = `
        <h5>
            Montant a payer:
        </h5>
        <p>
            - Entrée: ${nomEntree} --> ${prixEntree} €,<br>
            - Plat: ${nomPlat} --> ${prixPlat} €,<br>
            - Dessert: ${nomDessert} --> ${prixDessert} €,<br>
            <strong>
                Prix total: ${prixTotal}€
            </strong>
        </p>
    `
    document.getElementById("cardBodyEx3").style.display = "block"
}

/**
 * Fonctions js pour l'exercice 4
 */
// la fonction afficherImg() récupère une image aléatoire sur l'api thecatapi.com, et affiche les propriétés de l'image dans le div affichagePropriete
// si il y a une erreur de connexion, un message d'erreur est affiché dans le div affichagePropriete
// la fonction ecrireImgPropriete() récupère les valeurs des inputs imgWidth et imgHeight, et les applique à l'image affichée
function afficherImg(){
    const url = "https://api.thecatapi.com/v1/images/search?limit=1&api_key=live_BUzSGtrNQ7Re3ygQDuZ5KyYyBRZqhJb69EYP3SnwDGAh7OTC4nNTTDY2Xd1PJXL7"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const img = document.getElementById("img")
            img.src = data[0].url
            img.width = data[0].width
            img.height = data[0].height
            img.alt = data[0].id
            document.getElementById("affichagePropriete").innerHTML = `
                <h5>
                    Affichage des propriétés de l'image:
                </h5>
                <p>
                    <strong>
                        Source: ${img.src},<br>
                        Largeur: ${img.width},<br>
                        Hauteur: ${img.height},<br>
                        Alernative: ${img.alt}
                    </strong>
                </p>
            `
        }
        )
        .catch(error => {
            console.log(error)
            document.getElementById("affichagePropriete").innerHTML = `
                <p>
                    Problème de connexion à l'api thecatapi.com
                </p>
            `
        })
    
}

function ecrireImgPropriete() {
    const img = document.getElementById("img")
    // recupere les valeurs de saturationRange, contrasteRange, luminositeRange, et flouRange
    const saturationRange = document.getElementById("saturationRange").value
    const contrasteRange = document.getElementById("contrasteRange").value
    const luminositeRange = document.getElementById("luminositeRange").value
    const flouRange = document.getElementById("flouRange").value
    // applique les valeurs de saturationRange, contrasteRange, luminositeRange, et flouRange aux propriétés de l'image
    // .saturate { filter: saturate(3); }
    // .contrast { filter: contrast(160%); }
    // .brightness { filter: brightness(0.25); }
    // .blur { filter: blur(3px); }
    img.style.filter = `saturate(${saturationRange}) contrast(${contrasteRange}%) brightness(${luminositeRange/100}) blur(${flouRange}px)`
}
