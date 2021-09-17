import './App.css';
import Login from './containers/Login'
import Signup from './containers/Signup'
import Dashbord from './containers/Dashbord'
import Border from './containers/Border'

import CoursesConfigure from './containers/ManagerSection/CoursesConfigure';
import BordersConfigure from './containers/ManagerSection/BordersConfigure';

import AddShoppingData from './containers/ManagerSection/AddShoppingData'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GlobalContextProvider from './contexts/GlobalContext';
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './styles/theme'

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">

              </Route>
              <Route path="/dashbord">
                <Dashbord />
              </Route>
              <Route path="/border/:name">
                <Border />
              </Route>
              {/** Manager Section*/}
              <Route path="/add-shopping-data">
                <AddShoppingData />
              </Route>
              <Route path="/configure-borders">
                <BordersConfigure />
              </Route>
              <Route path="/configure-courses">
                <CoursesConfigure />
              </Route>
              <Route path="/change-managership">

              </Route>

              {/** Authentication Section */}
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
