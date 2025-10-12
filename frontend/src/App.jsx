import { BrowserRouter as Router, Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import './App.css'
import { emitMessage } from "./utils/socket";

function ViewHook() {
  const { hookId } = useParams();
  
  localStorage.setItem("hookId", hookId);
  emitMessage("register", hookId);

  return <p>UUID ricevuto: <strong>{hookId}</strong></p>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/v/:hookId" element={<ViewHook />} />
      </Routes>
    </Router>
  );
}

export default App;
