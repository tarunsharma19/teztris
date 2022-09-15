import React, { useState } from 'react';
import Sound from 'react-sound';
import music from '../img/music.mp3';


const SoundPlay = (
    ) => {
      console.log(music,"music")
      const [playingStatus,setStatus]= useState("PAUSED")

      setTimeout(setStatus("PLAYING"),5000);

  return (
    <div>
    <Sound 
    url={music}
    playStatus={Sound.status.{playingStatus}}
    // playFromPosition={300 /* in milliseconds */}
    // onLoading={handleSongLoading}
    // onPlaying={handleSongPlaying}
    autoLoad={true}
    loop={true}
    
    />
    </div>
  )
}

export default SoundPlay;