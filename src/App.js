import socketIOClient from 'socket.io-client';
import './App.css';

function App() {
  const socket = socketIOClient('http://localhost:3001');
  socket.on('initialMessageList', (messages) => {});

  return <div className="App">Hello</div>;
}

export default App;
