import React from 'react'
import './video.css'
import Play from '../../componants/playvideo/play'
import Recommended from '../../componants/recomended/recommended'
import { useParams } from 'react-router-dom'

function Video() {

  const {videoId,categoryId} = useParams()

  return (
    <div className='play-container'>
         <Play videoId={videoId}/>
         <Recommended categoryId={categoryId}/>
    </div>
  )
}

export default Video
