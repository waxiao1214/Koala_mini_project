import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const DisplaySreen = () => {
  const { screen } = useContext(SocketContext);
  return <>
    {screen ? 
      <img src={screen} alt="" /> :
      <div className="loading">{"Loading please wait... :)"}</div>
    }
  </>
}

export default DisplaySreen;