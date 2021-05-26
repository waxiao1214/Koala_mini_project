import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import useKeyPress from '../hooks/useKeyPress';
import useMouseClick from '../hooks/useMouseClick';
import useMousePosition from '../hooks/useMousePosition';

const SocketContext = createContext();
const socket = io('localhost:5000');

const ContextProvider = ({ children }) => {
  const [screen, setScreen] = useState(null)
  const key = useKeyPress();
  const pos = useMousePosition();
  const click = useMouseClick();

  useEffect(() => {
    socket.on('screencapture', (data) => {
      const blob = new Blob([data], { type: 'image/png' });
      setScreen(URL.createObjectURL(blob));
    })
  }, []);

  useEffect(() => {
    socket.emit('capturekey', key)
  }, [key])

  useEffect(() => {
    socket.emit("mousemove", pos)
  }, [pos])

  useEffect(() => {
    console.log(click)
    if(click) {
      socket.emit('mouseclick', pos)
    }
  }, [click])

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