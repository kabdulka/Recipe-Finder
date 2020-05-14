// need webpack to bundle everything together

import Search from './models/Search';
// import everything from the view in the controllers
import * as searchView from './views/searchView'
import {elements} from './views/base';

// global state of the app
// search object
// current recipe object
// shopping list object
// liked recipes
// this data will be stored in one central variale that we can access throughout the controller

const state = {}
// persistent data which will be saved when the page is loaded
// event object

const controlSearch = async () => {
    // get query form view
    const query = searchView.getInput(); //TODO
    console.log(query);
    if (query) {
        // 2) new search object and add to state
        // create search result that's a property of the object state
        state.search = new Search(query); // *** Search(query)
        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        // 4) Search for recipes (await the promise)
        // Wait for the getResults method to run and finish
        await state.search.getResults();
        // log to the console the result when it's done
        
        // 5) render results on UI - only happen after we recieve results from API
        // console.log(state.search.queryResultRecipes);
        searchView.renderResults(state.search.queryResultRecipes);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
    

//const search = new Search('pizza');
//console.log(search);
//search.getResults();


































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

















































































