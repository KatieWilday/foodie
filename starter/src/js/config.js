import axios from 'axios';

async function getResults(qeury) {
  const key = 'acd05c5711msha05183ddac026c8p169ec7jsn414fc820b394'
  const res = await axios(`https://rapidapi.com/brianiswu/api/recipe-puppy?key=${key}&q=${query}`)
  console.log(res)
}
getResults();
