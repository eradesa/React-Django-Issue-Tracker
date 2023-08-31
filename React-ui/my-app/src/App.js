import './App.css';
import {Home} from './Componants/A-Home';
import {Issues} from './Componants/C-Issues';
import {Category} from './Componants/B-Category';
import {Groups} from './Componants/D-Groups';
import {BrowserRouter, Route, Switch,NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div style={{width:"100%"}} className="App container">
      <h3 className="d-flex justify-content-center m-3">
        System Implementation Issue Tracker
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="nav nav-tabs">
          <li className="nav-item m-1">
            <NavLink className="nav-link"  to="/home">
              Dash Board
            </NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="nav-link" to="/issues">
              Issue List
            </NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="nav-link" to="/category">
              Issue Category
            </NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="nav-link" to="/groups">
              User Groups
            </NavLink>
          </li>              
        </ul>
      </nav>

      <Switch> {/*React-Router-dom v5 - to be upgraded to v6*/ }
        <Route path='/home' component={Home}/>
        <Route path='/issues' component={Issues}/>
        <Route path='/category' component={Category}/>
        <Route path='/groups' component={Groups}/>      
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
