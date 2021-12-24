import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header'
import SetBudgetPage from './pages/SetBudgetPage';
import AddPersonPage from './pages/AddPersonPage';
import AddGiftPage from './pages/AddGiftPage';
import TrackingPage from './pages/TrackingPage';
import AddTrackingPage from './pages/AddTrackingPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <Route component={LandingPage} path="/" exact/>
          <PrivateRoute component={HomePage} path="/gifts" exact/>
          <Route component={LoginPage} path="/login"/>
          <Route component={RegisterPage} path="/register"/>
          
          <PrivateRoute component={SetBudgetPage} path="/set-budget"/>
          <PrivateRoute component={AddPersonPage} path="/add-person"/>
          <PrivateRoute component={AddGiftPage} path='/add-gift'/>

          <PrivateRoute component={TrackingPage} path='/tracking'/>
          <PrivateRoute component={AddTrackingPage} path='/add-tracking'/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
