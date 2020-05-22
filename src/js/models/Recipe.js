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
            // changes were made here
//            console.log(result.data.recipe.image_ur l); // ------------
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
    
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon',            'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        const newIngredients = this.ingredients.map(element => {
            // 1) Uniform units
            // use let to mutate the variable
            let ingredient = element.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            // 3) Pasrse ingretients into count, unit and ingredient
            const ingredientArray = ingredient.split(' ');
            // find index at which unit is located
            // MDN: includes returns true if the element is in the array, false otherwise
            // for each current element, will test if that element is inside units array
            const unitIndex = ingredientArray.findIndex(element2 => units.includes(element2));
            // unitIndex is the position where a unit is found. Ex, tbsp
            let objIngredient;
            
            if (unitIndex > -1) {
                // there is a unit
                // excluding unit index
                const arrCount = ingredientArray.slice(0, unitIndex); 
                // 4 1/2 cups, arrCount = [4,1/2]
                // case:2 --> 4 cups, arrCount is [4]
                let count;
                if (arrCount.length === 1) {
                    count = eval(ingredientArray[0].replace("-", "+")); 
                } else {
                    count = eval(ingredientArray.slice(0, unitIndex).join('+'));
                    // ingredientsArray.slice.join will produce, for ex, 4 1/2 ==> 4+1/2
                    // and eval will treat 4+1/2 as JS code and apply the + operator on it to give 4.5
                }
                objIngredient = {
                    count,
                    unit: ingredientArray[unitIndex],
                    ingredient: ingredientArray.slice(unitIndex + 1).join(' ')
                };
            } else if (parseInt(ingredientArray[0], 10)) {
                // there is no unit but there is a number
                // Ex) 1 bread instead of 1 ounce
                // There is no unit but first element is a number
                objIngredient = {
                    count: parseInt(ingredientArray[0], 10),
                    unit: '',
                    ingredient: ingredientArray.slice(1).join(' ')
                };
            } else if (unitIndex === -1)  {
                // there is no unit and not number in first position
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }
            
            return objIngredient;
        });
        this.ingredients = newIngredients;
    }
    
    // type = increase or decrease button to dec or inc servings
    updateServings (type) {
        
        // servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        // Ingredients
        // update all count numbers (they're valid for only current amount of servings)
        this.ingredients.forEach(ing => {
            // ing current value in for each loop
            ing.count *= (newServings / this.servings);
        });
        
        
        this.servings = newServings;
    }
    
}// end class


















































































































































