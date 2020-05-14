// In default exports, don't specify constants or 
// and variables
import axios from 'axios';

export default class Search {
    
    constructor(query) {
        this.query = query;
    }
    
    async getResults() {
        // https://forkify-api.herokuapp.com/api/search?q=
        // using axios to make async calls
        // axios works on all browsers unlike fetch
        //    const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=pizza`);
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            // result --> queryResult
            this.queryResult = result.data.recipes;
            console.log(this.queryResult);
        } catch (error) {
            alert(error);
        }

    }
}







































