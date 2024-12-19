// Code
const input = document.getElementById('navbar-input');
const search_btn = document.getElementById('search_btn');
const clear_btn = document.getElementById('clear_btn');
const fetched_items = document.querySelector('.fetched-items');

let user_input = '';
let results = {};


// fetch data from .json file

const getData = async () => {
    return await fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => data)
}


const handleTemplesAndBeaches = (item) => {
    return `
        <div class="card-recommend">
            <img class="img-card" src="${item.imageUrl}" alt="${item.name}" title="${item.name}">
            <h4 class="re-name">${item.name}</h4>
            <p class="re-desc">${item.description}</p>
            <button class="re-button">Visit</button>
        </div>
    `;
}


const handleCountries = (item) => {
    return `
        <div class="country-cards">
        <h4>${item.name}</h4>
        <span>We have ${item.cities.length} options for you</span>
        <div class="inner-card">
            ${item.cities.map(el => {
        return `
        <div class="card-recommend">
            <img class="img-card" src="${el.imageUrl}" alt="${el.name}" title="${el.name}">
            <h4 class="re-name">${el.name}</h4>
            <p class="re-desc">${el.description}</p>
            <button class="re-button">Visit</button>
        </div>
    `
    })}
        </div>
        </div>
    `
}

// Event listeners

input.addEventListener('change', (event) => {
    user_input = event.target.value
})

search_btn.addEventListener('click', async () => {
    console.log(fetched_items)
    fetched_items.innerHTML = ''
    // check if user type an input
    if (!user_input) return;
    // if we have an input, then fetch the data
    results = await getData()
    // check if user input is a valid key in results data
    if (!(Object.hasOwn(results, user_input))) return;

    // get elements user required
    results = results[user_input]
    if (user_input === 'countries') {
        fetched_items.classList.remove('fetched-items-v2')
        fetched_items.classList.add('fetched-items')
        results.forEach(item => {
            let child = document.createElement('div');
            child.innerHTML = handleCountries(item)
            fetched_items.appendChild(child)
        });
    } else {
        fetched_items.classList.remove('fetched-items')
        fetched_items.classList.add('fetched-items-v2')
        results.forEach(item => {
            let child = document.createElement('div');
            child.innerHTML = handleTemplesAndBeaches(item)
            fetched_items.appendChild(child)
        })
    }
})

clear_btn.addEventListener('click', () => {
    fetched_items.innerHTML = ''
})
