import Search from './models/Search'
import * as searchView from './views/searchView'

const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput();
  //console.log(query) //TODO

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
      //console.log(state.search.result);
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
