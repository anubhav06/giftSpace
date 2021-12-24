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

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <PrivateRoute component={HomePage} path="/" exact/>
          <Route component={LoginPage} path="/login"/>
          <Route component={RegisterPage} path="/register"/>
          
          <PrivateRoute component={SetBudgetPage} path="/set-budget"/>
          <PrivateRoute component={AddPersonPage} path="/add-person"/>
          <PrivateRoute component={AddGiftPage} path='/add-gift'/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
