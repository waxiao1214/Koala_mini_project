import DisplayScreen from './page/DisplayScreen';
import { ContextProvider } from './context/SocketContext';

function App() {
  return (
    <ContextProvider>
      <DisplayScreen />
    </ContextProvider>
  );
}

export default App;
