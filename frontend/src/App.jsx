import { BrowserRouter as Router, Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import { use, useState, useEffect } from 'react'
import axios from 'axios';
import { io } from 'socket.io-client';
import './App.css'

function Home() {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/')
    .then((res) => {
      setResponse(res.data);
    })
    .catch((error) => {
      setError(error.message);
    });

  }, []);

  if (error) return <h2>Errore: {error} DIOCANE</h2>
  if (!response) return <h2>Caricamento...</h2>

  const url = `/v/${response.token}`;
  return <Navigate to={url} />;
}

function ViewHook() {
  const { hookId } = useParams();
  const socket = io('http://localhost/');
  
  socket.emit("register", hookId);

  return <p>UUID ricevuto: <strong>{hookId}</strong></p>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/v/" element={<Home />} />
        <Route path="/v/:hookId" element={<ViewHook />} />
      </Routes>
    </Router>
  );
}

export default App;
