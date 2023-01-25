import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

function App() {
  const socket = socketIOClient('http://localhost:3001');
  // const [connected, setConnected] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [nickName, setNickName] = useState('');

  useEffect(() => {
    socket.on('initialMessageList', (msgs) => {
      setMessageList(msgs);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('messageFromClient', {
      text: newMessageText,
      author: nickName,
    });
    setNewMessageText('');
  };
  socket.on('initialMessageList', (messages) => {
    setMessageList(messages);
  });
  socket.on('allMessages', (arg) => {
    setMessageList(arg);
  });
  useEffect(() => {
    console.log(messageList);
  }, [messageList]);

  return (
    <div className="App">
      <h2>Message</h2>
      <form onSubmit={handleSubmit}>
        insert message :{' '}
        <input
          type="text"
          name="messageContent"
          value={newMessageText}
          required
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <input type="submit" value="send" />
        insert nickname :
        <input
          type="text"
          name="author"
          value={nickName}
          required
          onChange={(e) => setNickName(e.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
