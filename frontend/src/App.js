import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Men from './Men';
import Advertise from './Advertise';
import Acc from './Acc';
import Productdetail from './Productdetail';
import Cartpage from './Cartpage';
import User from './User';
import Main from './Main';
function App() {

  return (
    <Router>
    <div className="App">
      <Navbar />
      {/* <Advertise /> */}
      <div className="content">
        <Routes>
        <Route exact path="/" element={ <Main/> }>
          </Route>
          <Route exact path="/women/:page" element={ <Home/> }>
          </Route>
          <Route path="/men/:page" element={ <Men/> }>
          </Route>
          <Route path="/acc/:page" element={ <Acc/> }>
          </Route>
          <Route path="/detail/:id" element={ <Productdetail/> }>
          </Route>
          <Route path="/cartpage" element={ <Cartpage/> }>
          </Route>
          <Route path="/user" element={ <User/> }>
          </Route>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
