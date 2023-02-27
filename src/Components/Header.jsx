import React from 'react'

function Header(props) {
  return (
    <div className='header'>
        <h1>Mock Draft Machine</h1>
        <button onClick={props.viewSavedDrafts}>View Saved Drafts</button>
    </div>
  )
}

export default Header