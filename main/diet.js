const searchForm = document.querySelector('form');
const searchresultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = '42d94cd2';
const APP_key = 'c276511818dd576c3ee42381310f2989';

searchForm.addEventListener('submit',(e)=>{
 e.preventDefault();
searchQuery = e.target.querySelector('input').value;
fetchAPI();
});

async function fetchAPI(){
    const baseURl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}`;
   const response = await fetch(baseURl);
   const data = await response.json();
   generateHTML(data.hits);
   console.log(data);
}
function generateHTML(results){
    container.classList.remove('initial');
    let generateHTML = '';
    results.map(result =>{
    generateHTML += 
    `
    <div class="item">
                    <img src="${result.recipe.image}" alt="">
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a class="view-button" href="${result.recipe.url}" target"_blank">View Recipe</a>
                    </div>
                    <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                    <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "NO data found"}</p>
                    <p class="item-data">Health label: ${result.recipe.healthLabels}</p>
                
                </div>
                `
    })
    searchresultDiv.innerHTML = generateHTML;
}