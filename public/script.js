// create the app object 
console.log('it works');
const app = {}
// const ul = document.querySelector('.gallery');


//create the init method to define global variables & capture user interaction with select & button elements 

app.init = () => {
    // third party API with cocktail recipe data used for app
    // www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
    app.apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
    app.apiRecipeUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?';

    //declare a variable to capture the users preferred spirit selection
    app.spiritName;
    // target the select element & use addEventListener to update with the users spirit selection 
    app.userSelection = document.querySelector('select');
    app.userSelection.addEventListener('click', (e) => {
        app.spiritName = e.target.innerText;

        // target stir button and use addEventListener to capture users choice and display the cocktail options. Also deactivate the select display from the options. 
        app.stirBtn = document.querySelector('.stirBtn');
        app.stirBtn.addEventListener('click', (e) => {
            if (app.spiritName != 'Select') {
                app.getCocktails();
            }
            // target the ul element in the DOM to create a gallery with 6 cocktail options for the user
            app.gallery = document.querySelector('.gallery');

            //defining a variable to reference the ul with a class of gallery
            app.ulElement = document.querySelector('.gallery');
        })
    });

    app.cocktailImg = document.querySelector('.cocktail-img');
    app.cocktailRecipe = document.querySelector('.recipe');
    app.recipeInstructions = document.querySelector('.selectedCocktail');
    app.cocktailImg = document.querySelector('.cocktail-img');

}

// declare a getCocketails method & use AJAX method to obtain the cocktails data from the third party API

app.getCocktails = () => {
    const url = new URL(app.apiUrl);
    url.search = new URLSearchParams({
        'i': app.spiritName
    });
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(drinksResult => {
            app.displayImages(drinksResult);
        })
}

// created a displayImage method to populate an image gallery of cocktails & their names for the users selection

app.displayImages = (drinksArray) => {

    // reset the gallery 
    app.gallery.innerHTML = '';

    // use for loop to target the cocktail images & texts from the third party API and display it as a gallery
    for (let i = 0; i <= 5; i++) {
        const listItem = document.createElement('li');
        const image = document.createElement('img');
        const text = document.createElement('p');

        image.src = drinksArray.drinks[i].strDrinkThumb;
        image.alt = drinksArray.drinks[i].strDrink;
        listItem.id = drinksArray.drinks[i].idDrink;

        text.innerText = drinksArray.drinks[i].strDrink;

        listItem.appendChild(image);
        listItem.appendChild(text);
        app.gallery.appendChild(listItem);
    };

    // add event listener to the cocktail image for the user to get recipe on a click event
    app.ulElement.childNodes.forEach(liElement => {
        liElement.addEventListener('click', () => {
            let idDrink = liElement.getAttribute('id');
            app.recipeInstructions.innerHTML = '';
            app.cocktailImg.innerHTML='';
            app.getRecipe(idDrink);
        });

    })

}

// declaring app.getRecipe method to fetch the cocktail recipe for the user
app.getRecipe = (idDrink) => {
   
    const url = new URL(app.apiRecipeUrl);
    let ingredients;
    let measures;
    let instructions;
    const selectedCocktailImg = document.createElement('img');
  
    url.search = new URLSearchParams({
        'i': idDrink
    });
    // strIngredient- ingredient
    // strInstructions - steps
    // strMeasure - quantities
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(idResult => {
            console.log(idResult.drinks[0]);
            selectedCocktailImg.src = idResult.drinks[0].strDrinkThumb;
            app.cocktailImg.appendChild(selectedCocktailImg);
            ingredients =app.checkProperty(idResult.drinks[0], 'strIngredient');
            measures=app.checkProperty(idResult.drinks[0], 'strMeasure');
            instructions=app.checkProperty(idResult.drinks[0], 'strInstructions');
            for (let i = 0; i < ingredients.length; i++) {
                if(measures[i]==undefined){
                    measures[i]=''
                }
                app.recipeInstructions.insertAdjacentHTML('beforeend', 
                    `<div class='recipe'>
                    <p>${ingredients[i]}</p>
                    <p>${measures[i]}</p> 
                    </div>`)
                
            }
            app.recipeInstructions.insertAdjacentHTML('beforeend',
                `<div class='method'>
                    <p>${instructions[0]}</p>
                </div>`)
            
        }) 
    
        
        

}
// to check if  a particular property exits in a given object
app.checkProperty = (obj, objProperty) =>{
    const eleArray  = [];
    for(let key in obj){
        if(key.includes(objProperty) && (obj[key] !== null && obj[key] !=="")){
            eleArray.push(obj[key]);
            
        }
    }
    return eleArray;
}





// call the init method to initiate the app
app.init();

