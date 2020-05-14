// need webpack to bundle everything together

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
import axios from 'axios';

async function getResults(query) {
    const key = '';
//    https://forkify-api.herokuapp.com/api/search?q=
    // using axios to make async calls
    // axios works on all browsers unlike fetch
//    const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=pizza`);
    try {
        const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        const recipes = result.data.recipes;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }
    
}
getResults('pizza');















































