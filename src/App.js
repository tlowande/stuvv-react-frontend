import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Messages from './components/Messages/Messages'
import MyStuvv from './components/MyStuvv/MyStuvv'
import './App.scss';
import './components/MyStuvv/MyStuvv.scss'
import BuildForm from './components/Build/BuildForm';
import axios from 'axios'
import MyRequests from './components/MyRequests/MyRequests'

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [list, setList] = useState([]);
  const [request, setRequest] = useState([]);
  const [buildState, setBuildState] = useState({});

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_DB_HOST}/profiles/me`, { withCredentials: true })
      .then((resp) => {
        setCurrentUser(resp.data)


        axios.get(`${process.env.REACT_APP_DB_HOST}/userslistings/${resp.data.id}`, { withCredentials: true })
          .then((resp) => {
            setList(resp.data)
          })

        axios.get(`${process.env.REACT_APP_DB_HOST}/usersrequests/${resp.data.id}`, { withCredentials: true })
          .then((resp) => {
            setRequest(resp.data)
          })
          .catch(err => {
            console.log('SORRY!', err)
          })
      })
      .catch(err => {
        console.log('GOT TO THE PROFILES/ME CATCH', err)
      })
  }, []);
  console.log(React.version);
  if (!currentUser && !list && !request) { return (<h1>Loading...</h1>); } else {
    return (

      <Router>
        <div>
          <Navbar user={currentUser} />
          <Switch>
            <Route
              exact path="/"
              render={() => <Home user={currentUser} setBuildState={setBuildState} />}
            />
            <Route
              exact path="/messages"
              render={() => < Messages user={currentUser} />}
            />
            <Route
              exact path="/my_stuvv"
              render={() => <MyStuvv className="my-stuvv-1container" list={list} user={currentUser} setBuildState={setBuildState} setList={setList} />}

            />
            <Route
              exact path="/build"
              render={() => <BuildForm user={currentUser} buildState={buildState} />}

            />
            <Route
              exact path="/my_requests"
              render={() => <MyRequests className="my-stuvv-container" request={request} user={currentUser} />}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );

  }
}

export default App;
