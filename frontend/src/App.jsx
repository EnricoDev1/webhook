// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebhookView from './pages/WebhookView';
import WebhookEdit from './pages/WebhookEdit';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/v/" element={<Home />} />
        <Route path="/v/:hookId" element={<WebhookView />} />
        <Route path="/v/:hookId/edit" element={<WebhookEdit darkMode={true}/>} />
        <Route path="/v/notfound" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;