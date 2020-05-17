
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
    elements.SearchResultsPages.innerHTML = "";
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

// type of button: previous or next
const createHTMLButton = (page, type) => {
//    const pageToDisplay = 0;
//    const typeToDisplay = "";
//    if (type == "prev") {
//        pageToDisplay = page - 1;
//        typeToDisplay = "left";
//    } else {
//        pageToDisplay = page + 1;
//        typeToDisplay = "right";
//    }
// html data attributes (data-goto)
    return `

    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
        <span>Page ${type === 'prev' ? page-1 : page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>

`};

// displays buottons depending on number of page user is on
const renderButtons = (page, numOfResults, resultsPerPage) => {
    // determine current page (round up)
    const totalPages = Math.ceil(numOfResults / resultsPerPage);
    let button;
    if (page == 1 && totalPages > 1) {
        // button should go to next page
        button = createHTMLButton(page, 'next');
    } else if (page < totalPages) {
        // both buttons
        button = `
            ${createHTMLButton(page, 'prev')}
            ${createHTMLButton(page, 'next')}
        `;
    } else if (page == totalPages && totalPages > 1) {
        // on last page so only 1 button
        button = createHTMLButton(page, 'prev');
    } 
    
    // insert button in DOM
    elements.SearchResultsPages.insertAdjacentHTML("afterbegin", button);
};


// array input
export const renderResults = (recipes, page=1, resultsPerPage=10) => {
    // render results of current page
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    
    // recipes is array of all recipes
    recipes.slice(start, end).forEach(renderRecipe);
    
    // render pagination 
    renderButtons(page, recipes.length, resultsPerPage);
};








































































