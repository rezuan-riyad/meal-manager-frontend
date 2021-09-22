import './App.css';
import Login from './containers/Login'
import Signup from './containers/Signup'
import Dashbord from './containers/Dashbord'
import Border from './containers/Border'
import Home from './containers/Home'

import CoursesConfigure from './containers/ManagerSection/CoursesConfigure';
import BordersConfigure from './containers/ManagerSection/BordersConfigure';
import SetForTomorrow from './containers/ManagerSection/SetForTomorrow';
import ChangeManagership from './containers/ManagerSection/ChangeManagership'

import AddShoppingData from './containers/ManagerSection/AddShoppingData'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import GlobalContextProvider from './_contexts/GlobalContext';
import CourseContextProvider from './_contexts/CourseContext';

import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './styles/theme'

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <CourseContextProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Switch>
                <Route exact path="/">
                  <Home />
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
                <Route path="/set-for-tomorrow">
                  <SetForTomorrow />
                </Route>
                <Route path="/change-managership">
                  <ChangeManagership />
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
        </CourseContextProvider>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
