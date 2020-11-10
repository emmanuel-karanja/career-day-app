import logo from './logo.svg';
import './App.css';
import Header from './Components/Common/Layout/Header/Header';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';

import Home from './Components/Common/Layout/Home';
import About from './Components/Common/Layout/About';
import Contact from './Components/Common/Layout/Contact';
import NotFound from './Components/Common/Layout/NotFound';
import Footer from './Components/Common/Layout/Footer';
import AdminHeader from './Dashboards/AdminDashboard'

import {Provider} from 'react-redux';
import store from './store/store';

function App() {
  return (
   <Provider store={store}>
    <BrowserRouter>
        <div>
          <AdminHeader/>
          
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </div>
          
          <Footer/>
        </div>
      </BrowserRouter>
     </Provider>
  );
}

export default App;
