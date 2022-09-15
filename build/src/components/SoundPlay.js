import React, { useState } from 'react';
import music from '../img/music.mp3';
import useSound from 'use-sound';
import styled from 'styled-components';


const SoundPlay = () => {
      console.log(music,"music")
      // const [playingStatus,setStatus]= useState("")
      const [play , {stop}] = useSound(music);
      // const handle = () => {
      //   setTimeout(setStatus("Sound.status.PLAYING"),5000)
      // }
      // console.log(playingStatus,"status")
      const[count,setCount] = useState(1)
      const handlePausePlay = () => {
        if(count%2===0){
          stop()
          setCount(count+1)
        }
        else{
          play()
          setCount(count+1)
        }
      }

      const Wrapper = styled.div`
      background: #ffffff40;
      width: 25px;
      display: flex;
      padding: 8px 5px 8px 12px;
      float: right;
       margin: 10px;
      `;

  return (
      <Wrapper>
        {
          count%2===0?<>
          <svg className="button" viewBox="0 0 60 60" onClick={handlePausePlay}>
            <polygon points="0,0 15,0 15,60 0,60" />
            <polygon points="25,0 40,0 40,60 25,60" />
          </svg>
          </>:<>
          <svg className="button" viewBox="0 0 60 60" onClick={handlePausePlay}>
            <polygon points="0,0 50,30 0,60" />
          </svg></>
        }
        </Wrapper>
  )
}

export default SoundPlay;