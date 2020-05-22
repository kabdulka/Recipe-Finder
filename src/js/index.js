// need webpack to bundle everything together
import Search from './models/Search';
import Recipe from './models/Recipe';
// import everything from the view in the controllers
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
    
import {elements, renderLoader, clearLoader} from './views/base';

// global state of the app
// search object
// current recipe object
// shopping list object
// liked recipes
// this data will be stored in one central variale that we can access throughout the controller

const state = {}
// persistent data which will be saved when the page is loaded
// event object

// Search Controller
const controlSearch = async () => {
    // get query form view
    const query = searchView.getInput();
//    const query = 'pizza'; 
    console.log(query);
    if (query) {
        // 2) new search object and add to state
        // create search result that's a property of the object state
        state.search = new Search(query); // *** Search(query)
        console.log(state.search);
        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResultClass);
        
        try {
            
            // 4) Search for recipes (await the promise)
            // Wait for the getResults method to run and finish
            await state.search.getResults();
            // log to the console the result when it's done

            // 5) render results on UI - only happen after we recieve results from API
            // console.log(state.search.queryResultRecipes);
            clearLoader();
            searchView.renderResults(state.search.queryResultRecipes);
        } catch(error) {
            alert("Error processing Search");
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// for testing
window.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();
});

elements.SearchResultsPages.addEventListener('click', event => {
    // use the closet method which includes the closet ancestor to the element being clicked on
    const button = event.target.closest(".btn-inline");
    // console.log(button);
    // if a button exists
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10); // base 10 (0-9)
        searchView.clearResults();
        searchView.renderResults(state.search.queryResultRecipes, goToPage);
        console.log(goToPage);
    }
    
});
 
// Recipe Controller
const rec = new Recipe(47746);
rec.getRecipe();
console.log(rec);

const controlRecipe = async () => {
    // get id from url
    // window.location is the entire url, replace hash with nothing
    const id = window.location.hash.replace('#', '');
    console.log(id);
    
    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        
        // highlight selected search item
        // only if a search exists
        if(state.search) searchView.highlightSelected(id);
        
        // Create new recipe object
        state.recipe = new Recipe(id);
//        window.r = state.recipe; //---------- FOR TESTING
        try {
            // Get recipe data from server (needs to happen async and await the function to load the 
            // recipe
            // in the background) and parse ingredient
            await state.recipe.getRecipe(); // will return a promise because it's async
            // Calculate servings and time
            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();
            // Render recipe
            console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert("Error processing Recipe");
        }
    }
}
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// use event delegation because buttons aren't there by the time they're clicked
// handling recipe button clicks
elements.recipe.addEventListener('click', event => {
    // do something if the target matches btn-decrease
    // second selector is any decendents of the element (any child)
    if (event.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            // decrease button is clicked
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    
    // do something if the target matches btn-increase
    // second selector is any decendents of the element (any child)
    } else if (event.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    console.log(state.recipe);
});





























//import str from './models/Search';
// string now has the imported value 
// when we import a file we don't need to specify the 
// extension (.js)
//1)
// Named exports are used to import multiple things 
//import {add, multiply, Id } from './views/searchView';
//console.log(`Using imported functions. ${add(Id, 2)} and ${multiply(3, 5)}. ${str}`);
//2)
// to use different names than the imported function and variable names use the 'as' keywork
// it is demonstrated as follows:
//import {add as a, multiply as m, Id} from './views/searchView';
//console.log(`Using imported functions. ${a(Id, 2)} and ${m(3, 5)}. ${str} it worked`);
//3) import everything 
//import * as searchView from './views/searchView';
//console.log(`Using imported functions. ${searchView.add(searchView.Id, 2)} and ${searchView.multiply(3, 5)}. ${str} it worked. third method`);
































































































































