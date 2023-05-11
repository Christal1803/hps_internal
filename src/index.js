import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Forgotpassword from './components/Forgotpassword';
import Dashboard from './components/Dashboard';
import Resetpassword from './components/Resetpassword';
import Newsfeed from './components/Newsfeed';
import Signin from './components/Signin';
import Schoolselection from './components/Schoolselection';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="signin" element={<Signin />} />
      <Route path="forgotpassword" element={<Forgotpassword />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="resetpassword" element={<Resetpassword />} />
      <Route path="newsfeed" element={<Newsfeed />} />
      <Route path="schoolselection" element={<Schoolselection />} />
    </Routes>
  </Router>
</React.StrictMode>
);
reportWebVitals();
