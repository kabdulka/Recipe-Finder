import axios from "axios";


export default class Recipe {
    
    constructor(id) {
        this.id = id;
    }
    
    async getRecipe() {
        try {
            // The axios call will return a promise which it will await because async await is used 
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.image = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
//            console.log(result);
        } catch(error) {
            console.log(error);
            alert("Something went wrong");
        }
    }
    
    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    
    calcServings() {
        this.servings = 4;
    }
    
}// end class



















































