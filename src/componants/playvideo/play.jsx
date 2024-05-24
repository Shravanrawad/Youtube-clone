import React, { useEffect, useRef, useState } from 'react'
import './play.css'
import video1 from '../../../assets/video.mp4'
import like from '../../../assets/like.png'
import dislike from '../../../assets/dislike.png'
import share from '../../../assets/share.png'
import save from '../../../assets/save.png'
import jack from '../../../assets/jack.png'
import user_profile from '../../../assets/user_profile.jpg' 
import { Apikey, valueconverter } from '../../data'
import TimeAgo from 'react-timeago';
import { useParams } from 'react-router-dom'

function Play() {

  const {videoId} = useParams()

  const [apidata,setapidata] = useState(null) 
  const [channeldata,setchanneldata] = useState(null) 
  const [commentdata, setcommentdata] = useState([])
  
  const fetchvidoedata = async () => {
        const videodetailurl = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${Apikey}`
        await fetch(videodetailurl).then(response => response.json()).then(data => setapidata(data.items[0]))
  }

  const fetchotherinfo = async () => {
        const channeldataurl = ` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${Apikey}`
        await fetch(channeldataurl).then(response => response.json()).then(data => setchanneldata(data.items[0]))

        const commenturl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${Apikey}`
        await fetch(commenturl).then(response => response.json()).then(data => setcommentdata(data.items))
  }


  useEffect(()=>{
     fetchvidoedata()
  },[videoId])


  useEffect(()=> {
     fetchotherinfo()
  }, [apidata])





  return (
    <div className='play-video'>
       
         <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder='0' allow="autoplay" allowfullscreen></iframe>
         <h3>{apidata ? apidata.snippet.title : 'Title here'}</h3>

         <div className="play-video-info">
              <p>{apidata ? valueconverter( apidata.statistics.viewCount) : '16k'} Views &bull; </p>
              <div>
                <span><img src={like} alt="" />{apidata ? valueconverter(apidata.statistics.likeCount) : 155}</span>
                <span><img src={dislike} alt="" /></span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
              </div>
              </div> 
              <hr />

              <div className="publisher">
                <img src={channeldata ? channeldata.snippet.thumbnails.default.url : ''} alt="" />
                <div>
                    <p>{apidata ? apidata.snippet.channelTitle: ''}</p>
                    <span>{channeldata ? valueconverter( channeldata.statistics.subscriberCount): '1M'} Subscriber</span>
                </div>
                <button>Subscribe</button>
              </div>

              <div className="video-desc">
                 <p>{apidata ? apidata.snippet.description.slice(0,250) : 'Description here'}</p>
                <hr />
                <h4>{apidata ? valueconverter(apidata.statistics.commentCount ) : '102'} Comments</h4>
                {commentdata.map((item,index)=> {
                    return (
                    <div key={index} className="comment">
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                    <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>2 day ago</span></h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>{valueconverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div>
            )
                })}
                
           </div>

     </div>
  )
}

export default Play