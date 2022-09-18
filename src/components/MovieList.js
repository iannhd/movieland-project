import React from 'react'

function MovieList(props) {
  return (
    <>
    {props.movies.map((movie, index) => {

        const FavoriteComponent = props.FavoriteComponent

        return(
          <>
            <div className='image-container d-flex justify-content-start m-3' key={index}>
                <img  src={movie.Poster}></img>
                <div key={index}className='overlay d-flex align-items-center justify-content-center'
                onClick={() => props.handleFavoriteClick(movie)}>
                  <FavoriteComponent/>
                </div>
            </div>
            </>
        )
    })}
    </>
  )
}

export default MovieList