// create an object that contains all the elements that we need 
// from the app
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchResultClass: document.querySelector(".results__list"),
    SearchResultsPages: document.querySelector(".results__pages"),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector(".shopping__list")
};

export const elementStrings = {
    loader: "loader"
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}













































