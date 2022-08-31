const favMeals = document.getElementById("fav-meals");
const mealsDiv = document.getElementById("meals");

const src = document.getElementById("search");
const srcTerm = document.getElementById("search-term");

const mealPop = document.getElementById("meal-popup");
const btnPopup = document.getElementById("close-popup");
const mealText = document.getElementById("meal-text");

getRandMeal();
ferchFavMeals();




async function getRandMeal(){
    const rand = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const randJson = await rand.json();
    
    const randMeal = randJson.meals[0];

    console.log(randMeal);

    addMeal(randMeal);
}


async function getById(id){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);

    const Json = await resp.json();

    const meal = Json.meals[0];

    return meal;

}

async function getBySearch(name){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name);

    const Json = await resp.json();

    const meal =await Json.meals;

    return meal;
}





function addMeal(mealJson)
{
    const newDiv = document.createElement("div");
    newDiv.classList.add("meal");

    newDiv.innerHTML =  
    `
        <div class="meal-header">
            <span class="randomRec">Random Food</span>
            <img src="${mealJson.strMealThumb}" alt="${mealJson.strMeal}">
        </div>

        <div class="meal-body">
            <h4>${mealJson.strMeal}</h4>
            <button class="favButton">
                <i class="fa-regular fa-heart"></i>
            </button>
        </div>
    `; 

    const btn = newDiv.querySelector(".meal-body .favButton");

    btn.addEventListener("click", () => {
        if(btn.classList.contains("active"))
        {
            console.log("1");
            removeFromLocStor(mealJson.idMeal);
            btn.style.color = "grey";
            btn.classList.remove("active");
        }
        else
        {
            addToLocStor(mealJson.idMeal);
            btn.classList.add("active");
            btn.style.color = "red";
            console.log("0");
        }

        // favMeals.innerHTML = '';
        ferchFavMeals();
        console.log(getFromLocStor());
        
        
    });

    const photo = newDiv.querySelector("img");

    photo.addEventListener("click", () =>{
        showMealInfo(mealJson);
    });

    
    mealsDiv.appendChild(newDiv);
}


function addToLocStor(mealId){
    const  mealsIDs = getFromLocStor();

    localStorage.setItem('mealsIDs', JSON.stringify(
        [...mealsIDs, mealId]));
}

function removeFromLocStor(mealId){
    const  mealsIDs = getFromLocStor();

    localStorage.setItem('mealsIDs', JSON.stringify(
        mealsIDs.filter(id => id !== mealId)));
}


function getFromLocStor(){
    const mealsIDs = JSON.parse( localStorage.getItem('mealsIDs') );
    
    if(mealsIDs != null)
        return mealsIDs;
    else
        return [];
}


// localStorage.removeItem('mealsIDs');
// console.log(localStorage.getItem('mealsIDs'));




async function ferchFavMeals()
{
    // clear container
    favMeals.innerHTML = '';

    const mealIds = getFromLocStor();
    
    const meals = [];
    
    for(var i = 0; i<mealIds.length; ++i)
    {
        const mealId = mealIds[i];
        meal = await getById(mealId);
        meals.push(meal);

        addMealToFav(meal);
    }

    console.log(meals);

    //add to  screen
}





function addMealToFav(mealJson)
{
    const newli = document.createElement("li");
    

    newli.innerHTML =  
    `
        <img src="${mealJson.strMealThumb}"
            alt="${mealJson.strMeal}"/>

        <span>"${mealJson.strMeal}"</span>
        <button class="clear"> <i class="fa-solid fa-xmark"></i></button>
    `; 

    const btn = newli.querySelector(".clear");
    btn.addEventListener("click", () => {
        removeFromLocStor(mealJson.idMeal)
        ferchFavMeals();

        if(mealJson.strMeal == document.querySelector("h4").innerHTML)
        {
            document.querySelector(".meal-body .favButton").classList.remove("active");
            document.querySelector(".meal-body .favButton").style.color = "grey"; 
        }
    });

    const photo = newli.querySelector("img");

    photo.addEventListener("click", ()=>{
        showMealInfo(mealJson);
    });

    favMeals.appendChild(newli);
}



src.addEventListener("click", async () =>{
    meals.innerHTML = '';
    
    const search = srcTerm.value;

    // console.log(await getBySearch(search));

    const mealsSer = await getBySearch(search);
    mealsSer.forEach((meal) =>
    {
        addMeal(meal);
    } )
})

btnPopup.addEventListener("click", () =>{
    mealPop.classList.add("hidden");
}
);



function showMealInfo(mealJson)
{
    //clean it up
    mealText.innerHTML = '';

    //updateinfo
    const mealEl = document.createElement("div");

    const ingredients = [];

    for(var i = 1; i<= 20; ++i)
    {
        if (mealJson["strIngredient" + i]) 
        {
            ingredients.push(
                `${mealJson["strIngredient" + i]} - ${
                    mealJson["strMeasure" + i]
                }`
            );
        } else 
        {
            break;
        }
    }


    mealEl.innerHTML = `
        <h1>${mealJson.strMeal}</h1>
        <img src="${mealJson.strMealThumb}" alt="">
        
        
        <p>${mealJson.strInstructions}</p>
        
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients
                .map(
                    (ing) => `
            <li>${ing}</li>
            `
                )
                .join("")}
        </ul>
        
    `;

    mealText.appendChild(mealEl);


    // show popup
    mealPop.classList.remove("hidden");
}