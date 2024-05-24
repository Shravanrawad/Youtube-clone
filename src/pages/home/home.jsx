import React, { useState } from 'react'
import './home.css'
import Sidebar from '../../componants/sidebar/sidebar'
import Feed from '../../componants/feed/feed'

function Home({sidebar}) {

 const [category, setcategory] = useState(0)

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setcategory={setcategory} />
      <div className={`container ${sidebar ? '' : 'large-container'}`}>
           <Feed category={category}/>
      </div>
    </>
  )
}

export default Home
