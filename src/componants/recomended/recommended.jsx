import React, { useEffect, useState } from 'react'
import './recommended.css'
import { useActionData } from 'react-router-dom'
import { Apikey, valueconverter } from '../../data'
import { Link } from 'react-router-dom'

function Recommended({categoryId}) {

  const [categorydata,setcatdata] = useState([])

  const fetchdata = async () => {
        const caturl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=US&videoCategoryId=${categoryId}&key=${Apikey}`
        await fetch(caturl).then(response => response.json()).then(data => setcatdata(data.items))
  } 

  useEffect(()=>{
     fetchdata()
  }, [])

  return (
    <div className='recommended'>
         {categorydata.map((item,index)=> {
            return (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <div className="vid-info">
                    <h4>{item.snippet.title}</h4>
                    <p>{item.snippet.channelTitle}</p>
                    <p>{valueconverter(item.statistics.viewCount)} Views</p>
                </div>
             </Link>         

            )
         })} 
    </div>
  )
}

export default Recommended