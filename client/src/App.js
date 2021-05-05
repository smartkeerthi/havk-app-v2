import React, { useEffect } from 'react'
import NavBar from './components/Navbar/Navbar'
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import AddFriends from './components/AddFriends/AddFriends';
import Friends from './components/Friends/Friends';
import { selectUserName, setActiveUser } from './reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch()
  const userName = useSelector(selectUserName)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setActiveUser({
          userName: user.displayName,
          userEmail: user.email,
          userProfilePic: user.photoURL
      }))
      }
    })
  },[dispatch])
  

  return (
    <Router>
      {!userName ? (
        <Switch>
          <Route path='/' exact component={Login} />
        </Switch>
      ) : 
      (<Switch>
        <Route path="/" exact component={(Home)} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/search-friends" component={AddFriends} />
        <Route path="/chat" component={Friends} />
      </Switch>)}
    </Router>
  );
}

const Home = () => {
  return (
    <div className="bg-dark">
        <NavBar />
        <div className="app">
          <div className="pt-5 appBody bg-dark">
            <Main/>
            <Sidebar/>
          </div>
        </div>
      </div>
  )
}

export default App;
