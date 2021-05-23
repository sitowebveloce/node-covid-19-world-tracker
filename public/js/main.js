
// Google Maps Key
let gmapskey = '';
// Select elements
const cardContainer = document.querySelector('.card-container');
const loader = document.querySelector('.loader');
const selector = document.querySelector('#countries');
// Set var is loading true
let isLoading = true;
// Loading function
function setLoading (value){
    isLoading = value;
    isLoading ? loader.style.visibility = 'visible' : loader.style.visibility = 'hidden' ;
}
// Fetch Google Maps Key function
const fetchGKey = async ()=>{
    try{
        let res = await fetch('http://localhost:3001/api/gmapskey');
        let data = await res.json();
        // Check
        if(data){
        // Change gmaps var key
        gmapskey = data.key;
        }
        
    }catch(error){
        console.log(error);
        alert(error);
    }
};
fetchGKey();

// Fetch countries from backend function
const fetchCountries = async ()=>{
    try{
        // loader is visible
        setLoading(true)
        // Url
        let url = 'http://localhost:3001/api/world-countries-names';
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data);
    if(data){
        // Populate selector with countries name
        for(let i=0; i < data.length; i++){
            // console.log(data[i]);
            selector.options[selector.options.length] = new Option(data[i], data[i]);
        }
        setTimeout(()=>{
            // Hide loader
            setLoading(false);
        },400);
        // Fetch country data
        let worldData = await fetchCovid19Data('World');
        // console.log(data);
        // Modify the DOM
        if(worldData){
        modifyDom(worldData);
        }
        
    }
    }catch(error){
        console.log(error)
        alert(error)
    }
};
fetchCountries();

// Fetch covid data fn
const fetchCovid19Data = async country =>{
    try{
        // loader is visible
        setLoading(true);

        let url = `http://localhost:3001/api/covid-19-data/${country}`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data);
        if(data){
            setTimeout(()=>{
                setLoading(false);
            },400);
            return data;
        }
    }catch(error){
        console.log(error);
    }
}

// Add selector event listener
selector.addEventListener('change', async e =>{
    // console.log(e.target.value);
    let country = e.target.value;
    // Fetch country data
    let data = await fetchCovid19Data(country);
    // console.log(data);
    // Modify the DOM
    if(data){
    modifyDom(data);
    }
});

// Modify DOM function
const modifyDom = data =>{
    // console.log(data);
    // Create a Div
    const div = document.createElement('div');
    // Add a class
    div.className = 'card';
    // Set inner HTML
    div.innerHTML = `
    <h1>${data['Country_text']}</h1>
    <div class='date'><small><strong>Last Update </strong>${data['Last Update']}</small></div>
    <div class='card-inner'>
    <div class='left'>
    <div><strong>Active Cases </strong>${data['Active Cases_text']}</div>
    <div><strong>New Cases </strong>${data['New Cases_text']}</div>
    <div class='red'><strong>New Deaths </strong>${data['New Deaths_text']}</div>
    <div><strong>Total Cases </strong>${data['Total Cases_text']}</div>
    <div class='red'><strong>Total Deaths </strong>${data['Total Deaths_text']}</div>
    <div><strong>Total Recovered </strong>${data['Total Recovered_text']}</div>
    </div>
    <div class='right'>
    <img loading="lazy" src='https://maps.googleapis.com/maps/api/staticmap?center=${data['Country_text']}&zoom=6&size=380x350&scale=1&maptype=terrain&markers=size:mid%7Ccolor:red%7C${data['Country_text']}&style=feature:road|color:0xe84e4e&style=feature:landscape.man_made|color:0xe84e4e&key=${gmapskey}' class='map' alt='map' />
    </div>
    </div>
    `;
    // Append to the DOM
    cardContainer.prepend(div);
};