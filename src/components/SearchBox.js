import React, { useEffect } from 'react'

function SearchBox(props) {
  console.log(props.searchValue, "==> prop search");
  // console.log(props.setSearchValue, "==> prop set search")

  return (
    <div className='col-sm-4'>
        <input className='form-control' 
        placeholder='Type to search..'
        value={props.searchValue}
        onChange={(e) => props.setSearchValue(e.target.value) 
        }
        >   
        </input>
    </div>
  )
}

export default SearchBox