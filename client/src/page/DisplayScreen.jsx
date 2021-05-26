import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const DisplaySreen = () => {
  const { screen } = useContext(SocketContext);
  return <div>
    <img src={screen} alt="" />
  </div>
}

export default DisplaySreen;