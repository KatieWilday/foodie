import Search from './models/Search'
/** Global State of the App
* - Search object
* - Current Recipe object
* - Shopping List Oject
* - Liked Recipes
**/
const state = {}

const controlSearch = async () => {
  // 1. Get query from view
  const query = 'pizza' //TODO

  if (query) {
    // 2. Create new search object add to state
    state.search = new Search(query)

    //3. Prepare UI for results

    //4. Search for recipes
    await state.search.getResults() //define as async to use await

    //5. Render results on UI
    console.log(state.search.result)
  }

}


document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault()
  controlSearch()
})
