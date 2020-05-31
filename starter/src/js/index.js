import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base'
import Recipe from './models/Recipe'


/** Global State of the App
* - Search object
* - Current Recipe object
* - Shopping List Oject
* - Liked Recipes
**/
const state = {}

/** SEARCH CONTROLLER **/
const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput();
  console.log(query) //TODO

  if (query) {
    // 2. Create new search object add to state
    state.search = new Search(query)

    //3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    try {
      //4. Search for recipes
      await state.search.getResults(); //define as async to use await

      //5. Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
      console.log(state.search.result);
    } catch (err) {
      alert('Something wrong with the search...')
      clearLoader();
    }


  }

}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
})


elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage)
  }
})

/** RECIPE CONTROLLER **/
const controlRecipe = async () => {
  //Get ID from URL
  const id = window.location.hash.replace('#', '');
  console.log(id)

  if (id) {
    //Prepare UI for changes

    //Create new recipe obj
    state.recipe = new Recipe(id);

    try {
      //Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      //Calculate servings and time
      state.recipe.calcServings();
      state.recipe.calcTime();

      //Render Recipe
      console.log(state.recipe)
    } catch (err) {
      alert("Error processing recipe!");
    }

  }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
