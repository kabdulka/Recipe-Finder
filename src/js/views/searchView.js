
// return the input value of the field
import {elements} from './base';
// value attribut of the search field
export const getInput = () => elements.searchInput.value;
//results__link--active

export const clearInput = () => {
    elements.searchInput.value = "";
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = "";
};

// limit -> limit of characters acceprable as max length of title
const limitRecipeTitle = (title, limit=17) => {
    const newTitle = [];
    //check if title is already longer than limit
    if (title.length > limit) {
        title.split(' ').reduce((accumulator, current) =>{
            if (accumulator + current.length <= limit) {
                newTitle.push(current);
            }
            return accumulator + current.length;
        }, 0); 
        // return result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
// array input
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};








































































