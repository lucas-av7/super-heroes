/* Publicadoras */
let marvelHeroes = [];
let dcHeroes = [];

/* Seções das Publicadores */
let marvelSection = document.querySelector('.allMarvelHeroes');
let dcSection = document.querySelector('.allDcHeroes');
let initialText = document.querySelector('.initialText');


/* Recebendo os dados JSON */
const requestUtl = 'https://akabab.github.io/superhero-api/api/all.json';
const request = new XMLHttpRequest;
request.open('GET', requestUtl);
request.responseType = 'json';
request.send();

request.onload = () => {
    const allHeroes = request.response;
    publisher(allHeroes);
}

function publisher(allHeroes) {
    for(i = 0; i < allHeroes.length; i++) {
        if(allHeroes[i].biography.publisher === 'Marvel Comics') {
            marvelHeroes.push(allHeroes[i]);
        } else if (allHeroes[i].biography.publisher === 'DC Comics') {
            dcHeroes.push(allHeroes[i]);
        }
    }
}

let buttonMarvel = document.querySelector('.marvelHeroes');
let buttonDC = document.querySelector('.dcHeroes');
buttonMarvel.addEventListener('click', showSection);
buttonDC.addEventListener('click', showSection);

function showSection(e) {
    initialText.style.display = 'none';
    let classButton = e.target.getAttribute('class');
    if(classButton === 'marvelHeroes') {
        dcSection.classList.toggle('on', false);
        marvelSection.classList.toggle('on', true);
        downloadHeroes('marvel');

    } else if (classButton === 'dcHeroes') {
        marvelSection.classList.toggle('on', false);
        dcSection.classList.toggle('on', true);
        downloadHeroes('dc');

    }
}

let marvelDownloaded = false;
let dcDownloaded = false;


function downloadHeroes(publisher) {
    let arrayHero = publisher === 'marvel' ? marvelHeroes : publisher === 'dc' ? dcHeroes : '';
    let section = publisher === 'marvel' ? marvelSection : publisher === 'dc' ? dcSection : '';

    if((marvelDownloaded && publisher === 'marvel') || dcDownloaded && publisher === 'dc') return;

    if(publisher === 'marvel') {
        marvelDownloaded = true;
    } else if(publisher === 'dc') {
        dcDownloaded = true;
    }

    createHeroes(arrayHero, section);

}

let auxiliarMarvel = 0;
let indiceMarvel = 0;
let auxiliarDC = 0;
let indiceDC = 0;
let auxiliar;
let indice;

/*problemas com a variavel pois está sendo a mesma para marvel e dc */

function createHeroes(arrayHero, section) {
    
    if(section === marvelSection) {
        auxiliar = auxiliarMarvel;
        indice = indiceMarvel;
        auxiliarMarvel += 3;
    } else if(section === dcSection) {
        auxiliar = auxiliarDC;
        indice = indiceDC;
        auxiliarDC += 3;
    }

    const loading = document.createElement('h1');
    loading.textContent = 'Lost connection... Reload the page!';
    section.appendChild(loading);
    
    while(indice < (3 + auxiliar)) {
        let heroArticle = document.createElement('article');
        let heroImg = document.createElement('img');
        heroImg.setAttribute('src', arrayHero[indice].images.sm);
        heroImg.setAttribute('width', '160px');
        let paragraph = document.createElement('p');
        paragraph.innerHTML = 
        `Name: ${arrayHero[indice].name} <br>
        Gender: ${arrayHero[indice].appearance.gender} <br>
        Race: ${arrayHero[indice].appearance.race === null ? 'Unknow' : arrayHero[indice].appearance.race}`
        heroArticle.appendChild(heroImg);
        heroArticle.appendChild(paragraph);
        section.appendChild(heroArticle);

        indice++;
        if(section === marvelSection) {
            indiceMarvel++;
        } else if(section === dcSection) {
            indiceDC++;
        }
    }

    loading.parentNode.removeChild(loading);

    if(section === marvelSection) {
        auxiliarMarvel += 3;
    } else if(section === dcSection) {
        auxiliarDC += 3;
    }
}

function addHeroes(e) {

    let buttonClicked = e.target;
    let publisher = e.target.getAttribute('class');
    let arrayHero = publisher === 'addMarvel' ? marvelHeroes : publisher === 'addDC' ? dcHeroes : '';
    let section = publisher === 'addMarvel' ? marvelSection : publisher === 'addDC' ? dcSection : '';

    if(section === marvelSection) {
        auxiliar = auxiliarMarvel;
        indice = indiceMarvel;
    } else if(section === dcSection) {
        auxiliar = auxiliarDC;
        indice = indiceDC;
    }

    if(indice >= arrayHero.length) {
        buttonClicked.style.display = 'none';
        return;
    }
    if(auxiliar > arrayHero.length) {
    auxiliar = arrayHero.length;
    buttonClicked.style.display = 'none';
    }

    while(indice < (auxiliar)) {
        let heroArticle = document.createElement('article');
        let heroImg = document.createElement('img');
        heroImg.setAttribute('src', arrayHero[indice].images.sm);
        heroImg.setAttribute('width', '160px');
        let paragraph = document.createElement('p');
        paragraph.innerHTML = 
        `Name: ${arrayHero[indice].name} <br>
        Gender: ${arrayHero[indice].appearance.gender} <br>
        Race: ${arrayHero[indice].appearance.race === null ? 'Unknow' : arrayHero[indice].appearance.race}`
        heroArticle.appendChild(heroImg);
        heroArticle.appendChild(paragraph);
        section.appendChild(heroArticle);

        indice++;
        if(section === marvelSection) {
            indiceMarvel++;
        } else if(section === dcSection) {
            indiceDC++;
        }
    }
    if(section === marvelSection) {
        auxiliarMarvel += 3;
    } else if(section === dcSection) {
        auxiliarDC += 3;
    }
}

let buttonAddMarvel = document.querySelector('.addMarvel');
let buttonAddDC = document.querySelector('.addDC');
buttonAddMarvel.addEventListener('click', addHeroes);
buttonAddDC.addEventListener('click', addHeroes);
