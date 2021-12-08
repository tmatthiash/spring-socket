import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import logo from './logo.svg';
import Stomp from 'stompjs';
import './App.css';

function App() {

  const [message, setMessage] = useState("Waiting for message");

  let stompClient: Stomp.Client | null = null;

const connect = () => {
  const socket = new SockJS('Http://localhost:8080/gs-guide-websocket')
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient?.subscribe('/topic/greetings', function (greeting) {
      setMessage((JSON.parse(greeting.body).content))
        console.log((JSON.parse(greeting.body).content));
    });
  }); 
}

connect();

console.log("Rendering")

const click = () => {
  stompClient?.send("/app/hello", {}, JSON.stringify({'name': "Test"}));
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={click}>TEST BUTTON</button>
        <h2>{message}</h2>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
