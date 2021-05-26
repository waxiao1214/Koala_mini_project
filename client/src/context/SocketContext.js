import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import useKeyPress from '../hooks/useKeyPress';

const SocketContext = createContext();
const socket = io('localhost:5000');

const ContextProvider = ({ children }) => {
  const [screen, setScreen] = useState(null)
  const key = useKeyPress();

  useEffect(() => {
    socket.on('screencapture', (data) => {
      const blob = new Blob([data], { type: 'image/png' });
      setScreen(URL.createObjectURL(blob));
    })
  }, []);

  useEffect(() => {
    socket.emit('capturekey', key)
  }, [key])

  return (
    <SocketContext.Provider 
      value={{
        screen
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext };