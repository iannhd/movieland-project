
import './App.css';
import React, {useEffect, useState} from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import Loading from './components/Loading';
import AddFavorite from './components/AddFavorite';
import RemoveFavorite from './components/RemoveFavorite';
// import "bootstrap/dist/css/bootstrap/min.css"

function App() {

  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const getMovieReq = async (searchValue) => {

    // console.log(searchValue, "==> search value")
    // console.log(setSearchValue,"==> set search");
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=b326a56`

    const response = await fetch(url)

    const resMovie = await response.json()

    console.log(resMovie, "==> movie");
    
    
    if(resMovie.Search){
      setLoading(true)
      setTimeout(() => {
        
        setMovies(resMovie.Search)
        setLoading(false)

     }, 2000);
    }
  }

  useEffect(()=>{
    getMovieReq(searchValue)
  },[searchValue])

  useEffect(() => {
      const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'))

      localStorage.getItem('react-movie-app-favorites')

      setFavorites(movieFavorites)
  }, [])

  const saveToLocalStorage = (items) => {
      localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
  }

  const addFavoriteMovies = (movie) => {
    const newFavorite = [...favorites, movie]
    setFavorites(newFavorite)
    saveToLocalStorage(newFavorite)
  }

  const removeFavoriteMovies = (movie) => {
    const newFavorite = favorites.filter((favorite) => favorite.imdbID !== movie.imdbID)
    setFavorites(newFavorite)
  }

  return (
    <>
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center'>
        <MovieListHeading heading='Movie'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
        {loading ? <Loading/> : ""}
      <div className='row'>
        <MovieList movies={movies} handleFavoriteClick={addFavoriteMovies} FavoriteComponent={AddFavorite} />
      </div>
      <div className='row d-flex align-items-center'>
        <MovieListHeading heading='Favorites'/>
      </div>
      <div className='row'>
        <MovieList movies={favorites} 
        handleFavoriteClick={removeFavoriteMovies} 
        FavoriteComponent={RemoveFavorite} />
      </div>
    </div>
    </>
  );
}

export default App;
