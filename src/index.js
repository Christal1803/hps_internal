import React from 'react';
import ReactDOM from 'react-dom/client';
//import { HashRouter } from 'react-router-dom';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Forgotpassword from './components/Forgotpassword';
import Dashboard from './components/Dashboard';
import Resetpassword from './components/Resetpassword';
import Newsfeed from './components/Newsfeed';
import Signin from './components/Signin';
import AuthProvider from './AuthProvider';
import AuthRoute from './AuthRoute';
import Setting from './components/Settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/*" element={<Signin />} />
          <Route path="signin" element={<Signin />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
          <Route path="resetpassword" element={<Resetpassword />} />
          <Route path="/" element={<AuthRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="newsfeed" element={<Newsfeed />} />
             <Route path="settings" element={<Setting />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
</React.StrictMode>
);
reportWebVitals();
