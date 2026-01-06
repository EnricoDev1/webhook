// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebhookView from './pages/WebhookView';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/v/" element={<Home />} />
        <Route path="/v/:hookId" element={<WebhookView />} />
      </Routes>
    </Router>
  );
}

export default App;