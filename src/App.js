import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import StateSpecificRoute from './components/StateSpecificRoute'
import About from './components/About'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:stateCode" component={StateSpecificRoute} />
    <Route exact path="/about" component={About} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
