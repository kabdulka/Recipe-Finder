// In default exports, don't specify constants or 
// and variables
// each model and each view will get its own file for every functionality
// controllers will go into the same file
import axios from 'axios';

export default class Search {
    
    constructor(query) {
        this.query = query;
        // this.queryResultRecipes
    }
    
    async getResults() {
        // https://forkify-api.herokuapp.com/api/search?q=
        // using axios to make async calls
        // axios works on all browsers unlike fetch
        //    const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=pizza`);
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            // result --> queryResultRecipes
            this.queryResultRecipes = result.data.recipes;
//            console.log(this.queryResultRecipes);
        } catch (error) {
            alert(error);
        }

    }
}







































