const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = [];

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    fetch(endpoint) 
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network was not ok!');
            }
            return res.json();
        })
        .then((data) => {
            cities.push(...data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    
    function filterCities(searchText) {
        const regex = new RegExp(searchText, 'gi');
        const filteredCities = cities.filter(place => 
                regex.test(place.city) || regex.test(place.state)
        );
        return filteredCities;
    }

    function displaySearch() {
        const searchText = searchInput.value;
        const filteredCities = filterCities(searchText);
        suggestions.innerHTML = `${filteredCities.map( place => {
            const regex = new RegExp(searchText, 'gi');
            const cityName = place.city.replace(regex, `<span class="hl">${searchText}</span>`);
            const stateName = place.state.replace(regex, `<span class="hl">${searchText}</span>`);
            return `
                <li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${Number(place.population).toLocaleString()}</span>
                </li>
        `;}).join('')}`;
    }

    searchInput.addEventListener('input', displaySearch);