const BASE_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/solaris-api';
const pageOne = document.querySelector('#pageOne');
const pageTwo = document.querySelector('#pageTwo');
const buttons = document.querySelectorAll('button');
const planetName = document.querySelector('#name');
const latin = document.querySelector('#latin');
const desc = document.querySelector('#desc');
const circum = document.querySelector('#circum');
const distance = document.querySelector('#distance');
const tempDay = document.querySelector('#tempDay');
const tempNight = document.querySelector('#tempNight');
const moons = document.querySelector('#moons');
const planetLine = document.querySelector('#planetLine');
pageOne.append(planetLine);
const planetInfo = document.querySelector('#planetInfo');
pageTwo.append(planetInfo);

async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`);
    const data = await response.json();
    console.log(data);

    return data.key;
}

async function getPlanets() {
    const key = await getKey();
    const response = await fetch(`${BASE_URL}/bodies`, {
    
        headers: {
            'x-zocom': key
        }
    });
    const data = await response.json();
    console.log(data);
    displayBodies(data);
}

function showOrHide() {
    pageOne.classList.toggle('hide'); 
    pageTwo.classList.toggle('hide'); 
} 

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        showOrHide();
    });
})

getPlanets();

function displayBodies(bodies) {
    for(const body of bodies) {
        const bodyFacts = Object.values(body);
        attachFactsToPlanet(bodyFacts);
    }
}


function attachFactsToPlanet(planetFacts) {
    const planetTemp = Object.values(planetFacts[6]);
    let planetBtn = document.createElement('div');
    planetBtn.setAttribute('class', planetFacts[2]); 
    planetLine.append(planetBtn);
    
    
    planetBtn.addEventListener('click', () => {
        
        let nameFacts = planetFacts[2];
        planetName.innerHTML = '';
        planetName.append(nameFacts);
        let latinFacts = planetFacts[3];
        latin.innerHTML = '';
        latin.append(latinFacts);
        let descFacts = planetFacts[9];
        desc.innerHTML = '';
        desc.append(descFacts);
        let circumFacts = planetFacts[5];
        circum.innerHTML = '';
        circum.append(circumFacts);
        let distanceFacts = planetFacts[7];
        distance.innerHTML = '';
        distance.append(distanceFacts);
        let tempDayFacts = planetTemp[0];
        tempDay.innerHTML = '';
        tempDay.append(tempDayFacts);
        let tempNightFacts = planetTemp[1];
        tempNight.innerHTML = '';
        tempNight.append(tempNightFacts);
        let moonFact = planetFacts[10];
        moonFact = moonFact.join(', ');

        moons.innerHTML = '';
        moons.append(moonFact);
        showOrHide();
        
        
    })
    
}











