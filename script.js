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

let button = document.querySelectorAll('button');
for(i = 0; i < button.length; i++) {
    button[i].addEventListener('click', showSection);
}

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

    for(let i = 0; i < arrayHero.length; i++) {
        let heroArticle = document.createElement('article');
        let heroImg = document.createElement('img');
        heroImg.setAttribute('src', arrayHero[i].images.sm);
        heroImg.setAttribute('width', '160px');
        let paragraph = document.createElement('p');
        paragraph.innerHTML = 
        `Name: ${arrayHero[i].name} <br>
        Gender: ${arrayHero[i].appearance.gender} <br>
        Race: ${arrayHero[i].appearance.race === null ? 'Unknow' : arrayHero[i].appearance.race}`
        heroArticle.appendChild(heroImg);
        heroArticle.appendChild(paragraph);
        section.appendChild(heroArticle);
    }

    if(publisher === 'marvel') {
        marvelDownloaded = true;
    } else if(publisher === 'dc') {
        dcDownloaded = true;
    }
}