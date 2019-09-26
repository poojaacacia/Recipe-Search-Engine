import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App =() =>{
  const APP_ID="657ed2ee"
  const APP_KEY="a1cfaa7c2572b18afae33d7688da3a51"

  const [recipes,setRecipes]= useState([])
  const[search,setSearch] = useState('');
  const[query,setQuery] = useState('chicken')
  useEffect(() =>{
    getRecipes();
  },[query])

  const getRecipes =async() =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    console.log(response)
    const  data = await response.json();
    setRecipes(data.hits)
    console.log(data.hits)
    }

    const updateSearch = e =>{
      setSearch(e.target.value);
    }

    const getSearch = e =>{
      e.preventDefault();
      setQuery(search);
    }
  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/> 
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      { recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
           title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}/>
      )) }
      </div>
    </div>
  )
}
export default App;
