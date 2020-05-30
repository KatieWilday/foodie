import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements } from './views/base'
/** Global State of the App
* - Search object
* - Current Recipe object
* - Shopping List Oject
* - Liked Recipes
**/
const state = {}

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

    //4. Search for recipes
    await state.search.getResults(); //define as async to use await

    //5. Render results on UI
    searchView.renderResults(state.search.result)
    console.log(state.search.result)

  }

}


elements.searchForm.addEventListener('submit', e => {
  e.preventDefault()
  controlSearch()
})
