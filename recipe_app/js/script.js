//Function to search and load recipes in recipe-of-the-day container

async function getRecipesBySearch(userInput) {
    userInput = userInput.replace(/\s/g, '&');
    var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userInput;
    const resp = await fetch(url);
    const respData = await resp.json();
    const searchResults = respData.meals;
    
    if(searchResults) {
        searchResults.forEach(rcp => {
            loadRecipeOftheDay(rcp);
        });
    }
    else {
        alert("Sorry :( ... No recipes found with " + userInput);
        location.reload();
    }
}

//Function to fetch recipe by id

async function getRecipeById(recipeId) {
    var url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeId;
    const resp = await fetch(url);
    const respData = await resp.json();
    const recipe = respData.meals[0];
    return recipe;
}

//Function to fetch random recipe and load recipe in
//recipe-of-the-day container

async function getRecipeOftheDay() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const recipe = respData.meals[0];
    loadRecipeOftheDay(recipe, true);
}

//Update heart icon for recipes saved and deleted from local storage
//In event of local storage not cleared and recipes from search or
//recipe of the day re-appearing on screen

function updateHeartIcon(recipeId) {
    const rcpIds = getSavedRecipes();
    if (rcpIds) {
        var found = false;
        for (let i=0; i<rcpIds.length; i++) {
            if (recipeId == rcpIds[i]) {
                found = true;
                break;
            }
        }
    }
    const heartListener = document.querySelector(`.heart-${recipeId}`);
    if(heartListener) {
        if(found) {
            heartListener.classList.add("active");
        }
        else {
            heartListener.classList.remove("active");
        }
    }
}

//Add recipe to the recipe-of-the-day container with eventListener
//for the heart icon
//If user clicks on heart, add recipe to local storage
//If user clicks on heart again, remove recipe from local storage

function loadRecipeOftheDay(recipeData, random = false) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    
    recipeCard.innerHTML = `
                    <div class="recipe-card-info">
                        ${random ? '<span>Recipe of the Day</span>' : ''}
                        <button class="heart heart-${recipeData.idMeal}" id="heart"><i class="fas fa-heart"></i></button>
                        <img id="recipe-of-the-day_img" class="rcp rcp-${recipeData.idMeal}" src="${recipeData.strMealThumb}" alt="${recipeData.strMeal}">
                    </div>
                    <div class="recipe-of-the-day-body">
                        <span>${recipeData.strMeal}</span>
                    </div>`;
    
    const heartListener = recipeCard.querySelector(".heart");
    if (heartListener) {
        heartListener.addEventListener("click", () => {
            if(heartListener.classList.contains("active")) {
                heartListener.classList.remove("active");
                deleteRecipe(recipeData.idMeal);
            }
            else {
                heartListener.classList.add("active");
                saveRecipe(recipeData.idMeal);
            }
            displayFavorites();
        });
    }
    
    const rcpListener = recipeCard.querySelector(".rcp");
    if(rcpListener) {
        rcpListener.addEventListener("click", () => {
            displayRecipeInfo(recipeData.idMeal);
        });
    }
    
    recipeOTDContainer.addEventListener("click", function(e) {
        if(e.target.matches(`.rcp-${recipeData.idMeal}`)) {
            displayRecipeInfo(recipeData.idMeal);
        }
    });
    
    recipeOTDContainer.appendChild(recipeCard);
    updateHeartIcon(recipeData.idMeal);
}

//Get list of saved recipes in array and add them to fav-recipes container

function displayRecipe(recipeArr) {
    const favRecipes = document.getElementById("fav-recipes");
    var recipeList = "";
    
    for (let i=0; i<recipeArr.length; i++) {
        recipeList += `
                    <li>
                        <img src="${recipeArr[i].strMealThumb}" class="rcp-${recipeArr[i].idMeal} saved-recipe" alt="${recipeArr[i].strMealThumb}">
                        <span>${recipeArr[i].strMeal}</span>
                    </li>`;
    }
    favRecipes.innerHTML = recipeList;
    
    const btn = document.querySelectorAll(".saved-recipe");
    if(btn) {
        for(let i=0; i<btn.length; i++) {
            btn[i].addEventListener("click", function() {
                displayRecipeInfo(`${recipeArr[i].idMeal}`);
            });
        }
    }
}

//Display recipes with a x on top in edit mode

function editRecipe(recipeArr) {
    const favRecipes = document.getElementById("fav-recipes");
    var recipeList = "";
    
    for (let i=0; i<recipeArr.length; i++) {
        recipeList += `
                    <li>
                        <button class="delete-icon"><i class="far fa-times-circle"></i></button>
                        <img src=${recipeArr[i].strMealThumb}>
                        <span>${recipeArr[i].strMeal}</span>
                    </li>`;
    }
    favRecipes.innerHTML = recipeList;
    
    const btn = document.querySelectorAll(".delete-icon");
    if(btn) {
        for(let i=0; i<btn.length; i++) {
            btn[i].addEventListener("click", function() {
                deleteRecipe(`${recipeArr[i].idMeal}`);
                displayEditOption();
                updateHeartIcon(`${recipeArr[i].idMeal}`);
            });
        }
    }
}

//Save recipes to local storage

function saveRecipe(recipeId) {
    const recipeIds = getSavedRecipes();
    localStorage.setItem('recipeIds', JSON.stringify([...recipeIds, recipeId]));
}

//Delete recipes from local storage

function deleteRecipe(recipeId) {
    const recipeIds = getSavedRecipes();
    localStorage.setItem('recipeIds', JSON.stringify(recipeIds.filter(id => id !== recipeId)));
}

//Get recipes from local storage

function getSavedRecipes() {
    const recipeIds = JSON.parse(localStorage.getItem('recipeIds'));
    return recipeIds === null ? [] : recipeIds;
}

//Display recipes saved to local storage

async function displayFavorites() {
    const recipeIds = getSavedRecipes();
    
    const recipeArr = [];
    
    for(let i=0; i<recipeIds.length; i++) {
        const rcpId = recipeIds[i];
        const rcp = await getRecipeById(rcpId);
        recipeArr.push(rcp);
    }
    displayRecipe(recipeArr);
    document.getElementById("edit").innerHTML = "Edit";
    document.getElementById("edit").classList.remove("active");
}

//Display recipes in edit mode so user can delete
//Update heart icon for recipes that are deleted from local storage

async function displayEditOption() {
    const recipeIds = getSavedRecipes();
    
    if(recipeIds.length > 0) {
        const recipeArr = [];

        for(let i=0; i<recipeIds.length; i++) {
            const rcpId = recipeIds[i];
            const rcp = await getRecipeById(rcpId);
            recipeArr.push(rcp);
        }
        editRecipe(recipeArr);
    }
    else {
        displayFavorites();
        document.getElementById("edit").innerHTML = "Edit";
    }
}

//Display recipe instructions and ingredients in a popup window

function displayRecipeInfo(recipeId) {
    document.getElementById("recipe-info").innerHTML = '';
    populateRecipeInfo(recipeId);
    recipeInfo.classList.remove("hidden");
}

async function populateRecipeInfo(recipeId) {
    const rcpData = await getRecipeById(recipeId);
    
    if(rcpData) {
    
        var ingredients = [];
        for(let i=1; i<=20; i++) {
            if(rcpData["strIngredient"+i]) {
                ingredients.push(`${rcpData[`strIngredient${i}`]} - ${rcpData[`strMeasure${i}`]}`);
            }
        }
        document.getElementById("recipe-info").innerHTML = `
            <button class="close-recipe-info"><i class="far fa-times-circle"></i></button>
            <h2>${rcpData.strMeal}</h2>
            <img src="${rcpData.strMealThumb}" alt="${rcpData.strMeal}">
            <div>
                <p>${rcpData.strInstructions}</p>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>`;
    }
    
    const btnRecipeInfo = recipeInfo.querySelector(".close-recipe-info");
    if(btnRecipeInfo) {
        btnRecipeInfo.onclick = function() {
            recipeInfo.classList.add("hidden");
        }
    }
}

//Main

const recipeOTDContainer = document.getElementById("recipe-of-the-day");
const recipeInfo = document.getElementById("recipe-info-popup");
const btnLogo = document.getElementById("logo");

//Get recipe of the day feature
getRecipeOftheDay();

//Display favorites container
displayFavorites();

//Reload app when logo is clicked
if (btnLogo) {
    btnLogo.addEventListener("click", function() {
        location.reload();
    });
}

//Enable edit mode
document.getElementById("edit").addEventListener("click", function() {
    if (getSavedRecipes().length > 0) {
        if(this.classList.contains("active")) {
            this.classList.remove("active");
            displayFavorites();
        }
        else {
            this.classList.add("active");
            displayEditOption();
            document.getElementById("edit").innerHTML = "Done";
        }
    }
});

//Enable search mode
document.getElementById("search").addEventListener("click", function() {
    recipeOTDContainer.innerHTML = '';
    const userSearch = document.getElementById("userInput").value;
    if (userSearch !== "") {
        getRecipesBySearch(userSearch);
        document.getElementById("userInput").value = '';
        //document.getElementById("userInput").blur();
    }
});